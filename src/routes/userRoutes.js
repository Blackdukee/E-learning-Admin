const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateToken, requireRole } = require("../middlewares/auth");

// Middleware for admin-only access
router.use(validateToken, requireRole('Admin'));

// User Management
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserDetails);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

// User Account Status
router.post('/:id/suspend', userController.suspendUser);
router.post('/:id/activate', userController.activateUser);

// Utility Endpoints
router.post('/activate-all', userController.activateAllUsers);

module.exports = router;
