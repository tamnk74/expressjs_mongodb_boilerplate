import CustomError from './Error'

class ErrorFactory {
  getError = (errorCode, error = null) => {
    return new CustomError(errorCode, error);
  }
}

module.exports = ErrorFactory;
