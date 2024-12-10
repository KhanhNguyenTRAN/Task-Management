const userRoutes = require('../../application/user/userRoutes');
const authRoutes = require('../../application/auth/authRoutes');
const taskRoutes = require('../../application/task/taskRoutes');

module.exports = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);  // Ensure auth routes are included
  app.use('/api/tasks', taskRoutes);
};
