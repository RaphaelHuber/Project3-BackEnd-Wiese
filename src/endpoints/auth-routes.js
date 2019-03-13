const express = require('express');

const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

function validateEmail(text) {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(text);
}

authRoutes.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if (validateEmail(email) === false) {
    res.json({ message: 'Please enter a valid E-Mail' });
    return;
  }

  if (password.length < 8) {
    res.json({ message: 'Please make your Password at least 8 characters long' });
    return;
  }

  if (!username || !email || !password) {
    res.json({ message: 'Please provide a Username, an E-Mail and a Password' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Username check went bad.' });
      return;
    }

    if (foundUser) {
      res.json({ message: 'This Username is already taken. Please choose another one.' });
      return;
    }

    User.findOne({ email }, (err, foundEmail) => {
      if (err) {
        res.status(500).json({ message: 'E-Mail check went bad.' });
        return;
      }

      if (foundEmail) {
        res.json({ message: 'E-Mail taken. Choose another one.' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username,
        email,
        password: hashPass
      });

      aNewUser.save((err) => {
        if (err) {
          res.json({ message: 'Saving user to database went wrong.' });
          return;
        }

        // Automatically log in user after sign up
        req.login(aNewUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }

          res.status(200).json(aNewUser);
        });
      });
    });
  });
});

authRoutes.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate('local', (err, theUser) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!username || !password) {
      res.json({ message: 'Please provide a Username and Password' });
      return;
    }

    if (!theUser) {
      res.json({ message: 'Your Username or Password is wrong' });
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;
