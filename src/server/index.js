require('dotenv').config();

// Server core
const express = require('express');
const morgan = require('morgan');

// Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Database
const connectionDB = require('../db/connection.js');
connectionDB();

// Server config.
const HTTP_PORT = process.env.PORT;

// Start express
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());

// Endpoints
app.use('/', require('../endpoints/rootRoutes'));
app.use('/users', require('../endpoints/userRoutes'));
app.use('/projects', require('../endpoints/projectRoutes'));

// Starting the server.
app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});

module.exports = app;
