const getAllContacts = require('./getAllContacts');
const updateContacts = require('./updateContactById');

const removeContact = id => {
  const contacts = getAllContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return removeContact;
};

module.exports = removeContact;
