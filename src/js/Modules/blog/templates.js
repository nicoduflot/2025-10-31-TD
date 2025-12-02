export const templates = {
    post: null,
    miniPost: null,
    pagination: null,
    tag: null,
    comment: null,
};

export async function loadTemplates() {
    const [postResponse, miniPostResponse, paginationResponse, tagResponse, commentResponse] = await Promise.all([
        fetch('./src/template/Blog/postTemplate.html'),
        fetch('./src/template/Blog/miniPostTemplate.html'),
        fetch('./src/template/Blog/paginationTemplate.html'),
        fetch('./src/template/Blog/tagTemplate.html'),
        fetch('./src/template/Blog/commentTemplate.html'),
    ]);

    const [postHTML, miniPostHTML, paginationHTML, tagHTML, commentHTML] = await Promise.all([
        postResponse.text(),
        miniPostResponse.text(),
        paginationResponse.text(),
        tagResponse.text(),
        commentResponse.text(),
    ]);

    const parser = new DOMParser();
        
        const postDoc = parser.parseFromString(postHTML, 'text/html');
        templates.post = postDoc.querySelector('template');
        
        const miniPostDoc = parser.parseFromString(miniPostHTML, 'text/html');
        templates.miniPost = miniPostDoc.querySelector('template');
    
        const paginationDoc = parser.parseFromString(paginationHTML, 'text/html');
        templates.pagination = paginationDoc.querySelector('template');
        
        const tagDoc = parser.parseFromString(tagHTML, 'text/html');
        templates.tag = tagDoc.querySelector('template');
        
        const commentDoc = parser.parseFromString(commentHTML, 'text/html');
        templates.comment = commentDoc.querySelector('template');
}