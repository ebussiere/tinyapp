const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');
const { generateRandomString, getUserByEmail, getUserById } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_login', templateVars);
});
router.post("/", (req, res) => {
  console.log(req.body.email, req.body.password);
  let user = getUserByEmail(req.body.email);
  if (!user) {
    console.log("400 - Sorry, we cannot find a user with that email.");
    res.redirect(`/`);
  } else if (user.password != req.body.password) {
    console.log("403 - The password you have entered does not match our records.");
    res.redirect(`/`);
  } else {
    templateVars = { user, urls: urlDatabase, };
    res.cookie("user_id", user.id);
    res.render(`urls_index`, templateVars);
  }
});

module.exports = router;