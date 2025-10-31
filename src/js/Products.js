/* fonctions d'afffichage des produits */
import getData from './fetch.js';

export default function productsList(data){
    const produits = (data.products)? data.products : [data];
    /*console.log(produits);*/
    document.getElementById('productList').innerHTML = '';
    
    produits.map(produit=>{
        /*console.log(produit.id, produit.title, produit.category, produit.description, produit.price);*/
        const div = document.createElement('div');
        if(data.products){
            div.classList.add('col-12', 'col-lg-4', 'col-md-3', 'mb-2');
        }else{
            div.classList.add('col-12', 'mb-2');
        }
        const article = document.createElement('article');
        article.classList.add('card', 'p-2');
        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        h2.append(document.createTextNode(produit.title));
        const category = document.createElement('p');
        category.append(document.createTextNode(produit.category));
        const description  = document.createElement('p');
        description.append(document.createTextNode(produit.description));
        const footer = document.createElement('footer');
        const link = document.createElement('a');
        link.classList.add('productLink');
        link.dataset.idproduct = produit.id;
        link.append(document.createTextNode(`${produit.price} €`));
        link.addEventListener('click', function(event){
            event.preventDefault();
            console.log(link.dataset.idproduct);
            getData({
                requestType: 'id',
                id:link.dataset.idproduct
            });
        });
        div.append(article);
        header.append(h2);
        article.append(header);
        article.append(category);
        article.append(description)
        article.append(footer);
        footer.append(link);
        document.getElementById('productList').appendChild(div);
    });
    //document.getElementById('productList').innerHTML = listProducts;
}