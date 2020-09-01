import { Types } from 'mongoose';
import Event from '../../../models/event';
import { errorFactory } from '../../../errors';

// eslint-disable-next-line import/prefer-default-export
export const verifyUserEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return next(errorFactory.getError('EVEN-1001'));
    }

    const event = await Event.findById(id).populate('user');
    const { user } = req;

    if (!event || !event.user || event.user.id.toString() !== user.id.toString()) {
      return next(errorFactory.getError('EVEN-1001'));
    }

    req.event = event;
    next();
  } catch (err) {
    return next(err);
  }
};
