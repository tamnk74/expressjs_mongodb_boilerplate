import Event from '../../../models/event';

export class EventService {
  findAll = async ({ page = 1, limit = 10, ...options }) => {
    const events = await Event.find(options)
      .populate('user')
      .skip(limit * page - limit)
      .limit(+limit);

    return events;
  };

  createEvent = (event) => {
    return new Event(event).save();
  };

  updateEvent = (eventId, data) => {
    return Event.findByIdAndUpdate(eventId, data);
  };

  removeEvent = (eventId) => {
    return Event.findByIdAndRemove(eventId);
  };
}
