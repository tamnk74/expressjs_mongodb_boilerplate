import errors from './data'
console.log(errors);
class CustomJoiError extends Error {
  constructor(code) {
    super();
    const error = errors[code] || {
      status: 500,
      code: 'ERR-0500',
      title: 'INTERNAL_SERVER_ERROR',
      detail: 'Internal Server Error!!!',
    };

    return {
      ...error,
      code,
    }
  }
}

export default CustomJoiError;
