Freedom! Node Front-end
====================

Running the Application
---------------------

<!-- language:console -->

	npm install
	npm start

If development environment, run:


<!-- language:console -->

	grunt

Directory Structure
---------------------

<!-- language:console -->

	config/
		config.js			-- contains server configuration e.g. port, public directory
	src/
		css/
			style.css		-- stylesheet to be used
		js/
			libs/			-- contains JS libraries to be used
			script.js		-- Custom script to be used
		index.html			--
	public/
		min.css				-- minified css from the css folder
		min.js				-- minified js from the js folder
		index.html			-- minified form of index.html
	images/					-- contains images used on the application
	server.js				-- contains script for running the web server
	gruntfile.js			-- grunt config
	.gitignore				-- list of ignored files
	package.json			-- app description
	README.md				-- me
