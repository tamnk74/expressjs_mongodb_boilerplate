import request from 'supertest';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import app from '../../../server/app';
import setup from '../../setupDatabase';
import { insertUsers, user } from '../../data/user';

setup();

describe('# Post /api/login', () => {
  beforeAll(async () => {
    await insertUsers([user]);
  });

  it('should return OK when sending correct username and password', async () => {
    const { statusCode } = await request(app).post('/api/login').send({
      email: user.email,
      password: user.password,
    });

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
