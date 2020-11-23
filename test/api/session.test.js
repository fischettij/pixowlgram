const { CREATED, BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { request, app, clearDatabase } = require('../test-utils');
const { encrypt } = require('../../src/lib/token');
const { User } = require('../../db/models');

describe('Create', () => {
  beforeEach(async () => clearDatabase());

  test('should response 200 when session is successfully created', async () => {
    const email = 'peggy.olson@mail.com';
    const password = '1234';
    const hashedPassowrd = await encrypt(password);
    const user = {
      email,
      password: hashedPassowrd,
    };
    await User.create(user);
    const res = await request(app).post('/session').send({
      email,
      password,
    });
    expect(res.status).toBe(CREATED);
    expect(res.header).toHaveProperty('authorization');
    expect(res.body).toHaveProperty('created', true);
  });

  test('should responde 400 when try create session without some fields', async () => {
    const res = await request(app).post('/session').send({});
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toBeObject();
    expect(res.body).toContainEntry(['status', BAD_REQUEST]);
    expect(res.body).toContainEntry(['message', 'Token not created']);
    expect(res.body.errors).toIncludeAllMembers([
      'E-Mail is required',
      'Password is required',
    ]);
  });
});
