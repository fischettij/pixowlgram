const {
  BAD_REQUEST,
  CREATED,
  UNAUTHORIZED,
} = require('http-status-codes').StatusCodes;
const {
  request, app, api, clearDatabase,
} = require('../test-utils');
const builder = require('../builder');

describe('POST /posts', () => {
  let token;
  beforeEach(async () => {
    await clearDatabase();
    token = await builder.generateToken({ email: 'peggy.olson@mail.com' });
  });

  test('Should response unauthorized whit out token', async () => {
    const post = {
      description: 'Some post',
      image_location: 'www.some_site.com/image12345',
    };
    const res = await request(app).post('/posts').send(post);
    expect(res.status).toBe(UNAUTHORIZED);
  });
  describe('With token', () => {
    test('should response created when post with valid data', async () => {
      const description = 'Some post description';
      const imageLocation = 'www.myLocation.com/image1234';
      const data = {
        description,
        imageLocation,
      };
      const res = await api.post('/posts', data, token);
      expect(res.status).toBe(CREATED);
      expect(res.body).toContainEntry(['status', CREATED]);
      expect(res.body.resource).toContainEntry(['id', 1]);
      expect(res.body.resource).toContainEntry(['description', description]);
      expect(res.body.resource).toContainEntry([
        'imageLocation',
        imageLocation,
      ]);
    });

    test('should response error when post with empty data', async () => {
      const data = {};
      const res = await api.post('/posts', data, token);
      expect(res.status).toBe(BAD_REQUEST);
      expect(res.body).toContainEntry(['status', BAD_REQUEST]);
      expect(res.body).toContainEntry(['message', 'Validation Errors']);
      expect(res.body.errors).toIncludeAllMembers([
        'Description is required',
        'Image location is required',
      ]);
    });
  });
});
