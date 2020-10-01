const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


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
  console.log(users);
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const genId = generateRandomString();
  if (req.body.email === "" || req.body.password === "") {
    res.status(400);
  } else if (getUserByEmail() == false) {
    res.status(403);
  } else {
    users["id"] = {
      id: genId,
      email: req.body.email,
      password: hashedPassword,
    };
  }
  console.log(hashedPassword);
  res.cookie("user_id", password);
  res.redirect(`/urls`);
});
module.exports = router;