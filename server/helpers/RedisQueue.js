import Queue from 'bull';
import redisConfig from '../config/redis';

const queue = new Queue('Email Queue', {
  redis: redisConfig,
});

export default queue;
