import Validator from '../../../middlewares/validator';
import loginSchema from '../schemas/login';

export const loginValidation = Validator(loginSchema);
