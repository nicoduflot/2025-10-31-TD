export const templates = {
    product: null,
    miniProduct: null,
    pagination: null
};

export async function loadTemplates() {
    const [productResponse, miniProductResponse, paginationResponse] = await Promise.all([
        fetch('./src/template/productTemplate.html'),
        fetch('./src/template/miniProductTemplate.html'),
        fetch('./src/template/paginationTemplate.html'),
    ]);
    
    const [productHTML, miniProductHTML, paginationHTML] = await Promise.all([
        productResponse.text(),
        miniProductResponse.text(),
        paginationResponse.text(),
    ]);
    
    const parser = new DOMParser();
    
    const productDoc = parser.parseFromString(productHTML, 'text/html');
    templates.product = productDoc.querySelector('template');
    
    const miniProductDoc = parser.parseFromString(miniProductHTML, 'text/html');
    templates.miniProduct = miniProductDoc.querySelector('template');

    const paginationDoc = parser.parseFromString(paginationHTML, 'text/html');
    templates.pagination = paginationDoc.querySelector('template');
}