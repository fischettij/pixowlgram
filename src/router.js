const express = require('express');
const users = require('./api/users');
const session = require('./api/session');

const router = express.Router();

router.post('/users', users.formValidations, users.create);
router.post('/session', session.formValidations, session.create);

module.exports = router;
