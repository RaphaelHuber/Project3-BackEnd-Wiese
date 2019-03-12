const express = require('express');

const router = express.Router();
const Project = require('../models/Project.js');

router.get('/', (req, res, next) => {
  Project.find()
    .populate('owner')
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

// POST
router.post('/', (req, res, next) => {
  Project.create({
    owner: req.user._id,
    name: req.body.name,
    country: req.body.country
  })
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
