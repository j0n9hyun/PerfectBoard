var express = require('express');
var router = express.Router();
const { User, Comment } = require('../models');

router.get('/', (req, res) => {
  res.send('test API');
});

router.get('/test', async (req, res) => {
  const users = await User.findAll({ order: [['id', 'asc']] });
  res.send(users);
});

router.get('/test2', async (req, res) => {
  const comments = await Comment.findAll();
  res.send(comments);
});

router.post('/test2', async (req, res) => {
  const r = await Comment.create(req.body);
  // console.log(req.body);
  console.log(r);
  res.send(r);
});

module.exports = router;
