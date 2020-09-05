import { Router } from 'express';
import { analysisController } from './controllers';
import { auth } from '../../middlewares';

const router = Router();

router.get('/analysis', [auth], analysisController.index);

export default router;
