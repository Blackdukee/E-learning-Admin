const transactionService = require('../services/paymentService');

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve a list of transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of transactions to retrieve per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The sort order
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the transactions
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the transactions
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter transactions by status
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: Filter transactions by user ID
 *       - in: query
 *         name: min_amount
 *         schema:
 *           type: number
 *         description: Filter transactions by minimum amount
 *       - in: query
 *         name: max_amount
 *         schema:
 *           type: number
 *         description: Filter transactions by maximum amount
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter transactions by type
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
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

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Retrieve a single transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: A single transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 */
const getTransactionDetails = async (req, res) => {
  const { id } = req.params;
  const transaction = await transactionService.getTransactionById(id);
  res.status(200).json(transaction);
};

module.exports = {
  getAllTransactions,
  getTransactionDetails
};
