require('@babel/register');
require('@babel/polyfill');
const mongoose = require('mongoose');
const { dbConfig } = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.URL, dbConfig.options);

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
