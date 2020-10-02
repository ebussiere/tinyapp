const moment = require('moment');
const { urlDatabase } = require('../data/urlDatabase');
const { users } = require('../data/users');
const getUserById = function(id, users) {
  for (const key in users) {
    const res = users[key];
    if (res["id"] === id) {
      return res;
    }
  }
  return false;
};


const getUserByEmail = function(email, users) {
  for (const key in users) {
    const res = users[key];
    if (res["email"] === email) {
      return res;
    }
  }
  return false;
};


const getlongURLbyShortURL = function(su) {
  for (const key in urlDatabase) {
    const res = urlDatabase[key];
    if (su === key) {
      return res.longURL;
    }
  }
};

const getUrlsByUserId = function(id, urls) {
  let result = {};
  for (const key in urls) {
    const res = urls[key];
    if (id === res["userID"]) {
      result[key] = res;
    }
  }
  return result;
};

const getDate = function() {
  let mo = moment(Date.now());
  let n = mo.format('L');
  return n;
};

const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};

module.exports = { getDate, generateRandomString, getUserByEmail, getUserById, getlongURLbyShortURL, getUrlsByUserId };