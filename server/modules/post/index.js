import { Router } from 'express';
import { auth } from '../../middlewares';
import { postController } from './controllers';
import { createPostValidation, updatePostValidation, verifyUserPostMw } from './middlewares';

const router = Router();
router.get('/posts', auth, postController.index);
router.post('/posts/', auth, createPostValidation, postController.create);
router.get('/posts/:id', auth, verifyUserPostMw, postController.show);
router.patch('/posts/:id', updatePostValidation, verifyUserPostMw, postController.update);
router.delete('/posts/:id', auth, verifyUserPostMw, postController.delete);

export default router;
