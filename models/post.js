'use strict';
const { Model } = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'author_id' });
      Post.belongsToMany(models.Tag, {
        through: models.Post_Tag,
        foreignKey: 'post_id',
      });
      Post.hasMany(models.Post_Tag, {
        foreignKey: 'post_id',
      });
      // Post.belongsToMany(models.Category, {
      //   through: models.Post_Category,
      //   foreignKey: 'post_id',
      // });
      // Post.hasMany(models.Post_Category, {
      //   foreignKey: 'post_id',
      // });
      Post.hasMany(models.Comment, { foreignKey: 'post_id' });
    }
  }
  Post.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        validate: {
          notNull: false,
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
        },
      },
      content: {
        type: DataTypes.ENUM(
          'technology',
          'lifestyle',
          'fotography',
          'travel',
          'food',
          'fashion',
          'food',
          'tips-and-trick',
          'others'
        ),
        validate: {
          notNull: false,
        },
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
