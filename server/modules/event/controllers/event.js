import HTTPStatus from 'http-status';
import uuid from 'uuid';
import Event from '../../../models/event';
import { eventSerializer } from '../serializer';
import { errorFactory } from '../../../errors';
const LIMIT = 5;


export default class EventController {

  /**
   * Paginate event
   */
  index = async (req, res, next) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const events = await Event.find()
        .skip((limit * page) - limit)
        .limit(limit);
      console.log(events);

      return res.status(200).json(eventSerializer.serialize(events));
    }
    catch (err) {
      return next(err)
    }
  };
  /**
   * Event is already ended
   */
  endedEvent = async (req, res, next) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const events = await Event.find({
        dueDate: { $lte: new Date() }
      })
        .skip((limit * page) - limit)
        .limit(limit);
      return res.status(200).json(eventSerializer.serialize(events));
    }
    catch (err) {
      return next(err)
    }
  };
  /**
   * Get one event
   */
  show = async (req, res, next) => {
    try {
      const id = req.params.id;
      const event = await Event.findById(id);
      console.log(event, id);
      if (!event || event.userId.toString() !== req.user._id.toString()) {
        return next(errorFactory.getError('ERR-0404'));
      }

      return res.status(200).json(eventSerializer.serialize(event));
    } catch (err) {
      return next(err)
    }
  };

  create = async (req, res, next) => {
    try {
      const event = new Event({
        id: uuid.v4(),
        name: req.body.name,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        description: req.body.description,
        userId: req.user._id
      });

      const result = await event.save();

      return res.status(201).json(eventSerializer.serialize(result));
    } catch (err) {
      return next(err)
    }
  };

  update = async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event || event.userId != req.user.id) {
        return next(errorFactory.getError('ERR-0404'));
      }

      await Event.findByIdAndUpdate(req.params.id, {
        id: event.id,
        name: req.body.name || event.name,
        startDate: req.body.startDate || event.startDate,
        dueDate: req.body.dueDate || event.dueDate,
        description: req.body.description || event.description,
      });

      return res.status(204).json({});
    } catch (err) {
      return next(err)
    }
  };

  delete = async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event || event.userId != req.user.id) {
        return next(errorFactory.getError('ERR-0404'));
      }

      await Event.findByIdAndRemove(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      return next(err)
    }
  };
}
