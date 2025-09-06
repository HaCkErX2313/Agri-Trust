import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProductData {
  product_id: string;
  product_name: string;
  farmer_name: string;
  farmer_location: string;
  crop_type: string;
  harvest_date: string;
}

async function addProductToBlockchain(productData: ProductData) {
  const { ethers } = await import("https://cdn.skypack.dev/ethers@5.7.2");
  
  const RPC_URL = Deno.env.get('POLYGON_RPC_URL');
  const PRIVATE_KEY = Deno.env.get('POLYGON_PRIVATE_KEY');
  
  if (!RPC_URL || !PRIVATE_KEY) {
    throw new Error('Missing blockchain configuration');
  }

  // Contract ABI for the functions we need
  const contractABI = [
    "function addProduct(string memory _productId, string memory _productName, string memory _farmerName, string memory _farmerLocation, string memory _cropType, uint256 _harvestDate) public",
    "function productExists(string memory _productId) public view returns (bool)"
  ];

  // Contract address - update this after deployment
  const CONTRACT_ADDRESS = Deno.env.get('POLYGON_CONTRACT_ADDRESS') || "0x1234567890123456789012345678901234567890"; // Placeholder - will be updated

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

  try {
    // Check if product already exists
    const exists = await contract.productExists(productData.product_id);
    if (exists) {
      throw new Error('Product already exists on blockchain');
    }

    // Convert harvest date to Unix timestamp
    const harvestTimestamp = Math.floor(new Date(productData.harvest_date).getTime() / 1000);

    const tx = await contract.addProduct(
      productData.product_id,
      productData.product_name,
      productData.farmer_name,
      productData.farmer_location,
      productData.crop_type,
      harvestTimestamp,
      {
        gasLimit: 500000,
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

    const { product_id, product_name, farmer_name, farmer_location, crop_type, harvest_date } = await req.json();

    if (!product_id || !product_name || !farmer_name || !farmer_location || !crop_type || !harvest_date) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Adding product ${product_id} to blockchain...`);

    // First, add to database
    const { data: dbProduct, error: dbError } = await supabaseClient
      .from('products')
      .insert({
        product_id,
        product_name,
        farmer_name,
        farmer_location,
        crop_type,
        harvest_date
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save to database' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Then add to blockchain
    try {
      const blockchainResult = await addProductToBlockchain({
        product_id,
        product_name,
        farmer_name,
        farmer_location,
        crop_type,
        harvest_date
      });

      // Update database with blockchain transaction hash
      await supabaseClient
        .from('products')
        .update({ blockchain_tx_hash: blockchainResult.transactionHash })
        .eq('id', dbProduct.id);

      console.log(`Product ${product_id} added successfully. TX: ${blockchainResult.transactionHash}`);

      return new Response(
        JSON.stringify({
          success: true,
          product: dbProduct,
          blockchain: blockchainResult
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
      
      // Keep database record but mark blockchain as failed
      await supabaseClient
        .from('products')
        .update({ blockchain_status: 'failed', blockchain_error: blockchainError.message })
        .eq('id', dbProduct.id);

      return new Response(
        JSON.stringify({
          success: false,
          product: dbProduct,
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
