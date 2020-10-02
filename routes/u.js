const express = require('express');
const router = express.Router();

const { urlDatabase } = require('../data/urlDatabase');
const { getUrlObjectbyShortURL } = require('../helpers/helpers');

router.get('/:id', function(req, res) {
  const urlObj = getUrlObjectbyShortURL(req.params.id, urlDatabase);
  urlObj.totalHits++;
  res.redirect(urlObj.longURL);
});

module.exports = router;