// config.js

require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    database: process.env.MONGO_URI
};
