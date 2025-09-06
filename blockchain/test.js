const SupplyChainInteraction = require('./interact.js');

async function testBlockchainIntegration() {
    console.log('🧪 Starting blockchain integration test...\n');
    
    const blockchain = new SupplyChainInteraction();
    
    try {
        // Initialize connection
        await blockchain.initialize();
        console.log('✅ Blockchain connection initialized\n');
        
        // Test product data
        const testProduct = {
            productId: 'TEST001',
            productName: 'Organic Test Wheat',
            farmerName: 'Test Farmer',
            farmerLocation: 'Test Farm, Mumbai',
            cropType: 'Wheat',
            harvestDate: '2024-12-15'
        };
        
        console.log('📦 Adding test product...');
        const addResult = await blockchain.addProduct(testProduct);
        console.log('✅ Product added:', addResult.transactionHash, '\n');
        
        // Test stage updates
        const stages = [
            {
                stageName: 'FPO',
                location: 'Quality Control Center',
                status: 'Completed',
                notes: 'Quality verification passed'
            },
            {
                stageName: 'Transport',
                location: 'Highway Transport',
                status: 'In Transit',
                notes: 'En route to distribution center'
            },
            {
                stageName: 'Mandi',
                location: 'Central Mandi',
                status: 'Completed',
                notes: 'Wholesale distribution completed'
            }
        ];
        
        for (const stage of stages) {
            console.log(`🔄 Adding stage: ${stage.stageName}`);
            const stageResult = await blockchain.updateStage(testProduct.productId, stage);
            console.log('✅ Stage added:', stageResult.transactionHash);
        }
        
        console.log('\n🔍 Retrieving product from blockchain...');
        const retrievedProduct = await blockchain.getProduct(testProduct.productId);
        console.log('✅ Product retrieved:');
        console.log(`   Name: ${retrievedProduct.productName}`);
        console.log(`   Farmer: ${retrievedProduct.farmerName}`);
        console.log(`   Stages: ${retrievedProduct.stages.length}`);
        
        console.log('\n📋 Product stages:');
        retrievedProduct.stages.forEach((stage, index) => {
            console.log(`   ${index + 1}. ${stage.stageName} - ${stage.status} (${stage.location})`);
        });
        
        console.log('\n🎉 Blockchain integration test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testBlockchainIntegration()
        .then(() => {
            console.log('\n✨ All tests passed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = { testBlockchainIntegration };