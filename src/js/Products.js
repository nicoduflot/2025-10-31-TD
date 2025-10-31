/* fonctions d'afffichage des produits */

export default function productsList(data){
    const produits = data.products;
    let listProducts = '';
    /*console.log(produits);*/
    
    produits.map(produit=>{
        /*console.log(produit.id, produit.title, produit.category, produit.description, produit.price);*/
        let productCard = `
        <div class="col-12 col-lg-4 col-md-3 mb-2">
            <article class="card p-2">
                <header>
                    <h2>${produit.title}</h2>
                </header>
                <p>
                    ${produit.category}
                </p>
                <p>
                    ${produit.description}
                </p>
                <footer>
                    <a class="productLink" href="#" data-idproduct="${produit.id}">${produit.price} €</a>
                </footer>
            </article>
        </div>
        `;
        listProducts = listProducts + productCard;
    });
    document.getElementById('productList').innerHTML = listProducts;
}