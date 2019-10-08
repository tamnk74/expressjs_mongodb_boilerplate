import JsonWebToken from 'jsonwebtoken';

export default class JWT {
  static getToken(req) {
    let token = null;

    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization;
      if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.slice(7, authorization.length);
      }
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }
    else if (req.socket && req.socket.handshake.headers.authorization) {
      const authorization = req.socket.handshake.headers.authorization;
      if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.slice(7, authorization.length);
      }
    }
    return token;
  }

  static async sign(payload, privateKey, option) {
    return new Promise((fulfill, reject) => {
      JsonWebToken.sign(
        payload,
        privateKey,
        option,
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            fulfill(token);
          }
        }
      )
    });
  }

  static async verify(token, publicKey, option) {
    return new Promise((fulfill, reject) => {
      JsonWebToken.verify(
        token,
        publicKey,
        option,
        (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            fulfill(decoded);
          }
        }
      )
    });
  }

}