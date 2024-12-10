const Repository = require('../../domain/shared/repository');  // Adjust the path as necessary
const User = require('../../domain/user/user');       // Adjust the path as necessary

class UserRepository extends Repository {
  constructor() {
    super(User);  // Pass the User model to the base Repository
  }

  // Add any user-specific methods here
  async findByEmail(email) {
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      throw new Error(`Unable to retrieve user by email: ${error}`);
    }
  }
}

module.exports = UserRepository;
