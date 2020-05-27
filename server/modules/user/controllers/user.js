import uuid from 'uuid';
import User from '../../../models/user.js';
import Response from '../../../helpers/Response';
import JsonAPISerializer from '../../../helpers/JsonAPISerializer';

const userSerializer = JsonAPISerializer.getSerializer('userSerializer');

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
        password: req.body.password
      });
      const result = await user.save();

      return Response.success(res, result)
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
      return Response.success(res, users);
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
      return Response.success(res, user);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Update user
   */
  update = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, Object.assign(
        { id: uuid.v4() },
        req.body.name ? { name: req.body.name } : {},
        req.body.password ? { password: req.body.password } : {}
      ), { new: true });
      return Response.success(res, user);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Remove user
   */
  delete = async (req, res, next) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id)
      return Response.success(res, user);
    } catch (err) {
      return next(err);
    }
  };
}
