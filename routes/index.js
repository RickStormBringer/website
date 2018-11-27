var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.__);
  res.render('index_en', { title: 'Express' });
});

module.exports = router;
