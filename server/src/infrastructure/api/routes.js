const userRoutes = require('../../application/user/userRoutes');
const taskRoutes = require('../../application/task/taskRoutes');

module.exports = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/tasks', taskRoutes);

  // Add more routes as needed
};
