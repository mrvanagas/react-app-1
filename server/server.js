const express = require('express');
const Mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const courseRoutes = require('./routes/courseRoutes');
const courseRequestRoutes = require('./routes/courseRequestRoutes');

const server = express();
const {SERVER_PORT, DB_URL} = process.env;

// Middlewares
server.use(express.json());
server.use(cors());
server.use(morgan('tiny'));
// Routes
server.use('/api/users', userRoutes);
server.use('/api/locations', locationRoutes);
server.use('/api/courses', courseRoutes);
server.use('/api/courseRequests', courseRequestRoutes);

Mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnection = Mongoose.connection;

dbConnection.on('connected', () => {
  server.listen(SERVER_PORT, () => {
    console.log('Server ir running on http://localhost:5000');
  }); 
});

dbConnection.on('error', (err) => {
  console.log('DB connection failed:');
  console.log(err.message);
});
