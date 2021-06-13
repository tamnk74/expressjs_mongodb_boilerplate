// import { MongoMemoryServer } from 'mongodb-memory-server';
import Redis from '../server/helpers/Redis';

// const redis = require('ioredis-mock/jest');
const mongoose = require('mongoose');
const { dbConfig } = require('../server/config');

beforeAll(async () => {
  mongoose.Promise = global.Promise;
  await mongoose
    .connect(`${dbConfig.URL}-test`, dbConfig.options)
    .then(() => console.log(`Connected to ${dbConfig.URL}-test`));
});

afterAll(async () => {
  await mongoose.disconnect();
  Redis.disconnect();
});
