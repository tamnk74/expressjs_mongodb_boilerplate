const Tag = require('../../models/tag');

const tags = [
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
    name: 'css',
  },
];

module.exports = async () => {
  const results = await Promise.all(tags.map((tag) => Tag.findOrCreate(tag, tag)));
  return results.map((item) => item[1]);
};
