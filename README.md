# 🎯 marketPlease (Projet scolaire)

Application web pour gérer les marchés et les utilisateurs dans le cadre du service public.  
Permet de lister les marchés, gérer les utilisateurs, postuler à un marché et assigner un marché à un utilisateur.

---

## 🛠️ Tech Stack

- **Frontend** : React + TypeScript + Mantine  
- **Backend** : Node.js + Express  
- **Base de données** : MongoDB  
- **Authentification** : JWT (token stocké dans `localStorage`)  

---

## 🚀 Fonctionnalités

- Liste et détails des marchés  
- Gestion des utilisateurs (CRUD)  
- Postulation à un marché  
- Assignation d’un marché à un utilisateur (en développement)  
- Interface responsive et stylisée avec Mantine  

---

## 💻 Installation

### 1️⃣ Cloner le projet
```bash
git clone <URL_DU_REPO>
cd <nom_du_projet>
````

### 2️⃣ Installer les dépendances

Frontend :
````
cd client
npm install
````

Backend :
````
cd ../server
npm install
````
⚡ Lancer le projet

Frontend :
````
cd client
npm run dev
````

Backend :
````
cd server
npm run dev
````

L’application sera disponible sur http://localhost:5173 (ou le port Vite par défaut).

🔑 Authentification

Les tokens JWT sont stockés dans localStorage sous la clé token.

Seul un utilisateur admin peut gérer les utilisateurs et assigner des marchés.

📝 Notes et recommandations

Les assignations de marché à un utilisateur sont en cours de développement.

Les styles utilisent Mantine, avec centrage et spacing cohérent pour les tableaux et cartes.

Pour les tests, tu peux créer des utilisateurs et marchés via l’API backend.

📂 Structure du projet
client/      # Frontend React + Mantine
server/      # Backend Node.js + Express

👨‍💻 Auteur

[KHASHAN.D]

Contact : [https://github.com/Raiser00]
