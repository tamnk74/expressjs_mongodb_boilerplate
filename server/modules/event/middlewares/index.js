import Validator from '../../../middlewares/validator';
import createEventSchema from '../schemas/create_event';
import updateEventSchema from '../schemas/update_event';

export const createEventValidation = Validator(createEventSchema);
export const updateEventValidation = Validator(updateEventSchema);
export * from './verify_user_event';
