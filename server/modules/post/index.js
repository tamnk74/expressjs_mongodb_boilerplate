import { Router } from 'express';
import { auth } from '../../middlewares';
import { postController } from './controllers';
import { createPostValidation, updatePostValidation, verifyUserPost } from './middlewares';

const router = Router();
router.route('/posts').get(auth, postController.index);
router.route('/posts/').post(auth, createPostValidation, postController.create);
router.route('/posts/:id').get(auth, verifyUserPost, postController.show);
router.route('/posts/:id').patch(auth, updatePostValidation, verifyUserPost, postController.update);
router.route('/posts/:id').delete(auth, verifyUserPost, postController.delete);

export default router;
