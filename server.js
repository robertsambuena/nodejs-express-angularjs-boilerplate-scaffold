var express = require('express'),
    app = express(),
    config = require(__dirname + '/config/config');

console.log('initializing FREEDOM Frontend. ENV = ', process.env['NODE_ENV']);

app.disable('x-powered-by');
app.use(require('compression')());
app.use(require('static-favicon')(config.public_dir + '/images/favicon.png'));
app.use(express.static(config.public_dir));
app.use(function (req, res) {
	res.redirect('/');
});
app.listen(config.port);

console.log('Server listening on port : ', config.port);
