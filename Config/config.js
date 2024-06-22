// config.js

require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET,
    url: process.env.MONGO_URI
};
