import dotenv from 'dotenv';

dotenv.config();

export * from './app';
export * from './zalo';

// Mongodb config
export const dbConfig = {
  URL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node-boilerplate',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

// Redis config
export const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 1,
  user: process.env.REDIS_USR,
  password: process.env.REDIS_PWD,
};
