const supertest = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('server', () => {
  describe('GET/', () => {
    // ayncronous test either need to return the promise
    it('responds with 200 ok', () => {
      return supertest(server)
        .get('/')
        .expect(200);
    });

    // or use async/await
    it('should return a JSON object', async () => {
      await supertest(server)
        .get('/')
        .expect('Content-Type', /json/i);
    });

    it('responds {api: "up"}', async () => {
      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: 'up' });
        });
    });
  });

  describe('POST /users', () => {
    it('responds with 201 when user is passed', async () => {
      const user = { username: 'Jonathan' };
      const response = await supertest(server)
        .post('/users')
        .send(user);
      expect(response.status).toEqual(201);
    });

    it('responds with 500 when no user is passed', async () => {
      const response = await supertest(server).post('/users');

      expect(response.status).toEqual(500);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const user = { name: 'Jonathan' };
      await supertest(server)
        .post('/users')
        .send(user);

      const response = await supertest(server).delete('/users/1');
      expect(response.status).toEqual(200);
    });
  });
});
