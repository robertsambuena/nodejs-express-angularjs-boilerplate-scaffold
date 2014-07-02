var path = require('path'),
	config = {
		testing : {
			env : 'testing',
			port : 8001,
			public_dir : path.normalize(__dirname + '/../public'),
			images_dir : path.normalize(__dirname + '/../images'),
			src_dir : path.normalize(__dirname + '/../src')
		},
		development : {
			env : 'development',
			port : 8001,
			public_dir : path.normalize(__dirname + '/../public'),
			images_dir : path.normalize(__dirname + '/../images'),
			src_dir : path.normalize(__dirname + '/../src')
		},
		staging : {
		},
		production : {
		}
	};

// set development as default environment
!process.env['NODE_ENV'] && (process.env['NODE_ENV'] = 'development');

module.exports = config[process.env['NODE_ENV']];
