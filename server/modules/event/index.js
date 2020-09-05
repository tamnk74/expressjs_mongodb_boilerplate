import { Router } from 'express';
import { auth } from '../../middlewares';
import { eventController } from './controllers';
import { createEventValidation, updateEventValidation, verifyUserEvent } from './middlewares';

const router = Router();

router.get('/events', auth, eventController.index);
router.get('/events/ended', auth, eventController.endedEvent);
router.post('/events/', auth, createEventValidation, eventController.create);
router.get('/events/:id', auth, verifyUserEvent, eventController.show);
router
  .route('/events/:id')
  .patch(auth, updateEventValidation, verifyUserEvent, eventController.update);
router.delete('/events/:id', auth, verifyUserEvent, eventController.delete);

export default router;
