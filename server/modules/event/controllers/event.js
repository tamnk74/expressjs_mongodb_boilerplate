import { eventSerializer } from '../serializer';

export class EventController {
  /**
   * Paginate event
   */
  constructor({ eventService }) {
    this.eventService = eventService;
  }

  index = async (req, res, next) => {
    try {
      const events = await this.eventService.findAll(req.query);

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
      const events = await this.eventService.findAll({
        dueDate: { $lte: new Date() },
        ...req.query,
      });
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
      const result = await this.eventService.createEvent({
        name: req.body.name,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        description: req.body.description,
        user: req.user.id,
      });

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

      await this.eventService.updateEvent(req.params.id, {
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
      await this.eventService.removeEvent(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  };
}
