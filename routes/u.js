const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');
const { getUrlObjectbyShortURL } = require('../helpers/helpers');

router.get('/:id', function(req, res) {
  const urlObj = getUrlObjectbyShortURL(req.params.id, urlDatabase);
  try {
    urlObj.totalHits++;
    res.redirect(urlObj.longURL);
  } catch {
    res.send("That is not a valid short url");
  }
});

module.exports = router;