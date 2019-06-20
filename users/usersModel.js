const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
};

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      return db('users')
        .where({ id: ids[0] })
        .first();
    });
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function getAll() {
  return db('users');
}
