const express = require('express');
const router = express.Router();
const userController = require('./userController');
const authMiddleware = require('../auth/authMiddleware');

// Get User Profile (Protected)
router.get('/:id', authMiddleware, userController.getUserProfile);

// Update User Profile (Protected)
router.put('/:id', authMiddleware, userController.updateUserProfile);

module.exports = router;
