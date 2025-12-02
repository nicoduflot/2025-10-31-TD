/* fonctions d'afffichage des produits */
import getData from './fetch.js';
import { templates } from './templates.js';

export default function postsList(data, options = {}) {
    console.log('postlist');
    
    const posts = (data.posts) ? data.posts : [data];
    const total = (data.posts) ? data.total : 1;
    const limit = (data.posts) ? 15 : 1;
    const skip = (data.posts) ? data.skip : 0;

    const template = (total == 1)? templates.post : templates.miniPost ;
    console.log(template);
    
    document.getElementById('content').innerHTML = '';

    //console.log(data);
    posts.map(post=>{
        const postTemplate = document.importNode(template.content, true);
        postTemplate.querySelector('article').dataset.postid = post.id;
        postTemplate.querySelector('h2').append(document.createTextNode(post.title));
        //console.log(post.id);
        getData({requestType: 'comments', id: post.id});
        document.getElementById('content').append(postTemplate);
    });

}

export function comments(data, options = {}){
    const template = templates.comment;
    const commentTemplate = document.importNode(template.content, true);
    const postlink = commentTemplate.querySelector('.readinglink a');
    //console.log(postlink);
    postlink.addEventListener('click', function(event){
        event.preventDefault();
        console.log(`getData({requestType: 'id', id: ${options.id}})`);
        getData({
            requestType: 'id', 
            id: options.id
        });
    });
    commentTemplate.querySelector('#commentcount').append(document.createTextNode(data.comments.length));
    document.querySelector(`article[data-postid="${options.id}"] .postFooter`).append(commentTemplate);
}

export function tags(tags) {
    const template = templates.tag;
    document.getElementById('tagsCloud');
    tags.map(tag=>{
        const templateTag = document.importNode(template.content, true);
        const div = templateTag.querySelector('div');
        const a = templateTag.querySelector('a');
        a.append(document.createTextNode(tag.name));
        a.dataset.tagslug = tag.slug;
        div.append(a);
        document.getElementById('tagsCloud').appendChild(div);
    });
}

function pagination(total, limit = 15, skip, options = {}) {
    
}