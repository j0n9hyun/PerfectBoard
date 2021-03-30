const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        commenter: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Comment.hasMany(db.Reply, { foreignKey: 'test', sourceKey: 'id' });
  }
};
