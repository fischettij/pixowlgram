const { check, validationResult } = require('express-validator');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

// Private
const findUser = async (email) => User.findOne({ where: { email } });

// Public
const formValidations = [
  check('email', 'E-Mail is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: 'Token not created',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const user = await findUser(req.body.email);
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        // Valid password
      } else {
        // invalid password
      }
    });
  } else {
    // User not found
  }
  return res;
};

module.exports = { formValidations, create };
