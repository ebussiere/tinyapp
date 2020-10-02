const express = require('express');
const router = express.Router();

//const { urlDatabase } = require('../data/urlDatabase');
const { getlongURLbyShortURL } = require('../helpers/helpers');

router.get('/:id', function(req, res) {
  const longURL = getlongURLbyShortURL(req.params.id);
  res.redirect(longURL);
});

module.exports = router;