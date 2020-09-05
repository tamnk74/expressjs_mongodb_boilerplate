import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 'http://localhost:3000';
export const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
export const authPrefix = process.env.AUTH_PREFIX || 'auth';
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret';
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME || '1h';
export const jwtRefreshKey = process.env.JWT_REFRESH_KEY || 'jwt_refresh';
export const jwtRefreshExpireTime = process.env.JWT_REFRESH_EXPIRE_TIME || '30d';

// Mongodb config
export const dbConfig = {
  URL: process.env.MONGODB_URI || 'mongodb://mongodb:27017/node-boilerplate',
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
