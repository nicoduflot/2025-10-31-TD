export const templates = {
    product: null,
    miniProduct: null
};

export async function loadTemplates() {
    const [productResponse, miniProductResponse] = await Promise.all([
        fetch('./src/template/productTemplate.html'),
        fetch('./src/template/miniProductTemplate.html')
    ]);
    
    const [productHTML, miniProductHTML] = await Promise.all([
        productResponse.text(),
        miniProductResponse.text()
    ]);
    
    const parser = new DOMParser();
    
    const productDoc = parser.parseFromString(productHTML, 'text/html');
    templates.product = productDoc.querySelector('template');
    
    const miniProductDoc = parser.parseFromString(miniProductHTML, 'text/html');
    templates.miniProduct = miniProductDoc.querySelector('template');
}