const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AppError('Invalid authentication token', 401);
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!decoded.isAdmin) {
        throw new AppError('Not authorized to access admin resources', 403);
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
};

const mockAdminAuth = (req, res, next) => {
  req.user = {
    id: 1,
    isAdmin: true
  };
  next();
};

module.exports = {
  mockAdminAuth,
  authenticateAdmin
};
