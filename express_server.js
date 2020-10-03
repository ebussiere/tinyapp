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

//Using express router
app.use('/', require('./routes/home'));
app.use('/u', require('./routes/u'));
app.use('/users', require('./routes/users'));
app.use('/urls', require('./routes/urls'));
app.use('/urlsnew', require('./routes/urlsnew'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on Port: ${PORT}.`);
});

