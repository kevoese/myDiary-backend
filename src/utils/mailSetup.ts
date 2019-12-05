import * as sgMail from '@sendgrid/mail';
import * as nodemailer from 'nodemailer';
import { SENDGRID_API_KEY, MAIL_USERNAME, MAIL_PASSWORD } from '../env';

interface MailArgs {
  email: string;
  subject: string;
  html?: string | undefined;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

// using mailtrap for development

export const sendMailDev = async ({ email, subject, html, text }: MailArgs) => {
  let error = null;
  const data = {
    from: '"Music App" <support@nusicApp.com>',
    to: 'no-reply@musicApp.com',
    bcc: email,
    subject,
    html,
    text,
  };
  try {
    await transporter.sendMail(data);
  } catch (err) {
    error = err.message;
  }
  return { error };
};

// use sendgrid for production

export const sendMail = async ({ email, text, html, subject }: MailArgs) => {
  sgMail.setApiKey(SENDGRID_API_KEY || '');
  const msg = {
    to: email,
    from: '"My Diary" <support@myDiary.com>',
    subject,
    text,
    html,
  };
  let error = '';

  try {
    await sgMail.send(msg, false, (err: any) => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    error = err.message;
  }
  return { error };
};
