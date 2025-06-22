const userService = require("../services/userService");
const { AppError } = require("../middlewares/errorHandler");
const Joi = require("joi");

const validateUserUpdate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    role: Joi.string().valid("Admin", "User"),
    // Add other fields as required
  });

  const { error } = schema.validate(data);
  if (error) throw new AppError(error.details[0].message, 400);
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
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
 *         description: The number of users to retrieve per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter users by status (e.g., active, suspended)
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter users by role
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for users by name or email
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
const getAllUsers = async (req, res) => {
  const { Query, Role, IsActive, Page = 1, Limit = 10 } = req.query;

  // Prepare filters for user service
  const filters = {
    Query,
    Role,
    IsActive: IsActive !== undefined ? IsActive === 'true' : undefined,
    Page: parseInt(Page),
    Limit: parseInt(Limit),
  };

  const authHeader = req.headers.authorization;
  const users = await userService.listUsers(filters, authHeader);
  res.status(200).json(users);
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  const user = await userService.getUserById(id, authHeader);
  res.status(200).json(user);
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  validateUserUpdate(userData);
  const authHeader = req.headers.authorization;

  const updatedUser = await userService.modifyUser(id, userData, authHeader);
  res.status(200).json({ message: "User updated successfully." });
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
const removeUser = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  await userService.deleteUser(id, authHeader);
  res.status(200).json({ message: "User deleted successfully." });
};

/**
 * @swagger
 * /users/{id}/suspend:
 *   post:
 *     summary: Suspend a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const suspendUser = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  await userService.updateUserStatus(id, "suspended", authHeader);
  res.status(200).json({ message: "User suspended successfully." });
};

/**
 * @swagger
 * /users/{id}/activate:
 *   post:
 *     summary: Activate a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const activateUser = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  await userService.updateUserStatus(id, "active", authHeader);
  res.status(200).json({ message: "User activated successfully." });
};

const activateAllUsers = async (req, res) => {
  const authHeader = req.headers.authorization;
  
  await userService.activateAllUsers(authHeader);
  res.status(200).json({ message: "All users activated successfully." });
};

module.exports = {
  getAllUsers,
  getUserDetails,
  updateUser,
  removeUser,
  suspendUser,
  activateUser,
  activateAllUsers,
};
