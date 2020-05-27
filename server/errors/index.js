import ErrorFactory from './ErrorFactory';
import JsonAPISerializer from '../helpers/JsonAPISerializer';

const errorSerializer = JsonAPISerializer.getSerializer('errorSerializer');

export const errorFactory = new ErrorFactory();
export const handleError = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(errorSerializer.serialize([err]));
  }
  console.log(err);
  return res.status(500).send(errorSerializer.serialize([err]));
};
