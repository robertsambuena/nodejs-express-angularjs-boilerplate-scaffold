module.exports = function(grunt) {
	var common_src = 'src';
	var common_src_modules = 'src/modules';
	var all_js = common_src_modules +'/**/*.js';
	var commonConfig = {
		'all_js': all_js,
		'uglify_options': {
				report: 'min',
				mangle: false
		},
		'html2js_options': {
		      module: 'template-module',
		      singleModule: true
		},
		'jshint': {
		    files : all_js,
			options : {
				laxbreak: true,
				expr: true,
				boss : true
			}
		},
		'app_js': common_src_modules+'/app.js',
		'app_css': common_src+'/styles/*.css',
		'app_html': common_src_modules+'/**/*.tpl.html',
		'common_js': common_src_modules+'/common/**/*.js',
		'common_css': common_src_modules+'/common/**/*.css',
		'common_html': common_src_modules+'/common/**/*.tpl.html',
		'common_src_modules': common_src_modules,
		'common_dest': 'public',
		'common_vendor': 'vendor',
		'common_images_src': 'src/images',
		'common_images_dest': 'public/images'
	};
	var module = function(name, commonConfig) {
		this.jshint = commonConfig.jshint,
		this.uglify = {
			'src': [ commonConfig.app_js, commonConfig.common_js, commonConfig.common_src_modules + '/'+name+'/**/*.js' ],
			'dest': commonConfig.common_dest + '/'+name+'/'+name+'.min.js'
		},
		this.cssmin = {
			src: [ commonConfig.app_css, commonConfig.common_css, commonConfig.common_src_modules + '/'+name+'/**/*.css'],
			dest: commonConfig.common_dest + '/'+name+'/'+name+'.min.css'
		},
		this.html2js = {
		    src: [ commonConfig.app_html, commonConfig.common_html],
		    dest: commonConfig.common_dest + '/'+name+'/'+name+'.templates.js'
		},
		this.copy = {
		  main: {
		    files: [
		      {expand: true, src: [commonConfig.common_vendor + '/**'], dest: commonConfig.common_dest+'/'},
		      {expand: true, cwd: commonConfig.common_images_src, src: ['**'], dest: commonConfig.common_images_dest, filter: 'isFile'},
		    ]
		  }
		},
		this.watch = {
			js: {
				files: [common_src+'/**/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: [common_src+'/**/*.css'],
				tasks: ['cssmin'],
				options: {
					spawn: false
				}
			},
			html: {
				files: [common_src+'/**/*.tpl.html'],
				tasks: ['html2js'],
				options: {
					spawn: false
				}
			}
		}
	};
	// this is where you add modules //
	var moduleCollection = {
		"user": new module('user', commonConfig),
		"auth": new module('auth', commonConfig),
		"admin": new module('admin', commonConfig)
	};
	//process tasks by corresponding config
	var taskConfig = {}, uglify = {}, cssmin = {}, jshint = {}, html2js = {}, copy = {}, watch = {};
	uglify.options = commonConfig.uglify_options;
	html2js.options = commonConfig.html2js_options;
	for (var module_name in moduleCollection) {
		jshint = moduleCollection[module_name].jshint;
		uglify[module_name] = moduleCollection[module_name].uglify;
		cssmin[module_name] = moduleCollection[module_name].cssmin;
		html2js[module_name] = moduleCollection[module_name].html2js;
		copy = moduleCollection[module_name].copy;
		watch = moduleCollection[module_name].watch;
	}
	taskConfig.jshint = jshint;
	taskConfig.uglify = uglify;
	taskConfig.cssmin = cssmin;
	taskConfig.html2js = html2js;
	taskConfig.copy = copy;
	taskConfig.watch = watch;
	//intiate grunt
	grunt.initConfig(grunt.util._.extend( taskConfig ));
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'html2js', 'copy', 'watch']);
};