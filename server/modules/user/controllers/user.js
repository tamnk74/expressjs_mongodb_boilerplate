import uuid from 'uuid';
import User from '../../../models/user.js';
import { userSerializer } from '../serializer';

export default class UserController {
  /**
   * Get all users
   */
  index = async (req, res, next) => {
    try {
      const users = await User.find();
      return res.status(200).json(userSerializer.serialize(users));
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Create new user
   */
  create = async (req, res, next) => {
    try {
      const user = new User({
        name: req.body.name,
        password: req.body.password,
      });
      const result = await user.save();

      return res.status(200).json(userSerializer.serialize(result));
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get all users
   */
  findAll = async (req, res, next) => {
    try {
      const users = await User.find();

      return res.status(200).json(userSerializer.serialize(users));
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get user by id
   */
  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).populate('user');

      return res.status(200).json(userSerializer.serialize(user));
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Update user
   */
  update = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(
        req.params.id,
        Object.assign(
          { id: uuid.v4() },
          req.body.name ? { name: req.body.name } : {},
          req.body.password ? { password: req.body.password } : {}
        ),
        { new: true }
      );

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Remove user
   */
  delete = async (req, res, next) => {
    try {
      await User.findByIdAndRemove(req.params.id);

      return res.status(200).json({});
    } catch (err) {
      return next(err);
    }
  };
}
