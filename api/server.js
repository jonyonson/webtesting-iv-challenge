const express = require('express');
const Users = require('../users/usersModel.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/users', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/users', (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(deletedUser => {
      req.params.id;
      res.status(200).json({ message: 'user deleted' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
