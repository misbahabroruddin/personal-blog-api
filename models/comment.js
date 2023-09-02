'use strict';
const { Model } = require('sequelize');
const User = require('./user');
const Post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }
  Comment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        validate: {
          notNull: false,
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Post,
          key: 'id',
        },
        validate: {
          notNull: false,
        },
      },
      comment: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
