# Administration Service

> Administration Service is a RESTful API built with Node.js and Express, designed to manage users, transactions, and statistics for an administration platform.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Transaction Routes](#transaction-routes)
  - [Statistics Routes](#statistics-routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Features

- User management (CRUD)
- Transaction processing
- Aggregated statistics reporting
- Authentication and authorization middleware
- Centralized error handling
- Structured logging

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn
- A running database (MongoDB, PostgreSQL, etc.) if using persistent storage

## Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>
   cd administration-service
   ```

2. Install dependencies:

   ```shell
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```dotenv
PORT=3000
DATABASE_URL=<your database connection string>
JWT_SECRET=<your jwt secret>
LOG_LEVEL=info
```

- `PORT` – Port on which the API will listen (default: 3000)
- `DATABASE_URL` – Connection string for your database
- `JWT_SECRET` – Secret key for signing JWT tokens
- `LOG_LEVEL` – Logging verbosity (e.g., `info`, `debug`, `warn`)

## Project Structure

```
📦 administration-service
 ┣ 📂 src
 ┃ ┣ 📂 controllers      # Request handlers
 ┃ ┃ ┣ 📜 logController.js
 ┃ ┃ ┣ 📜 paymentController.js
 ┃ ┃ ┣ 📜 statisticsController.js
 ┃ ┃ ┗ 📜 userController.js
 ┃ ┣ 📂 middlewares      # Custom Express middleware
 ┃ ┃ ┣ 📜 auth.js
 ┃ ┃ ┗ 📜 errorHandler.js
 ┃ ┣ 📂 routes           # Express route definitions
 ┃ ┃ ┣ 📜 index.js
 ┃ ┃ ┣ 📜 statisticsRoutes.js
 ┃ ┃ ┣ 📜 transactionRoutes.js
 ┃ ┃ ┗ 📜 userRoutes.js
 ┃ ┣ 📂 services         # Business logic and data access
 ┃ ┃ ┣ 📜 paymentService.js
 ┃ ┃ ┣ 📜 statisticsService.js
 ┃ ┃ ┗ 📜 userService.js
 ┃ ┗ 📂 utils            # Utility modules
 ┃ ┃ ┗ 📜 logger.js
 ┣ 📜 package.json
 ┗ 📜 README.md
```

## Running the Service

Start the server in development mode with hot-reload (if you have `nodemon` installed):

```shell
npm run dev
# or
npx nodemon src/index.js
```

Or in production mode:

```shell
npm start
```

By default, the service listens on the port defined in `PORT` (3000).

## API Endpoints

### User Routes

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/api/users`       | List all users                |
| GET    | `/api/users/:id`   | Retrieve a user by ID         |
| POST   | `/api/users`       | Create a new user             |
| PUT    | `/api/users/:id`   | Update an existing user       |
| DELETE | `/api/users/:id`   | Delete a user                 |

### Transaction Routes

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/transactions`        | List all transactions         |
| POST   | `/api/transactions`        | Create a new transaction      |

### Statistics Routes

| Method | Endpoint                 | Description                   |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/api/statistics`        | Retrieve aggregated statistics|

## Middleware

- **auth.js**: Verifies JWT tokens and protects routes.
- **errorHandler.js**: Catches errors thrown in controllers and returns formatted responses.

## Error Handling

Errors are caught by the central error handler. Responses follow this structure:

```json
{
  "status": "error",
  "message": "Error description",
  "details": { /* optional */ }
}
```

## Logging

All logs are structured using the `logger` utility. Log levels can be adjusted via the `LOG_LEVEL` environment variable.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeatureName`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeatureName`
5. Open a pull request

Please ensure code is linted and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
