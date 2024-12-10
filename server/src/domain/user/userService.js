const UserRepository = require('../../infrastructure/db/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData) {
    try {
      // Check if user already exists
      const userExists = await this.userRepository.findOne({ email: userData.email });
      if (userExists) {
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user with hashed password
      const user = await this.userRepository.create({
        ...userData,
        password: hashedPassword
      });

      return this.generateToken(user._id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (user && await bcrypt.compare(password, user.password)) {
        return this.generateToken(user._id);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  }
}

module.exports = UserService;
