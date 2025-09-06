import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function verifyTransaction(transactionHash: string) {
  const { ethers } = await import("https://cdn.skypack.dev/ethers@5.7.2");
  
  const RPC_URL = Deno.env.get('POLYGON_RPC_URL');
  
  if (!RPC_URL) {
    throw new Error('Missing blockchain configuration');
  }

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  try {
    const receipt = await provider.getTransactionReceipt(transactionHash);

    if (!receipt) {
      throw new Error('Transaction not found');
    }

    const transaction = await provider.getTransaction(transactionHash);
    const block = await provider.getBlock(receipt.blockNumber);

    const verification = {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      status: receipt.status === 1 ? 'Success' : 'Failed',
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: transaction.gasPrice?.toString(),
      contractAddress: receipt.to,
      from: receipt.from,
      confirmations: await transaction.confirmations,
      timestamp: new Date(block.timestamp * 1000).toISOString(),
      explorerUrl: `https://mumbai.polygonscan.com/tx/${transactionHash}`
    };

    return verification;

  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const transactionHash = url.pathname.split('/').pop();

    if (!transactionHash || !transactionHash.startsWith('0x')) {
      return new Response(
        JSON.stringify({ error: 'Valid transaction hash is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Verifying transaction ${transactionHash}...`);

    const verification = await verifyTransaction(transactionHash);

    console.log(`Transaction ${transactionHash} verified: ${verification.status}`);

    return new Response(
      JSON.stringify({
        success: true,
        verification
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    
    if (error.message.includes('not found')) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Transaction not found' 
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});