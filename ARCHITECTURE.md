# Architecture du Projet E-Books

## 📋 Vue d'ensemble

Application web de gestion de bibliothèque (e-books) construite avec **React 18.3.1**, **Vite 7.1.7**, **Firebase** pour l'authentification, et **Tailwind CSS** pour le styling. L'application suit une architecture modulaire avec séparation des responsabilités.

## 🏗️ Structure du Projet

```
e-book/
├── public/                 # Assets statiques
│   └── vite.svg
├── src/
│   ├── assets/             # Images et ressources
│   │   └── react.svg
│   ├── components/         # Composants réutilisables
│   │   ├── auth/          # Composants d'authentification
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── ui/            # Composants UI de base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── Sidebar.jsx    # Navigation latérale
│   │   ├── BarCharts.jsx  # Graphiques (Recharts)
│   │   ├── BooksTab.jsx   # Tableau des livres
│   │   ├── UsersTab.jsx    # Tableau des utilisateurs
│   │   ├── Dialog.jsx     # Modales
│   │   ├── theme-provider.tsx  # Gestion du thème
│   │   └── mode-toggle.tsx     # Toggle dark/light mode
│   ├── context/           # Contextes React
│   │   └── AuthContext.jsx    # Gestion de l'authentification
│   ├── hooks/             # Hooks personnalisés (vide pour l'instant)
│   ├── lib/               # Utilitaires
│   │   └── utils.ts       # Fonctions utilitaires (cn, etc.)
│   ├── pages/             # Pages de l'application
│   │   └── Private/       # Pages protégées
│   │       ├── private.jsx    # Layout avec Sidebar
│   │       ├── Dashboard.jsx  # Page principale
│   │       ├── Books.jsx      # Gestion des livres
│   │       ├── Users.jsx      # Gestion des utilisateurs
│   │       ├── Orders.jsx    # Commandes
│   │       ├── Analytics.jsx  # Analytics
│   │       ├── Notifications.jsx
│   │       ├── Messages.jsx
│   │       ├── Settings.jsx
│   │       ├── Help.jsx
│   │       ├── Account.jsx
│   │       └── StatsCards.jsx # Cartes de statistiques
│   ├── services/          # Services externes
│   │   └── firebase-config.jsx  # Configuration Firebase
│   ├── App.jsx            # Composant racine avec routing
│   ├── main.jsx           # Point d'entrée
│   ├── index.css          # Styles globaux
│   └── App.css            # Styles de l'application
├── package.json           # Dépendances et scripts
├── vite.config.js        # Configuration Vite
├── tailwind.config.js    # Configuration Tailwind
└── tsconfig.json         # Configuration TypeScript
```

## 🔧 Technologies Utilisées

### Core
- **React 18.3.1** - Bibliothèque UI
- **React Router DOM 6.28.0** - Routing
- **Vite 7.1.7** - Build tool et dev server

### Styling
- **Tailwind CSS 4.1.16** - Framework CSS utility-first
- **@tailwindcss/vite** - Plugin Vite pour Tailwind
- **tailwind-merge** - Fusion intelligente des classes Tailwind
- **class-variance-authority** - Gestion des variantes de composants

### UI Components
- **Radix UI** - Composants accessibles headless
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-label`
  - `@radix-ui/react-separator`
  - `@radix-ui/react-slot`
- **shadcn/ui** - Composants UI basés sur Radix UI
- **lucide-react** - Icônes

### Data Visualization
- **Recharts 2.15.4** - Bibliothèque de graphiques React

### Backend & Auth
- **Firebase 12.5.0** - Backend as a Service
  - Authentication (Email/Password)
  - Analytics (optionnel)

## 🎯 Architecture des Couches

### 1. **Couche Présentation (UI)**
```
┌─────────────────────────────────────┐
│         Pages (Routes)              │
│  Dashboard, Books, Users, etc.    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Composants Métier               │
│  Sidebar, StatsCards, BooksTab, etc. │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Composants UI de Base           │
│  Button, Card, Table, Input, etc.    │
└──────────────────────────────────────┘
```

### 2. **Couche Logique Métier**
```
┌─────────────────────────────────────┐
│      Context (State Management)    │
│         AuthContext.jsx              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Services (API/Backend)          │
│      firebase-config.jsx             │
└──────────────────────────────────────┘
```

### 3. **Couche Routing**
```
App.jsx
├── Routes Publiques
│   ├── / → SignIn
│   └── /signup → SignUp
│
└── Routes Privées (/private)
    ├── Layout: Private (avec Sidebar)
    ├── /dashboard → Dashboard
    ├── /books → Books
    ├── /users → Users
    ├── /orders → Orders
    ├── /analytics → Analytics
    ├── /notifications → Notifications
    ├── /messages → Messages
    ├── /settings → Settings
    └── /help → Help
```

## 🔐 Gestion de l'Authentification

### Flux d'Authentification
```
1. Utilisateur accède à l'app
   ↓
2. Vérification de l'état d'auth (AuthContext)
   ↓
3. Si non connecté → Redirection vers / (SignIn)
   ↓
4. Si connecté → Accès aux routes privées
   ↓
5. Protection des routes via Private.jsx
```

### AuthContext
- **État global** : `currentUser`, `loading`
- **Méthodes** : `signUp()`, `signIn()`
- **Écoute** : `onAuthStateChanged` pour mise à jour automatique

## 🎨 Système de Thème

### Dark Mode Support
- **ThemeProvider** : Gestion du thème via Context
- **ModeToggle** : Toggle clair/sombre
- **Storage** : Persistance dans `localStorage`
- **Classes Tailwind** : `dark:` pour tous les composants

### Composants avec Support Dark Mode
- ✅ StatsCards
- ✅ BooksTab
- ✅ UsersTab
- ✅ BarCharts
- ✅ Sidebar
- ✅ Tous les composants UI

## 📊 Composants Principaux

### Dashboard
- **StatsCards** : 4 cartes de statistiques (Utilisateurs, Livres empruntés, Stock, Retards)
- **UsersTab** : Tableau des utilisateurs avec avatars
- **BooksTab** : Tableau des livres
- **BarCharts** : Graphique d'évolution (Recharts)

### Sidebar
- Navigation latérale avec icônes
- État expand/collapse
- Indicateur d'item actif
- Menu utilisateur en bas

### Tables
- **UsersTab** : Colonnes (User ID, User Name, Emprunts, Retards, Action)
- **BooksTab** : Colonnes (Book ID, Title, Author, Available, Action)
- Support dark mode complet
- Actions avec menu dropdown

## 🔄 Flux de Données

```
┌─────────────┐
│  Firebase   │
│  (Backend)  │
└──────┬──────┘
       │
       │ Auth State
       ▼
┌─────────────┐
│ AuthContext │
│  (Context)  │
└──────┬──────┘
       │
       │ currentUser
       ▼
┌─────────────┐
│   Private   │
│  (Layout)   │
└──────┬──────┘
       │
       │ Props/Context
       ▼
┌─────────────┐
│   Pages     │
│ Components  │
└─────────────┘
```

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run lint     # Lint du code
npm run preview  # Prévisualise le build de production
```

## 📦 Dépendances Clés

### Production
- `react` & `react-dom` : 18.3.1
- `react-router-dom` : 6.28.0
- `firebase` : 12.5.0
- `recharts` : 2.15.4
- `tailwindcss` : 4.1.16
- `lucide-react` : 0.552.0

### Développement
- `vite` : 7.1.7
- `@vitejs/plugin-react` : 5.0.4
- `eslint` : 9.36.0
- `@types/react` : 18.3.12

## 🔒 Sécurité

1. **Protection des Routes** : Vérification de `currentUser` dans `Private.jsx`
2. **Firebase Auth** : Authentification sécurisée via Firebase
3. **Variables d'environnement** : Configuration Firebase via `.env`
4. **Validation** : Validation des formulaires d'authentification

## 🚀 Points d'Amélioration Potentiels

1. **State Management** : Considérer Redux/Zustand pour un état global plus complexe
2. **API Layer** : Créer une couche d'abstraction pour les appels Firebase
3. **Error Boundaries** : Ajouter des boundaries pour gérer les erreurs
4. **Tests** : Ajouter des tests unitaires et d'intégration
5. **Hooks** : Développer des hooks personnalisés pour la logique réutilisable
6. **TypeScript** : Migration progressive vers TypeScript
7. **Performance** : Lazy loading des routes et code splitting

## 📝 Conventions de Code

- **Composants** : PascalCase (ex: `Dashboard.jsx`)
- **Fichiers utilitaires** : camelCase (ex: `utils.ts`)
- **Hooks personnalisés** : Préfixe `use` (ex: `useAuth`)
- **Contextes** : Suffixe `Context` (ex: `AuthContext`)
- **Services** : Suffixe descriptif (ex: `firebase-config`)

## 🌐 Structure de Routing

```
/                    → SignIn (public)
/signup              → SignUp (public)
/private             → Layout avec Sidebar
  ├── /dashboard     → Dashboard
  ├── /books         → Books
  ├── /users         → Users
  ├── /orders        → Orders
  ├── /analytics     → Analytics
  ├── /notifications → Notifications
  ├── /messages      → Messages
  ├── /settings      → Settings
  └── /help          → Help
```

---

**Dernière mise à jour** : 2025-01-12
**Version** : 0.0.0

