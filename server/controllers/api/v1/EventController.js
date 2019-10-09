import HTTPStatus from 'http-status';
import uuid from 'uuid';
import Response from '../../../helpers/Response';
import Event from '../../../models/events';

const LIMIT = 5;

export default class EventController {

  /**
   * Paginate event
   */
  index = async (req, res) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const events = await Event.find()
        .skip((limit * page) - limit)
        .limit(limit);
      return Response.success(res, events);
    }
    catch (err) {
      return Response.error(res, err)
    }
  };
  /**
   * Event is already ended
   */
  endedEvent = async (req, res) => {
    try {
      const { page = 1, limit = LIMIT } = req.query;
      const events = await Event.find({
        dueDate: { $lte: new Date() }
      })
        .skip((limit * page) - limit)
        .limit(limit);
      return Response.success(res, events);
    }
    catch (err) {
      return Response.error(res, err)
    }
  };
  /**
   * Get one event
   */
  show = async (req, res) => {
    try {
      const id = req.params.id;
      const event = await Event.findOne({ id });
      if (!event || event.userId.toString() !== req.user._id.toString()) {
        return Response.error(res, 'Can not find out this event!', HTTPStatus.BAD_REQUEST);
      }

      return Response.success(res, event);
    } catch (e) {
      return Response.error(res, e, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };

  create = async (req, res) => {
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

      return Response.success(res, result);
    } catch (e) {
      return Response.error(res, e, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };

  update = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event || event.userId !== req.user.id) {
        return Response.error(res, 'Can not find out this event!', HTTPStatus.BAD_REQUEST);
      }

      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
        id: event.id,
        name: req.body.name || event.name,
        startDate: req.body.startDate || event.startDate,
        dueDate: req.body.dueDate || event.dueDate,
        description: req.body.description || event.description,
      });
      return Response.success(res, updatedEvent);
    } catch (e) {
      return Response.error(res, e, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };

  delete = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event || event.userId !== req.user.id) {
        return Response.error(res, 'Can not find out this event!', HTTPStatus.BAD_REQUEST);
      }

      const removedEvent = await Event.findByIdAndRemove(req.params.id);
      return Response.success(res, removedEvent);
    } catch (e) {
      return Response.error(res, e, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };
}