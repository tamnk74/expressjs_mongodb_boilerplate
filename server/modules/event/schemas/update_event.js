const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().max(127),
  startDate: Joi.date(),
  dueDate: Joi.date(),
  description: Joi.string().allow(null, ''),
});

module.exports = schema;
