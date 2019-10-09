const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../index');

var auth = {};
beforeEach(async () => {
  const response = await request(app).post('/api/auth/login')
    .send({
      name: 'tamnk',
      password: '123456'
    });
  const data = JSON.parse(response.text)
  auth = data.data;
});
describe('sample test', () => {
  it('jest works', () => {
    expect(true).toBe(true);
  });
});

describe('GET api/health-check', function () {
  it('check api server', async function () {
    const response = await request(app).get('/api/health-check');
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});

describe('## event auth', () => {
  describe('# Login /api/auth/login', () => {
    it('should return OK', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          name: 'tamnk',
          password: '123456'
        })
        .expect(httpStatus.OK)
        .then(() => {
          done();
        })
        .catch(done);
    });
    it('should return INTERNAL_SERVER_ERROR', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          "name": "tamnk",
          "password": "1234576"
        })
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then(() => {
          done();
        })
        .catch(done);
    });

    describe('# Error Handling', () => {
      it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
        request(app)
          .get('/api/users/56z787zzz67fc')
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            done();
          })
          .catch(done);
      });

      it('should handle express validation error - username is required', (done) => {
        request(app)
          .post('/api/users')
          .send({
            mobileNumber: '1234567890'
          })
          .expect(httpStatus.INTERNAL_SERVER_ERROR)
          .then((res) => {
            done();
          })
          .catch(done);
      });
    });
  });
});
describe('## event api', () => {
  describe('# GET /api/events without jwt', () => {
    it('should return UNAUTHORIZED', async (done) => {
      request(app)
        .get('/api/events')
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => {
          done();
        })
        .catch(done);
    });
    it('should return OK', async (done) => {
      request(app)
        .get('/api/events')
        .set('Authorization', 'Bearer ' + auth.token)
        .expect(httpStatus.OK)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});