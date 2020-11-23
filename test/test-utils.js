require('dotenv').config({ path: './.env.test' });

require('jest-extended');
const request = require('supertest');
const app = require('../src/server');
const { User } = require('../db/models')

const clearDatabase = async () => {
  await User.sync({ force: true });
};

module.exports = {
  app,
  clearDatabase,
  request,
};
