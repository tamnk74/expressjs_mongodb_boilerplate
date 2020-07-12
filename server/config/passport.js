import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecretKey } from '.';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

passport.use(
  new JWTstrategy(jwtOpts, (jwtPayload, done) => {
    try {
      return done(null, jwtPayload);
    } catch (error) {
      return done(error);
    }
  })
);
