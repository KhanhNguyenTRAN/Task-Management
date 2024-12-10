const TaskService = require('../../domain/task/taskService');

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  // Create a new task
  createTask = async (req, res) => {
    try {
      const taskData = req.body;
      const task = await this.taskService.createTask(taskData);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Update an existing task
  updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const taskData = req.body;
      const updatedTask = await this.taskService.updateTask(taskId, taskData);
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Delete a task
  deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await this.taskService.deleteTask(taskId);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Get task by ID
  getTaskById = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // List all tasks for a user
  getTasksByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;  // Assuming userId is passed as a URL parameter
      const tasks = await this.taskService.getTasksByUserId(userId);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}

module.exports = new TaskController();
