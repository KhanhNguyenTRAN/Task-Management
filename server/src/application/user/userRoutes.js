const express = require('express');
const UserController = require('./userController');
const router = express.Router();

// Routes configuration
router.get('/:id', UserController.getUserProfile);  // Get user profile by ID
router.put('/:id', UserController.updateUserProfile);  // Update user profile by ID

// Additional routes can be added here

module.exports = router;
