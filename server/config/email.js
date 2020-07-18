export const host = process.env.MAIL_HOST || '';
export const driver = process.env.MAIL_DRIVER || '';
export const port = process.env.MAIL_PORT || '';
export const auth = {
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASSWORD,
};
