 function listProducts(catalystApp, basicIO, context) {
    const page = basicIO.getArgument("page") ? parseInt(basicIO.getArgument("page")) : 1;
    const limit = basicIO.getArgument("limit") ? parseInt(basicIO.getArgument("limit")) : 50;
    const category = basicIO.getArgument("category");
    const status = basicIO.getArgument("status") || "active";

    const datastore = catalystApp.datastore();
    const productsTable = datastore.table("products");
    
    productsTable.getAllRows()
        .then((rows) => {
            let filteredRows = rows;
            
            // Apply filters
            if (category) {
                filteredRows = filteredRows.filter(row => 
                    (row.category || '').toLowerCase() === category.toLowerCase()
                );
            }
            
            if (status) {
                filteredRows = filteredRows.filter(row => 
                    (row.status || 'active').toLowerCase() === status.toLowerCase()
                );
            }
            
            // Pagination
            const totalCount = filteredRows.length;
            const startIndex = (page - 1) * limit;
            const paginatedRows = filteredRows.slice(startIndex, startIndex + limit);
            
            context.log("Listed " + paginatedRows.length + " products");
            
            basicIO.write(JSON.stringify({
                success: true,
                data: paginatedRows,
                pagination: {
                    page: page,
                    limit: limit,
                    count: paginatedRows.length,
                    totalCount: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                }
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
module.exports=listProducts