const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

//Middleware
app.use(cookieParser());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


//Data for excercise
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};

const getUserById = function(id) {
  let user = {};
  for (const key in users) {
    if (users.hasOwnProperty(id)) {
      user = users[id];
    }
    return user;
  }
};

const getUserByEmail = function(email) {
  for (const key in users) {
    const res = users[key];
    if (res["email"] === email) {
      return res;
    }
  }
  return false;
};


//"Home" route
app.get('/urls', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_index', templateVars);
});
// about page
app.get('/register', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_register', templateVars);
});

app.get('/login', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_login', templateVars);
});

app.get('/urls/new', function(req, res) {
  const templateVars = {
    urls: urlDatabase,
    user: getUserById(req.cookies["user_id"])
  };
  res.render('urls_new', templateVars);
});

app.get("/urls/show/:shortURL", (req, res) => {
  //urlDatabase[shortURL] = req.params.longURL;
  const templateVars = {
    user: getUserById(req.cookies["user_id"])
  };
  res.redirect(`/urls/show/${req.params.shortURL}`, templateVars);
  //console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.get("/urls/:shortURL", (req, res) => {
  const longurl = urlDatabase[req.params.shortURL];
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: longurl,
    user: getUserById(req.cookies["user_id"])
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body["longURL"];
  res.redirect(`/urls/${shortURL}`);
  console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls`);
  console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.longURL;
  res.redirect(`/urls`);
});

app.post("/login", (req, res) => {
  console.log(req.body.email, req.body.password);
  let user = getUserByEmail(req.body.email);
  console.log(req.body.email + "  " + req.body.password + " " + user.password);
  if (user.password === req.body.password) {
    console.log("Passed");
    templateVars = { user };
    console.log(user);
    res.render(`urls_index`, templateVars);
  }
  else {
    res.redirect(`/login`);
  };
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect(`/urls`);
});

app.post("/register", (req, res) => {

  if (req.body.email === "" || req.body.password === "") {
    res.statusCode = 400;
  } else if (getUserByEmail() == false) {
    res.statusCode = 403;
  } else {
    const genId = generateRandomString();
    users["id"] = {
      id: genId,
      email: req.body.email,
      password: req.body.password,
    };
  }
  res.cookie("user_id", genId);
  console.log(users);
  res.redirect(`/urls`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});;