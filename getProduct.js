 function getProduct(catalystApp, basicIO, context) {
    const productId = basicIO.getArgument("id");
    
    if (!productId) {
        basicIO.write(JSON.stringify({ 
            success: false,
            error: "Product ID is required" 
        }));
        context.close();
        return;
    }

    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");
    
    productsTable.getRow(productId)
        .then((row) => {
            context.log("Retrieved product: " + JSON.stringify(row));
            basicIO.write(JSON.stringify({
                success: true,
                data: row
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error retrieving product: " + JSON.stringify(err));
            if (err.code === "TABLE_ROW_NOT_FOUND" || err.code === "INVALID_ROW_ID") {
                basicIO.write(JSON.stringify({ 
                    success: false,
                    error: "Product not found" 
                }));
            } else {
                basicIO.write(JSON.stringify({ 
                    success: false,
                    error: err.toString() 
                }));
            }
            context.close();
        });
}
module.exports = getProduct;