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

// Set up the express app
const app = Express();

// Allow cors
app.use(CORS());

// Parse incoming requests data
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Compress());

app.use(Express.static(Path.resolve(__dirname, 'server', 'public'), { maxAge: 31557600000 }));

if (env === 'development') {
  app.use(Morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
}

// view engine setup
app.set('views', Path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(Express.static(Path.join(__dirname, 'server/public')));

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/events', {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use('/api', ApiRouter);
app.use('/', WebRouter);
module.exports = app;