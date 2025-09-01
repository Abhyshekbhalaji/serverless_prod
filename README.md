
// ==========================================
// USAGE EXAMPLES:
// ==========================================
/*


ALL REQUESTS USE 'operation' PARAMETER:

1. Create Product:
 POST https://your-domain/server/ProductsAPI/execute?operation=create&name=<your name>&price =<your price>

2. Get Product:
 GET "https://your-domain/server/ProductsAPI/execute?operation=get&id=ROWID_HERE"

3. Update Product:
 POST https://your-domain/server/ProductsAPI/execute?operation=update&name=<your name>&price =<your price>

4. Delete Product:
 GET "https://your-domain/server/ProductsAPI/execute?operation=delete&id=ROWID_HERE"

5. List Products:
GET "https://your-domain/server/ProductsAPI/execute?operation=list&page=1&limit=10"

6. Search Products:
GET "https://your-domain/server/ProductsAPI/execute?operation=search&search=laptop&limit=5"

POSTMAN EXAMPLES:
- URL:(https://deploycrm-60046159312.development.catalystserverless.in/server/deploy_crm_function/execute)
- Method: GET or POST
- Parameters/Body: Always include "operation" parameter
*/
