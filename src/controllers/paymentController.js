const transactionService = require('../services/paymentService');

const getAllTransactions = async (req, res) => {
  const { 
    page = 1, 
    limit = 20, 
    sort = 'date', 
    order = 'desc', 
    start_date, 
    end_date,
    status,
    user_id,
    min_amount,
    max_amount,
    type
  } = req.query;
  
  const filters = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
    order,
    start_date,
    end_date,
    status,
    user_id,
    min_amount,
    max_amount,
    type
  };
  
  const transactions = await transactionService.listTransactions(filters);
  res.status(200).json(transactions);
};

const getTransactionDetails = async (req, res) => {
  const { id } = req.params;
  const transaction = await transactionService.getTransactionById(id);
  res.status(200).json(transaction);
};

module.exports = {
  getAllTransactions,
  getTransactionDetails
};
