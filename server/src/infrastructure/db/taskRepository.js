const Repository = require('../../domain/shared/repository');  // Adjust the path as necessary
const Task = require('../../domain/task/task');       // Adjust the path as necessary

class TaskRepository extends Repository {
  constructor() {
    super(Task);  // Pass the Task model to the base Repository
  }

  // Add any task-specific methods here
  async findByUserId(userId) {
    try {
      return await this.model.find({ user: userId });
    } catch (error) {
      throw new Error(`Unable to retrieve tasks for user: ${error}`);
    }
  }

  // Add a general find method for dynamic queries
  async find(query) {
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(`Unable to search tasks: ${error}`);
    }
  }
}

module.exports = TaskRepository;
