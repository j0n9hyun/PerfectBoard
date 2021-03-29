var express = require('express');
var router = express.Router();
const { User, Comment } = require('../models');

router.get('/test', async (req, res) => {
  const users = await User.findAll({ order: [['id', 'asc']] });
  res.send(users);
});

router.get('/test2', async (req, res) => {
  const comments = await Comment.findAll();
  res.send(comments);
});

module.exports = router;
