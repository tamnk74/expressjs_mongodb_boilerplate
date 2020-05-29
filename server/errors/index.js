import ErrorFactory from './ErrorFactory';
import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

const errorSerializer = new JSONAPISerializer('errors', {
  attributes: ['status', 'code', 'error', 'message', 'detail'],
  keyForAttribute: 'snake_case',
});

export const errorFactory = new ErrorFactory();

export const handleError = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(errorSerializer.serialize([err]));
  }
  console.log(err);
  return res.status(500).send(errorSerializer.serialize([err]));
};
