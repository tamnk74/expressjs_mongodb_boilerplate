import errors from './data';
import joiError from './joi'

class ApiError extends Error {
  constructor({ code, status, title, detail }) {
    super();
    this.code = code;
    this.status = status;
    this.title = title;
    this.detail = detail;
  }

  setError(error) {
    if (!error) {
      error = errors[code]
    }
    if (!error) {
      console.log('Missing error ', code);
      error = errors['ERR-0500'];
      error.code = 500;
    }
    if (error && error.isJoi) {
      const { type, context: { key } } = error;
      code = joiError[`${key}.${type}`];
      error = errors[code] || error;
    }

    return this;
  }
}

export default ApiError;
