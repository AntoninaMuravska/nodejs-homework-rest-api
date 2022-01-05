const { v4 } = require('uuid');

const updateContactById = require('./updateContactById');
const getAllContacts = require('./getAllContacts');

const addContact = data => {
  const contacts = getAllContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  updateContactById(contacts);
  return newContact;
};

module.exports = addContact;
