const express = require('express');
const users = require('./api/users');

const router = express.Router();

router.post('/users', users.formValidations, users.create);

module.exports = router;
