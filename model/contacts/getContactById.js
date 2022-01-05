const getAllContacts = require('./getAllContacts');

const getContactById = id => {
  const contacts = getAllContacts();
  const result = contacts.find(item => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
