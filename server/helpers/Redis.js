import Redis from 'ioredis';
import { redisConfig } from '../config';

const redis = new Redis({
  port: redisConfig.port,
  host: redisConfig.host,
  user: redisConfig.user,
  password: redisConfig.password,
  db: redisConfig.db,
});
const authPrefix = 'auth:';
const oauthPrefix = 'oauth:';

export default class RedisService {
  static saveAccessToken(userId, token, value = Date.now()) {
    return redis.hset(authPrefix + userId, token, value);
  }

  static saveOauthCode(userId, code) {
    return redis.set(`${oauthPrefix}${code}`, userId, 'EX', 3600);
  }

  static getOauthCode(code) {
    return redis.get(`${oauthPrefix}${code}`);
  }

  static isExistAccessToken(userId, token) {
    return redis.hexists(authPrefix + userId, token);
  }

  static getRoleAccessToken(userId, token) {
    return redis.hget(authPrefix + userId, token);
  }

  static removeAccessToken(userId, token) {
    return redis.hdel(authPrefix + userId, token);
  }

  static disconnect() {
    return redis.disconnect();
  }
}
