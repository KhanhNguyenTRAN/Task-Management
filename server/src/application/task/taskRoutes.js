const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const authMiddleware = require('../auth/authMiddleware');

// Create Task (Protected)
router.post('/', authMiddleware, taskController.createTask);

// Get Tasks by User ID (Protected)
router.get('/user/:userId', authMiddleware, taskController.getTasksByUserId);

// Update Task (Protected)
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete Task (Protected)
router.delete('/:id', authMiddleware, taskController.deleteTask);

router.get('/search', authMiddleware, taskController.searchTasks);

module.exports = router;
