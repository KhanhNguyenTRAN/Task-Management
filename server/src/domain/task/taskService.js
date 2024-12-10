const TaskRepository = require('../../infrastructure/db/taskRepository');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskData) {
    try {
      return await this.taskRepository.create(taskData);
    } catch (error) {
      throw new Error(`Unable to create task: ${error.message}`);
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return await this.taskRepository.update(taskId, taskData);
    } catch (error) {
      throw new Error(`Unable to update task: ${error.message}`);
    }
  }

  async deleteTask(taskId) {
    try {
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return await this.taskRepository.delete(taskId);
    } catch (error) {
      throw new Error(`Unable to delete task: ${error.message}`);
    }
  }

  async getTasksByUserId(userId) {
    try {
      return await this.taskRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(`Unable to retrieve tasks: ${error.message}`);
    }
  }
}

module.exports = TaskService;
