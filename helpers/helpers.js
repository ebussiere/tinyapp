const { users, urlDatabase } = require('../data/data');
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

module.exports = { getUserByEmail, getUserById };