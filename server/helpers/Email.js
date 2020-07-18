import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import * as emailConfig from '../config/email';

export const send = (template, to, subject, locals) => {
  const transport = nodemailer.createTransport({
    service: emailConfig.driver,
    host: emailConfig.host,
    port: emailConfig.port,
    secureConnection: emailConfig.ssl,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
  });
  const templateDir = path.join(__dirname, '../', 'templates');
  const email = new Email({
    transport,
    send: true,
    preview: false,
    views: {
      options: {
        extension: 'ejs',
      },
      root: templateDir,
    },
  });

  return email.send({
    template,
    message: {
      from: `${emailConfig.name} ${emailConfig.from}`,
      to,
      subject,
    },
    locals,
  });
};
