/*
Tous les produits
https://dummyjson.com/products
Produit par id
https://dummyjson.com/products/1

Affichage limité de produits
https://dummyjson.com/products?limit=10&skip=10&select=title,price

You can pass limit and skip params to limit and skip the results for pagination, and use limit=0 to get all items.
You can pass select as query params with comma-separated values to select specific data

Recherche par mot clef
https://dummyjson.com/products/search?q=phone
Liste des catégories
https://dummyjson.com/products/categories
produit par catégorie
https://dummyjson.com/products/category/smartphones
*/
import productsList, { categories } from "./Products.js";

const options = {
    requestType: '',
    id: '',
    pBCategory: '',
    keyword: '',
    limit: '',
    skip: '',
};

export default async function getData(options = { requestType: '' }) {
    //let baseUrl = 'https://dummyjson.com/products';
    let baseUrl = 'http://localhost:8888/products';
    switch (options.requestType) {
        case 'id':
            baseUrl = `${baseUrl}/${options.id}`;
            break;
        case 'categories':
            baseUrl = `${baseUrl}/categories`;
            break;
        case 'pBCategory':
            baseUrl = `${baseUrl}/category/${options.pBCategory}`;
            break;
        default:
    }
    
    if(options.skip && !options.limit){
        baseUrl = baseUrl + `?skip=${options.skip}`;
    }
    if(options.skip && options.limit){
        baseUrl = baseUrl + `?skip=${options.skip}&limit=${options.limit}`;
    }
    if(!options.skip && options.limit){
        baseUrl = baseUrl + `?limit=${options.limit}`;
    }
    const data = await (fetchUrl(baseUrl, options));
    return data;
}

function fetchUrl(url, options) {
    const requestType = options.requestType;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            switch (requestType) {
                case 'id':
                    productsList(data, options);
                    break;
                case 'categories':
                    categories(data);
                    break;
                case 'pBCategory':
                    productsList(data, options);
                    break;
                default:
                    productsList(data, options);
            }
        })
        .catch(error => console.error(error.message))
        .finally(() => console.log('Requête terminée'));
}