import { Types } from 'mongoose';
import Event from '../../../models/event';
import { errorFactory } from '../../../errors';

export const verifyUserEvent = async function (req, res, next) {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return next(errorFactory.getError('EVEN-1001'));
    }

    const event = await Event.findById(id).populate('user');
    const { user } = req;
    if (!event || event.user._id.toString() !== user._id.toString()) {
      return next(errorFactory.getError('EVEN-1001'));
    }

    req.event = event;
    next();
  } catch (err) {
    return next(err);
  }
};
