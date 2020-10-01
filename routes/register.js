const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');
const { users } = require('../data/users');
const { getUserByEmail, getUserById, generateRandomString } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_register', templateVars);
});

router.post("/", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400).send('Sorry, we cannot find that!');
  } else if (getUserByEmail() == false) {
    res.status(403).send('Sorry, we cannot find that!');
  } else {
    const genId = generateRandomString();
    users["id"] = {
      id: genId,
      email: req.body.email,
      password: req.body.password,
    };
  }
  res.cookie("user_id", genId);
  res.redirect(`/urls`);
});
module.exports = router;