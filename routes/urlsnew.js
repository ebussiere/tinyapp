const express = require('express');
const router = express.Router();
const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');

const { getDate, generateRandomString, getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.post("/", (req, res) => {
  const shortURL = generateRandomString();
  const { longURL } = req.body;
  const date = getDate();
  urlDatabase[shortURL] = {
    longURL: longURL,
    userID: req.session.user_id,
    dateCreated: date,
    totalHits: 0,
    visitors: [],
    uniqueHits: 0,
  };
  const templateVars = {
    urls: getUrlsByUserId(req.session.user_id, urlDatabase),
    user: getUserById(req.session.user_id, users)
  };
  res.render("urls_index", templateVars);
});

module.exports = router;

