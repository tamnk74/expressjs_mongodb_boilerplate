import request from 'supertest';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import app from '../../../server/app';
import { userAccessToken } from '../../data/token';
import setup from '../../setupDatabase';
import { insertEvents, userEvents } from '../../data/event';
import { insertUsers, user } from '../../data/user';

setup();

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
      .get('/api/events?limit=' + userEvents.length)
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
