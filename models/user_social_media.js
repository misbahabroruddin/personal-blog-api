'use strict';
const { Model } = require('sequelize');
const Social_Media = require('./social_media');
module.exports = (sequelize, DataTypes) => {
  class User_Social_Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Social_Media.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      User_Social_Media.belongsTo(models.Social_Media, {
        foreignKey: 'social_media_id',
      });
    }
  }
  User_Social_Media.init(
    {
      user_id: DataTypes.INTEGER,
      social_media_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Social_Media,
          key: 'id',
        },
      },
      social_media_link: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: 'Invalid URL',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User_Social_Media',
    }
  );
  return User_Social_Media;
};
