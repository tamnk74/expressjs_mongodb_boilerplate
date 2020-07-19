import { Router } from 'express';
import { authController, userController } from './controllers';
import { loginValidation } from './middlewares';
import { auth } from '../../middlewares';

const router = Router();

router.route('/login').post(loginValidation, authController.login);

router.route('/users/').get([auth], userController.index);
router.route('/users').post(userController.create);
router.route('/users/:id').get([auth], userController.show);
router.route('/users/:id').put([auth], userController.update);
router.route('/users/:id').delete([auth], userController.delete);

export default router;
