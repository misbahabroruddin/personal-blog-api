'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Social_Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Social_Media.belongsToMany(models.User, {
        through: models.User_Social_Media,
        foreignKey: 'user_id',
      });
    }
  }
  Social_Media.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Social_Media',
    }
  );
  return Social_Media;
};
