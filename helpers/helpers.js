const { urlDatabase } = require('../data/urlDatabase');
const { users } = require('../data/users');
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


const getlongURLbyShortURL = function(su) {
  for (const key in urlDatabase) {
    const res = urlDatabase[key];
    if (su === key) {
      return res.longURL;
    }
  }
};

const getUrlsByUserId = function(id) {
  let result = {};
  for (const key in urlDatabase) {
    const res = urlDatabase[key];
    if (id === res.userID) {
      result[key] = res;
    }
  }
  return result;
};

const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};

module.exports = { generateRandomString, getUserByEmail, getUserById, getlongURLbyShortURL, getUrlsByUserId };