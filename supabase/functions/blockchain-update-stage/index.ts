import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StageData {
  product_id: string;
  stage_name: string;
  location: string;
  status: string;
  notes?: string;
}

async function updateStageOnBlockchain(productId: string, stageData: StageData) {
  const { ethers } = await import("https://cdn.skypack.dev/ethers@5.7.2");
  
  const RPC_URL = Deno.env.get('POLYGON_RPC_URL');
  const PRIVATE_KEY = Deno.env.get('POLYGON_PRIVATE_KEY');
  
  if (!RPC_URL || !PRIVATE_KEY) {
    throw new Error('Missing blockchain configuration');
  }

  const contractABI = [
    "function updateStage(string memory _productId, string memory _stageName, string memory _location, string memory _status, string memory _notes) public",
    "function productExists(string memory _productId) public view returns (bool)"
  ];

  const CONTRACT_ADDRESS = Deno.env.get('POLYGON_CONTRACT_ADDRESS') || "0x1234567890123456789012345678901234567890"; // Placeholder - will be updated

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

  try {
    // Check if product exists on blockchain
    const exists = await contract.productExists(productId);
    if (!exists) {
      throw new Error('Product not found on blockchain');
    }

    const tx = await contract.updateStage(
      productId,
      stageData.stage_name,
      stageData.location,
      stageData.status,
      stageData.notes || '',
      {
        gasLimit: 300000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei')
      }
    );

    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    };

  } catch (error) {
    console.error('Blockchain error:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { product_id, stage_name, location, status, notes } = await req.json();

    if (!product_id || !stage_name || !location || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Updating stage ${stage_name} for product ${product_id}...`);

    // First, get product from database
    const { data: product, error: productError } = await supabaseClient
      .from('products')
      .select('id')
      .eq('product_id', product_id)
      .single();

    if (productError || !product) {
      return new Response(
        JSON.stringify({ error: 'Product not found in database' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add stage to database
    const { data: dbStage, error: dbError } = await supabaseClient
      .from('journey_stages')
      .insert({
        product_id: product.id,
        stage_name,
        status,
        location,
        completion_date: status === 'Completed' ? new Date().toISOString() : null,
        notes
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save stage to database' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update stage on blockchain
    try {
      const blockchainResult = await updateStageOnBlockchain(product_id, {
        product_id,
        stage_name,
        location,
        status,
        notes
      });

      // Update database with blockchain transaction hash
      await supabaseClient
        .from('journey_stages')
        .update({ blockchain_tx_hash: blockchainResult.transactionHash })
        .eq('id', dbStage.id);

      console.log(`Stage ${stage_name} updated successfully. TX: ${blockchainResult.transactionHash}`);

      return new Response(
        JSON.stringify({
          success: true,
          stage: dbStage,
          blockchain: blockchainResult
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
      
      // Keep database record but mark blockchain as failed
      await supabaseClient
        .from('journey_stages')
        .update({ 
          blockchain_status: 'failed', 
          blockchain_error: blockchainError.message 
        })
        .eq('id', dbStage.id);

      return new Response(
        JSON.stringify({
          success: false,
          stage: dbStage,
          error: 'Blockchain transaction failed',
          details: blockchainError.message
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
