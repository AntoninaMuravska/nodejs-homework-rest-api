const { User } = require('../../models/user');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({ email, avatarURL, password: hashPassword });

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
