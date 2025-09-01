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
    

    const operation = basicIO.getArgument("operation") || 'get';
    

    context.log("Context keys: " + Object.keys(context).join(', '));
    context.log("Operation: " + operation);
    

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


