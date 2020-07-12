import passport from 'passport';
import User from '../models/user';
import { errorFactory } from '../errors'

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async function (err, jwtPayload) {
    const { user } = jwtPayload;
    if (!user) {
      return next(errorFactory.getError('ERR-0401'));
    }
    if (user.status === User.INACTIVE) {
      return next(errorFactory.getError('USER-0001'));
    }

    req.user = user;
    next();
  })(req, res)
}
