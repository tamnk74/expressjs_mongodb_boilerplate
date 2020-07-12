import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecretKey } from './index'

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
  issuer: 'tamnk74@gmail.com',
}

passport.use(new JWTstrategy(jwtOpts, (jwtPayload, done) => {
  try {
    return done(null, jwtPayload);
  } catch (error) {
    return done(error);
  }
}));