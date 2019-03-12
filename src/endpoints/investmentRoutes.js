const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const Project = require('../models/Project.js');
const Investment = require('../models/Investment.js');

router.get('/', (req, res, next) => {
  Investment.find()
    .then((allInvestments) => {
      res.status(200).json(allInvestments);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST
router.post('/', (req, res, next) => {
  const newInvestment = new Investment(req.body);
  newInvestment.save()
    .then((investmentCreated) => {
      Project.findByIdAndUpdate(
        { _id: investmentCreated.project },
        { $push: { investments: investmentCreated._id } }
      )
        .then(() => {
          User.findByIdAndUpdate(
            { _id: investmentCreated.investor },
            { $push: { investments: investmentCreated._id } }
          )
            .then(() => {
              res.status(201).json(investmentCreated);
            });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

// router.put('/:id', (req, res, next) => {
//   Investment.findByIdAndUpdate({ _id: req.params.id }, req.body)
//     .then(() => {
//       res.status(200).end();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: 'internal server error' });
//     });
// });

// router.delete('/:id', (req, res, next) => {
//   Investment.remove({ _id: req.params.id })
//     .then(() => {
//       res.status(200).end();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: 'internal server error' });
//     });
// });

module.exports = router;
