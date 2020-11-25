const express = require('express');
const users = require('./api/users');
const session = require('./api/session');
const posts = require('./api/posts');
const token = require('./lib/token');
const upload = require('./api/upload');

const storage = require('./lib/storage');

const router = express.Router();

router.post('/users', users.formValidations, users.create);
router.post('/session', session.formValidations, session.create);
router.post('/posts', [token.verify, posts.formValidations], posts.create);
router.post(
  '/upload',
  [token.verify, storage.upload.single('postImage')],
  upload.post
);

module.exports = router;
