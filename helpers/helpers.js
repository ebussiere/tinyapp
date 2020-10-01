const { users, urlDatabase } = require('../data/users');
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

const generateRandomString = function(length = 6) {
  return Math.random().toString(20).substr(2, length);
};

module.exports = { generateRandomString, getUserByEmail, getUserById };