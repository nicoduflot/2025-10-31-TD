/* on importe les modules dans le fichier de module principal */

import getData from './fetch.js';

window.addEventListener('DOMContentLoaded', ()=>{
    const Toto = {
        name: 'toto',
        type: 'Rogue',
        taper: function(cible){
            console.log(`${this.name} taper ${cible.name}`);
        }
    };
    /*console.log(Toto);*/
    
    const TUTU = {
        name: 'Tutu',
        type: 'Rogue',
        taper: function(cible){
            console.log(`${this.name} taper ${cible.name}`);
        }
    };
    /*console.log(Toto);*/

    /*Toto.taper(TUTU);*/
    /*TUTU.taper(Toto);*/
    /* objet litéral récupérer avec la nomenclature JsON Javascript Object Notation */
    const Produit = {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 10.48,
      "rating": 2.56,
      "stock": 99,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "sku": "BEA-ESS-ESS-001",
      "weight": 4,
      "dimensions": {
        "width": 15.14,
        "height": 13.08,
        "depth": 22.99
      }
    }

    getData({requestType: 'categories'});
    getData({ requestType: '', limit: 12 });
});