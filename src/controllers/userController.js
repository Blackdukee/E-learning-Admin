const userService = require('../services/userService');
const { AppError } = require('../middlewares/errorHandler');
const Joi = require('joi');

const validateUserUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    role: Joi.string().valid('user', 'admin', 'manager'),
    // Add other fields as required
  });

  const { error } = schema.validate(data);
  if (error) throw new AppError(error.details[0].message, 400);
};

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 20, status, role, search } = req.query;
  
  const filters = {
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    role,
    search
  };

  const users = await userService.listUsers(filters);
  res.status(200).json(users);
};

const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  
  validateUserUpdate(userData);
  
  const updatedUser = await userService.modifyUser(id, userData);
  res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(200).json({ success: true, message: 'User successfully deleted' });
};

const suspendUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUserStatus(id, 'suspended');
  res.status(200).json(updatedUser);
};

const activateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUserStatus(id, 'active');
  res.status(200).json(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserDetails,
  updateUser,
  removeUser,
  suspendUser,
  activateUser
};
