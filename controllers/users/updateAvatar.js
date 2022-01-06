const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(resultUpload)
      .then(image => {
        image.resize(250, 250, Jimp.RESIZE_BEZIER).write(resultUpload);
      })
      .catch(error => {
        throw error;
      });

    const avatarURL = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      status: 'success',
      code: 200,
      data: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
