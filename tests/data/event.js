import mongoose from 'mongoose';
import faker from 'faker';
import Event from '../../server/models/event';

const { user, userTwo, admin } = require('./user');

const userEvents = new Array(20).fill(0).map((_, index) => ({
  _id: mongoose.Types.ObjectId(),
  user: user._id,
  name: faker.name.title().toLowerCase(),
  startDate: new Date().setDate(10 - index),
  dueDate: new Date().setDate(11 - index),
}));

const userTwoEvents = new Array(20).fill(0).map((_, index) => ({
  _id: mongoose.Types.ObjectId(),
  user: userTwo._id,
  name: faker.name.title().toLowerCase(),
  startDate: new Date().setDate(10 - index),
  dueDate: new Date().setDate(11 - index),
}));

const adminEvents = new Array(20).fill(0).map((_, index) => ({
  _id: mongoose.Types.ObjectId(),
  user: admin._id,
  name: faker.name.title().toLowerCase(),
  startDate: new Date().setDate(10 - index),
  dueDate: new Date().setDate(11 - index),
}));

const insertEvents = async (events) => {
  await Event.insertMany(events);
};

export { userEvents, userTwoEvents, adminEvents, insertEvents };
