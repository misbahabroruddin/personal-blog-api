'use strict';
const { Model } = require('sequelize');
const { User, Post } = require('./');
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
          notNull: {
            msg: "Can't be null",
          },
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Post,
          key: 'id',
        },
        validate: {
          notNull: {
            msg: "Can't be null",
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Can't be null",
          },
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
