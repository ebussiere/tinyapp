const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//Using Express Routervagrant
app.use('/', require('./routes/home'));
app.use('/u', require('./routes/u'));
app.use('/users', require('./routes/users'));
app.use('/urls', require('./routes/urls'));
app.use('/urlsnew', require('./routes/urlsnew'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});




//"Home" route
// app.get('/urls', function(req, res) {
//   const templateVars = {
//     urls: urlDatabase,
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.render('urls_index', templateVars);
// });
// about page
// app.get('/register', function(req, res) {
//   const templateVars = {
//     urls: urlDatabase,
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.render('urls_register', templateVars);
// });

// app.get('/login', function(req, res) {
//   const templateVars = {
//     urls: urlDatabase,
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.render('urls_login', templateVars);
// });

// app.get('/urls/new', function(req, res) {
//   const templateVars = {
//     urls: urlDatabase,
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.render('urls_new', templateVars);
// });

// app.get("/urls/show/:shortURL", (req, res) => {
//   //urlDatabase[shortURL] = req.params.longURL;
//   const templateVars = {
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.redirect(`/urls/show/${req.params.shortURL}`, templateVars);
//   //console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
// });

// app.get("/urls/:shortURL", (req, res) => {
//   const longurl = urlDatabase[req.params.shortURL];
//   const templateVars = {
//     shortURL: req.params.shortURL,
//     longURL: longurl,
//     user: getUserById(req.cookies["user_id"])
//   };
//   res.render("urls_show", templateVars);
// });

// app.post("/urls", (req, res) => {
//   const shortURL = generateRandomString();
//   urlDatabase[shortURL] = req.body["longURL"];
//   res.redirect(`/urls/${shortURL}`);
// });

// app.post("/urls/:shortURL/delete", (req, res) => {
//   delete urlDatabase[req.params.shortURL];
//   res.redirect(`/urls`);
// });

// app.post("/urls/:shortURL", (req, res) => {
//   urlDatabase[req.params.shortURL] = req.body.longURL;
//   res.redirect(`/urls`);
// });

// app.post("/login", (req, res) => {
//   console.log(req.body.email, req.body.password);
//   let user = getUserByEmail(req.body.email);
//   if (!user) {
//     console.log("400 - Sorry, we cannot find a user with that email.");
//     res.redirect(`/login`);
//   } else if (user.password != req.body.password) {
//     console.log("403 - The password you have entered does not match our records.");
//     res.redirect(`/login`);
//   } else {
//     templateVars = { user, urls: urlDatabase, };
//     res.cookie("user_id", user.id);
//     res.render(`urls_index`, templateVars);
//   }

//   // console.log(req.body.email + "  " + req.body.password + " " + user.password);
//   // if (user.password === req.body.password) {

//   // }
//   // else {
//   //   res.redirect(`/login`);
//   // };
// });

// app.post("/logout", (req, res) => {
//   res.clearCookie("user_id");
//   res.redirect(`/urls`);
// });

// app.post("/register", (req, res) => {
//   if (req.body.email === "" || req.body.password === "") {
//     res.status(400).send('Sorry, we cannot find that!');
//   } else if (getUserByEmail() == false) {
//     res.status(403).send('Sorry, we cannot find that!');
//   } else {
//     const genId = generateRandomString();
//     users["id"] = {
//       id: genId,
//       email: req.body.email,
//       password: req.body.password,
//     };
//   }
//   res.cookie("user_id", genId);
//   res.redirect(`/urls`);
// });
