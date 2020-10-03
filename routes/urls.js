const express = require('express');
const router = express.Router();
const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');

const { getUrlObjectbyShortURL, getDate, generateRandomString, getUserById, getUrlsByUserId } = require('../helpers/helpers');

router.get('/', function(req, res) {
  const id = req.session.user_id;
  const user = getUserById(id, users);
  const templateVars = {
    urls: getUrlsByUserId(id, urlDatabase),
    user: user
  };
  if (user) {
    res.render('urls_index', templateVars);
  } else {
    res.redirect('/login');
  }
});

router.get('/new', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.session.user_id, users),
    longURL: ""
  };
  if (req.session.user_id) {
    res.render('urls_new', templateVars);
  } else {
    res.redirect(`/login`);
  }
});

router.get("/show/:shortURL", (req, res) => {
  const templateVars = {
    user: getUserById(req.session.user_id, users)
  };
  res.redirect(`/show/${req.params.shortURL}`, templateVars);
});

router.get("/:shortURL", (req, res) => {
  const longurl = urlDatabase[req.params.shortURL]["longURL"];
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: longurl,
    user: getUserById(req.session.user_id, users)
  };
  //res.redirect("/urls");
  res.render("urls_show", templateVars);
});

router.post("/new/:longURL", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.params.longURL;
  const user = getUserById(req.session.user_id, users);
  const date = getDate();
  urlDatabase[shortURL] = {
    longURL: longURL,
    userID: req.session.user_id,
    dateCreated: date,
    totalHits: 0,
    visitors: [],
    uniqueHits: 0,
  };
  const urls = getUrlsByUserId(req.session.user_id, urlDatabase);
  const templateVars = {
    urls: urls,
    user
  };
  //res.render("urls_index", templateVars);
  res.redirect(`/urls`);
});

router.post("/:shortURL/delete", (req, res) => {
  const user = getUserById(req.session.user_id, users);
  const urlObj = getUrlObjectbyShortURL(req.params.shortURL, urlDatabase);
  if (urlObj && (user.id === urlObj.userID)) {
    delete urlDatabase[req.params.shortURL];
  }
  const templateVars = {
    urls: getUrlsByUserId(req.session.user_id, urlDatabase),
    user: getUserById(req.session.user_id, users)
  };
  res.redirect(`/urls`);
});

router.post("/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL]["longURL"] = req.body.longURL;
  const templateVars = {
    urls: getUrlsByUserId(req.session.user_id, urlDatabase),
    user: getUserById(req.session.user_id, users)
  };
  res.render("/urls");
});

module.exports = router;

