import errors from './data';
import joiError from './joi';

class ApiError extends Error {
  constructor({ code, status, title, detail, stack }) {
    super();
    this.code = code;
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.stack = stack;
  }

  setError(error) {
    if (!error) {
      error = errors[this.code];
    }
    if (!error) {
      console.log('Missing error ', this.code);
      error = errors['ERR-0500'];
      error.code = 500;
    }
    if (error && error.isJoi) {
      const {
        type,
        context: { key },
      } = error;
      this.code = joiError[`${key}.${type}`];
      error = errors[this.code] || error;
    }

    return this;
  }
}

export default ApiError;
