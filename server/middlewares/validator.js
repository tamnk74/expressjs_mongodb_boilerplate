import Joi from 'joi';
import { errorFactory } from '../errors';

export default (schema, type = 'body') => (req, res, next) => {
  const body = req[type];
  const { error } = Joi.validate(body, schema);
  if (error == null) {
    return next();
  }

  return next(
    errorFactory.getError('ERR-0422', {
      status: 422,
      isJoi: true,
      error: 'Invalid data',
      ...error.details[0],
    })
  );
};
