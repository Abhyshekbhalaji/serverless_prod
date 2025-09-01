function searchProducts(catalystApp, basicIO, context) {
    const searchTerm = basicIO.getArgument("search");
    const limit = basicIO.getArgument("limit") ? parseInt(basicIO.getArgument("limit")) : 20;
    
    if (!searchTerm || searchTerm.trim() === '') {
        basicIO.write(JSON.stringify({ 
            success: false,
            error: "Search term is required" 
        }));
        context.close();
        return;
    }

    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");
    
    productsTable.getAllRows()
        .then((rows) => {
            const search = searchTerm.toLowerCase().trim();
            
            const filteredRows = rows.filter(row => {
                const name = (row.product_name || '').toLowerCase();
                const price = (row.price || '').toLowerCase();
            
                
                return name.includes(search) || 
                       price.includes(search);
            });
            
            const limitedResults = filteredRows.slice(0, limit);
            
            context.log("Search found " + limitedResults.length + " products");
            
            basicIO.write(JSON.stringify({
                success: true,
                data: limitedResults,
                searchTerm: searchTerm,
                count: limitedResults.length,
                totalMatches: filteredRows.length
            }));
            context.close();
        })
        .catch((err) => {
            context.log("Error searching: " + JSON.stringify(err));
            basicIO.write(JSON.stringify({ 
                success: false,
                error: err.toString()
            }));
            context.close();
        });
}
module.exports=searchProducts;