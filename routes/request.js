
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestcontroller');
const { authMiddleware, checkRole } = require('../Middleware/auth');

// Routes pour la gestion des demandes
router.post('/create', authMiddleware, checkRole('utilisateur'), requestController.createRequest);
router.put('/:id/approve', authMiddleware, checkRole(['traiteur', 'admin']), requestController.approveRequest);
router.get('/pending', authMiddleware, checkRole(['traiteur', 'admin']), requestController.getPendingRequests);
router.put('/:id/reject', authMiddleware, checkRole(['traiteur', 'admin']), requestController.rejectRequest);

module.exports = router;
