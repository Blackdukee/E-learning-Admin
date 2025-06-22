const axios = require('axios');
const { AppError } = require('../middlewares/errorHandler');
const logger = require('../utils/logger');

const contentServiceURL = process.env.CONTENT_SERVICE_URL;
const authServiceURL = process.env.AUTH_SERVICE_URL;
const paymentServiceURL = process.env.PAYMENT_SERVICE_URL;


const getLoginStatistics = async (params = {}) => {
  try {
    const response = await axios.get(`${authServiceURL}/statistics/logins`, { params });
    return response.data;
  } catch (error) {
    logger.error(`Error fetching login statistics: ${error.message}`, error);
    throw new AppError('Failed to fetch login statistics', 500);
  }
};

const getRevenueStatistics = async (params = {}) => {
  try {
    const response = await axios.get(`${paymentServiceURL}/statistics/dashboard`, { params });
    return response.data;
  } catch (error) {
    logger.error(`Error fetching revenue statistics: ${error.message}`, error);
    throw new AppError('Failed to fetch revenue statistics', 500);
  }
};

module.exports = {
  getLoginStatistics,
  getRevenueStatistics
};
