const mongoose = require('mongoose');
const findOrCreate = require('./plugins/findOrCreate');

const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
  }
}, {
  timestamps: true
})

EventSchema.plugin(findOrCreate);

const Event = mongoose.model('Event', EventSchema);

export default Event;
