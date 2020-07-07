import { Router } from 'express';
import { auth } from '../../../middlewares';
import { stripeController } from '../controllers';

const router = Router();

router.route('/stripe').post(stripeController.test);

export default router;
