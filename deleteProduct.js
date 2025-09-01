 function deleteProduct(catalystApp, basicIO, context) {
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
    
    productsTable.deleteRow(productId)
        .then(() => {
            context.log("Product deleted: " + productId);
            basicIO.write(JSON.stringify({
                success: true,
                message: "Product deleted successfully"
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error deleting product: " + JSON.stringify(err));
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
module.exports = deleteProduct;