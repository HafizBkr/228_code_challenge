// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { authMiddleware, checkRole } = require('../Middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authMiddleware, checkRole('admin'), userController.getAllUsers);

module.exports = router;
