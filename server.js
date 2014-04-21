var express = require('express'),
    app = express(),

	compression = require('compression'),
	favicon = require('static-favicon'),

    config = require(__dirname + '/config/config');

console.log('initializing FREEDOM Frontend. ENV = ', process.env['NODE_ENV']);

app.disable('x-powered-by');
app.use(favicon(config.public_dir + '/favicon.ico'));
app.use(compression());
app.use(express.static(config.public_dir));
app.listen(config.port);

console.log('Server listening on port : ', config.port);
