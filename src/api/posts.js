const { check, validationResult } = require('express-validator');
const {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes').StatusCodes;
const { User, Post } = require('../../db/models');

const formValidations = [
  check('description', 'Description is required').not().isEmpty(),
  check('imageLocation', 'Image location is required').not().isEmpty(),
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
  const user = await User.findOne({ where: { email: req.jwt.email } });
  try {
    const post = await Post.create({
      userId: user.id,
      description: req.body.description,
      imageLocation: req.body.imageLocation,
    });
    return res.status(CREATED).json({
      status: CREATED,
      resource: post,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'Something has failure, try again',
      error: error.toString(),
    });
  }
};

module.exports = { formValidations, create };
