const { check, validationResult } = require('express-validator');
const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes').StatusCodes;
const { encrypt } = require('../lib/token');
const { User } = require('../../db/models');

// Private
const emailNotRegistered = async (value) => {
  if (!value) return Promise.resolve();
  const user = await User.count({ where: { email: value } });
  return user > 0 ? Promise.reject() : Promise.resolve();
};

// Public
const formValidations = [
  check('email', 'E-Mail is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'E-Mail address already exists').custom(emailNotRegistered),
];

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: 'Validation Errors',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const hashedPassword = await encrypt(req.body.password);
  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(CREATED).json({ created: true });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'Something has failure, try again',
      error: error.toString(),
    });
  }
};

module.exports = { formValidations, create };
