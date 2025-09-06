const fs = require('fs');
const path = require('path');

/**
 * Updates the contract address in all Supabase Edge Functions
 * Run this script after deploying the contract
 */
function updateContractAddresses() {
    try {
        // Read deployment info
        const deploymentPath = './deployment.json';
        if (!fs.existsSync(deploymentPath)) {
            throw new Error('deployment.json not found. Please deploy the contract first.');
        }
        
        const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
        const contractAddress = deployment.contractAddress;
        
        console.log(`📍 Updating contract address to: ${contractAddress}`);
        
        // List of Edge Function files to update
        const edgeFunctions = [
            '../supabase/functions/blockchain-add-product/index.ts',
            '../supabase/functions/blockchain-update-stage/index.ts',
            '../supabase/functions/blockchain-get-product/index.ts',
            '../supabase/functions/blockchain-verify/index.ts'
        ];
        
        let updatedFiles = 0;
        
        edgeFunctions.forEach(filePath => {
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Replace placeholder contract address
                const updatedContent = content.replace(
                    /const CONTRACT_ADDRESS = "0x\.\.\.";.*$/gm,
                    `const CONTRACT_ADDRESS = "${contractAddress}";`
                );
                
                if (content !== updatedContent) {
                    fs.writeFileSync(filePath, updatedContent);
                    console.log(`✅ Updated: ${path.basename(filePath)}`);
                    updatedFiles++;
                } else {
                    console.log(`⚠️  No changes needed: ${path.basename(filePath)}`);
                }
            } else {
                console.log(`❌ File not found: ${filePath}`);
            }
        });
        
        console.log(`\n🎉 Contract address updated in ${updatedFiles} files!`);
        console.log(`📍 Contract Address: ${contractAddress}`);
        console.log(`🔍 View on PolygonScan: https://mumbai.polygonscan.com/address/${contractAddress}`);
        
    } catch (error) {
        console.error('❌ Failed to update contract addresses:', error.message);
        throw error;
    }
}

// Run if this file is executed directly
if (require.main === module) {
    updateContractAddresses();
}

module.exports = { updateContractAddresses };