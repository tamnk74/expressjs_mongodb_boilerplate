import { Router } from 'express';
import userRouter from '../../modules/user/routes';
import eventRouter from '../../modules/event/routes';
import postModule from '../../modules/post';
import analysisModule from '../../modules/analysis';

const router = Router();

router.use('/', userRouter);
router.use('/', eventRouter);
router.use('/', postModule);
router.use('/', analysisModule);

export default router;
