const User = require('../../models/user');

const users = [
  {
    filter: { name: 'admin' },
    data: {
      name: 'admin',
      email: 'admin@mailinator.com',
      password: 'Admin123!@#',
    },
  },
  {
    filter: { name: 'user' },
    data: {
      name: 'user',
      email: 'user@mailinator.com',
      password: 'User123!@#',
    },
  },
];

module.exports = async () => {
  const results = await Promise.all(users.map((user) => User.findOrCreate(user.filter, user.data)));
  return results.map((item) => item[1]);
};
