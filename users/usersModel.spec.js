const db = require('../data/dbConfig');

const { insert } = require('./usersModel.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
    // expect(process.env.DB_ENV).toBe('testing');
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('insert()', () => {
    it('should insert the provided users', async () => {
      await insert({ username: 'Jonathan' });
      await insert({ username: 'Bobby' });
      const users = await db('users');
      expect(users).toHaveLength(2);
    });
  });
});
