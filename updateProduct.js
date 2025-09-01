function updateProduct(catalystApp, basicIO, context) {
    const productId = basicIO.getArgument("id");
    
    if (!productId) {
        basicIO.write(JSON.stringify({ 
            success: false,
            error: "Product ID is required" 
        }));
        context.close();
        return;
    }

    const updateData = { ROWID: productId };
    
    // Add fields to update only if provided
    const name = basicIO.getArgument("name");
    const price = basicIO.getArgument("price");


    if (name) updateData.product_name = name;

    if (price) updateData.price = parseFloat(price);
    

    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");
    
    productsTable.updateRow(updateData)
        .then((updatedRow) => {
            context.log("Product updated: " + JSON.stringify(updatedRow));
            basicIO.write(JSON.stringify({
                success: true,
                message: "Product updated successfully",
                data: updatedRow
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error updating product: " + JSON.stringify(err));
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
module.exports=updateProduct;