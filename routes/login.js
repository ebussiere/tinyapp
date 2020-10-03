const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');
const { getUserByEmail, getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.session.user_id)
  };
  res.render('urls_login', templateVars);
});
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email, users);
  if (!user) {
    res.redirect(`/`);
  } else if (!bcrypt.compareSync(password, user.password)) {
    res.redirect(`/`);
  } else {
    req.session.user_id = user.id;
    res.redirect("/urls");
  }
});
module.exports = router;