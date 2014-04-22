Freedom! Node Front-end
====================

Running the Application
---------------------

npm install
npm start

If development environment, run:
grunt

Directory Structure
---------------------
config/
	config.js			-- contains server configuration e.g. port, public directory

css/
	*.css				-- stylesheets to be used

js/
	libs/
		*.js			-- JS libraries used
	*.js				-- Custom scripts to be used

public/
	assets/
		images			-- contains images used on the application
		min.css			-- minified css from the css folder
		min.js			-- minifed js from the js folder
	index.html			-- main html file

server.js				-- contains script for running the web server
gruntfile.js			-- grunt config
.gitignore				-- list of ignored files
package.json			-- app description
README.md				-- me
