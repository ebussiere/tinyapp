const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');

const { generateRandomString, getUserById } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_index', templateVars);
});

router.get('/new', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_new', templateVars);
});

router.get("/show/:shortURL", (req, res) => {
  const templateVars = {
    user: getUserById(req.cookies["user_id"])
  };
  res.redirect(`/show/${req.params.shortURL}`, templateVars);
});

router.get("/:shortURL", (req, res) => {
  const longurl = urlDatabase[req.params.shortURL];
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: longurl,
    user: getUserById(req.cookies["user_id"])
  };
  res.render("urls_show", templateVars);
});

router.post("/", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body["longURL"];
  res.redirect(`/${shortURL}`);
});

router.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/`);
});

router.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.longURL;
  res.redirect(`/`);
});

module.exports = router;

