import { ExtractJwt } from 'passport-jwt';
import { authSerializer, userSerializer } from '../serializer';

export class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  login = async (req, res, next) => {
    try {
      const result = await this.authService.authenticate(req.body);
      return res.status(200).json(authSerializer.serialize(result));
    } catch (e) {
      next(e);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const user = await this.authService.getUser(req.user.id);
      return res.status(200).json(userSerializer.serialize(user));
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      await this.authService.logout(req.user.id, token);
      return res.status(200).json({});
    } catch (e) {
      next(e);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const authUser = await this.authService.refreshToken(req.body.refresh_token);

      return res.status(200).json(authSerializer.serialize(authUser));
    } catch (e) {
      return next(e);
    }
  };
}
