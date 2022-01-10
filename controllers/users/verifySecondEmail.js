const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const verifySecondEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound('User not found');
  }
  if (user.verify) {
    throw BadRequest('Verification has already been passed');
  }

  const userEmail = {
    to: email,
    subject: 'Проверка email',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${user.verificationToken}'>Проверить email</a>`,
  };

  await sendEmail(userEmail);

  res.json({
    status: 'success',
    code: 200,
    body: {
      message: 'Verification email sent',
    },
  });
};

module.exports = verifySecondEmail;
