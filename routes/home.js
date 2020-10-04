
const express = require('express');
const router = express.Router();
const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');
const { getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.get("/", (req, res) => {
  const user = getUserById(req.session.user_id, users);
  if (user) {
    delete urlDatabase[req.params.shortURL];
    const templateVars = {
      urls: getUrlsByUserId(req.session.user_id, urlDatabase),
      user: getUserById(req.session.user_id, users)
    };
    res.render("urls_index", templateVars);
  } else {
    res.redirect(`/login`);
  }
});
module.exports = router;