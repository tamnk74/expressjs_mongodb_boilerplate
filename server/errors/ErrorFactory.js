import joiErrors from './joi';
import errors from './data';
import ApiError from './ApiError';
import { env } from '../config';

class ErrorFactory {
  getError = (errorCode, error = null) => {
    // Handle defined error code
    const originalError = error;
    if (!error) {
      error = errors[errorCode];
    }
    // Handle undefined error code
    if (!error) {
      console.log('Missing error ', errorCode);
      error = errors['ERR-0500'];
      error.code = 500;
    }
    // Handle Joi error
    if (error && error.isJoi) {
      const {
        type,
        context: { key },
      } = error;
      errorCode = joiErrors[`${key}.${type}`];
      error = errors[errorCode] || error;
      error.code = errorCode;
    }
    // Handle other errors
    if (!error.status) {
      error = {
        ...errors['ERR-0500'],
        ...error,
        status: 500,
        code: 'ERR-0500',
      };
      error.detail = originalError.message || error.detail;
    }
    error.code = errorCode || error.code;

    return new ApiError(error);
  };

  getJoiErrors = (joiErrors = []) => {
    if (env !== 'production') {
      console.log(env, joiErrors);
    }
    return joiErrors.map((joiError) => {
      const {
        type,
        context: { label: key },
      } = joiError;

      const code = joiErrors[`${key}.${type}`];
      const error = errors[code];
      if (error) {
        return new ApiError({
          code,
          ...error,
        });
      }

      // Handle undefined error
      return new ApiError({
        code: 'ERR-0422',
        ...errors['ERR-0422'],
      });
    });
  };
}

export default ErrorFactory;
