const { CREATED, BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { request, app, clearDatabase } = require('../test-utils');

describe('Create', () => {
  beforeEach(async () => clearDatabase());

  test('should responde 400 when try create user without some fields', async () => {
    const res = await request(app).post('/users').send({});
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toBeObject();
    expect(res.body).toContainEntry(['status', BAD_REQUEST]);
    expect(res.body).toContainEntry(['message', 'User not created']);
    expect(res.body.errors).toIncludeAllMembers([
      'E-Mail is required',
      'Password is required',
    ]);
  });

  test('should responde 201 when create a valid user', async () => {
    const email = 'jon.snow@mail.com';
    const password = 'nightWatch';
    const res = await request(app).post('/users').send({ email, password });
    expect(res.status).toBe(CREATED);
    expect(res.body).toBeObject();
    expect(res.body).toContainEntry(['created', true]);
  });
});
