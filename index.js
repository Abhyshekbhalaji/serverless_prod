const catalyst = require("zcatalyst-sdk-node");
const createProduct=require('./createProduct');
const updateProduct=require('./updateProduct');
const deleteProduct=require('./deleteProduct');
const listProducts=require('./listProducts');
const searchProducts=require('./searchProduct');

const getProduct=require('./getProduct');

module.exports = (context, basicIO) => {
    const catalystApp = catalyst.initialize(context);
    console.log(context);
    
    // Get operation type from argument (required parameter)
    const operation = basicIO.getArgument("operation") || 'get';
    
    // Debug: Log the context to see available properties
    context.log("Context keys: " + Object.keys(context).join(', '));
    context.log("Operation: " + operation);
    
    // Route to appropriate operation based on 'operation' parameter
    if (operation === 'create') {
        createProduct(catalystApp, basicIO, context);
    } else if (operation === 'update') {
        updateProduct(catalystApp, basicIO, context);
    } else if (operation === 'delete') {
        deleteProduct(catalystApp, basicIO, context);
    } else if (operation === 'list') {
        listProducts(catalystApp, basicIO, context);
    } else if (operation === 'search') {
        searchProducts(catalystApp, basicIO, context);
	}else if (operation === 'get') {
        getProduct(catalystApp, basicIO, context);
    } else {
        // Invalid operation
        basicIO.write(JSON.stringify({
            success: false,
            error: "Invalid operation. Use: create, get, update, delete, list, search",
            availableOperations: ['create', 'get', 'update', 'delete', 'list', 'search',]
        }));
        context.close();
    }
};

// ==========================================
// CREATE PRODUCT
// ==========================================

// ==========================================
// GET PRODUCT
// ==========================================


// ==========================================
// UPDATE PRODUCT
// ==========================================


// ==========================================
// DELETE PRODUCT
// ==========================================


// ==========================================
// LIST PRODUCTS
// ==========================================

// ==========================================
// SEARCH PRODUCTS
// ==========================================

// ==========================================
// GET PRODUCTS BY CATEGORY
// ==========================================

