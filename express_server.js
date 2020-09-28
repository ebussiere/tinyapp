const express = require('express');
const app = express();
const PORT = 8080;
//Data for excercise
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//"Home" route
app.get("/", (req, res) => {
  res.send("Hello");
});

//"Home" route

//"Home" route
app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
});

//Server running at port
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});