# [freedom-frontend](http://joshdmiller.github.com/ng-boilerplate) [![Build Status](https://api.travis-ci.org/ngbp/ngbp.png?branch=v0.3.2-release)](https://travis-ci.org/ngbp/ngbp)
***

## Quick Start

Install Node.js and then:

```sh
$ git clone git@github.com:robertsambuena/freedom-frontend.git
$ cd freedom-frontend
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

There's no index.html, separated by user-types(ie. admin, user) just 
## Philosophy

The principal goal of `ngBoilerplate` is to set projects up for long-term
success.  So `ngBoilerplate` tries to follow best practices everywhere it can.
These are:

- Properly orchestrated modules to encourage drag-and-drop component re-use.
- Tests exist alongside the component they are testing with no separate `test`
  directory required; the build process should be sophisticated enough to handle
  this.
- Speaking of which, the build system should work automagically, without
  involvement from the developer. It should do what needs to be done, while
  staying out of the way. Components should end up tested, linted, compiled,
  and minified, ready for use in a production environment.
- Integration with popular tools like Bower, Karma, and LESS.
- *Encourages* test-driven development. It's the only way to code.
- A directory structure that is cogent, meaningful to new team members, and
  supporting of the above points.
- Well-documented, to show new developers *why* things are set up the way they
  are.
- It should be responsive to evidence. Community feedback is therefore crucial
  to the success of `ngBoilerplate`.

But `ngBoilerplate` is not an example of an AngularJS app: this is a
kickstarter. If you're looking for an example of what a complete, non-trivial
AngularJS app that does something real looks like, complete with a REST backend
and authentication and authorization, then take a look at
[`angular-app`](http://github.com/angular-app/angular-app), which does just
that - and does it well.

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
ng-boilerplate/
  |- routes/                                   --node(express) routes
  |- views/                                   --node(express) views
  |- src/
  |  |- modules/
  |  |  |- admin/
  |  |  |- user/
  |  |  |- common/
  |  |- styles/
  |  |  |- <static files>
  |  |- images/
  |  |  |- <reusable code>
  |- vendor/
  |  |- angular-bootstrap/
  |  |- bootstrap/
  |- bower.json
  |- Gruntfile.js
  |- package.json
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `src/` - our application sources.
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `build.config.js` to be picked up by the build
  system.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

### Detailed Installation

`freedom-frontend` uses [Grunt](http://gruntjs.org) as its build system, so
[Node.js](http://nodejs.org) is required. Also, Grunt by default no longer comes
with a command-line utility and Karma and Bower must end up in your global path
for the build system to find it, so they must be installed independently. Once
you have Node.js installed, you can simply use `npm` to make it all happen:

```sh
$ npm -g install grunt-cli karma bower
```

If you're on Linux (like I am) then throw `sudo` in front of that command.  If
you're on Windows, then you're on your own.

Next, you can either clone this repository using Git, download it as a zip file
from GitHub, or merge the branch into your existing repository. Assuming you're
starting from scratch, simply clone this repository using git:

```sh
$ git clonegit@github.com:robertsambuena/freedom-frontend.git freedom-frontend
$ cd freedom-frontend
```

And then install the remaining build dependencies locally:

```sh
$ npm install
```

This will read the `dependencies` (empty by default) and the `devDependencies`
(which contains our build requirements) from `package.json` and install
everything needed into a folder called `node_modules/`.

There are many Bower packages used by `freedom-frontend`, like Twitter Bootstrap
and Angular UI, which are listed in `bower.js`. To install them into the
`vendor/` directory, simply run:

```sh
$ bower install
```

In the future, should you want to add a new Bower package to your app, run the
`install` command:

```sh
$ bower install packagename --save-dev
```

The `--save-dev` flag tells Bower to add the package at its current version to
our project's `bower.js` file so should another developer download our
application (or we download it from a different computer), we can simply run the
`bower install` command as above and all our dependencies will be installed for
us. Neat!

Technically, `freedom-frontend` is now ready to go.

