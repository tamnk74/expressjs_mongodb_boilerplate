import errors from './data';

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

    return {
      ...error,
      code,
    }
  }
}

export default CustomError;
