const mongoose = require('mongoose');

const PostTagSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: {
      unique: true
    }
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
    index: {
      unique: true
    }
  }]
}, {
  timestamps: true
})

const PostTag = mongoose.model('PostTag', PostTagSchema, 'postTag');

module.exports = PostTag;
