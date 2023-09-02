const { Op } = require('sequelize');
const { User } = require('./../models');
const bcrypt = require('bcrypt');
const JWT = require('./../lib/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { first_name, last_name, username, email, password } = req.body;

      const foundUser = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });

      if (foundUser) throw { name: 'dataExist' };

      await User.create({
        first_name,
        last_name,
        email,
        username,
        password,
      });

      res.status(201).json({
        success: true,
        message: 'Successfully register',
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (!foundUser) throw { name: 'credential' };

      const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);

      if (!isPasswordMatch) throw { name: 'credential' };

      const token = JWT.generateToken(foundUser);

      res.status(200).json({
        success: true,
        message: 'Login Success',
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
