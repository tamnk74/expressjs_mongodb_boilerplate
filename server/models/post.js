const mongoose = require('mongoose');
require('./tag');
require('./comment');
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
      maxlength: 1024,
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

// Cascade delete comments when a post is deleted
PostSchema.pre('remove', async function (next) {
  console.log(`Comment being removed from post ${this._id}`);
  await this.model('Comment').deleteMany({ post: this._id });
  next();
});

// Reverse populate with virtuals
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
