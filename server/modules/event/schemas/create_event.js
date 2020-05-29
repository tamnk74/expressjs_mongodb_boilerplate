const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required().max(127),
  startDate: Joi.date().required(),
  dueDate: Joi.date().required(),
  description: Joi.string().allow(null, ''),
});

module.exports = schema;
