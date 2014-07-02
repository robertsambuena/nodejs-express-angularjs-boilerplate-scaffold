var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	module_name: 'user',
  	module_angular: 'ui.freedom'
  });
});
router.get('/admin', function(req, res) {
  res.render('index', {
  	module_name: 'admin',
  	module_angular: 'ui.freedom'
  });
});
module.exports = router;
