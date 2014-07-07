var express = require('express');
var router = express.Router();
var backend_server = "http://192.168.0.12:8000";
router.get('/', function(req, res) {
  res.render('www', {
  	backend: backend_server
  });
});
router.get('/auth/google', function(req, res) {
  res.render('index', {
  	module_name: 'auth',
  	module_angular: 'ui.freedom'
  });
});
router.get('/auth', function(req, res) {
  var return_val = req.cookies.data;
  console.log(return_val);
  res.render('registrationform', {
  	return_val: return_val,
  	module_name: 'auth',
  	module_angular: 'ui.freedom'
  });
});
router.get('/dashboard', function(req, res) {
  res.render('main-app.jade', {
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
