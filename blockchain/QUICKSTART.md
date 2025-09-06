# AgriTrust Blockchain Integration

## Quick Start

### 1. Setup Environment
```bash
cd blockchain
chmod +x deploy-all.sh
cp .env.example .env
# Edit .env with your wallet details
```

### 2. Get Testnet MATIC
Visit [Polygon Faucet](https://faucet.polygon.technology/) and get testnet MATIC for your wallet.

### 3. Deploy Everything
```bash
./deploy-all.sh
```

### 4. Test Integration
```bash
# Test blockchain functions
curl -X POST https://cldtbkwhjksqckezdzzo.supabase.co/functions/v1/blockchain-add-product \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHRia3doamtzcWNrZXpkenpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjIzOTMsImV4cCI6MjA3MjE5ODM5M30.tx7qH98oLatOfodhvAHq38nJV2EKP2XFZXWoLkHUfBc" \
  -H "Content-Type: application/json" \
  -d '{"product_id":"QR123","product_name":"Organic Tomatoes","farmer_name":"Ramesh","farmer_location":"Nashik","crop_type":"Tomato","harvest_date":"2025-01-15"}'
```

## Environment Variables

Add these to your `.env` file:
```bash
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com/
POLYGON_PRIVATE_KEY=your_private_key_without_0x_prefix
```

## Testing Commands

```bash
# Deploy contract
npm run deploy

# Update Edge Functions
npm run update-addresses  

# Run integration test
npm run test

# Deploy everything at once
npm run deploy-and-update
```

## Verification

1. Check contract on [Mumbai PolygonScan](https://mumbai.polygonscan.com/)
2. Test Edge Functions at your Supabase project
3. Verify frontend integration shows blockchain data

Your blockchain integration is ready for production use!