require('dotenv').config({ path: './.env.test' });

require('jest-extended');
const request = require('supertest');
const app = require('../src/server');
const { User, Post } = require('../db/models');

const withToken = (req, token) => {
  if (token) req.set('Authorization', token);
  return req; // req.expect('Content-Type', /json/);
};

const api = {
  get: (path, token) => withToken(request(app).get(path), token),
  post: (path, data = {}, token) => withToken(request(app).post(path).send(data), token),
  patch: (path, data = {}, token) => withToken(request(app).patch(path).send(data), token),
};

const clearDatabase = async () => {
  await User.sync({ force: true });
  await Post.sync({ force: true });
};

module.exports = {
  app,
  api,
  clearDatabase,
  request,
};
