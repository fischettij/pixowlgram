const { CREATED, BAD_REQUEST } = require('http-status-codes').StatusCodes;

const URL = `${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`;

const post = (req, res) => {
  if (!req.file) {
    return res.status(BAD_REQUEST).json({
      success: false,
      resutl: 'No file received',
    });
  }
  return res.status(CREATED).json({
    file: req.file.filename,
    success: true,
    _links: {
      href: `${URL}/images/${req.file.filename}`,
    },
  });
};

module.exports = { post };
