import HTTPStatus from 'http-status';
import uuid from 'uuid';
import User from '../../../models/users.js';
import Response from '../../../helpers/Response';


export default class UserController {
  /**
   * Get all users
   */
  index = async (req, res) => {
    try {
      const users = await User.find();
      return Response.success(res, users);
    }
    catch (err) {
      return Response.error(res, err, HTTPStatus.INTERNAL_SERVER_ERROR)
    }
  };
  /**
  * Create new user
  */
  create = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        password: req.body.password
      });
      const result = await user.save();

      return Response.success(res, result)
    }
    catch (err) {
      return Response.error(res, err, HTTPStatus.INTERNAL_SERVER_ERROR)
    }
  };

  /**
   * Get all users
   */
  findAll = async (req, res) => {
    try {
      const users = await User.find();
      return Response.success(res, users);
    }
    catch (err) {
      return Response.error(res, err, HTTPStatus.INTERNAL_SERVER_ERROR)
    }
  };

  /**
   * Get user by id
   */
  show = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return Response.success(res, user);
    }
    catch (err) {
      return Response.error(res, err);
    }
  };

  /**
   * Update user
   */
  update = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, Object.assign(
        { id: uuid.v4() },
        req.body.name ? { name: req.body.name } : {},
        req.body.password ? { password: req.body.password } : {}
      ), { new: true });
      return Response.success(res, user);
    }
    catch (err) {
      return Response.error(res, err, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * Remove user
   */
  delete = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id)
      return Response.success(res, user);
    }
    catch (err) {
      return Response.error(res, err, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };
}