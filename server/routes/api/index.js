import { Router } from 'express';
import userModule from '../../modules/user';
import eventModule from '../../modules/event';
import postModule from '../../modules/post';
import analysisModule from '../../modules/analysis';

const router = Router();

router.use('/', userModule);
router.use('/', eventModule);
router.use('/', postModule);
router.use('/', analysisModule);

export default router;
