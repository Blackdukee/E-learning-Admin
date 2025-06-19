const axios = require('axios');
const { AppError } = require('../middlewares/errorHandler');
const logger = require('../utils/logger');

const transactionServiceURL = process.env.PAYMENT_SERVICE_URL;

const listTransactions = async (filters = {}) => {
  try {
    const response = await axios.get(`${transactionServiceURL}/api/transactions`, { params: filters });
    return response.data;
  } catch (error) {
    logger.error(`Error fetching transactions: ${error.message}`, error);
    throw new AppError('Failed to fetch transactions', 500);
  }
};

const getTransactionById = async (transactionId) => {
  try {
    const response = await axios.get(`${transactionServiceURL}/api/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new AppError('Transaction not found', 404);
    }
    logger.error(`Error fetching transaction ${transactionId}: ${error.message}`, error);
    throw new AppError('Failed to fetch transaction', 500);
  }
};

module.exports = {
  listTransactions,
  getTransactionById
};
