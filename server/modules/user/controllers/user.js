import { userSerializer } from '../serializer';

export class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  /**
   * Get all users
   */
  index = async (req, res, next) => {
    try {
      const users = await this.userService.findAll(req.query);
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
      const user = await this.userService.createUser({
        name: req.body.name,
        password: req.body.password,
      });

      return res.status(200).json(userSerializer.serialize(user));
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get user by id
   */
  show = async (req, res, next) => {
    try {
      const user = await this.userService.findById(req.params.id);

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
      await this.userService.updateUser(
        req.params.id,
        Object.assign(
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
      await this.userService.removeUser(req.params.id);

      return res.status(200).json({});
    } catch (err) {
      return next(err);
    }
  };
}
