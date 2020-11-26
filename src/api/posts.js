const { check, validationResult } = require('express-validator');
const {
  OK,
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes').StatusCodes;
const paginate = require('express-paginate');
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

const getAll = (req, res, next) => {
  Post.findAndCountAll({ limit: req.query.limit, offset: req.skip })
    .then((results) => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.status(OK).json({
        posts: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
      });
    })
    .catch((err) => next(err));
};

module.exports = { formValidations, create, getAll };
