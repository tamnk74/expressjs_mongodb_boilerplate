const Joi = require('joi');

const schema = Joi.object().keys({
  title: Joi.string().required().max(127),
  content: Joi.string().required().max(10000),
  status: Joi.string(),
  category_id: Joi.string().required(),
  tag_ids: Joi.array().unique().items(Joi.string()),
});

module.exports = schema;
