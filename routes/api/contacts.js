const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put(
  '/:contactId',
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContact),
);

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

module.exports = router;
