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
  
      // Create user without manually hashing the password
      const user = await this.userRepository.create(userData);
  
      return this.generateToken(user._id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async authenticateUser(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
  
      // Log the provided password and the stored hashed password
      console.log('Provided Password:', password);
      console.log('Stored Hashed Password:', user.password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password Match:', isMatch);
  
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
  
      return this.generateToken(user._id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async findUserById(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  generateToken(userId) {
    if (!userId) {
      throw new Error('User ID is undefined');
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1h'
    });
  }  
}

module.exports = UserService;
