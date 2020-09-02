import Validator from '../../../middlewares/validator';
import loginSchema from '../schemas/login';
import refreshTokenSchema from '../schemas/refresh-token';

// eslint-disable-next-line import/prefer-default-export
export const loginValidation = Validator(loginSchema);
export const refreshTokenValidation = Validator(refreshTokenSchema);
