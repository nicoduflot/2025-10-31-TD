/* fonctions d'afffichage des produits */
import getData from './fetch.js';

export default function productsList(data, options = {}) {
    const produits = (data.products) ? data.products : [data];
    const total = (data.products) ? data.total : 1;
    const limit = (data.products) ? 12 : 1;
    const skip = (data.products) ? data.skip : 0;
    document.getElementById('productList').innerHTML = '';
    document.getElementById('productList').appendChild(pagination(total, limit, skip, options));
    const retour = document.createElement('a');
    retour.append(document.createTextNode('Tous les produits'));
    retour.classList.add('link');
    retour.setAttribute('href', '#');
    retour.addEventListener('click', function (event) {
        event.preventDefault();
        getData({ requestType: '', limit: 12 });
    });
    document.getElementById('productList').appendChild(retour);
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
        h2.append(document.createTextNode(produit.title));
        const category = document.createElement('a');
        category.setAttribute('href', '#');
        category.append(document.createTextNode(produit.category));
        category.addEventListener('click', event => {
            event.preventDefault();
            getData({ requestType: 'pBCategory', pBCategory: produit.category, limit: options.limit });
        });
        const description = document.createElement('p');
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
        article.append(footer);
        footer.append(link);
        document.getElementById('productList').appendChild(div);
    });
    const retourBottom = document.createElement('a');
    retourBottom.append(document.createTextNode('Tous les produits'));
    retourBottom.classList.add('link');
    retourBottom.setAttribute('href', '#');
    retourBottom.addEventListener('click', function (event) {
        event.preventDefault();
        getData({ requestType: '', limit: 12 });
    });
    document.getElementById('productList').appendChild(retourBottom);
}

export function categories(categories) {
    document.getElementById('categories').innerHTML = '';
    categories.map(function (categorie) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.append(document.createTextNode(`${categorie.name}`));
        a.dataset.catSlug = categorie.slug;
        a.setAttribute('href', '#');
        a.addEventListener('click', function (event) {
            event.preventDefault();
            getData({ requestType: 'pBCategory', pBCategory: a.dataset.catSlug, limit: 12 });
        });
        li.append(a);
        document.getElementById('categories').appendChild(li);
    });
}

function pagination(total, limit = 12, skip, options = {}) {
    let pages = (Math.ceil(total / limit));
    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    for (let i = 0; i < pages; i = i + 1) {
        /*
        if(i === 0){
            const previous = document.createElement('li');
            previous.classList.add('page-item');
            const aPrevious = document.createElement('a');
            aPrevious.classList.add('page-link');
            aPrevious.append(document.createTextNode('<<'));
            previous.append(aPrevious);
            ul.appendChild(previous)
        }
        */
        const li = document.createElement('li');
        li.classList.add('page-item');
        const a = document.createElement('a');
        a.classList.add('page-link');
        if (i !== (pages - 1)) {
            a.append(document.createTextNode(
                `${(i * limit) + 1} à ${(i * limit) + limit}`
            ));
        } else {
            a.append(document.createTextNode(
                `${(i * limit) + 1} à ${total}`
            ));
        }
        a.dataset.skip = i * limit;
        a.dataset.category = '';
        a.setAttribute('href', '#');
        
        if ((a.dataset.skip === options.skip) || (undefined === options.skip) && a.dataset.skip === '0') {
            a.classList.add('active');
        }
        a.addEventListener('click', function (event) {
            event.preventDefault();
            options.skip = a.dataset.skip;
            getData(options);
        });
        li.append(a);
        ul.append(li);
        li.append(a);
        /*
        if(i*limit >= (total-limit)){
            const next = document.createElement('li');
            next.classList.add('page-item');
            const aNext = document.createElement('a');
            aNext.classList.add('page-link');
            aNext.append(document.createTextNode('>>'));
            next.append(aNext);
            ul.appendChild(next)
        }
        */
    }
    /*console.log(ul);*/
    return ul;
}