const mongoose = require('mongoose');
const findOrCreate = require('./plugins/findOrCreate');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
}, {
  timestamps: true
})

TagSchema.plugin(findOrCreate);
const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
