import redis from 'redis';
import util from 'util';
import { host, port, dbIndex } from '../config/redis';

const clientRedis = redis.createClient({
  port,
  host,
  db: dbIndex,
});

export const set = util.promisify(clientRedis.set).bind(clientRedis);
export const get = util.promisify(clientRedis.get).bind(clientRedis);
export const del = util.promisify(clientRedis.del).bind(clientRedis);
export const exists = util.promisify(clientRedis.exists).bind(clientRedis);

// Hash
export const hset = util.promisify(clientRedis.hset).bind(clientRedis);
export const hget = util.promisify(clientRedis.hget).bind(clientRedis);
export const hdel = util.promisify(clientRedis.hdel).bind(clientRedis);
export const hexists = util.promisify(clientRedis.hexists).bind(clientRedis);
