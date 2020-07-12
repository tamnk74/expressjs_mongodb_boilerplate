import kue from 'kue';
import { redis } from '../config';

const queue = kue.createQueue({
  prefix: queueConfig.prefix,
  redis: {
    port: redis.port,
    host: redis.host,
    db: redis.index,
  },
});
queue.setMaxListeners(queue.maxListener);

export default queue;
