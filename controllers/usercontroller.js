const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const { errorCodes, generateErrorResponse } = require('../utils/errorCodes');

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Validation des données d'entrée
        if (!username || !password || !email || !role) {
            return res.status(400).send(generateErrorResponse(errorCodes.INVALID_DATA, "Tous les champs sont obligatoires."));
        }

        // Vérifier si l'utilisateur existe déjà
        let userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).send(generateErrorResponse(errorCodes.USER_ALREADY_EXISTS, "L'utilisateur existe déjà."));
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = new User({ username, password: hashedPassword, email, role });
        await user.save();

        res.status(201).send({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error(`Erreur d'inscription: ${error.message}`);
        res.status(500).send(generateErrorResponse(errorCodes.REGISTER_ERROR, error.message));
    }
};

exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Rechercher l'utilisateur par nom d'utilisateur ou e-mail
        const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
        if (!user) {
            return res.status(404).send(generateErrorResponse(errorCodes.USER_NOT_FOUND, "Utilisateur non trouvé."));
        }

        // Comparaison des mots de passe
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send(generateErrorResponse(errorCodes.INVALID_PASSWORD, "Mot de passe incorrect."));
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error(`Erreur de connexion: ${error.message}`);
        res.status(500).send(generateErrorResponse(errorCodes.LOGIN_ERROR, error.message));
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        res.status(500).send(generateErrorResponse(errorCodes.FETCH_USERS_ERROR, error.message));
    }
};
