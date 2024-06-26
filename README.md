# 228_code_challenge
├── Config
│   ├── config.js         // Configuration générale de l'application
│   └── database.js       // Configuration de la base de données (si nécessaire)
├── controllers
│   ├── requestcontroller.js   // Contrôleur pour les requêtes (exemple)
│   └── usercontroller.js      // Contrôleur pour les utilisateurs (exemple)
├── documents
│   └── Request_6677205fa1d6cafcdccaaf3b.pdf   // Exemple de document
├── frontend
│   ├── admin
│   │   ├── dashboard.html    // Page du tableau de bord admin
│   │   ├── index.html        // Page d'accueil admin (si nécessaire)
│   │   ├── script.js         // Script JavaScript pour l'admin
│   │   └── style.css         // Feuille de style pour l'admin
│   ├── images                // Dossier pour les images (si nécessaire)
│   ├── index.html            // Page d'accueil générale (par exemple, pour les utilisateurs non authentifiés)
│   ├── login.html            // Page de connexion
│   ├── script.js             // Script JavaScript global
│   ├── style.css             // Feuille de style globale
│   ├── traiteur
│   │   ├── dashboard.html    // Page du tableau de bord traiteur
│   │   ├── index.html        // Page d'accueil traiteur (si nécessaire)
│   │   ├── script.js         // Script JavaScript pour le traiteur
│   │   └── style.css         // Feuille de style pour le traiteur
│   └── utilisateur
│       ├── dashboard.html    // Page du tableau de bord utilisateur
│       ├── index.html        // Page d'accueil utilisateur (si nécessaire)
│       ├── script.js         // Script JavaScript pour l'utilisateur
│       └── style.css         // Feuille de style pour l'utilisateur
├── Middleware
│   ├── auth.js              // Middleware pour l'authentification
│   └── errorHandler.js      // Middleware pour la gestion des erreurs
├── models
│   ├── Request.js           // Modèle de données pour les requêtes (exemple)
│   └── User.js              // Modèle de données pour les utilisateurs
├── node_modules            // Répertoire des modules Node.js (généré par npm)
├── routes
│   ├── protected.js         // Routes protégées (exigeant une authentification)
│   ├── request.js           // Routes pour les requêtes (exemple)
│   └── user.js              // Routes pour les utilisateurs
├── server.js               // Fichier principal de démarrage du serveur
├── test.js                 // Fichier de tests (si nécessaire)
└── utils
    ├── errorCodes.js        // Codes d'erreur personnalisés
    ├── pdfGenerator.js      // Utilitaire pour la génération de PDF (exemple)
    └── sendEmail.js         // Utilitaire pour l'envoi d'e-mails (exemple)


Documentation du Backend

Ce projet contient un backend pour la gestion des demandes et des utilisateurs. Voici les principales fonctionnalités et leurs routes associées :
Routes Utilisateur (/users)
Connexion

    POST /users/login : Permet à un utilisateur de se connecter en fournissant son nom d'utilisateur ou son email ainsi que son mot de passe.

Inscription

    POST /users/register : Permet à un nouvel utilisateur de s'inscrire en fournissant les informations nécessaires comme le nom d'utilisateur, l'email et le mot de passe.

Profil Utilisateur

    GET /users/profile : Récupère les informations du profil de l'utilisateur connecté.

Gestion des Utilisateurs (Admin)

    GET /users/ : Récupère la liste de tous les utilisateurs (nécessite un rôle admin).
    PUT /users/
    : Met à jour les informations d'un utilisateur spécifié par son ID (nécessite un rôle admin).
    DELETE /users/
    : Supprime un utilisateur spécifié par son ID (nécessite un rôle admin).

Routes Demandes (/request)
Création de Demande

    POST /request/create : Crée une nouvelle demande en spécifiant la description et d'autres détails nécessaires.

Liste des Demandes en Attente

    GET /request/pending : Récupère la liste des demandes en attente de traitement.

Approuver ou Rejeter une Demande

    PUT /request/
    /approve : Approuve une demande spécifiée par son ID.
    PUT /request/
    /reject : Rejette une demande spécifiée par son ID.

Routes Protégées (/protected)
Exemple de Route Protégée

    GET /protected/example : Exemple de route protégée nécessitant une autorisation avec un token JWT valide.


GENERATION D'UN DOCUMENT PDF SUITE A UNE ACEPTATION OU  A UN REJET D'UNE DEMANDE SUIVIE DE L'ENVOIE DE CE DOCUMENT AU MAIL DE L'UTILISATEUR