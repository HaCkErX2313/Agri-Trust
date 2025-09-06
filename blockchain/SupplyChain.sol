// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
    
    struct Stage {
        string stageName;
        string location;
        uint256 timestamp;
        address actor;
        string status;
        string notes;
    }
    
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
    
    mapping(string => Product) public products;
    mapping(string => Stage[]) public productStages;
    
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
    
    modifier productExists(string memory _productId) {
        require(products[_productId].exists, "Product does not exist");
        _;
    }
    
    /**
     * @dev Add a new product to the supply chain
     */
    function addProduct(
        string memory _productId,
        string memory _productName,
        string memory _farmerName,
        string memory _farmerLocation,
        string memory _cropType,
        uint256 _harvestDate
    ) public {
        require(!products[_productId].exists, "Product already exists");
        
        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            farmerName: _farmerName,
            farmerLocation: _farmerLocation,
            cropType: _cropType,
            harvestDate: _harvestDate,
            exists: true,
            stageCount: 0
        });
        
        emit ProductAdded(_productId, _productName, _farmerName, msg.sender);
    }
    
    /**
     * @dev Update a stage for a product
     */
    function updateStage(
        string memory _productId,
        string memory _stageName,
        string memory _location,
        string memory _status,
        string memory _notes
    ) public productExists(_productId) {
        Stage memory newStage = Stage({
            stageName: _stageName,
            location: _location,
            timestamp: block.timestamp,
            actor: msg.sender,
            status: _status,
            notes: _notes
        });
        
        productStages[_productId].push(newStage);
        products[_productId].stageCount++;
        
        emit StageUpdated(_productId, _stageName, _location, msg.sender);
    }
    
    /**
     * @dev Get product details
     */
    function getProduct(string memory _productId) 
        public 
        view 
        productExists(_productId) 
        returns (
            string memory productName,
            string memory farmerName,
            string memory farmerLocation,
            string memory cropType,
            uint256 harvestDate,
            uint256 stageCount
        ) 
    {
        Product memory product = products[_productId];
        return (
            product.productName,
            product.farmerName,
            product.farmerLocation,
            product.cropType,
            product.harvestDate,
            product.stageCount
        );
    }
    
    /**
     * @dev Get all stages for a product
     */
    function getProductStages(string memory _productId) 
        public 
        view 
        productExists(_productId) 
        returns (Stage[] memory) 
    {
        return productStages[_productId];
    }
    
    /**
     * @dev Get a specific stage for a product
     */
    function getStage(string memory _productId, uint256 _stageIndex) 
        public 
        view 
        productExists(_productId) 
        returns (
            string memory stageName,
            string memory location,
            uint256 timestamp,
            address actor,
            string memory status,
            string memory notes
        ) 
    {
        require(_stageIndex < productStages[_productId].length, "Stage index out of bounds");
        
        Stage memory stage = productStages[_productId][_stageIndex];
        return (
            stage.stageName,
            stage.location,
            stage.timestamp,
            stage.actor,
            stage.status,
            stage.notes
        );
    }
    
    /**
     * @dev Check if a product exists
     */
    function productExists(string memory _productId) public view returns (bool) {
        return products[_productId].exists;
    }
}