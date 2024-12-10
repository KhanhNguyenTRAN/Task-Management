const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../../domain/user/userService');

class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  async register(userData) {
    try {
      // Use UserService to create a new user
      const user = await this.userService.registerUser(userData);
      return user;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.userService.authenticateUser(email, password);
      return user;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  async verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

module.exports = AuthService;
