const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          // unique: true,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: false,
        },
        like_cnt: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        hate_cnt: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        hit: {
          type: Sequelize.INTEGER.UNSIGNED,
          allownull: false,
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
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
