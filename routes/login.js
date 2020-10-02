const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');
const { generateRandomString, getUserByEmail, getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.session.user_id)
  };
  res.render('urls_login', templateVars);
});
router.post("/", (req, res) => {
  const { email, password } = req.body;
  let user = getUserByEmail(email, users);
  if (!user) {
    console.log("400 - Sorry, we cannot find a user with that email.");
    res.redirect(`/`);
  } else if (!bcrypt.compareSync(password, user.password)) {
    console.log("403 - The password you have entered does not match our records.");
    res.redirect(`/`);
  } else {
    templateVars = { user, urls: getUrlsByUserId(user.id, urlDatabase) };
    //console.log(user.id);
    //console.log(templateVars);
    req.session.user_id = user.id;
    res.render(`urls_index`, templateVars);
  }
});
module.exports = router;