const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { users } = require('../data/users');
const { generateRandomString, getUserByEmail } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    user: {}
  };
  res.render('urls_register', templateVars);
});

router.post("/", (req, res) => {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const genId = generateRandomString();
  const exUser = getUserByEmail(req.body.email, users);
  if (exUser) {
    res.send('A user with that email aready exists');
  } else if (req.body.email === "" || req.body.password === "") {
    //Handled by bootstrap
  } else {
    users["id"] = {
      id: genId,
      email: req.body.email,
      password: hashedPassword,
    };
  }
  res.redirect(`/urls`);
});
module.exports = router;