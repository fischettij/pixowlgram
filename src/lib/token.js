const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encrypt = async (aString) => bcrypt.hash(aString, 10);

const generateAccessToken = (payload) => {
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};

module.exports = { encrypt, generateAccessToken };
