import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 'http://localhost:3000';
export const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret';
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME || '1h';
export const dbConfig = {
  URL: process.env.MONGODB_URI || 'mongodb://mongodb:27017/node-boilerplate',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
