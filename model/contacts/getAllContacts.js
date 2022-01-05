// const fs = require('fs/promises');

// const filePath = require('./filePath');

// const getAllContacts = async () => {
//   const data = await fs.readFile(filePath);
//   const contacts = JSON.parse(data);
//   return contacts;
// };

const contacts = require('./contacts.json');

const getAllContacts = async () => contacts;

module.exports = getAllContacts;
