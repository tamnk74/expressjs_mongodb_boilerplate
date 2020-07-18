import Validator from '../../../middlewares/validator';
import createPostSchema from '../schemas/create_post';
import updatePostSchema from '../schemas/update_post';

import verifyUserPost from './verify_user_post';

export const createPostValidation = Validator(createPostSchema);
export const updatePostValidation = Validator(updatePostSchema);

export const verifyUserPostMw = verifyUserPost;
