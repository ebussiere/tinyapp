const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');
const { users } = require('../data/users');
const { getUserByEmail, getUserById, generateRandomString } = require('../helpers/helpers');

router.get('/', function(req, res) {
  res.json(users);
}
);

router.post("/", (req, res) => {
  users[req.body.id] = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.email,
  };
}
);
module.exports = router;