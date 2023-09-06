'use strict';
const { Model } = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'author', foreignKey: 'author_id' });
      Post.belongsToMany(models.Tag, {
        as: 'tags',
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
      Post.hasMany(models.Comment, { as: 'comments', foreignKey: 'post_id' });
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
      thumbnail_url: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
        },
      },
      category: {
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
