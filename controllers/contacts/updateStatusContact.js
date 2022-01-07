const { NotFound } = require('http-errors');

const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    { id, owner },
    { favorite },
    { new: true },
  );

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
