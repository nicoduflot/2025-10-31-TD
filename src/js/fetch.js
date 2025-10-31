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

const options = {
    requestType: '',
    id: '',
    pBCategory: '',
    keyword: '',
    limit: '',
    skip: '',
};

export default async function getData(options = {requestType:''}){
    let baseUrl = 'https://dummyjson.com/products';
    switch(options.requestType){
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
    const data = await(fetchUrl(baseUrl));
    return data;
}

function fetchUrl(url){
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        return data
    })
    .catch(error=>console.error(error.message))
    .finally(()=>console.log('Requête terminée'));
}