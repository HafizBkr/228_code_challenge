const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const errorHandler = require('./Middleware/errorHandler');
const requestRoutes = require('./routes/request');

dotenv.config();

const app = express();

// Mise à jour de la configuration de connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/request', requestRoutes);
app.use('/protected', protectedRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
