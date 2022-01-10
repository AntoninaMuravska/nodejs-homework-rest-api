const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'at.tonya@gmail.com' };
  try {
    await sgMail.send(email);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
