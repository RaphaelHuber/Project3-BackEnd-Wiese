const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', (req, res, next) => {
  User.find()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    });
});

// router.post('/', (req, res, next) => {
//   const newUser = new User(req.body);
//   newUser.save()
//     .then((userCreated) => {
//       res.status(201).json(userCreated);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: 'internal server error' });
//     });
// });

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

router.delete('/:id', (req, res, next) => {
  User.remove({ _id: req.params.id })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

module.exports = router;
