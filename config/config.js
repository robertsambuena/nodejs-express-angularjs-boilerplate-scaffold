var path = require('path'),
	config = {
		testing : {
			env : 'testing',
			port : 8001,
			public_dir : path.normalize(__dirname + '/../public')
		},
		development : {
			env : 'development',
			port : 8001,
			public_dir : path.normalize(__dirname + '/../public'),
		},
		staging : {
		},
		production : {
		}
	};


// set development as default environment
!process.env['NODE_ENV'] && (process.env['NODE_ENV'] = 'development');

module.exports = config[process.env['NODE_ENV']];
