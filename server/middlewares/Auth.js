import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { errorFactory } from '../errors';
import Redis from '../helpers/Redis';

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, jwtPayload) => {
    const { user } = jwtPayload;

    if (!user) {
      return next(errorFactory.getError('ERR-0401'));
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const isValidToken = await Redis.isExistAccessToken(user.id, token);
    if (!isValidToken) {
      return next(errorFactory.getError('ERR-0401'));
    }

    if (user.status === User.INACTIVE) {
      return next(errorFactory.getError('USER-0001'));
    }

    req.user = user;
    next();
  })(req, res);
};
