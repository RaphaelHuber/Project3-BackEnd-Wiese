const express = require('express');

const router = express.Router();
const Project = require('../models/Project.js');

router.get('/', (req, res, next) => {
  Project.find()
    .populate('owner', 'username')
    .then((allProjects) => {
      res.status(200).json(allProjects);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET one project
router.get('/:id', (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then((oneProject) => {
      res.status(200).json(oneProject);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

// GET user's projects
router.get('/myProjects/:userID', (req, res, next) => {
  Project.find( {owner: req.params.userID} )
    // .populate('owner', 'username')
    .then((userProjects) => {
      res.status(200).json(userProjects);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST
router.post('/', (req, res, next) => {
  const { owner, name, country, energySource, description, minimumAmount, targetAmount, minimumInvestment, expectedReturn, investmentPeriod,paymentPeriod, periodicity, picture } = req.body;
  Project.create({ owner, name, country, energySource, description, minimumAmount, targetAmount, minimumInvestment, expectedReturn, investmentPeriod,paymentPeriod, periodicity, picture })
    .then((projectCreated) => {
      res.status(201).json(projectCreated);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

router.put('/:id', (req, res, next) => {
  Project.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

router.delete('/:id', (req, res, next) => {
  Project.remove({ _id: req.params.id })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'internal server error' });
    });
});

module.exports = router;
