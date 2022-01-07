const express = require('express');

const { auth, upload, validation, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const {
  joiSignupSchema,
  joiLoginSchema,
  verifyEmailJoiSchema,
} = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
);
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validation(verifyEmailJoiSchema),
  ctrlWrapper(ctrl.verifySecondEmail),
);

module.exports = router;
