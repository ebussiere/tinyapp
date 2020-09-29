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
  res.render('pages/index');
});
// about page
app.get('/urls', function(req, res) {
  const templateVars = { urls: urlDatabase };
  res.render('pages/urls_index', templateVars);
});
//Server running at port
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});