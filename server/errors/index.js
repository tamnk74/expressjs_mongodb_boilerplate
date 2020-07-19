import { Error as JSONAPIError } from 'jsonapi-serializer';
import ErrorFactory from './ErrorFactory';
import ApiError from './ApiError';
import { env } from '../config';

export const errorFactory = new ErrorFactory();

export const handleError = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      errors: [err],
    });
  }
  if (Array.isArray(err) && err.length) {
    return res.status(err[0].status).send({
      errors: err,
    });
  }
  if (env !== 'production') {
    console.log(env, err.name, err);
  }
  const error = new JSONAPIError(errorFactory.getError(err.message, err));
  return res.status(500).send(error);
};
