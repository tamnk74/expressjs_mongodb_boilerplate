import { Router } from 'express';
import userRouter from '../../modules/user/routes';
import eventRouter from '../../modules/event/routes';
import postModule from '../../modules/post';

const router = Router();

router.use('/', userRouter);
router.use('/', eventRouter);
router.use('/', postModule);

export default router;
