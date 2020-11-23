const { check, validationResult } = require('express-validator');
const { OK, BAD_REQUEST } = require('http-status-codes').StatusCodes;
// const { User }    = require('../../db/models')

const formValidations = [
  check('email', 'E-Mail is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: 'User not created',
      errors: errors.array().map(e => e.msg),
    });
  }
  return res.status(OK);
};

module.exports = { formValidations, create };
