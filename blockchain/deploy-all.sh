#!/bin/bash

# AgriTrust Blockchain Deployment Script
# This script deploys the smart contract and updates all Edge Functions

echo "🚀 Starting AgriTrust Blockchain Deployment..."

# Check if we're in the blockchain directory
if [ ! -f "SupplyChain.sol" ]; then
    echo "❌ Please run this script from the blockchain directory"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env with your wallet details and run again"
    exit 1
fi

# Load environment variables
source .env

# Check required environment variables
if [ -z "$POLYGON_PRIVATE_KEY" ]; then
    echo "❌ POLYGON_PRIVATE_KEY not set in .env"
    exit 1
fi

echo "🔧 Installing dependencies..."
npm install

echo "📝 Compiling smart contract..."
npm run compile

echo "🚀 Deploying to Polygon Mumbai..."
npm run deploy

# Check if deployment was successful
if [ ! -f "deployment.json" ]; then
    echo "❌ Deployment failed - deployment.json not found"
    exit 1
fi

echo "📍 Updating Edge Functions with contract address..."
npm run update-addresses

echo "🧪 Running integration test..."
npm run test

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Check your contract on Mumbai PolygonScan"
echo "2. Test the Edge Functions using the provided curl commands"
echo "3. Verify blockchain integration on your frontend"
echo ""

# Extract contract address for easy copying
CONTRACT_ADDRESS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('deployment.json', 'utf8')).contractAddress)")
echo "📍 Contract Address: $CONTRACT_ADDRESS"
echo "🔍 PolygonScan: https://mumbai.polygonscan.com/address/$CONTRACT_ADDRESS"