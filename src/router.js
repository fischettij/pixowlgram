const express = require('express');
const users = require('./api/users');
const session = require('./api/session');
const posts = require('./api/posts');
const token = require('./lib/token');

const router = express.Router();

router.post('/users', users.formValidations, users.create);
router.post('/session', session.formValidations, session.create);
router.post('/posts', [token.verify, posts.formValidations], posts.create);
module.exports = router;
