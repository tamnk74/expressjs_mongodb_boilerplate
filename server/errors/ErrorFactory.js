import CustomJoiError from './Error'

class JoiErrorFactory {
  getError = (errorCode) => {
    return new CustomJoiError(errorCode);
  }
}

module.exports = JoiErrorFactory;
