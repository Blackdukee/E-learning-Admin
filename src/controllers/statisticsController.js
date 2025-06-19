const statisticsService = require("../services/statisticsService");

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
