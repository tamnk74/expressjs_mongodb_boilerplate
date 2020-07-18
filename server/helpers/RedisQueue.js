import Queue from 'bull';
import { host, port, db } from '../config/redis';

const queue = new Queue('Email Queue', {
  redis: {
    port,
    host,
    db,
  },
});
queue.setMaxListeners(queue.maxListener);

export default queue;
