const getAllContacts = require('./getAllContacts');
const addContact = require('./addContact');
const getContactById = require('./getContactById');
const updateContactById = require('./getContactById');
const removeContact = require('./removeContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  updateContactById,
  removeContact,
  updateStatusContact,
};
