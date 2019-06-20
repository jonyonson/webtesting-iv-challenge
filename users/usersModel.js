const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
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

// async function update(id, changes) {
//   return null;
// }

function remove(id) {
  return db('users')
    .where({ id })
    .truncate();
}

function getAll() {
  return db('users');
}

function findById(id) {
  return null;
}
