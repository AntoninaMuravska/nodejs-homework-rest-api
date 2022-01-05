const { NotFound } = require('http-errors');
const mongoose = require('mongoose');
const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const valid = mongoose.Types.ObjectId.isValid(id);

  if (valid) {
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
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
  } else {
    throw new NotFound(`The id=${id} is not found`);
  }
};

module.exports = updateStatusContact;
