const express = require('express');
const setupRoutes = require('./routes');
require('dotenv').config();
const logger = require('../logging/logger');
const connectDB = require('../db/mongoConnection');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Setup Routes
setupRoutes(app);  // Ensure authRoutes are included in the setupRoutes function

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
