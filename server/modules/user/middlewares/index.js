import Validator from '../../../middlewares/validator';
import loginSchema from '../schemas/login';

// eslint-disable-next-line import/prefer-default-export
export const loginValidation = Validator(loginSchema);
