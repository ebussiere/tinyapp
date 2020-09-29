const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

//Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//Data for excercise
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};
//"Home" route
app.get('/', function(req, res) {
  res.render('index');
});
// about page
app.get('/urls', function(req, res) {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', function(req, res) {
  const templateVars = { urls: urlDatabase };
  res.render('urls_new', templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const longurl = urlDatabase[req.params.shortURL];
  const templateVars = { shortURL: req.params.shortURL, longURL: longurl };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  //console.log(req.body);
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body["longURL"];  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`);
  console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls`);
  console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.get("/urls/show/:shortURL", (req, res) => {
  //urlDatabase[shortURL] = req.params.longURL;
  res.redirect(`/urls/show/${req.params.shortURL}`);
  //console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.longURL;
  res.redirect(`/urls`);
  console.log(urlDatabase);         // Respond with 'Ok' (we will replace this)
});

// app.get("/getdata", function(req, res) {
//   pullData().then(function(data) {
//     return filterByYear(data);
//   }).then(function(filteredData) {
//     res.json(filteredData);
//   });
// });
//Server running at port
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});