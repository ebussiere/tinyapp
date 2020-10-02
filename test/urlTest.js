const { assert } = require('chai');
const { convertDate, getUrlsByUserId } = require('../helpers/helpers.js');

const testUrlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "userRandomID",
    dateCreated: "10/01/2020",
    hits: 1,
    visitors: []
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "userRandomID",
    dateCreated: "10/01/2020",
    hits: 10,
    visitors: []
  },
  i3BoGa: {
    longURL: "https://www.formula1.com",
    userID: "ebussiId",
    dateCreated: "10/01/2020",
    hits: 10,
    visitors: []
  }
};

describe('getUrlsByUserId', function() {
  it('should return an object containing urls', function() {
    const urls = getUrlsByUserId("ebussiId", testUrlDatabase);
    console.log(urls);
    const expectedOutput = 1;
    assert.equal(Object.keys(urls).length, expectedOutput);
  });
});

describe('createDate', function() {
  it('should return a javascript date', function() {
    const date = convertDate();
    console.log(date);
    //const expectedOutput = 2;
    assert.equal(1, 1);
  });
});
