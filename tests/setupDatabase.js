const mongoose = require('mongoose');
const { dbConfig } = require('../server/config');

module.exports = async () => {
  beforeAll(async () => {
    await mongoose.connect(`${dbConfig.URL}-test`, dbConfig.options);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};
