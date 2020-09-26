import Redis from '../server/helpers/Redis';

const mongoose = require('mongoose');
const { dbConfig } = require('../server/config');
const { userAccessToken } = require('./data/token');
const { user } = require('./data/user');

module.exports = async () => {
  beforeAll(async () => {
    await userAccessToken;
    await mongoose.connect(`${dbConfig.URL}-test`, dbConfig.options);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await Redis.removeAccessToken(user._id, userAccessToken);
    Redis.disconnect();
  });
};
