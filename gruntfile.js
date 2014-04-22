module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'js/*.js',
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
				files: ['js/*.js'],
				tasks: ['uglify'],
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

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'cssmin', 'watch']);

};