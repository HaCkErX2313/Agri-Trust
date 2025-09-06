const { ethers } = require('ethers');
const fs = require('fs');

class SupplyChainInteraction {
    constructor() {
        this.provider = null;
        this.wallet = null;
        this.contract = null;
        this.contractAddress = null;
        this.abi = null;
    }
    
    /**
     * Initialize the blockchain connection and contract instance
     */
    async initialize() {
        try {
            // Load environment variables
            const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-mumbai.maticvigil.com/';
            const PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY;
            
            if (!PRIVATE_KEY) {
                throw new Error('POLYGON_PRIVATE_KEY environment variable is required');
            }
            
            // Load deployment info
            const deploymentPath = './deployment.json';
            if (!fs.existsSync(deploymentPath)) {
                throw new Error('Deployment file not found. Please deploy the contract first.');
            }
            
            const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
            this.contractAddress = deployment.contractAddress;
            this.abi = deployment.abi;
            
            // Initialize provider and wallet
            this.provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
            
            // Initialize contract instance
            this.contract = new ethers.Contract(this.contractAddress, this.abi, this.wallet);
            
            console.log('✅ Blockchain connection initialized');
            console.log('📍 Contract address:', this.contractAddress);
            console.log('👤 Wallet address:', this.wallet.address);
            
        } catch (error) {
            console.error('❌ Failed to initialize blockchain connection:', error.message);
            throw error;
        }
    }
    
    /**
     * Add a new product to the blockchain
     */
    async addProduct(productData) {
        try {
            if (!this.contract) {
                await this.initialize();
            }
            
            const { productId, productName, farmerName, farmerLocation, cropType, harvestDate } = productData;
            
            console.log(`🔄 Adding product ${productId} to blockchain...`);
            
            const tx = await this.contract.addProduct(
                productId,
                productName,
                farmerName,
                farmerLocation,
                cropType,
                Math.floor(new Date(harvestDate).getTime() / 1000), // Convert to Unix timestamp
                {
                    gasLimit: 500000,
                    gasPrice: ethers.utils.parseUnits('30', 'gwei')
                }
            );
            
            console.log('⏳ Waiting for transaction confirmation...');
            const receipt = await tx.wait();
            
            console.log('✅ Product added to blockchain');
            console.log('🔍 Transaction hash:', receipt.transactionHash);
            
            return {
                success: true,
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed.toString()
            };
            
        } catch (error) {
            console.error('❌ Failed to add product to blockchain:', error.message);
            throw error;
        }
    }
    
    /**
     * Update a stage for a product on the blockchain
     */
    async updateStage(productId, stageData) {
        try {
            if (!this.contract) {
                await this.initialize();
            }
            
            const { stageName, location, status, notes } = stageData;
            
            console.log(`🔄 Updating stage ${stageName} for product ${productId}...`);
            
            const tx = await this.contract.updateStage(
                productId,
                stageName,
                location,
                status || 'Completed',
                notes || '',
                {
                    gasLimit: 300000,
                    gasPrice: ethers.utils.parseUnits('30', 'gwei')
                }
            );
            
            console.log('⏳ Waiting for transaction confirmation...');
            const receipt = await tx.wait();
            
            console.log('✅ Stage updated on blockchain');
            console.log('🔍 Transaction hash:', receipt.transactionHash);
            
            return {
                success: true,
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed.toString()
            };
            
        } catch (error) {
            console.error('❌ Failed to update stage on blockchain:', error.message);
            throw error;
        }
    }
    
    /**
     * Get product details from the blockchain
     */
    async getProduct(productId) {
        try {
            if (!this.contract) {
                await this.initialize();
            }
            
            console.log(`🔍 Fetching product ${productId} from blockchain...`);
            
            // Check if product exists
            const exists = await this.contract.productExists(productId);
            if (!exists) {
                throw new Error('Product not found on blockchain');
            }
            
            // Get product details
            const productDetails = await this.contract.getProduct(productId);
            const stages = await this.contract.getProductStages(productId);
            
            const product = {
                productId,
                productName: productDetails[0],
                farmerName: productDetails[1],
                farmerLocation: productDetails[2],
                cropType: productDetails[3],
                harvestDate: new Date(productDetails[4] * 1000).toISOString(), // Convert from Unix timestamp
                stageCount: productDetails[5].toNumber(),
                stages: stages.map(stage => ({
                    stageName: stage.stageName,
                    location: stage.location,
                    timestamp: new Date(stage.timestamp * 1000).toISOString(),
                    actor: stage.actor,
                    status: stage.status,
                    notes: stage.notes
                }))
            };
            
            console.log('✅ Product retrieved from blockchain');
            return product;
            
        } catch (error) {
            console.error('❌ Failed to get product from blockchain:', error.message);
            throw error;
        }
    }
    
    /**
     * Get all stages for a product from the blockchain
     */
    async getProductStages(productId) {
        try {
            if (!this.contract) {
                await this.initialize();
            }
            
            console.log(`🔍 Fetching stages for product ${productId}...`);
            
            const stages = await this.contract.getProductStages(productId);
            
            const formattedStages = stages.map((stage, index) => ({
                index,
                stageName: stage.stageName,
                location: stage.location,
                timestamp: new Date(stage.timestamp * 1000).toISOString(),
                actor: stage.actor,
                status: stage.status,
                notes: stage.notes
            }));
            
            console.log('✅ Stages retrieved from blockchain');
            return formattedStages;
            
        } catch (error) {
            console.error('❌ Failed to get stages from blockchain:', error.message);
            throw error;
        }
    }
    
    /**
     * Verify a transaction on the blockchain
     */
    async verifyTransaction(transactionHash) {
        try {
            if (!this.provider) {
                await this.initialize();
            }
            
            console.log(`🔍 Verifying transaction ${transactionHash}...`);
            
            const receipt = await this.provider.getTransactionReceipt(transactionHash);
            
            if (!receipt) {
                throw new Error('Transaction not found');
            }
            
            const verification = {
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                blockHash: receipt.blockHash,
                status: receipt.status === 1 ? 'Success' : 'Failed',
                gasUsed: receipt.gasUsed.toString(),
                contractAddress: receipt.to,
                confirmed: receipt.confirmations > 0
            };
            
            console.log('✅ Transaction verified');
            return verification;
            
        } catch (error) {
            console.error('❌ Failed to verify transaction:', error.message);
            throw error;
        }
    }
}

module.exports = SupplyChainInteraction;