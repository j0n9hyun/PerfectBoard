const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Reply = require('./reply');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Reply = Reply;

User.init(sequelize);
Comment.init(sequelize);
Reply.init(sequelize);

User.associate(db);
Comment.associate(db);
Reply.associate(db);

module.exports = db;
