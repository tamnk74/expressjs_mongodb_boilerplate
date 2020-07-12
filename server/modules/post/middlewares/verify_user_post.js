import { Types } from 'mongoose';
import Post from '../../../models/post';
import { errorFactory } from '../../../errors';

export const verifyUserPost = async function (req, res, next) {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return next(errorFactory.getError('POST-1001'));
    }

    const post = await Post.findById(id).populate('user');
    const { user } = req;
    if (!post || post.user._id.toString() !== user._id.toString()) {
      return next(errorFactory.getError('POST-1001'));
    }

    req.post = post;
    next();
  } catch (err) {
    return next(err);
  }
};
