const logger = require("../utils/logger");

class AppError extends Error {
  constructor(name = "AppError", message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // For unhandled errors
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
  
};

module.exports = {
  AppError,
  errorHandler,
};
