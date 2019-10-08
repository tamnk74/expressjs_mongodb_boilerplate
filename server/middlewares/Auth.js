import ApiError from '../helpers/ApiError';
import HttpStatus from 'http-status';
import User from '../models/users';
import JWT from '../helpers/JWT';
import path from 'path';
import fs from 'fs';

export default class Auth {
  mustLogin = async (req, res, next) => {
    const token = JWT.getToken(req);
    console.log('JWT: ', token);
    if (!token) {
      if (!next) {
        throw new ApiError({
          message: 'AUTHORIZATION FAILED',
          status: HttpStatus.UNAUTHORIZED,
        });
      }
      return next(new ApiError({
        message: 'AUTHORIZATION FAILED',
        status: HttpStatus.UNAUTHORIZED,
      }));
    }
    let jwtPayload = null;

    try {
      const publicKey = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'cert', 'public.key'), 'utf8');
      var verifyOptions = {
        issuer: 'Events',
        subject: 'khac.tam.94@gmail.com',
        audience: 'localhost',
        expiresIn: "12h",
        algorithm: ["RS256"]
      };
      jwtPayload = await JWT.verify(token, publicKey, verifyOptions);
    } catch (error) {
      if (!next) {
        throw error;
      }
      return next(new ApiError({
        message: error ? error.message : 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
      }));
    }

    let user = null;
    try {
      user = await this.verifyUser(jwtPayload);
    } catch (error) {
      if (!next) {
        throw error;
      }
      return next(new ApiError({
        message: error ? error.message : 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
      }));
    }
    req.user = user;

    if (next) {
      return next();
    }
  };

  verifyUser = async (options) => {
    const user = await User.findById(options.id);
    if (!user) {
      throw new Error('USER NOT FOUND');
    }
    return user;
  };
}