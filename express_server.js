const express = require('express');
const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');
//Data for excercise
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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

app.get("/urls/:shortURL", (req, res) => {
  const longurl = urlDatabase[req.params.shortURL];
  const templateVars = { shortURL: req.params.shortURL, longURL: longurl };
  res.render("urls_show", templateVars);
});
//Server running at port
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});