'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Post, {
        through: models.Post_Tag,
        foreignKey: 'tag_id',
      });
      Tag.hasMany(models.Post_Tag, {
        foreignKey: 'tag_id',
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};
