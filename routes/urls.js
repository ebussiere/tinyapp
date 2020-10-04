const express = require('express');
const router = express.Router();
const { users } = require('../data/users');
const { urlDatabase } = require('../data/urlDatabase');

const {
  getUrlObjectbyShortURL,
  getDate,
  generateRandomString,
  getUserById,
  getUrlsByUserId } = require('../helpers/helpers');

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
    //res.send('You don\'t have access');
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

router.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const urlObj = getUrlObjectbyShortURL(shortURL, urlDatabase);
  const user = getUserById(req.session.user_id, users);
  if (user) {
    if (!urlObj) {
      res.send("Error 404 - Not Found");
    } else if (urlObj && (urlObj.userID === user.id)) {
      console.log(urlObj);
      console.log(user);
      const templateVars = {
        shortURL: shortURL,
        longURL: urlObj.longURL,
        user: user
      };
      res.render("urls_show", templateVars);
    } else {
      res.send("403 - Forbidden");
    }
  } else {
    res.redirect(`/`);
  }
});

router.post("/new/:longURL", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.params.longURL;
  const user = getUserById(req.session.user_id, users);
  const date = getDate();
  if (user) {
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
  } else {
    res.send('403 - Forbidden');
  }
});

router.post("/:shortURL/delete", (req, res) => {
  const user = getUserById(req.session.user_id, users);
  const urlObj = getUrlObjectbyShortURL(req.params.shortURL, urlDatabase);
  if (!user) {
    res.send("403 - Forbidden");
  } else if (urlObj && (user.id === urlObj.userID)) {
    delete urlDatabase[req.params.shortURL];
    res.redirect(`/urls`);
  } else {
    res.redirect(`/urls`);
  }
});

router.post("/:shortURL", (req, res) => {
  const user = getUserById(req.session.user_id, users);
  const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  const urlObj = getUrlObjectbyShortURL(shortURL, urlDatabase);
  if (user) {
    if (longURL) {
      if (user.id === urlObj.userID) {
        urlDatabase[req.params.shortURL]["longURL"] = longURL;
        res.redirect("/urls");
      }
    }
    else {
      res.redirect("/urls");
    }
  }
  else {
    res.send("403 - Forbidden");
  }
});
module.exports = router;

