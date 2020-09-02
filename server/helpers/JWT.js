import JsonWebToken from 'jsonwebtoken';
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

  static generateToken(payload) {
    return JsonWebToken.sign(payload, jwtSecretKey, {
      expiresIn: jwtExpireTime,
      issuer: 'tamnk74@gmail.com',
    });
  }

  static generateRefreshToken(userId) {
    return JsonWebToken.sign({ userId }, jwtRefreshKey, {
      expiresIn: jwtRefreshExpireTime,
    });
  }

  static verifyRefreshToken(refreshToken) {
    return JsonWebToken.verify(refreshToken, jwtRefreshKey);
  }
}
