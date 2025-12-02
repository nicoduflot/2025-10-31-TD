/*
Tous les posts
https://dummyjson.com/posts
Post par id
https://dummyjson.com/posts/1

Affichage limité de posts
http://localhost:8888/docs/posts?limit=10&skip=10&select=title,reactions,userId

You can pass limit and skip params to limit and skip the results for pagination, and use limit=0 to get all items.
You can pass select as query params with comma-separated values to select specific data

Recherche par mot clef
http://localhost:8888/posts/search?q=love
Liste des étiquettes
http://localhost:8888/posts/tag-list
Toutes leses étiquettes
http://localhost:8888/posts/tags
produit par catégorie
http://localhost:8888/posts/tag/life
*/
import postsList, { tags, comments } from "./Posts.js";

const options = {
    requestType: '',
    id: '',
    pBTag: '',
    keyword: '',
    limit: '',
    skip: '',
};

export default async function getData(options = { requestType: '' }) {
    let baseUrl = 'http://localhost:8888/posts';
    //let baseUrl = 'https://dummyjson.com/posts';
    switch (options.requestType) {
        case 'comments':
            baseUrl = `${baseUrl}/${options.id}/comments`;
            break;
        case 'id':
            baseUrl = `${baseUrl}/${options.id}`;
            console.log(baseUrl);
            break;
        case 'tags':
            baseUrl = `${baseUrl}/tags`;
            break;
        case 'pBTags':
            baseUrl = `${baseUrl}/tag/${options.pBtag}`;
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
                case 'comments':
                    comments(data, options);
                    break;
                case 'id':
                    postsList(data, options);
                    break;
                case 'tags':
                    tags(data);
                    break;
                case 'pBTags':
                    postList(data, options);
                    break;
                default:
                    postsList(data, options);
            }
        })
        .catch(error => {})
        .finally(() => {});
}