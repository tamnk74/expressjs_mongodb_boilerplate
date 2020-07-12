const mongoose = require('mongoose');
const Post = require('../../models/post');
const User = require('../../models/user');

const userData = {
  filter: { name: 'admin' },
  data: {
    name: 'admin',
    email: 'tamnk74@gmail.com',
    password: 'Admin123!@#',
  },
};
const posts = [
  {
    filter: { title: 'test' },
    data: {
      title: 'test',
      slug: 'test',
      category: {
        _id: mongoose.Types.ObjectId(),
        name: 'english',
      },
      content: 'Admin123!@#',
    },
  },
];

module.exports = async function () {
  const [, user] = await User.findOrCreate(userData.filter, userData.data);
  console.log(user);
  const results = await Promise.all(
    posts.map((post) =>
      Post.findOrCreate(post.filter, {
        user: user._id,
        ...post.data,
      }))
  );
  return results.map((item) => item[1]);
};
