import { Router } from 'express';
import { AnalysisController } from './controllers';
import { AnalysisService } from './services';
import { auth } from '../../middlewares';

const analysisService = new AnalysisService();
const analysisController = new AnalysisController({ analysisService });
const router = Router();

router.get('/analysis', [auth], analysisController.index);

export default router;
