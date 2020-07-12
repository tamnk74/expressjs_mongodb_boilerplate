const Category = require('../../models/category');

const categorys = [
  {
    name: 'javascript',
  },
  {
    name: 'nodejs',
  },
  {
    name: 'mongodb',
  },
  {
    name: 'docker',
  },
  {
    name: 'english',
  },
];

module.exports = async function () {
  const results = await Promise.all(categorys.map((category) => Category.findOrCreate(category, category)));
  return results.map((item) => item[1]);
};
