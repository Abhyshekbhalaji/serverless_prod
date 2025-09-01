function createProduct(catalystApp, basicIO, context) {
    const productData = {
        product_name: basicIO.getArgument("name"),
        price: basicIO.getArgument("price") ? parseFloat(basicIO.getArgument("price")) : 0,
    };

    if (!productData.product_name) {
        basicIO.write(JSON.stringify({ 
            success: false,
            error: "Product name is required" 
        }));
        context.close();
        return;
    }

    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");
    
    productsTable.insertRow(productData)
        .then((insertedRow) => {
            context.log("Product created: " + JSON.stringify(insertedRow));
            basicIO.write(JSON.stringify({
                success: true,
                message: "Product created successfully",
                data: insertedRow
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error creating product: " + JSON.stringify(err));
            basicIO.write(JSON.stringify({ 
                success: false,
                error: err.toString() 
            }));
            context.close();
        });
}
module.exports = createProduct;
