const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/auth");
const userRoutes = require("./userRoutes");
const statisticsRoutes = require("./statisticsRoutes");
const transactionRoutes = require("./transactionRoutes");

// Mount routes
router.use("/users", userRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;
