const getAllContacts = require('./getAllContacts');
const updateContacts = require('./updateContacts');

const updateContactById = (id, data) => {
  const contacts = getAllContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContactById;
