const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/index', { title: '首页' });
});

module.exports = router;
