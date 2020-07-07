import { Router } from 'express';
import userRouter from '../../modules/user/routes';
import eventRouter from '../../modules/event/routes';
import stripeRouter from '../../modules/stripe/routes';

const router = Router();

router.use('/', userRouter);
router.use('/', eventRouter);
router.use('/', stripeRouter);

export default router;
