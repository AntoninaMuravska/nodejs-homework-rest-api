const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'at.tonya@gmail.com' };
  await sgMail
    .send(email)
    .then(() => {
      return true;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = sendEmail;
