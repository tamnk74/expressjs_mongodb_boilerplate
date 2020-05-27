import JsonWebToken from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const jwtExpiredTime = process.env.JWT_EXPIRED_LOGIN || 3600*24*7;
const publicKey = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'cert', 'public.key'), 'utf8');
const privateKey = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'cert', 'private.key'), 'utf8');
const verifyOptions = {
  issuer: 'Events',
  subject: 'khac.tam.94@gmail.com',
  audience: 'localhost',
  expiresIn: jwtExpiredTime,
  algorithm: 'RS256'
};

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

  static sign(payload) {
    return JsonWebToken.sign(payload, privateKey, verifyOptions);
  }

  static verify(token) {
    return JsonWebToken.verify(token, publicKey, verifyOptions);
  }
}
