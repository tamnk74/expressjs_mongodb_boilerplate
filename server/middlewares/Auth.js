import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { jwtSecretKey } from '../config'
import { errorFactory } from '../errors'

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
  issuer: 'tamnk74@gmail.com',
}

passport.use(new JWTstrategy(jwtOpts, (jwtPayload, done) => {
  try {
    console.log(jwtPayload)
    return done(null, jwtPayload);
  } catch (error) {
    return done(error);
  }
}));

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async function (err, jwtPayload) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(jwtPayload);
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
