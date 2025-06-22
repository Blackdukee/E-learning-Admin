const statisticsService = require("../services/statisticsService");

/**
 * @swagger
 * /statistics/active-users:
 *   get:
 *     summary: Get active user statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: The timeframe for the statistics
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the statistics
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the statistics
 *     responses:
 *       200:
 *         description: Active user statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActiveUsers'
 */
const getActiveUsersStats = async (req, res, next) => {
  try {
    const { timeframe = "daily", start_date, end_date } = req.query;

    const params = {
      timeframe,
      start_date,
      end_date,
    };

    const stats = await statisticsService.getActiveUsers(params);
    res.status(200).json(stats);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

/**
 * @swagger
 * /statistics/logins:
 *   get:
 *     summary: Get login statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: The timeframe for the statistics
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the statistics
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the statistics
 *     responses:
 *       200:
 *         description: Login statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginStats'
 */
const getLoginStats = async (req, res, next) => {
 try {
    const { timeframe = "daily", start_date, end_date } = req.query;

    const params = {
      timeframe,
      start_date,
      end_date,
    };

    const stats = await statisticsService.getLoginStatistics(params);
    res.status(200).json(stats);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

/**
 * @swagger
 * /statistics/revenue:
 *   get:
 *     summary: Get revenue statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: The timeframe for the statistics
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the statistics
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the statistics
 *     responses:
 *       200:
 *         description: Revenue statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RevenueStats'
 */
const getRevenueStats = async (req, res, next) => {
  try {
    const { timeframe = "daily", start_date, end_date } = req.query;

    const params = {
      timeframe,
      start_date,
      end_date,
    };

    const stats = await statisticsService.getRevenueStatistics(params);
    res.status(200).json(stats);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  } 
};

module.exports = {
  getActiveUsersStats,
  getLoginStats,
  getRevenueStats,
};
