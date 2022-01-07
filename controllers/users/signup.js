const { User } = require('../../models/user');
const { sendEmail } = require('../../helpers');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }

  const avatarURL = gravatar.url(email, { protocol: 'https' });

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = nanoid();
  await User.create({
    email,
    avatarURL,
    password: hashPassword,
    subscription,
    verificationToken,
  });

  const userEmail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(userEmail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription,
      },
    },
  });
};

module.exports = signup;
