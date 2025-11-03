/* fonctions d'afffichage des produits */
import getData from './fetch.js';
import { templates } from './templates.js';

export default function productsList(data, options = {}) {
    const produits = (data.products) ? data.products : [data];
    const total = (data.products) ? data.total : 1;
    const limit = (data.products) ? 12 : 1;
    const skip = (data.products) ? data.skip : 0;
    document.getElementById('productList').innerHTML = '';

    const retour = document.createElement('a');
    retour.append(document.createTextNode('Tous les produits'));
    retour.classList.add('link');
    retour.setAttribute('href', '#');
    retour.addEventListener('click', function (event) {
        event.preventDefault();
        getData({ requestType: '', limit: 12 });
        const links = document.querySelectorAll('#categories a');
        for(let link of links){
            link.classList.remove('active');
        }
    });

    /* on récupère le template selon le nombre de produits : la fiche un seul produit pour un produit unique, la fiche mini produit pour une liste */
    const templateElement = (total === 1) ? templates.product : templates.miniProduct;
    /* on intègre les données dans le template selectionné dans la boucle */

    document.getElementById('productList').appendChild(retour);
    const divPagination = document.createElement('div');
    divPagination.appendChild(pagination(total, limit, skip, options));
    divPagination.classList.add('overflow-x-auto');
    document.getElementById('productList').appendChild(divPagination);
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    produits.map(produit => {
        const productTemplate = document.importNode(templateElement.content, true);
        const title = productTemplate.querySelector('#productTitle');
        const category = productTemplate.querySelector('a#productCategory');
        const productDescription = productTemplate.querySelector('#productDescription');
        const productThumbnail = productTemplate.querySelector('#productThumbnail');
        const productPrice = productTemplate.querySelector('#productPrice');
        title.append(document.createTextNode(produit.title));
        category.append(document.createTextNode(produit.category));
        category.addEventListener('click', event => {
            event.preventDefault();
            getData({ requestType: 'pBCategory', pBCategory: produit.category, limit: options.limit });
        });
        productDescription.append(document.createTextNode(produit.description));
        productThumbnail.setAttribute('src', produit.thumbnail);
        productPrice.append(document.createTextNode(`${produit.price} €`));
        productPrice.dataset.idproduct = produit.id;
        productPrice.addEventListener('click', function (event) {
            event.preventDefault();
            getData({
                requestType: 'id',
                id: productPrice.dataset.idproduct
            });
        });

        document.getElementById('productList').appendChild(productTemplate);
    });

    const divPaginationBottom = document.createElement('div');
    divPaginationBottom.appendChild(pagination(total, limit, skip, options));
    divPaginationBottom.classList.add('overflow-x-auto');
    document.getElementById('productList').appendChild(divPaginationBottom);

    const retourBottom = document.createElement('a');
    retourBottom.append(document.createTextNode('Tous les produits'));
    retourBottom.classList.add('link');
    retourBottom.setAttribute('href', '#');
    retourBottom.addEventListener('click', function (event) {
        event.preventDefault();
        getData({ requestType: '', limit: 12 });
        const links = document.querySelectorAll('#categories a');
        for(let link of links){
            link.classList.remove('active');
        }
    });
    document.getElementById('productList').appendChild(retourBottom);
}

export function categories(categories) {
    const template = templates.categorie;
    
    document.getElementById('categories').innerHTML = '';
    categories.map(function (categorie) {
        const templateCat = document.importNode(template.content, true);
        const li = templateCat.querySelector('li');
        //li.classList.add('nav-item');
        const a = templateCat.querySelector('a');
        //a.classList.add('nav-link');
        a.append(document.createTextNode(`${categorie.name}`));
        a.dataset.catSlug = categorie.slug;
        //a.setAttribute('href', '#');
        a.addEventListener('click', function (event) {
            event.preventDefault();
            getData({ requestType: 'pBCategory', pBCategory: a.dataset.catSlug, limit: 12 });
            const links = document.querySelectorAll('#categories a');
            for(let link of links){
                link.classList.remove('active');
            }
            this.classList.add('active');
        });
        li.append(a);
        document.getElementById('categories').appendChild(li);
    });
}

function pagination(total, limit = 12, skip, options = {}) {
    /* récupération du template de la pagination */
    const template = templates.pagination;

    let pages = (Math.ceil(total / limit));
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 0; i < pages; i = i + 1) {
        const templatePgn = document.importNode(template.content, true);
        const li = templatePgn.querySelector('#liPagintation');
        const a = templatePgn.querySelector('#linkPagination');
        a.append(document.createTextNode(
            `${i + 1}`
        ));
        a.dataset.skip = i * limit;
        a.dataset.category = '';

        if ((a.dataset.skip === options.skip) || (undefined === options.skip) && a.dataset.skip == 0) {
            a.classList.add('active');
        }
        a.addEventListener('click', function (event) {
            event.preventDefault();
            options.skip = a.dataset.skip;
            getData(options);
        });
        ul.append(templatePgn);
    }
    return ul;
}

/*
on n'utilise plus ceci, on va utiliser des templates html <template>
produits.map(produit => {
    const div = document.createElement('div');
    if (data.products) {
        div.classList.add('col-12', 'col-lg-4', 'col-md-3', 'mb-2');
    } else {
        div.classList.add('col-12', 'mb-2');
    }
    const article = document.createElement('article');
    article.classList.add('card', 'p-2');
    const header = document.createElement('header');
    const h2 = document.createElement('h2');
    h2.classList.add('text-truncate');
    h2.append(document.createTextNode(produit.title));
    const category = document.createElement('a');
    category.setAttribute('href', '#');
    category.append(document.createTextNode(produit.category));
    category.addEventListener('click', event => {
        event.preventDefault();
        getData({ requestType: 'pBCategory', pBCategory: produit.category, limit: options.limit });
    });
    const thumbnail = document.createElement('img');
    thumbnail.classList.add('img-fluid', 'img-thumbnail');
    thumbnail.setAttribute('src', produit.thumbnail);
    thumbnail.setAttribute('style', 'max-height: 200px; width:auto;margin-left:auto;margin-right:auto;');
    const description = document.createElement('p');
    description.classList.add('overflow-y');
    description.setAttribute('style', 'height:200px');
    description.append(document.createTextNode(produit.description));
    const footer = document.createElement('footer');
    const link = document.createElement('a');
    link.classList.add('productLink');
    link.setAttribute('href', '#');
    link.dataset.idproduct = produit.id;
    link.append(document.createTextNode(`${produit.price} €`));
    link.addEventListener('click', function (event) {
        event.preventDefault();
        getData({
            requestType: 'id',
            id: link.dataset.idproduct
        });
    });
    div.append(article);
    header.append(h2);
    article.append(header);
    article.append(category);
    article.append(description)
    article.append(thumbnail);
    article.append(footer);
    footer.append(link);
    document.getElementById('productList').appendChild(div);
});
*/