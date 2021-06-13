export const env = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;
export const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
export const authPrefix = process.env.AUTH_PREFIX || 'auth';
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret';
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME || '1h';
export const jwtRefreshKey = process.env.JWT_REFRESH_KEY || 'jwt_refresh';
export const jwtRefreshExpireTime = process.env.JWT_REFRESH_EXPIRE_TIME || '30d';
