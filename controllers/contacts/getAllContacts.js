const contactsOperations = require('../../model/contacts');

const getAllContacts = async (req, res) => {
  const contacts = await contactsOperations.getAllContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContacts;
