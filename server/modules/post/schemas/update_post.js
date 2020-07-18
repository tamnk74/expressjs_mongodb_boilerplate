const Joi = require('joi');

const schema = Joi.object().keys({
  title: Joi.string().max(127),
  content: Joi.string().max(10000),
  status: Joi.string(),
  category_id: Joi.string(),
  tag_ids: Joi.array().unique().items(Joi.string()),
});

module.exports = schema;
