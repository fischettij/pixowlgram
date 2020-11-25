const { check, validationResult } = require('express-validator');
const {
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../lib/token');
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
      message: 'Validation Errors',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const user = await findUser(req.body.email);
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = generateAccessToken({ email: req.body.email });
      res.set('Authorization', `Bearer ${token}`);
      res.status(CREATED).json({ created: true });
    } else {
      res.status(UNAUTHORIZED).json({
        errors: ['Invalid email or password'],
      });
    }
  } else {
    res.status(UNAUTHORIZED).json({
      errors: ['Invalid email or password'],
    });
  }
  return res;
};

module.exports = { formValidations, create };
