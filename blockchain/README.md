# AgriTrust Blockchain Integration

This directory contains the smart contract and blockchain integration for AgriTrust's supply chain transparency system using Polygon Mumbai Testnet.

## Overview

The blockchain integration provides immutable transparency for agricultural supply chain tracking, ensuring that every step from farm to consumer is verifiable and tamper-proof.

## Smart Contract

### SupplyChain.sol

A Solidity smart contract that manages:
- Product registration with farmer details
- Stage updates (Farmer → FPO → Transport → Mandi → Retailer)
- Immutable record keeping
- Event emission for transparency

### Key Features

- **Product Management**: Add new products with farmer and crop details
- **Stage Tracking**: Update stages with location, timestamp, and actor information
- **Data Integrity**: Immutable records once written to blockchain
- **Event Logging**: Blockchain events for all major actions
- **Access Control**: Product existence validation

## Setup Instructions

### Prerequisites

1. **Node.js** (v16 or higher)
2. **MATIC tokens** for gas fees (get from [Polygon Faucet](https://faucet.polygon.technology/))
3. **Polygon RPC URL** (Infura, Alchemy, or public RPC)
4. **Private Key** of deployer wallet

### Environment Setup

The system uses Supabase secrets for secure key management. Set these secrets in your Supabase project:

- `POLYGON_RPC_URL`: Your Polygon Mumbai RPC endpoint
- `POLYGON_PRIVATE_KEY`: Private key of the deployer wallet (without 0x prefix)

### Installation

```bash
cd blockchain
npm install
```

### Compilation

Compile the smart contract:

```bash
npm run compile
```

### Deployment

Deploy the contract to Polygon Mumbai:

```bash
npm run deploy
```

This will:
1. Compile the contract
2. Connect to Polygon Mumbai
3. Deploy the contract
4. Save deployment info to `deployment.json`

### Testing

Run the integration test:

```bash
npm run test
```

This will:
1. Add a test product
2. Update multiple stages
3. Retrieve and verify data
4. Display complete product journey

## API Integration

The blockchain functions are integrated with Supabase Edge Functions:

### Available Endpoints

1. **POST /blockchain/add-product**
   - Adds a new product to both database and blockchain
   - Returns transaction hash for verification

2. **PUT /blockchain/update-stage**
   - Updates a product stage on blockchain
   - Syncs with database

3. **GET /blockchain/get-product/:productId**
   - Retrieves product data from blockchain
   - Verifies against database

4. **GET /blockchain/verify/:transactionHash**
   - Verifies a blockchain transaction
   - Returns confirmation status

### Response Format

```json
{
  "success": true,
  "data": {
    "productId": "AGR001",
    "transactionHash": "0x...",
    "blockNumber": 12345,
    "gasUsed": "245670"
  }
}
```

## Contract Architecture

### Data Structures

```solidity
struct Product {
    string productId;
    string productName;
    string farmerName;
    string farmerLocation;
    string cropType;
    uint256 harvestDate;
    bool exists;
    uint256 stageCount;
}

struct Stage {
    string stageName;
    string location;
    uint256 timestamp;
    address actor;
    string status;
    string notes;
}
```

### Events

```solidity
event ProductAdded(
    string indexed productId,
    string productName,
    string farmerName,
    address indexed actor
);

event StageUpdated(
    string indexed productId,
    string stageName,
    string location,
    address indexed actor
);
```

## Gas Optimization

The contract is optimized for gas efficiency:
- Minimal storage operations
- Efficient data structures
- Batch operations where possible
- Gas limit controls in deployment

### Estimated Gas Costs

- **Deploy Contract**: ~2,000,000 gas
- **Add Product**: ~150,000 gas
- **Update Stage**: ~100,000 gas
- **Read Operations**: Free (view functions)

## Security Features

1. **Product Existence Validation**: Prevents operations on non-existent products
2. **Immutable Records**: Data cannot be modified once written
3. **Actor Tracking**: Every action records the blockchain address
4. **Event Logging**: Complete audit trail via events

## Integration with Frontend

The blockchain data integrates seamlessly with the existing ProductTracker component:

1. **Search by Product ID**: Retrieves data from blockchain
2. **QR Code Scanning**: Validates against blockchain records
3. **PDF Reports**: Includes blockchain transaction hashes
4. **Real-time Verification**: Live blockchain confirmation

## Troubleshooting

### Common Issues

1. **Insufficient MATIC**: Get testnet MATIC from faucet
2. **RPC Errors**: Check RPC URL and network connectivity
3. **Gas Limit**: Increase gas limit for complex operations
4. **Contract Not Found**: Ensure deployment completed successfully

### Debug Commands

```bash
# Check balance
node -e "console.log(await (new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL)).getBalance('YOUR_ADDRESS'))"

# Verify contract
node -e "console.log(await (new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL)).getCode('CONTRACT_ADDRESS'))"
```

## Network Information

- **Network**: Polygon Mumbai Testnet
- **Chain ID**: 80001
- **Block Explorer**: [PolygonScan Mumbai](https://mumbai.polygonscan.com/)
- **Faucet**: [Polygon Faucet](https://faucet.polygon.technology/)

## License

MIT License - see LICENSE file for details.