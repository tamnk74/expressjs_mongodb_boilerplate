const Joi = require('joi');

const schema = Joi.object().keys({
  email: Joi.string().email().required().max(127),
  password: Joi.string().min(6).max(127),
});

module.exports = schema;
