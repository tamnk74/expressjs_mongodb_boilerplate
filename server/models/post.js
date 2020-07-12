const mongoose = require('mongoose');
require('./tag');
const findOrCreate = require('./plugins/findOrCreate');
const paginate = require('./plugins/paginate');
const { stringToSlug } = require('../helpers/Util');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: {
        unique: true,
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: {
        unique: true,
      },
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    slug: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'private'],
      required: true,
      default: 'draft',
    },
    view: {
      type: Number,
      required: true,
      default: 0,
    },
    publishDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(findOrCreate);
PostSchema.plugin(paginate);

PostSchema.pre('save', function (next) {
  const post = this;

  // only hash the password if it has been modified (or is new)
  if (!post.isModified('title')) return next();

  post.slug = stringToSlug(post.title) + Date.now() / 1000;
  next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
