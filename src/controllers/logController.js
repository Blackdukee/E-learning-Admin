const logService = require('../services/logService');
const { AppError } = require('../middlewares/errorHandler');

const getLogs = async (req, res) => {
  const { service } = req.params;
  const { 
    page = 1, 
    limit = 50, 
    level, 
    start_date, 
    end_date,
    user_id,
    search
  } = req.query;
  
  if (!service) {
    throw new AppError('Service parameter is required', 400);
  }
  
  const filters = {
    page: parseInt(page),
    limit: parseInt(limit),
    level,
    start_date,
    end_date,
    user_id,
    search
  };
  
  const logs = await logService.listLogs(service, filters);
  res.status(200).json(logs);
};

module.exports = {
  getLogs
};
