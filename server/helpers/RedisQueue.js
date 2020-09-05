import Queue from 'bull';
import redisConfig from '../config/redis';

const queue = new Queue('Email Queue', {
  redis: redisConfig,
});
queue.setMaxListeners(queue.maxListener);

export default queue;
