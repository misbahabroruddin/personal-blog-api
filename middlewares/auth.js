const JWT = require('../lib/jwt');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw { name: 'unauthorized' };
    }

    const user = JWT.verifyToken(token);

    const foundUser = await User.findOne({
      where: { id: user.userId },
    });

    if (!foundUser) {
      throw { name: 'notFound' };
    }

    req.loggedUser = {
      id: foundUser.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
