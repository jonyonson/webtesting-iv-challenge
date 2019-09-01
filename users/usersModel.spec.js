const db = require('../data/dbConfig');

const { insert, remove } = require('./usersModel.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
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

  describe('remove()', () => {
    it('should remove provided user', async () => {
      const response = await insert({ username: 'BillyBob' });

      await remove(response[0]);
      const users = await db('users');
      expect(users).toHaveLength(0);
    });
  });
});
