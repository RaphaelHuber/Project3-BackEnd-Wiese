require('dotenv').config();
const cors = require('cors');

// Server core
const express = require('express');
const morgan = require('morgan');

// Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('../configs/passport');

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

// Session settings
app.use(session({
  secret: 'Weird dotty chairs in darkness',
  resave: true,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080'] // React app URL
}));

// Endpoints
app.use('/', require('../endpoints/rootRoutes'));
app.use('/auth', require('../endpoints/auth-routes'));
app.use('/users', require('../endpoints/userRoutes'));
app.use('/projects', require('../endpoints/projectRoutes'));
app.use('/investments', require('../endpoints/investmentRoutes'));

// Starting the server.
app.listen(HTTP_PORT, () => {
  console.log(`My server is listening on port ${HTTP_PORT}!`);
});

module.exports = app;
