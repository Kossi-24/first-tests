# Guide de Résolution - Erreurs de Connexion PostgreSQL

## Problème Résolu

**Erreur :** `Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string`

Cette erreur se produit lorsque le module PostgreSQL (`pg`) reçoit un mot de passe qui n'est pas une chaîne de caractères valide, généralement parce que :
1. Les variables d'environnement ne sont pas chargées au bon moment
2. Le fichier `.env` n'est pas trouvé
3. Les valeurs d'environnement sont `undefined` ou `null`

## Solutions Appliquées

### 1. Configuration du Type de Module ES6

**Fichier :** `backend/package.json`

```json
{
  "type": "module"
}
```

**Explication :** Permet d'utiliser la syntaxe `import/export` au lieu de `require/module.exports`.

---

### 2. Chargement Prioritaire des Variables d'Environnement

**Fichier créé :** `backend/src/config/env.js`

Ce fichier charge les variables d'environnement **AVANT** toute autre importation.

```javascript
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "../../.env");
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
    console.error('Erreur lors du chargement du .env:', envResult.error);
} else {
    console.log('Fichier .env chargé avec succès depuis:', envPath);
}
```

**Pourquoi c'est important :** Dans les modules ES6, les imports sont "hoisted" (remontés), donc ils s'exécutent avant le code du fichier. En important `env.js` en premier, on garantit que les variables sont chargées avant la création du pool de connexion.

---

### 3. Validation et Conversion du Mot de Passe

**Fichier modifié :** `backend/src/config/db.js`

#### Fonction de sécurisation des variables d'environnement

```javascript
function getEnvString(key, defaultValue = '') {
    const value = process.env[key];
    if (value === undefined || value === null) {
        return defaultValue;
    }
    // Convertir en chaîne, supprimer les espaces et les guillemets éventuels
    let strValue = String(value).trim();
    // Supprimer les guillemets simples ou doubles au début et à la fin
    if ((strValue.startsWith('"') && strValue.endsWith('"')) || 
        (strValue.startsWith("'") && strValue.endsWith("'"))) {
        strValue = strValue.slice(1, -1);
    }
    return strValue;
}
```

#### Configuration sécurisée du pool

```javascript
const dbConfig = {
    user: getEnvString('DB_USER', 'postgres'),
    host: getEnvString('DB_HOST', 'localhost'),
    database: getEnvString('DB_NAME', 'postgres'),
    password: getEnvString('DB_PASSWORD', ''),
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
};

// Validation stricte que le mot de passe est une chaîne
if (typeof dbConfig.password !== 'string') {
    throw new Error(`ERREUR: Le mot de passe n'est pas une chaîne.`);
}

// Double sécurité : forcer la conversion en chaîne
dbConfig.password = String(dbConfig.password);

const pool = new Pool(dbConfig);
```

**Points clés :**
- Conversion explicite en chaîne avec `String()`
- Suppression des guillemets éventuels autour des valeurs
- Validation du type avant création du pool
- Valeurs par défaut pour éviter les `undefined`

---

### 4. Import dans le Bon Ordre

**Fichier modifié :** `backend/src/server.js`

```javascript
// Charger les variables d'environnement en premier
import "./config/env.js";

import express, { json } from "express";
import cors from "cors";
import pool from "./config/db.js";
```

**Fichier modifié :** `backend/src/config/db.js`

```javascript
// Charger les variables d'environnement AVANT tout le reste
import './env.js';

import pkg from 'pg';
const { Pool } = pkg;
```

---

## Structure du Fichier .env

Assurez-vous que votre fichier `.env` est dans le dossier `backend/` et contient :

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=votre_base_de_donnees
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
PORT=5000
```

**Note importante :** Ne mettez PAS de guillemets autour des valeurs dans le `.env`, sauf si les guillemets font partie de la valeur elle-même.

---

## Packages Requis

Assurez-vous d'avoir installé :

```bash
npm install pg dotenv express cors
```

---

## Checklist de Dépannage

Si vous rencontrez encore des problèmes :

- [ ] Le fichier `.env` existe dans le dossier `backend/`
- [ ] Le fichier `.env` contient toutes les variables nécessaires
- [ ] Aucune valeur n'est vide ou undefined
- [ ] Le fichier `env.js` est importé en premier dans `db.js`
- [ ] Le fichier `env.js` est importé en premier dans `server.js`
- [ ] Le package `pg` est installé
- [ ] Le package `dotenv` est installé
- [ ] `"type": "module"` est présent dans `package.json`

---

## Logs de Débogage

Le code inclut maintenant des logs qui vous aideront à identifier les problèmes :

- Vérification du chargement du fichier `.env`
- Affichage de la configuration de la base de données (sans le mot de passe complet)
- Type du mot de passe avant création du pool
- Messages d'erreur détaillés en cas de problème

---

## Résumé des Fichiers Modifiés

1. **`backend/package.json`** - Ajout de `"type": "module"`
2. **`backend/src/config/env.js`** - NOUVEAU fichier pour charger les variables d'environnement
3. **`backend/src/config/db.js`** - Validation et sécurisation des variables
4. **`backend/src/server.js`** - Import de `env.js` en premier

---

## Points Clés à Retenir

1. **Ordre des imports est crucial** : Toujours charger les variables d'environnement avant d'importer les modules qui les utilisent
2. **Toujours convertir en chaîne** : Les valeurs d'environnement peuvent être `undefined`, toujours utiliser `String()`
3. **Validation stricte** : Vérifier le type des valeurs critiques avant utilisation
4. **Chemins relatifs** : Utiliser `__dirname` pour trouver le fichier `.env` de manière fiable

