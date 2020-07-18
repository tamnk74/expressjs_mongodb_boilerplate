import DotENV from 'dotenv';
import DBConfig from './db-config';

DotENV.config();

export const env = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 'http://localhost:3000';
export const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret';
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME || '1h';
export const dbConfig = DBConfig[env];
// export const swagger = Swagger[env];
