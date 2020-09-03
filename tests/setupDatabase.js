import redis from '../server/helpers/Redis';

const mongoose = require('mongoose');
const { dbConfig } = require('../server/config');
const { userAccessToken } = require('./data/token');
const { user } = require('./data/user');
const { authPrefix } = require('../server/config');

module.exports = async () => {
  beforeAll(async () => {
    await mongoose.connect(`${dbConfig.URL}-test`, dbConfig.options);
    await redis.hset(`${authPrefix}:${user._id}`, userAccessToken, 1);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await redis.hdel(`${authPrefix}:${user._id}`, userAccessToken);
  });
};
