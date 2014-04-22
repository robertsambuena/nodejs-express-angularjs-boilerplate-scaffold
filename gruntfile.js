module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files : 'js/*.js',
			options : {
			}
		},
		uglify: {
			build: {
				src: ['js/*.js', 'js/libs/*.js'],
				dest: 'public/assets/min.js'
			}
		},
		cssmin: {
			build: {
				src: 'css/*.css',
				dest: 'public/assets/min.css'
			}
		},
		watch: {
			js: {
				files: ['js/*.js', 'js/libs/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['css/*.css'],
				tasks: ['cssmin'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);

};