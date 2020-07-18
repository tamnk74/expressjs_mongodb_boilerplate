require('@babel/polyfill');
require('dotenv').config();

const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const userSeeder = require('./user_seeder');
const tagSeeder = require('./tag_seeder');
const categorySeeder = require('./category_seeder');
const postSeeder = require('./post_seeder');

async function dbseed() {
  try {
    // await seeder.import(collections);
    await userSeeder();
    await categorySeeder();
    await tagSeeder();
    // console.log(tags);
    await postSeeder();
    // console.log(posts);
    console.log('Done seeder!!!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

dbseed();
