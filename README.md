
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
