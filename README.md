# 💻 Digital Banking App – Angular Frontend

Ce dépôt contient une **application frontend Angular** conçue pour interagir avec un **backend Spring Boot**. Ce projet est réalisé dans le cadre du cours **"Architecture JEE et Middlewares"** dirigé par **Mr YOUSSFI Mohamed**, et a pour objectif la mise en œuvre d’une application de **gestion des comptes bancaires** (clients, comptes courants/épargnes, opérations DEBIT/CREDIT).

## 🎯 Objectif

Développer une application web complète permettant :

- La gestion des **clients** (ajout, édition, suppression, recherche).
- La gestion des **comptes bancaires** (comptes courants et épargnes).
- La consultation des **opérations bancaires** (DEBIT/CREDIT).
- L’affichage de statistiques dans un **dashboard** avec **ng-chart** (Chart.js).
- La **sécurisation** de l’accès via **Spring Security** et **JWT**.

## 📚 Ressources pédagogiques

- 🎥 [Présentation du projet](https://www.youtube.com/watch?v=x6gFWmRxNPE&authuser=0)  
- 🧩 Partie Backend :
  - [Création du backend Spring Boot - Partie 1](https://www.youtube.com/watch?v=muuFQWnCQd0&authuser=0)
  - [Création du backend - Partie 2](https://www.youtube.com/watch?v=PTI8cniOXLc)
- 💡 Partie Frontend Angular :  
  - [Frontend Angular](https://www.youtube.com/watch?v=bOoPKctcE0s)
- 🔐 Sécurité Spring Security + JWT :  
  - [JWT avec Spring Security](https://www.youtube.com/watch?v=n65zFfl9dqA)

---

## 🧱 Structure de l’application

### 🔹 Frontend Angular

- **Home** : Page d’accueil.
- **Clients** : Gestion complète des clients.
- **Accounts** : Liste des comptes courants et épargnes.
- **Operations** : Visualisation des opérations DEBIT/CREDIT par compte.
- **Dashboard** : Graphiques et statistiques via `ng-chart`.
- **Security** : Authentification avec JWT et gestion des utilisateurs.

### 🔹 Backend Spring Boot

- Entités JPA : `Customer`, `BankAccount`, `SavingAccount`, `CurrentAccount`, `AccountOperation`
- Repositories Spring Data JPA
- Couche Service avec DTOs
- API REST sécurisée via Spring Security + JWT
- Documentation Swagger UI (Spring Boot 3)
  

