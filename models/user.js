'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment, { foreignKey: 'user_id' });
      User.hasMany(models.Post, { foreignKey: 'author_id' });
      User.belongsToMany(models.Social_Media, {
        through: models.User_Social_Media,
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
          isEmail: {
            msg: 'Invalid Email',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notNull: false,
        },
      },
      image_url: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          let password = user.password;
          const hashPassword = bcrypt.hashSync(password, salt);
          user.password = hashPassword;
        },
        beforeUpdate: (user, options) => {
          let password = user.password;
          const hashPassword = bcrypt.hashSync(password, salt);
          user.password = hashPassword;
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
