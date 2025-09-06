const { ethers } = require('ethers');
const fs = require('fs');
const solc = require('solc');

// Compile the smart contract
function compileContract() {
    const contractSource = fs.readFileSync('./SupplyChain.sol', 'utf8');
    
    const input = {
        language: 'Solidity',
        sources: {
            'SupplyChain.sol': {
                content: contractSource,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode'],
                },
            },
        },
    };
    
    const compiled = solc.compile(JSON.stringify(input));
    const compiledContract = JSON.parse(compiled);
    
    if (compiledContract.errors) {
        compiledContract.errors.forEach(error => {
            console.error('Compilation error:', error.formattedMessage);
        });
        throw new Error('Contract compilation failed');
    }
    
    const contract = compiledContract.contracts['SupplyChain.sol']['SupplyChain'];
    return {
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object
    };
}

// Deploy the contract
async function deployContract() {
    try {
        // Load environment variables
        const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-mumbai.maticvigil.com/';
        const PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY;
        
        if (!PRIVATE_KEY) {
            throw new Error('POLYGON_PRIVATE_KEY environment variable is required');
        }
        
        console.log('🔧 Compiling contract...');
        const { abi, bytecode } = compileContract();
        
        console.log('🌐 Connecting to Polygon Mumbai...');
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        
        console.log('📋 Deployer address:', wallet.address);
        
        // Check balance
        const balance = await wallet.getBalance();
        console.log('💰 Deployer balance:', ethers.utils.formatEther(balance), 'MATIC');
        
        if (balance.eq(0)) {
            console.log('⚠️  Warning: Deployer has no MATIC. Get testnet MATIC from https://faucet.polygon.technology/');
        }
        
        console.log('🚀 Deploying SupplyChain contract...');
        const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
        
        // Deploy with gas limit
        const contract = await contractFactory.deploy({
            gasLimit: 3000000,
            gasPrice: ethers.utils.parseUnits('30', 'gwei')
        });
        
        console.log('⏳ Waiting for deployment confirmation...');
        await contract.deployed();
        
        console.log('✅ Contract deployed successfully!');
        console.log('📍 Contract address:', contract.address);
        console.log('🔍 Transaction hash:', contract.deployTransaction.hash);
        
        // Save deployment info
        const deploymentInfo = {
            contractAddress: contract.address,
            transactionHash: contract.deployTransaction.hash,
            network: 'polygon-mumbai',
            deployer: wallet.address,
            timestamp: new Date().toISOString(),
            abi: abi
        };
        
        fs.writeFileSync('./deployment.json', JSON.stringify(deploymentInfo, null, 2));
        console.log('💾 Deployment info saved to deployment.json');
        
        return deploymentInfo;
        
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        throw error;
    }
}

// Run deployment if this file is executed directly
if (require.main === module) {
    deployContract()
        .then(() => {
            console.log('🎉 Deployment completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Deployment failed:', error);
            process.exit(1);
        });
}

module.exports = { deployContract, compileContract };