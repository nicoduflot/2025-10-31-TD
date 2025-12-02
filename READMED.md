# Installation et lancement de DummyJson

## Installation

### 1. Cloner le repository
```bash
git clone https://github.com/Ovi/DummyJSON.git
```

### 2. Aller dans le dossier
```bash
cd DummyJSON
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Créer le fichier d'environnement

Créez un dossier `config` à la racine du projet s'il n'existe pas, puis créez le fichier `config/dev.env` avec ce contenu :

```env
JWT_SECRET=ma_cle_secrete_pour_formation_2024_xyz123abc
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=dummyjson
```

> #### JWT_SECRET : C'est quoi ?
>
> JWT signifie JSON Web Token. C'est un système d'authentification utilisé par les API modernes.
>
> Le JWT_SECRET est une clé secrète (comme un mot de passe) qui sert à :
>
> * Signer les tokens d'authentification (créer une signature cryptographique)
> * Vérifier que les tokens n'ont pas été modifiés
>
> **Pourquoi DummyJSON en a besoin ?**
>
> DummyJSON propose des endpoints d'authentification :
>
> * /auth/login - pour se connecter
> * /auth/refresh - pour rafraîchir un token
> * Routes protégées qui nécessitent un token
>
> Le JWT_SECRET permet de sécuriser ces fonctionnalités.
>
> **Quelle valeur mettre ?**
>
> Pour un usage local/formation, mettez n'importe quelle chaîne de caractères longue et aléatoire :
>
> `JWT_SECRET=ma_cle_secrete_pour_formation_2024_xyz123abc`
>
> Ou générez-en une aléatoire plus sécurisée :
>
> `JWT_SECRET=8f3d9a7b2e1c5f4a6d8b9e2c1a5f7d3b9e4a6c8f2d1a5b7e9c3f6a8d2b4e1c7`
>
> Pour la production (site réel), il faudrait une vraie clé cryptographique complexe, mais pour la formation ou le dev en local, une simple chaîne suffit amplement !
>
> L'important : ne partagez jamais cette clé publiquement si vous l'utilisez en production.

### 5. Installer MongoDB

* Téléchargez MongoDB Community Server : https://www.mongodb.com/try/download/community
* Installez-le avec l'option **"Run service as Network Service user"** (option par défaut recommandée)
* Le service MongoDB démarre automatiquement

**Pourquoi cette option ?**

* Plus simple : configuration automatique
* Suffisant pour le développement local
* Pas de gestion de compte utilisateur Windows

### 6. Créer le dossier cache et les fichiers nécessaires

À la racine du projet DummyJSON, créez le dossier `cache` et les fichiers vides :

```powershell
mkdir cache
cd cache
type nul > products.v8
type nul > users.v8
type nul > posts.v8
type nul > comments.v8
type nul > carts.v8
type nul > todos.v8
type nul > quotes.v8
type nul > recipes.v8
cd ..
```

### 7. Modifier le fichier utils.js

Ouvrez le fichier `src/utils/util.js` et remplacez la fonction `loadV8` (lignes 29-33) par :

```javascript
function loadV8(name) {
  const filePath = path.join(baseDir, `${name}.v8`);
  
  // Vérifier si le fichier existe et n'est pas vide
  if (!fs.existsSync(filePath)) {
    console.warn(`Cache file not found: ${filePath}, returning empty array`);
    return [];
  }
  
  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    console.warn(`Cache file is empty: ${filePath}, returning empty array`);
    return [];
  }
  
  try {
    const buffer = fs.readFileSync(filePath);
    return v8.deserialize(buffer);
  } catch (error) {
    console.error(`Error loading cache file ${filePath}:`, error.message);
    return [];
  }
}
```

### 8. Lancer le serveur en mode développement

Dans le projet, lancez la commande :
```bash
npm run dev
```

⚠️ **Important** : Utilisez `npm run dev` et non `npm start` pour charger correctement les variables d'environnement.

---

## Utilisation

### URLs d'accès

Pour accéder aux **données** (l'API) :
* **Local** : http://localhost:3000/products
* **En ligne** : https://dummyjson.com/products

Pour accéder à la **documentation** :
* **Local** : http://localhost:3000/docs
* **En ligne** : https://dummyjson.com/docs

### Utilisation depuis votre projet WAMP

Si vous avez un projet web qui tourne sur WAMP (par exemple sur http://localhost ou http://localhost:8080), vous feriez vos appels API comme ceci :

```javascript
// Au lieu de
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Vous utiliseriez
fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Points importants

* **DummyJSON** tourne sur le port **3000** (Node.js)
* **Votre WAMP** tourne probablement sur le port **80** ou **8080** (Apache)
* Les deux serveurs peuvent coexister sans problème !
* Vous devrez lancer les deux services en même temps

### Ports utilisés

* **WAMP (MySQL)** : port 3306
* **WAMP (Apache)** : port 80 ou 8080
* **MongoDB** : port 27017
* **DummyJSON (Node.js)** : port 3000

Chacun a son propre port, donc ils peuvent tous tourner en même temps sans conflit.

### Bases de données

* **MySQL** (dans WAMP) : base de données relationnelle (SQL)
* **MongoDB** : base de données NoSQL (documents JSON)

Ce sont deux systèmes complètement indépendants qui ne se "parlent" pas et ne partagent aucune ressource.

---

## En pratique

Vous pourrez avoir simultanément :
* Apache/PHP qui tourne (WAMP)
* MySQL qui tourne (WAMP)
* MongoDB qui tourne (service séparé)
* Node.js/DummyJSON qui tourne (service séparé)