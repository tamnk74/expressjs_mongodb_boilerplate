import { Router } from 'express';
import { auth } from '../../../middlewares';
import { eventController } from '../controllers';

const router = Router();

router.route('/events').get([auth], eventController.index);
router.route('/events/ended').get([auth], eventController.endedEvent);
router.route('/events/').post([auth], eventController.create);
router.route('/events/:id').get([auth], eventController.show);
router.route('/events/:id').put([auth], eventController.update);
router.route('/events/:id').delete([auth], eventController.delete);

export default router;
