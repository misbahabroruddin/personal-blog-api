'use strict';
const { Model } = require('sequelize');
const Post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }
  Comment.init(
    {
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
      name: {
        type: DataTypes.STRING,
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
