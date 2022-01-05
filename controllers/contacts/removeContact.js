const { NotFound } = require('http-errors');
const mongoose = require('mongoose');
const { Contact } = require('../../models');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const valid = mongoose.Types.ObjectId.isValid(id);

  if (valid) {
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } else {
    throw new NotFound(`The id=${id} is not found`);
  }
};

module.exports = removeContact;
