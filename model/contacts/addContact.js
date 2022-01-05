const { v4 } = require('uuid');

const updateContactById = require('./updateContactById');
const getAllContacts = require('./getAllContacts');

const addContact = async data => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContactById(contacts);
  return newContact;
};

module.exports = addContact;
