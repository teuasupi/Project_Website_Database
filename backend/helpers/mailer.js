const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ subject, html }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to : process.env.EMAIL_ADMIN,
    subject,
    html,
  });
};

module.exports = { sendMail };
