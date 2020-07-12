const mongoose = require('mongoose');
const findOrCreate = require('./plugins/findOrCreate');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(findOrCreate);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
