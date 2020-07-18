import { Router } from 'express';
import { auth } from '../../../middlewares';
import { eventController } from '../controllers';
import { createEventValidation, updateEventValidation, verifyUserEvent } from '../middlewares';

const router = Router();

router.route('/events').get(auth, eventController.index);
router.route('/events/ended').get(auth, eventController.endedEvent);
router.route('/events/').post(auth, createEventValidation, eventController.create);
router.route('/events/:id').get(auth, verifyUserEvent, eventController.show);
router
  .route('/events/:id')
  .patch(auth, updateEventValidation, verifyUserEvent, eventController.update);
router.route('/events/:id').delete(auth, verifyUserEvent, eventController.delete);

export default router;
