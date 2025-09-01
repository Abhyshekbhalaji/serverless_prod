function listProducts(catalystApp, basicIO, context) {
    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");

    productsTable.getAllRows()
        .then((rows) => {
            basicIO.write(JSON.stringify({
                success: true,
                data: rows
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error listing products: " + JSON.stringify(err));
            basicIO.write(JSON.stringify({
                success: false,
                error: err.toString()
            }));
            context.close();
        });
}

module.exports = listProducts;
