const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required().max(127),
  password: Joi.string().min(6).max(127),
});

module.exports = schema;
