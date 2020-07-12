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
const postSeeder = require('./post_seeder');

// const userSeeder = require('./user_seeder');
// const postSeeder = require('./post_seeder');
// const path = require('path');
// const { Seeder } = require('mongo-seeding');

// const config = {
//   database: process.env.MONGODB_URI,
//   dropDatabase: true,
// };

// const seeder = new Seeder(config);

// const collections = seeder.readCollectionsFromPath(path.resolve('./server/database/seeders/data/1-posts'));
async function dbseed() {
  try {
    // await seeder.import(collections);
    const users = await userSeeder();
    // console.log(users);
    const tags = await tagSeeder();
    // console.log(tags);
    const posts = await postSeeder();
    // console.log(posts);
    console.log('Done seeder!!!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

dbseed();
