const { assert } = require('chai');
const { getUserByEmail, getUserById } = require('../helpers/helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedOutput = "userRandomID";
    console.log(user.id);
    assert.equal(user.id, expectedOutput);
  });
});

describe('getUserById', function() {
  it('should return a user with valid email', function() {
    const user = getUserById("userRandomID", testUsers);
    const expectedOutput = "user@example.com";
    assert.equal(user.email, expectedOutput);
  });
});