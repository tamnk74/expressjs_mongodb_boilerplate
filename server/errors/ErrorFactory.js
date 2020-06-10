import joiErrors from './joi';
import errors from './data';
import ApiError from './ApiError';

class ErrorFactory {
  getError = (errorCode, error = null) => {
    // Handle defined error code
    if (!error) {
      error = errors[errorCode]
    }
    // Handle undefined error code
    if (!error) {
      console.log('Missing error ', errorCode);
      error = errors['ERR-0500'];
      error.code = 500;
    }
    // Handle Joi error
    if (error && error.isJoi) {
      const { type, context: { key } } = error;
      errorCode = joiErrors[`${key}.${type}`];
      error = errors[errorCode] || error;
      error.code = errorCode;
    }
    // Handle other errors
    if (!error.status) {
      const originalError = error;
      error = {
        ...errors['ERR-0500'],
        ...error,
        status: 500,
        code: 'ERR-0500',
      }
      error.detail = originalError.message || error.detail;
    }

    return new ApiError(error);
  }
}

export default ErrorFactory;
