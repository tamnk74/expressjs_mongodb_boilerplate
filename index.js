import Express from 'express';
import Morgan from 'morgan';
import CORS from 'cors';
import BodyParser from 'body-parser';
import Compress from 'compression';
import Path from 'path';
import mongoose from 'mongoose';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { env, dbConfig } from './server/config';
import { WebRouter, ApiRouter } from './server/routes';
import { handleError } from './server/errors';

// Set up the express app
const app = Express();

// Allow cors
app.use(CORS());

// Parse incoming requests data
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Compress());

app.use(Express.static(Path.resolve(__dirname, 'server', 'public'), { maxAge: 31557600000 }));

if (env !== 'product') {
  app.use(Morgan('dev'));
}

// view engine setup
app.set('views', Path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(Express.static(Path.join(__dirname, 'server/public')));

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.URL, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use('/api', ApiRouter);
app.use('/', WebRouter);

/**
 * Error Handler.
 */
app.use(handleError);

module.exports = app;
