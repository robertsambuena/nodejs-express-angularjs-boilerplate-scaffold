// var modules = [
// 	user:{},
// 	admin:
// };

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files : 'src/modules/**/*.js',
			options : {
				laxbreak: true,
				expr: true,
				boss : true
			}
		},
		uglify: {
			options: {
				report: 'min',
				mangle: false
			},
			user: {
				src: ['src/modules/app.js', 'src/modules/common/**/*.js', 'src/modules/user/**/*.js'],
				dest: 'public/user/user.min.js'
			},
			admin: {
				src: ['src/modules/app.js', 'src/modules/common/**/*.js', 'src/modules/admin/**/*.js'],
				dest: 'public/admin/admin.min.js'
			},
		},
		cssmin: {
			user: {
				src: ['src/styles/*.css', 'src/modules/common/**/*.css', 'src/modules/user/**/*.css'],
				dest: 'public/user/user.min.css'
			},
			admin: {
				src: ['src/styles/*.css', 'src/modules/common/**/*.css', 'src/modules/admin/**/*.css'],
				dest: 'public/admin/admin.min.css'
			}
		},
		html2js: {
		    options: {
		      module: 'template-module',
		      singleModule: true
		    },
		    user: {
		      src: ['src/modules/user/**/*.tpl.html', 'src/modules/common/**/*.tpl.html'],
		      dest: 'public/user/user.templates.js'
		    },
		    admin: {
		      src: ['src/modules/admin/**/*.tpl.html', 'src/modules/common/**/*.tpl.html'],
		      dest: 'public/admin/admin.templates.js'
		    },
		},
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					useShortDoctype: true,
					removeRedundantAttributes: true,
					removeOptionalTags: true,
					removeEmptyAttributes: true
				},
				src: 'src/**/index.html',
				dest: 'public/index.html'
			}
		},
		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, src: ['vendor/**'], dest: 'public/'},
		      {expand: true, cwd: 'src/images', src: ['**'], dest: 'public/images', filter: 'isFile'},
		    ]
		  }
		},
		concat: {
			css: {
				src: 'src/css1/*.css',
				dest: 'src/min.css'
			},
			js: {
				src: ['src/js1/**/*.js'],
				dest: 'src/min.js'
			}
		},
		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['src/**/*.css'],
				tasks: ['cssmin'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['src/**/*.tpl.html'],
				tasks: ['html2js'],
				options: {
					spawn: false
				}
			}
		}
	});

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