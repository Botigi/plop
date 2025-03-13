# Application Collaborative de Type Loop/Notion

Une application web collaborative permettant à plusieurs utilisateurs de travailler simultanément sur des documents, avec des fonctionnalités d'édition de texte, de tableaux, de code et de dessin.

## Fonctionnalités

- ✍️ Édition de texte collaborative en temps réel
- 📊 Tableaux avec formules
- 💻 Éditeur de code avec coloration syntaxique
- 🎨 Outils de dessin et schémas
- 👥 Collaboration jusqu'à 10 utilisateurs simultanés
- 📁 Gestion de fichiers (import/export)
- 🔒 Authentification sécurisée

## Prérequis

- Node.js >= 18
- MongoDB >= 6.0
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone [url-du-repo]
cd [nom-du-repo]
```

2. Installer les dépendances :
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configurer les variables d'environnement :
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```

4. Démarrer l'application en développement :
```bash
# Backend
cd backend
npm run dev

# Frontend (dans un autre terminal)
cd frontend
npm run dev
```

## Structure du Projet

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   └── utils/
    └── package.json
```

## Technologies Utilisées

- Frontend : React.js, TypeScript, Vite
- Backend : Node.js, Express.js, TypeScript
- Base de données : MongoDB
- Temps réel : Socket.IO
- Authentification : Firebase Auth
- Stockage : AWS S3

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 