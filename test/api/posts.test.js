const {
  BAD_REQUEST,
  CREATED,
  UNAUTHORIZED,
} = require('http-status-codes').StatusCodes;
const { OK } = require('http-status-codes');
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

describe('GET /posts', () => {
  let token;
  beforeEach(async () => {
    await clearDatabase();
    token = await builder.generateToken({ email: 'peggy.olson@mail.com' });
  });

  const createPosts = async (number) => {
    const results = [];
    for (let i = 0; i < number; i += 1) {
      const data = {
        description: 'Some post description',
        imageLocation: 'www.myLocation.com/image1234',
      };
      results.push(api.post('/posts', data, token));
    }
    await Promise.all(results);
  };
  test('Get with zero elements', async () => {
    const res = await api.get('/posts?page=1&limit=10', token);
    expect(res.status).toBe(OK);
    expect(res.body).toContainEntry(['posts', []]);
    expect(res.body).toContainEntry(['pageCount', 0]);
    expect(res.body).toContainEntry(['itemCount', 0]);
    expect(res.body).toContainEntry(['pages', []]);
  });

  test('Get page 2 of 2', async () => {
    await createPosts(12);
    const res = await api.get('/posts?page=2&limit=10', token);
    expect(res.status).toBe(OK);
    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts.length).toBe(2);
    expect(res.body).toContainEntry(['pageCount', 2]);
    expect(res.body).toContainEntry(['itemCount', 12]);
    expect(res.body).toContainEntry([
      'pages',
      [
        { number: 1, url: '/posts?page=1&limit=10' },
        { number: 2, url: '/posts?page=2&limit=10' },
      ],
    ]);
  });

  test('Get without params', async () => {
    await createPosts(22);
    const res = await api.get('/posts', token);
    expect(res.status).toBe(OK);
    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts.length).toBe(10);
    expect(res.body).toContainEntry(['pageCount', 3]);
    expect(res.body).toContainEntry(['itemCount', 22]);
    expect(res.body).toContainEntry([
      'pages',
      [
        { number: 1, url: '/posts?page=1&limit=10' },
        { number: 2, url: '/posts?page=2&limit=10' },
        { number: 3, url: '/posts?page=3&limit=10' },
      ],
    ]);
  });
});
