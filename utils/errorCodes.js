const errorCodes = {
    REGISTER_ERROR: { code: 'REGISTER_ERROR', message: 'Erreur lors de la création de l\'utilisateur.' },
    USER_NOT_FOUND: { code: 'USER_NOT_FOUND', message: 'Utilisateur non trouvé.' },
    INVALID_PASSWORD: { code: 'INVALID_PASSWORD', message: 'Mot de passe incorrect.' },
    LOGIN_ERROR: { code: 'LOGIN_ERROR', message: 'Erreur lors de la connexion.' },
    FETCH_USERS_ERROR: { code: 'FETCH_USERS_ERROR', message: 'Erreur lors de la récupération des utilisateurs.' },
    CREATE_REQUEST_ERROR: { code: 'CREATE_REQUEST_ERROR', message: 'Erreur lors de la création de la demande.' },
    REQUEST_NOT_FOUND: { code: 'REQUEST_NOT_FOUND', message: 'Demande non trouvée.' },
    APPROVE_REQUEST_ERROR: { code: 'APPROVE_REQUEST_ERROR', message: 'Erreur lors de l\'approbation de la demande.' },
    FETCH_REQUESTS_ERROR: { code: 'FETCH_REQUESTS_ERROR', message: 'Erreur lors de la récupération des demandes.' },
    GENERAL_ERROR: { code: 'GENERAL_ERROR', message: 'Erreur générale.' },
    TOKEN_MISSING: { code: 'TOKEN_MISSING', message: 'Token manquant.' },
    AUTH_ERROR: { code: 'AUTH_ERROR', message: 'Erreur d\'authentification.' },
    ACCESS_DENIED: { code: 'ACCESS_DENIED', message: 'Accès refusé.' }
};

const generateErrorResponse = (errorObject, additionalInfo = {}) => {
    return {
        error: {
            code: errorObject.code,
            message: errorObject.message,
            additionalInfo: additionalInfo
        }
    };
};

module.exports = { errorCodes, generateErrorResponse };
