require('dotenv').config();

export const zaloConfig = {
  appId: process.env.ZALO_APP_ID || '',
  appSecret: process.env.ZALO_APP_SECRET,
};
