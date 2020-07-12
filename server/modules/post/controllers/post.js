import uuid from 'uuid';
import Post from '../../../models/post';
import { postSerializer } from '../serializer';
import { errorFactory } from '../../../errors';

export default class PostController {
  /**
   * Paginate post
   */
  index = async (req, res, next) => {
    try {
      const posts = await Post.paginate({}, req.query);
      console.log(posts);
      return res.status(200).json(postSerializer.serialize(posts.results));
    }
    catch (err) {
      return next(err)
    }
  };
  /**
   * Post is already ended
   */
  endedEvent = async (req, res, next) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const posts = await Post.find({
        dueDate: { $lte: new Date() }
      })
        .skip((limit * page) - limit)
        .limit(limit);
      return res.status(200).json(postSerializer.serialize(posts));
    }
    catch (err) {
      return next(err)
    }
  };
  /**
   * Get one post
   */
  show = async (req, res, next) => {
    try {
      const { post } = req;

      return res.status(200).json(postSerializer.serialize(post));
    } catch (err) {
      return next(err)
    }
  };
  /**
   * Add new post
   */
  create = async (req, res, next) => {
    try {
      const post = new Post({
        id: uuid.v4(),
        name: req.body.name,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        description: req.body.description,
        user: req.user._id
      });

      const result = await post.save();

      return res.status(201).json(postSerializer.serialize(result));
    } catch (err) {
      return next(err)
    }
  };
  /**
   * Update an post
   */
  update = async (req, res, next) => {
    try {
      const { post } = req;

      await Post.findByIdAndUpdate(req.params.id, {
        name: req.body.name || post.name,
        startDate: req.body.startDate || post.startDate,
        dueDate: req.body.dueDate || post.dueDate,
        description: req.body.description || post.description,
      });

      return res.status(204).json({});
    } catch (err) {
      return next(err)
    }
  };
  /**
   * Delete an post
   */
  delete = async (req, res, next) => {
    try {
      const { post } = req;

      await Post.findByIdAndRemove(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      return next(err)
    }
  };
}
