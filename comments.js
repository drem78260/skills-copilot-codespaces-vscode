// Create web server to handle comments from the user

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Comment = require('../models/comment');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({extended: true}));

// POST: /comment
// Create a new comment
router.post('/', function(req, res) {
  Comment.create({
    name: req.body.name,
    comment: req.body.comment
  }, function(err, comment) {
    if (err) return res.status(500).send('There was a problem adding the information to the database.');
    res.status(200).send(comment);
  });
});

// GET: /comment
// Get all comments
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) return res.status(500).send('There was a problem finding the comments.');
    res.status(200).send(comments);
  });
});

// GET: /comment/:id
// Get a single comment by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id
