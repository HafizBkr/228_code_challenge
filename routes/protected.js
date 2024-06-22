const express = require('express');
const router = express.Router();
const { authMiddleware, checkRole } = require('../Middleware/auth');

router.get('/admin-only', authMiddleware, checkRole('admin'), (req, res) => {
    res.send('This is a protected route for admins only');
});

router.get('/traiteur-only', authMiddleware, checkRole('traiteur'), (req, res) => {
    res.send('This is a protected route for traiteurs only');
});

router.get('/utilisateur-only', authMiddleware, checkRole('utilisateur'), (req, res) => {
    res.send('This is a protected route for utilisateurs only');
});

module.exports = router;
