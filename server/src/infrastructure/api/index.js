require('dotenv').config();
const express = require('express');
const connectDB = require('../db/mongoConnection');
const logger = require('../logging/logger');
const setupRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
