const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validateToken } = require("../middlewares/auth");

router.use(validateToken);

router.get('/', paymentController.getAllTransactions);
router.get('/:id', paymentController.getTransactionDetails);

module.exports = router;
