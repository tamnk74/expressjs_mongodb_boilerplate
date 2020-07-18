// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import Express from 'express';
import Morgan from 'morgan';
import CORS from 'cors';
import BodyParser from 'body-parser';
import Compress from 'compression';
import Path from 'path';
import passport from 'passport';

import { env } from './config';
import { webRouter, apiRouter } from './routes';
import { handleError } from './errors';

import './database';
import './config/passport';
import './schedulers/show-time';

// Set up the express app
const app = Express();

// Allow cors
app.use(CORS());

// Parse incoming requests data
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Compress());

app.use(passport.initialize());
app.use(passport.session());

app.use(Express.static(Path.resolve(__dirname, 'server', 'public'), { maxAge: 31557600000 }));

if (env !== 'product') {
  app.use(Morgan('dev'));
}

// view engine setup
app.set('views', Path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(Express.static(Path.join(__dirname, 'server/public')));

app.use('/api', apiRouter);
app.use('/', webRouter);

/**
 * Error Handler.
 */
app.use(handleError);

module.exports = app;
