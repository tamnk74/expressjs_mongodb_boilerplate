import { Router } from 'express';
import { authController, userController } from './controllers';
import { loginValidation, refreshTokenValidation } from './middlewares';
import { auth } from '../../middlewares';

const router = Router();

router.post('/login', loginValidation, authController.login);
router.post('/logout', auth, authController.logout);
router.post('/refresh-token', refreshTokenValidation, authController.refreshToken);
router.get('/me', auth, authController.getProfile);
router.get('/users/', [auth], userController.index);
router.post('/users', userController.create);
router.get('/users/:id', [auth], userController.show);
router.put('/users/:id', [auth], userController.update);
router.delete('/users/:id', [auth], userController.delete);

export default router;
