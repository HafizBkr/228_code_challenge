const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const requestRoutes = require('./routes/request');
const errorHandler = require('./Middleware/errorHandler');

dotenv.config();

const app = express();

// Mise à jour de la configuration de connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Configuration CORS
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/request', requestRoutes);
app.use('/protected', protectedRoutes);

// Servir les fichiers statiques depuis le dossier frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Gérer les erreurs
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
