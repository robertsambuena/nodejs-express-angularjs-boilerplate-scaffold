var express = require('express'),
    app = express(),
    config = require(__dirname + '/config/config');

console.log('initializing FREEDOM Frontend. ENV = ', process.env['NODE_ENV']);

app.disable('x-powered-by');
app.use(require('compression')());
app.use(require('static-favicon')(config.images_dir + '/favicon.png'));
app.use(express.static(config.images_dir));

// production env
app.use(express.static(config.public_dir));
// debug env
// app.use(express.static(config.src_dir));

app.use(function (req, res) {
	// note : cache index.html on production

	// production env
	res.sendfile(config.public_dir + '/index.html');
	// debug env
	// res.sendfile(config.src_dir + '/index.html');
});
app.listen(config.port);

console.log('Server listening on port : ', config.port);
