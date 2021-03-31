const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

module.exports = class Reply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        reply: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        // test: {
        //   type: Sequelize.INTEGER.UNSIGNED,
        //   allowNull: false,
        // },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Reply',
        tableName: 'replies',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Comment, {
      foreignKey: 'commenter_id',
      targetKey: 'id',
    });
  }
};
