const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserDetails);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);
router.post('/:id/suspend', userController.suspendUser);
router.post('/:id/activate', userController.activateUser);

module.exports = router;
