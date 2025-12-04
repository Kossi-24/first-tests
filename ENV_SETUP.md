# Configuration des variables d'environnement

## Fichier .env requis

Vous devez créer un fichier `.env` à la racine du dossier `backend` avec les variables suivantes :

```env
# Configuration de la base de données PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432

# Port du serveur
PORT=5000

# Configuration JWT (si utilisé)
JWT_SECRET=votre_secret_jwt
```

## Instructions

1. Créez un fichier nommé `.env` dans le dossier `backend`
2. Copiez les variables ci-dessus dans ce fichier
3. Remplacez les valeurs par vos propres paramètres de base de données PostgreSQL

**Important :** Le fichier `.env` est déjà dans le `.gitignore` pour éviter de commiter vos informations sensibles.

