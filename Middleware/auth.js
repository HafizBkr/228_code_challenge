const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const User = require('../models/User');
const { errorCodes, generateErrorResponse } = require('../utils/errorCodes');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send(generateErrorResponse(errorCodes.TOKEN_MISSING));

    try {
        const decoded = jwt.verify(token, config.secret);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send(generateErrorResponse(errorCodes.USER_NOT_FOUND));
        req.user = user;
        next();
    } catch (err) {
        res.status(500).send(generateErrorResponse(errorCodes.AUTH_ERROR, err));
    }
};

const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).send(generateErrorResponse(errorCodes.ACCESS_DENIED));
    }
    next();
};

module.exports = { authMiddleware, checkRole };
