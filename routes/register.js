const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { users } = require('../data/users');
const { generateRandomString } = require('../helpers/helpers');

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
  if (req.body.email === "" || req.body.password === "") {
    //res.status(400);
  } else {
    users["id"] = {
      id: genId,
      email: req.body.email,
      password: hashedPassword,
    };
  }
  console.log(hashedPassword);
  console.log(users);
  res.redirect(`/urls`);

});
module.exports = router;