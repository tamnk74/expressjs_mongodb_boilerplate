import { Router } from 'express';
import Validate from 'express-validation';
import { auth } from '../../../middlewares';
import { eventController } from '../../../controllers/api/v1';
import { eventValidation } from '../../../validations';


const router = Router();

router.route('/').get([auth.mustLogin, Validate(eventValidation.index)], eventController.index);
router.route('/ended').get([auth.mustLogin, Validate(eventValidation.index)], eventController.endedEvent);
router.route('/').post([auth.mustLogin, Validate(eventValidation.create)], eventController.create);
router.route('/:id').get([auth.mustLogin, Validate(eventValidation.show)], eventController.show);
router.route('/:id').put([auth.mustLogin, Validate(eventValidation.update)], eventController.update);
router.route('/:id').delete([auth.mustLogin, Validate(eventValidation.delete)], eventController.delete);

export default router;