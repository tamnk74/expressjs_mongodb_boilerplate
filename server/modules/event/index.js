import { Router } from 'express';
import { auth } from '../../middlewares';
import { EventController } from './controllers';
import { EventService } from './services';
import { createEventValidation, updateEventValidation, verifyUserEvent } from './middlewares';

const router = Router();
const eventService = new EventService();
const eventController = new EventController({ eventService });

router.get('/events', auth, eventController.index);
router.get('/events/ended', auth, eventController.endedEvent);
router.post('/events/', auth, createEventValidation, eventController.create);
router.get('/events/:id', auth, verifyUserEvent, eventController.show);
router.patch('/events/:id', auth, updateEventValidation, verifyUserEvent, eventController.update);
router.delete('/events/:id', auth, verifyUserEvent, eventController.delete);

export default router;
