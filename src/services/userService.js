const axios = require("axios");
const { AppError } = require("../middlewares/errorHandler");
const logger = require("../utils/logger");
const { log } = require("winston");

const userServiceURL = process.env.USER_SERVICE_URL;

const listUsers = async (filters = {}, authHeader) => {
  try {
    const url = `${userServiceURL}/users`;

    logger.info(
      `Fetching users with filters: ${JSON.stringify(filters)}`
    );
    const response = await axios.get(url, {
      params: filters,
      headers: {
        "Content-Type": "application/json",
        "X-Service-Key": process.env.INTERNAL_API_KEY,
        "Authorization": authHeader,
      },
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    logger.error(
      `Error fetching users with filters ${JSON.stringify(filters)}: ${
        error.message
      }`
    );

    if (error.response && error.response.status) {
      throw new AppError(
        `Failed to fetch users: ${
          error.response.data.message || error.message
        }`,
        error.response.status
      );
    }
    throw new AppError("Failed to fetch users from user service", 500);
  }
};

const getUserById = async (userId, authHeader) => {
  try {
    const response = await axios.get(`${userServiceURL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Service-Key": process.env.INTERNAL_API_KEY,
        "Authorization": authHeader,
      },
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new AppError("User not found", 404);
    }
    logger.error(`Error fetching user ${userId}: ${error.message}`, error);
    throw new AppError("Failed to fetch user from user service", 500);
  }
};

const modifyUser = async (userId, userData, authHeader) => {
  try {
    const response = await axios.put(
      `${userServiceURL}/users/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Service-Key": process.env.INTERNAL_API_KEY,
          "Authorization": authHeader,
        },
        timeout: 5000,
      }
    );
    return response.data;
  } catch (error) {
    logger.error(`Error updating user ${userId}: ${error.message}`, error);
    if (error.response && error.response.status === 404) {
      throw new AppError("User not found", 404);
    }
    throw new AppError("Failed to update user", 500);
  }
};

const deleteUser = async (userId, authHeader) => {
  try {
    await axios.delete(`${userServiceURL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Service-Key": process.env.INTERNAL_API_KEY,
        "Authorization": authHeader,
      },
      timeout: 5000,
    });
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    logger.error(`Error deleting user ${userId}: ${error.message}`, error);
    if (error.response && error.response.status === 404) {
      throw new AppError("User not found", 404);
    }
    throw new AppError("Failed to delete user", 500);
  }
};

const updateUserStatus = async (userId, status, authHeader) => {
  if (status !== "active" && status !== "suspended") {
    throw new AppError(
      'Invalid status. Status must be either "active" or "suspended"',
      400
    );
  }

  try {
    const response = await axios.patch(
      `${userServiceURL}/users/${userId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Service-Key": process.env.INTERNAL_API_KEY,
          "Authorization": authHeader,
        },
        timeout: 5000,
      }
    );
    return response.data;
  } catch (error) {
    logger.error(
      `Error updating status for user ${userId}: ${error.message}`,
      error
    );
    if (error.response && error.response.status === 404) {
      throw new AppError("User not found", 404);
    }
    throw new AppError("Failed to update user status", 500);
  }
};

const activateAllUsers = async (authHeader) => {
  try {
    const response = await axios.post(
      `${userServiceURL}/users/activate-all`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-Service-Key": process.env.INTERNAL_API_KEY,
          "Authorization": authHeader,
        },
        timeout: 10000, // Longer timeout for bulk operation
      }
    );
    return response.data;
  } catch (error) {
    logger.error(`Error activating all users: ${error.message}`, error);
    throw new AppError("Failed to activate all users", 500);
  }
};

module.exports = {
  listUsers,
  getUserById,
  modifyUser,
  deleteUser,
  updateUserStatus,
  activateAllUsers,
};
