import { Router } from 'express';
import { analysisController } from './controllers';
import { auth } from '../../middlewares';

const router = Router();

router.route('/analysis').get([auth], analysisController.index);

export default router;
