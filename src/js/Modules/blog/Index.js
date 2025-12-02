import { loadTemplates } from './templates.js';
import getData from './fetch.js';

async function init() {
    // Charge les templates en premier
    await loadTemplates();
    
    // Ensuite lance l'application
    getData({requestType: 'tags'});
    getData({ requestType: '', limit: 15 });
}

window.addEventListener('DOMContentLoaded', ()=>{
    init();
});