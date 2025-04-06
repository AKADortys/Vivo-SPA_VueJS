# Vivo-SPA

Parfait ! Voici une version du descriptif adaptée pour un `README.md` de ton projet GitHub, avec les sections classiques qu’on attend généralement :

---

# 🧑‍🍳 Application SPA - Service Traiteur (Frontend Vue.js)

Ce projet est une **application frontend SPA (Single Page Application)** développée avec **Vue.js**, pensée pour un service traiteur. L'application communique avec une API backend personnalisée, disponible ici : [TFM_SGBD-AncelT](https://github.com/AKADortys/TFM_SGBD-AncelT).

## 🚀 Technologies utilisées

- **Vue.js** (Composition API)
- **Pinia** – gestion centralisée de l'état
- **Dexie.js** – wrapper d’IndexedDB pour la persistance locale
- **Axios** – pour la communication HTTP avec l’API backend
- **HTML5 / CSS3**

## 🧩 Fonctionnalités

### 👥 Espace Client

- Création de compte
- Consultation du catalogue de produits
- Passation de commandes
- Accès à l’historique des commandes

### 🔐 Espace Admin

- Création, modification et suppression de produits
- Gestion des commandes passées par les clients
- Possibilité de notifier les clients lors du traitement des commandes

## 🔒 Authentification

Le système d’identification repose sur des **cookies sécurisés** contenant :

- un **access token** pour l’authentification des requêtes
- un **refresh token** pour renouveler les sessions sans rechargement

Ces cookies sont gérés par le backend Express. La navigation reste fluide et sécurisée.

## 📦 Installation

```bash
npm install
npm run dev
```

Assurez-vous que l’API backend (https://github.com/AKADortys/TFM_SGBD-AncelT) est également lancée pour que l’application fonctionne correctement.

## ✍️ Auteur

Développé par **Ancel T.** dans le cadre d’un projet de fin de formation.  
👉 [LinkedIn](https://www.linkedin.com/in/thibault-ancel-094721303/)
