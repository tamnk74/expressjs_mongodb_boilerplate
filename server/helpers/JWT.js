import JsonWebToken from 'jsonwebtoken';
import Redis from './Redis';
import { jwtExpireTime, jwtSecretKey, jwtRefreshKey, jwtRefreshExpireTime } from '../config';

export default class JWT {
  static getToken(req) {
    let token = null;

    if (req.headers && req.headers.authorization) {
      const { authorization } = req.headers;
      if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.slice(7, authorization.length);
      }
    } else if (req.query && req.query.token) {
      token = req.query.token;
    } else if (req.socket && req.socket.handshake && req.socket.handshake.headers.authorization) {
      const { authorization } = req.socket.handshake.headers;
      if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.slice(7, authorization.length);
      }
    }
    return token;
  }

  static async generateToken(payload, isCache = 0) {
    const token = await JsonWebToken.sign(payload, jwtSecretKey, {
      expiresIn: jwtExpireTime,
      issuer: 'tamnk74@gmail.com',
    });
    if (isCache) {
      await Redis.saveAccessToken(payload.user.id, token, Date.now());
    }
    return token;
  }

  static async generateRefreshToken(userId) {
    return JsonWebToken.sign({ userId }, jwtRefreshKey, {
      expiresIn: jwtRefreshExpireTime,
    });
  }

  static verifyRefreshToken(refreshToken) {
    return JsonWebToken.verify(refreshToken, jwtRefreshKey);
  }
}
