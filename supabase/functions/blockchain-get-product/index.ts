import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getProductFromBlockchain(productId: string) {
  const { ethers } = await import("https://cdn.skypack.dev/ethers@5.7.2");
  
  const RPC_URL = Deno.env.get('POLYGON_RPC_URL');
  
  if (!RPC_URL) {
    throw new Error('Missing blockchain configuration');
  }

  const contractABI = [
    "function getProduct(string memory _productId) public view returns (string memory productName, string memory farmerName, string memory farmerLocation, string memory cropType, uint256 harvestDate, uint256 stageCount)",
    "function getProductStages(string memory _productId) public view returns (tuple(string stageName, string location, uint256 timestamp, address actor, string status, string notes)[])",
    "function productExists(string memory _productId) public view returns (bool)"
  ];

  const CONTRACT_ADDRESS = Deno.env.get('POLYGON_CONTRACT_ADDRESS') || "0x1234567890123456789012345678901234567890"; // Placeholder - will be updated

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

  try {
    // Check if product exists
    const exists = await contract.productExists(productId);
    if (!exists) {
      throw new Error('Product not found on blockchain');
    }

    // Get product details
    const productDetails = await contract.getProduct(productId);
    const stages = await contract.getProductStages(productId);

    const product = {
      productId,
      productName: productDetails[0],
      farmerName: productDetails[1],
      farmerLocation: productDetails[2],
      cropType: productDetails[3],
      harvestDate: new Date(productDetails[4] * 1000).toISOString(),
      stageCount: productDetails[5].toNumber(),
      stages: stages.map((stage: any) => ({
        stageName: stage.stageName,
        location: stage.location,
        timestamp: new Date(stage.timestamp * 1000).toISOString(),
        actor: stage.actor,
        status: stage.status,
        notes: stage.notes
      }))
    };

    return product;

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
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop();

    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'Product ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching product ${productId} from blockchain...`);

    const blockchainProduct = await getProductFromBlockchain(productId);

    console.log(`Product ${productId} retrieved successfully from blockchain`);

    return new Response(
      JSON.stringify({
        success: true,
        product: blockchainProduct,
        source: 'blockchain'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    
    if (error.message.includes('not found')) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Product not found on blockchain' 
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