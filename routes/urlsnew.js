const express = require('express');
const router = express.Router();
const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');

const { urlCheck, getDate, generateRandomString, getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.post("/", (req, res) => {
  const shortURL = generateRandomString();
  const { longURL } = req.body;
  const user = getUserById(req.session.user_id, users);
  if (user) {
    if (urlCheck(longURL)) {
      const date = getDate();
      urlDatabase[shortURL] = {
        longURL: longURL,
        userID: req.session.user_id,
        dateCreated: date,
        totalHits: 0,
        visitors: [],
        uniqueHits: 0,
      };
    }
    res.redirect("/urls");
  } else {
    res.send("403 - Forbidden");
  }
});

module.exports = router;

