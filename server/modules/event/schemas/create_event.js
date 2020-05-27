const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required().max(127),
  description: Joi.string(),
});

module.exports = schema;
