import { Error as JSONAPIError } from 'jsonapi-serializer';
import ErrorFactory from './ErrorFactory';

export const errorFactory = new ErrorFactory();

export const handleError = (err, req, res, next) => {
  if (err.status) {
    console.log(err);
    const error = new JSONAPIError(err);
    return res.status(err.status).send(error);
  }

  console.log('ERROR', err.name, err);
  const error = new JSONAPIError(errorFactory.getError('', err));
  return res.status(500).send(error);
};
