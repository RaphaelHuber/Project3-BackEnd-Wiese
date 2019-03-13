const express = require('express');

const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');


authRoutes.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.json({ message: 'Please provide a username, an email and a password' });
    return;
  }

  if (password.length < 8) {
    res.json({ message: 'Please make your password at least 8 characters' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Username check went bad.' });
      return;
    }

    if (foundUser) {
      res.json({ message: 'Username taken. Choose another one.' });
      return;
    }

    User.findOne({ email }, (err, foundEmail) => {
      if (err) {
        res.status(500).json({ message: 'Email check went bad.' });
        return;
      }

      if (foundEmail) {
        res.json({ message: 'Email taken. Choose another one.' });
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

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(aNewUser);
        });
      });
    });
  });
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
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
