const host = process.env.REDIS_HOST || '127.0.0.1';
const port = process.env.REDIS_PORT || 6379;
const db = process.env.REDIS_DB || 1;
const user = process.env.REDIS_USR;
const password = process.env.REDIS_PWD;

const redisConfig = { host, port, db, user, password };

export default redisConfig;
