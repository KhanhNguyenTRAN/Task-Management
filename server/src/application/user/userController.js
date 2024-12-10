const UserService = require('../../domain/user/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Get User Profile
  getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;  // Assuming user ID is passed as URL parameter
      const user = await this.userService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  // Update User Profile
  updateUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;  // Assuming user ID is passed as URL parameter
      const user = await this.userService.updateUser(userId, req.body);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, message: 'User updated successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

module.exports = new UserController();
