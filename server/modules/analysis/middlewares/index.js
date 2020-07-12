import Validator from '../../../middlewares/validator';
import loginSchema from '../schemas/analysis';

export const loginValidation = Validator(loginSchema);
