const axios = require('axios');
const { AppError } = require('../middlewares/errorHandler');
const logger = require('../utils/logger');

const userServiceURL = process.env.USER_SERVICE_URL;

const listUsers = async (filters = {}) => {
  try {
    const response = await axios.get(`${userServiceURL}/api/users`, { params: filters });
    return response.data;
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`, error);
    throw new AppError('Failed to fetch users from user service', 500);
  }
};

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${userServiceURL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new AppError('User not found', 404);
    }
    logger.error(`Error fetching user ${userId}: ${error.message}`, error);
    throw new AppError('Failed to fetch user from user service', 500);
  }
};

const modifyUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${userServiceURL}/api/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    logger.error(`Error updating user ${userId}: ${error.message}`, error);
    if (error.response && error.response.status === 404) {
      throw new AppError('User not found', 404);
    }
    throw new AppError('Failed to update user', 500);
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${userServiceURL}/api/users/${userId}`);
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    logger.error(`Error deleting user ${userId}: ${error.message}`, error);
    if (error.response && error.response.status === 404) {
      throw new AppError('User not found', 404);
    }
    throw new AppError('Failed to delete user', 500);
  }
};

const updateUserStatus = async (userId, status) => {
  if (status !== 'active' && status !== 'suspended') {
    throw new AppError('Invalid status. Status must be either "active" or "suspended"', 400);
  }

  try {
    const response = await axios.patch(`${userServiceURL}/api/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    logger.error(`Error updating status for user ${userId}: ${error.message}`, error);
    if (error.response && error.response.status === 404) {
      throw new AppError('User not found', 404);
    }
    throw new AppError('Failed to update user status', 500);
  }
};

module.exports = {
  listUsers,
  getUserById,
  modifyUser,
  deleteUser,
  updateUserStatus
};
