import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import httpStatus from 'http-status';
import app from '../../../server/app';
import { userAccessToken } from '../../data/token';
import setupDatabase from '../../setupDatabase';
import { insertEvents, userEvents } from '../../data/event';
import { insertUsers, user } from '../../data/user';

setupDatabase();

describe('GET api/events', () => {
  beforeAll(async () => {
    await insertUsers([user]);
    await insertEvents(userEvents);
  });
  it('Check authentification', async () => {
    const { statusCode } = await request(app).get('/api/events');
    expect(statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should response success when sending valid token', async () => {
    const { statusCode, body } = await request(app)
      .get(`/api/events?limit=${userEvents.length}`)
      .set('Authorization', `Bearer ${userAccessToken}`);
    expect(statusCode).toBe(httpStatus.OK);
    expect(body.data.length).toBe(userEvents.length);
  });
  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});

describe('POST api/events', () => {
  beforeAll(async () => {
    await insertUsers([user]);
    await insertEvents(userEvents);
  });
  it('Check authentification', async () => {
    const { statusCode } = await request(app).post('/api/events').send({
      name: faker.name.title(),
      startDate: faker.date.past(),
      dueDate: faker.date.future(),
      description: faker.name.title(),
    });
    expect(statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should response success when sending valid token', async () => {
    const { statusCode } = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send({
        name: faker.name.title(),
        startDate: faker.date.past(),
        dueDate: faker.date.future(),
        description: faker.name.title(),
      });
    expect(statusCode).toBe(httpStatus.CREATED);
  });

  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});

describe('GET api/events/:id', () => {
  beforeAll(async () => {
    await insertUsers([user]);
    await insertEvents(userEvents);
  });
  it('Check authentification', async () => {
    const { statusCode } = await request(app).get(`/api/events/${userEvents[0]._id}`);
    expect(statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should response success when sending valid token', async () => {
    const { statusCode } = await request(app)
      .get(`/api/events/${userEvents[0]._id}`)
      .set('Authorization', `Bearer ${userAccessToken}`);
    expect(statusCode).toBe(httpStatus.OK);
  });
  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});

describe('PATCH api/events/:id', () => {
  beforeAll(async () => {
    await insertUsers([user]);
    await insertEvents(userEvents);
  });
  it('Check authentification', async () => {
    const { statusCode } = await request(app).patch(`/api/events/${userEvents[0]._id}`).send({
      name: faker.name.title(),
      startDate: faker.date.past(),
      dueDate: faker.date.future(),
      description: faker.name.title(),
    });
    expect(statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should response success when sending valid token', async () => {
    const { statusCode } = await request(app)
      .patch(`/api/events/${userEvents[0]._id}`)
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send({
        name: faker.name.title(),
        startDate: faker.date.past(),
        dueDate: faker.date.future(),
        description: faker.name.title(),
      });
    expect(statusCode).toBe(httpStatus.NO_CONTENT);
  });
  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});

describe('DELETE api/events/:id', () => {
  beforeAll(async () => {
    await insertUsers([user]);
    await insertEvents(userEvents);
  });
  it('Check authentification', async () => {
    const { statusCode } = await request(app).delete(`/api/events/${userEvents[0]._id}`);
    expect(statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should response success when sending valid token', async () => {
    const { statusCode } = await request(app)
      .delete(`/api/events/${userEvents[0]._id}`)
      .set('Authorization', `Bearer ${userAccessToken}`);
    expect(statusCode).toBe(httpStatus.NO_CONTENT);
  });
  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});
