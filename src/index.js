require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./routes/index");
const logger = require("./utils/logger");

const app = express();

// Swagger setup
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Service API",
      version: "1.0.0",
      description: "API documentation for the Payment Service",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5002}/api/v1` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: { ...swagger_schemas },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(async (req, res, next) => {
  // Log request to the console
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});
// Middleware
// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://js.stripe.com", // Stripe.js
          "https://checkout.stripe.com",
        ], // For embedded learning content if needed
        styleSrc: ["'self'", "'unsafe-inline'"], // For dynamic styling
        imgSrc: ["'self'", "data:", "blob:", "https://*"], // For course images
        mediaSrc: ["'self'", "https://*"], // For video/audio learning content
        connectSrc: ["'self'", "https://*"], // For API connections
        fontSrc: ["'self'", "https://*"], // For custom fonts
      },
    },
    xssFilter: true,
    frameguard: { action: "sameorigin" }, // Important for iframe embedded content
  })
);

// Configure CORS for e-learning platform
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "*" : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

app.use(express.json());

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Routes
app.use("/api/v1/admin", router);

// Serve Swagger UI
app.use("/api/v1/admin/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Health check endpoint
app.get("/api/v1/admin/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Administration service running on port ${PORT}`);
});

module.exports = app;
