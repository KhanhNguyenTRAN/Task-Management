const express = require('express');
const TaskController = require('./taskController');
const router = express.Router();

// Task routes
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.get('/:id', TaskController.getTaskById);
router.get('/user/:userId', TaskController.getTasksByUserId);

module.exports = router;
