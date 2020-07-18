// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import passport from 'passport';

import { env } from './config';
import { webRouter, apiRouter } from './routes';
import { handleError } from './errors';

import './database';
import './config/passport';
import './schedulers/show-time';

// Set up the express app
const app = express();

// Allow cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, 'server', 'public'), { maxAge: 31557600000 }));

if (env !== 'product') {
  app.use(morgan('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'server/public')));

app.use('/api', apiRouter);
app.use('/', webRouter);

/**
 * Error Handler.
 */
app.use(handleError);

module.exports = app;
