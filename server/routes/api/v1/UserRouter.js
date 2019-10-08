import { Router } from 'express';
import Validate from 'express-validation';
import {userController} from '../../../controllers/api/v1';
import {userValidation} from '../../../validations';
import {auth} from '../../../middlewares';

const router = Router();

router.route('/').get([auth.mustLogin, Validate(userValidation.index)], userController.index);
router.route('/').post([Validate(userValidation.create)], userController.create);
router.route('/:id').get([auth.mustLogin, Validate(userValidation.show)], userController.show);
router.route('/:id').put([auth.mustLogin, Validate(userValidation.update)], userController.update);
router.route('/:id').delete([auth.mustLogin, Validate(userValidation.delete)], userController.delete);

export default router;