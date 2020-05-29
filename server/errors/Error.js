import errors from './data';
import joiError from './data/joi.json'

class CustomError extends Error {
  constructor(code, error = null) {
    super();
    if (!error) {
      error = errors[code] || {
        status: 500,
        code: 'ERR-0500',
        title: 'INTERNAL_SERVER_ERROR',
        detail: 'Internal Server Error!!!',
      };
    }
    if (error && error.isJoi) {
      const { type, context: { key } } = error;
      code = joiError[`${key}.${type}`];
      error = errors[code] || error;
    }

    return {
      ...error,
      code,
    }
  }
}

export default CustomError;
