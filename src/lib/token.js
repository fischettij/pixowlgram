const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;

const secret = process.env.ACCESS_TOKEN_SECRET;

const encrypt = async (aString) => bcrypt.hash(aString, 10);

const generateAccessToken = (payload) => jwt.sign(payload, secret);

const verify = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '')
      .replace('Bearer', '')
      .trim();
    req.jwt = jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json().send();
  }
};

module.exports = { encrypt, generateAccessToken, verify };
