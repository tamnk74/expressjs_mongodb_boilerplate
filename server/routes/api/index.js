import { Router } from 'express';
import userRouter from '../../modules/user/routes';
import eventRouter from '../../modules/event/routes';

const router = Router();

router.use('/', userRouter);
router.use('/', eventRouter);

export default router;
