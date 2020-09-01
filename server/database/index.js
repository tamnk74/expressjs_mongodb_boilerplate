import mongoose from 'mongoose';
import { dbConfig } from '../config';
// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.URL, dbConfig.options)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
