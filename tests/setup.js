// require('regenerator-runtime/runtime');
// const mongoose = require('mongoose');
const { dbConfig, env } = require('../server/config');
// // Configuring the database
// mongoose.Promise = global.Promise;

module.exports = async () => {
  console.log('Set up: ', env, dbConfig);
  // await mongoose
  //   .connect(`${dbConfig.URL}-test`, dbConfig.options)
  //   .then(() => {
  //     console.log('Successfully connected to the database');
  //   })
  //   .catch((err) => {
  //     console.log('Could not connect to the database. Exiting now...', err);
  //     process.exit();
  //   });
};
