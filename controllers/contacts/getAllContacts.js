const { Contact } = require('../../models');
const { NotAcceptable } = require('http-errors');

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;

  if (isNaN(page) || isNaN(limit)) {
    throw new NotAcceptable('Not acceptable parameters');
  }

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name email');

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContacts;
