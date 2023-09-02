const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

class JWT {
  static generateToken(payload) {
    const token = jwt.sign({ userId: payload.id }, secretKey, {
      expiresIn: '24h',
    });

    return token;
  }

  static verifyToken(payload) {
    return jwt.verify(payload, secretKey);
  }
}

module.exports = JWT;
