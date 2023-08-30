'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { Post, Tag } = require('./');
  class Post_Tag extends Model {
    static associate(models) {
      Post_Tag.belongsTo(models.Post, { foreignKey: 'post_id' });
      Post_Tag.belongsTo(models.Tag, { foreignKey: 'tag_id' });
    }
  }
  Post_Tag.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Post,
          key: 'id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Tag,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Post_Tag',
    }
  );
  return Post_Tag;
};
