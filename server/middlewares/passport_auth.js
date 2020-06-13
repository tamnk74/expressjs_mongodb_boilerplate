import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'tamnk74@gmail.com',
  audience: 'node.app.com'
}

passport.use(new JWTstrategy(jwtOpts, (jwtPayload, done) => {
  try {
    return done(null, jwtPayload);
  } catch (error) {
    return done(error);
  }
}));

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async function (err, jwtPayload) {
    const token = req.headers.authorization.split(' ')[1];
    const { user } = jwtPayload;
    if (!user) {
      throw new Error('Invalid token');
    }
    if (user.status === User.INACTIVE) {
      throw new Error('Inactive user');
    }

    req.user = user;
    next();
  })(req, res)
}
