import Joi from 'joi';

export default Joi.object().keys({
  refresh_token: Joi.string().required(),
});
