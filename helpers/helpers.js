const moment = require('moment');
const { urlDatabase } = require('../data/urlDatabase');


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

const getUrlObjectbyShortURL = function(su, urlDatabase) {
  for (const key in urlDatabase) {
    const res = urlDatabase[key];
    if (su === key) {
      return res;
    }
  }
};

// To be used to validate and verify urls
const urlCheck = function(raw) {
  if (raw.startsWith("https://") || raw.startsWith("http://")) {
    return true;
  }
  return false;
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

// used to set create date on tiny urls
const getDate = function() {
  let mo = moment(Date.now());
  let n = mo.format('L');
  return n;
};

//used to create tiny urls
const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};

module.exports = {
  urlCheck,
  getUrlObjectbyShortURL,
  getDate,
  generateRandomString,
  getUserByEmail,
  getUserById,
  getlongURLbyShortURL,
  getUrlsByUserId
};