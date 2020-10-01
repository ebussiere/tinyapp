const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("user_id");
  res.redirect(`/urls`);
});

module.exports = router;