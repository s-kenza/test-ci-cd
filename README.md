# Pipeline CI/CD pour le projet ci-cd-react

[![CI](https://img.shields.io/github/actions/workflow/status/operdrix/ci-cd-react/ci-cd.yml?branch=main&style=flat-square)](https://github.com/operdrix/ci-cd-react/actions?query=workflow%3Aci-cd.yml)
[![Release](https://img.shields.io/github/v/release/operdrix/ci-cd-react?style=flat-square)](https://github.com/operdrix/ci-cd-react/releases)
![Static Badge](https://img.shields.io/badge/ESGI-M2%20IW%202025-orange)

Ce projet est un TP en Master 2 qui démontre comment configurer un pipeline complet de CI/CD avec GitHub Actions. Le pipeline permet d'automatiser :

- L'intégration continue (CI) : tests, linting et build sur plusieurs versions de Node.js.
- La livraison continue (Continuous Delivery) : archivage du build sur la branche `main` afin de garantir qu'une version déployable est toujours disponible.
- Le déploiement continu (Continuous Deployment) : déploiement automatique sur GitHub Pages lors de la création d'un nouveau tag.
- La création automatique d'une release GitHub avec l'artefact généré lors du déploiement.

## Créateurs

- **Kenza SCHULER** [GitHub](https://github.com/s-kenza)  

- **Olivier PERDRIX** [GitHub](https://github.com/operdrix)  


## Vue d'ensemble du Pipeline CI/CD

Le pipeline se compose de quatre grandes étapes :

1. **Intégration Continue (CI) :**  
   - **Objectif :** Vérifier que le code est toujours dans un état sain.  
   - **Étapes :**
     - Checkout du code.
     - Installation des dépendances via `npm ci`.
     - Exécution du linting et des tests.
     - Build du projet via `npm run build --if-present`.
     - Upload de l'artefact (le dossier `dist`) **uniquement** lors d'une exécution avec Node.js 22.x pour éviter les doublons.

2. **Livraison Continue (Continuous Delivery) :**  
   - **Objectif :** Archiver et rendre disponible une version "livrable" du build à chaque push sur la branche `main`.
   - **Étapes :**
     - Téléchargement de l'artefact généré par la phase CI.
     - Vérification du contenu (listing des fichiers).
     - Archivage du build dans un fichier ZIP (`delivery.zip`).
     - Upload du ZIP comme artefact de livraison.

3. **Déploiement Continu (Continuous Deployment) :**  
   - **Objectif :** Déployer automatiquement l'application sur GitHub Pages lors de la création d'un nouveau tag.
   - **Étapes :**
     - Checkout du code et configuration de l'environnement avec Node.js 22.x.
     - Configuration de Git.
     - Installation des dépendances et re-build du projet.
     - Exécution de la commande `npm run deploy` qui utilise le package `gh-pages` pour pousser le contenu de `dist` sur la branche `gh-pages`.
     - Utilisation d'un PAT (stocké dans le secret `GH_PAGES_TOKEN`) pour l'authentification.

4. **Création Automatique d'une Release GitHub :**  
   - **Objectif :** À la création d'un nouveau tag, générer automatiquement une release GitHub et y attacher l'artefact (`delivery.zip`).
   - **Étapes :**
     - Utilisation de l'action [ncipollo/release-action@v1](https://github.com/ncipollo/release-action) pour créer la release.
     - Utilisation de la variable `${{ github.ref_name }}` afin d'obtenir le nom du tag.
     - Attachement de l'artefact `delivery.zip` à la release.

## Prérequis et Configuration de l'Environnement

- **Versions de Node.js supportées :** 18.x, 20.x et 22.x.
- **Branche principale :** `main`
- **Déploiement :** Réalisé sur GitHub Pages via le package `gh-pages`.
- **Secrets nécessaires :**
  - `GH_PAGES_TOKEN` : PAT pour authentifier le déploiement sur GitHub Pages.
  - `GITHUB_TOKEN` : Token automatique fourni par GitHub Actions, utilisé pour la création de release.

## Récupération et installation du projet

Pour tester l'ensemble du processus CI/CD sur votre machine et sur GitHub, suivez ces étapes :

1. **Cloner le dépôt :**
  
   > Un problème dans github empêche les actions de s'exécuter sur des repository fork. 
   > C'est pourquoi il est préférable de clôner le projet.

   Ouvrez votre terminal et clonez votre fork du dépôt :

   ```bash
   git clone https://github.com/VOTRE_NOM_UTILISATEUR/ci-cd-react.git
   cd ci-cd-react
   rm -rf .git
   git init
   ```

2. **Installer les dépendances :**

   Installez les dépendances du projet en utilisant npm :

   ```bash
   npm i
   ```
   
3. **Exécuter le projet en local :**

   Pour démarrer le serveur de développement et vérifier que tout fonctionne, utilisez :

   ```bash
   npm run dev
   ```

   Le projet s'ouvrira généralement sur [http://localhost:5173](http://localhost:5173) (ou un autre port indiqué dans la console).

4. **Configurer le dépôt pour les GitHub Actions :**

   Pour que le pipeline CI/CD s'exécute correctement lors de vos pushes et tags, vous devez configurer certains paramètres dans votre dépôt GitHub :
   - **Créer un nouveau repository github**
     - Sur Github, créez un nouveau repository publique sans README.
     - En local exécutez ces commandes :
       ```bash
        git add .
        git commit -m "initial commit"
        git branch -M main
        git remote add origin https://github.com/[Votre repository]
        git push -u origin main
       ```

   - **Ajouter les secrets du dépôt :**
     - Rendez-vous dans les Settings de Github, puis dans **Developer settings** > **Personal access token** > **Tokens (classic)** [Lien direct](https://github.com/settings/tokens)
     - Créez un nouveau token (PAT) appelé `GITHUB_PAGE` et sélectionnez le scope `repo`. Copiez le et gardez le secret. 
     - Rendez-vous dans votre dépôt GitHub forké, puis cliquez sur **Settings > Secrets and variables > Actions**.
     - Ajoutez un Repository Secret nommé `GH_PAGES_TOKEN` contenant le PAT généré précédemment. Ce token est utilisé pour authentifier le déploiement sur GitHub Pages.
   
   - **Créer la branche `gh-pages` (si elle n'existe pas encore) :**
     ```bash
     git checkout --orphan gh-pages
     git rm -rf .
     echo "# GitHub Pages" > index.html
     git add index.html
     git commit -m "Initialisation de GitHub Pages"
     git push origin gh-pages
     ```

   - **Configurer GitHub Pages :**
     - Allez dans **Settings > Pages** de votre dépôt.
     - Sélectionnez la source de GitHub Pages (généralement la branche `gh-pages`). Laissez le dossier `/(root)`.
     - Sauvegardez si besoin pour activer le déploiement de votre site.

5. **Tester les GitHub Actions :**

   - **Intégration continue (CI) et Livraison continue (CD) :**
     - Poussez vos modifications sur la branche `main` ou créez une Pull Request vers la branche `main` pour déclencher automatiquement les workflows qui testent et archivent votre build.
   
   - **Déploiement continu et création de Release :**
     - Créez et poussez un nouveau tag pour déclencher le déploiement sur GitHub Pages et la création d'une release. Par exemple :
       ```bash
       git tag -a v2.0.0 -m "Version 2.0.0"
       git push origin v2.0.0
       ```
  Une fois le tag poussé, le pipeline déclenchera automatiquement le job **deployment** (pour déployer sur GitHub Pages) puis le job **release** (pour créer la release sur GitHub).
   
## Récapitulatif

Ce pipeline CI/CD permet de :

- **Intégrer** continuellement le code avec des tests sur plusieurs versions de Node.js.
- **Livrer** automatiquement une version archiviée du build à chaque push sur `main`.
- **Déployer** automatiquement le site sur GitHub Pages lorsqu'un nouveau tag est créé.
- **Créer** automatiquement une release GitHub avec l'artefact associé.

