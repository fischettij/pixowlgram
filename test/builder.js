const { encrypt } = require('../src/lib/token');
const { request, app } = require('./test-utils');
const { User } = require('../db/models');

const defaultUser = { email: 'peggy.olson@mail.com', password: '1234' };

const register = async () => User.create({
  email: defaultUser.email,
  password: await encrypt(defaultUser.password),
});

const login = async (data) => request(app).post('/session').send(data);

const generateToken = async () => {
  await register();
  return login(defaultUser).then((res) => res.headers.authorization);
};

module.exports = {
  generateToken,
  login,
  register,
};
