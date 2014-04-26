module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files : 'src/js/*.js',
			options : {
				expr: true,
				boss : true
			}
		},
		uglify: {
			build: {
				src: ['src/js/libs/*.js', 'src/js/*.js'],
				dest: 'public/min.js'
			}
		},
		cssmin: {
			build: {
				src: 'src/css/*.css',
				dest: 'public/min.css'
			}
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
				src: 'src/index.html',
				dest: 'public/index.html'
			}
		},
		concat: {
			css: {
				src: 'src/css/*.css',
				dest: 'src/min.css'
			},
			js: {
				src: ['src/js/libs/*.js', 'src/js/*.js'],
				dest: 'src/min.js'
			}
		},
		watch: {
			js: {
				files: ['src/js/*.js', 'src/js/libs/*.js'],
				tasks: ['jshint', 'uglify', 'concat:js'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['src/css/*.css'],
				tasks: ['cssmin', 'concat:css'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['src/index.html'],
				tasks: ['htmlmin'],
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

	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'htmlmin', 'concat', 'watch']);

};