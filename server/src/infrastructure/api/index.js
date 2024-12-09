require('dotenv').config();
const express = require('express');
const connectDB = require('../db/mongoConnection');

const app = express();
const PORT = process.env.PORT;

connectDB(); 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is the Task Manager API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
