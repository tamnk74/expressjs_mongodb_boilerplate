import Redis from 'ioredis';
import redisConfig from '../config/redis';

const redis = new Redis(redisConfig);

export default redis;
// import Redis from 'redis';
// import { promisify } from 'util';
// import redisConfig from '../config/redis';

// const clientRedis = Redis.createClient(redisConfig);

// clientRedis.on('error', (error) => {
//   console.error(error);
// });

// const redis = {
//   set: promisify(clientRedis.set).bind(clientRedis),
//   get: promisify(clientRedis.get).bind(clientRedis),
//   del: promisify(clientRedis.del).bind(clientRedis),
//   exists: promisify(clientRedis.exists).bind(clientRedis),

//   // Hash
//   hset: promisify(clientRedis.hset).bind(clientRedis),
//   hget: promisify(clientRedis.hget).bind(clientRedis),
//   hdel: promisify(clientRedis.hdel).bind(clientRedis),
//   hexists: promisify(clientRedis.hexists).bind(clientRedis),

//   disconnect: () => {
//     clientRedis.end(true);
//   },
// };

// export default redis;
