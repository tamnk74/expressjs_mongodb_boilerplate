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
        .populate('user')
        .skip(limit * page - limit)
        .limit(+limit);

      return res.status(200).json(eventSerializer.serialize(events));
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Event is already ended
   */
  endedEvent = async (req, res, next) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const events = await Event.find({
        dueDate: { $lte: new Date() },
      })
        .skip(limit * page - limit)
        .limit(limit);
      return res.status(200).json(eventSerializer.serialize(events));
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Get one event
   */
  show = async (req, res, next) => {
    try {
      const { event } = req;

      return res.status(200).json(eventSerializer.serialize(event));
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Add new event
   */
  create = async (req, res, next) => {
    try {
      const event = new Event({
        id: uuid.v4(),
        name: req.body.name,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        description: req.body.description,
        user: req.user._id,
      });

      const result = await event.save();

      return res.status(201).json(eventSerializer.serialize(result));
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Update an event
   */
  update = async (req, res, next) => {
    try {
      const { event } = req;

      await Event.findByIdAndUpdate(req.params.id, {
        name: req.body.name || event.name,
        startDate: req.body.startDate || event.startDate,
        dueDate: req.body.dueDate || event.dueDate,
        description: req.body.description || event.description,
      });

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  };
  /**
   * Delete an event
   */
  delete = async (req, res, next) => {
    try {
      const { event } = req;

      await Event.findByIdAndRemove(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  };
}
