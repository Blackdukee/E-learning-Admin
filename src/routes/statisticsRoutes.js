const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/logins', statisticsController.getLoginStats);
router.get('/revenue', statisticsController.getRevenueStats);

module.exports = router;
