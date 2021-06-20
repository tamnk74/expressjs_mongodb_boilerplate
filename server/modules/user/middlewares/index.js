import Validator from '../../../middlewares/validator';
import loginSchema from '../schemas/login';
import refreshTokenSchema from '../schemas/refresh-token';

export const loginValidation = Validator(loginSchema);
export const refreshTokenValidation = Validator(refreshTokenSchema);
