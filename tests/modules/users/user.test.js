import request from 'supertest';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import app from '../../../server/app';
import setupDatabase from '../../setupDatabase';
import { insertUsers, user, userTwo, admin } from '../../data/user';
import { userAccessToken } from '../../data/token';

setupDatabase();

const users = [user, userTwo, admin];
describe('# Post /api/login', () => {
  beforeAll(async () => {
    await insertUsers(users);
  });

  it('should return OK when sending correct username and password', async () => {
    const { statusCode } = await request(app).post('/api/login').send({
      email: user.email,
      password: user.password,
    });

    expect(statusCode).toBe(httpStatus.OK);
  });

  it('should return OK when getting user list', async () => {
    const { statusCode, body } = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(statusCode).toBe(httpStatus.OK);
    expect(body.data.length).toBe(users.length);
  });

  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });
});
