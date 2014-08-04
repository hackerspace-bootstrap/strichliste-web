# strichliste-web, WIP

## requirements

* [NPM](https://www.npmjs.org/)
* [Bower](http://bower.io/)

## installation

### clone repository
````bash
$ git clone git@github.com:hackerspace-bootstrap/strichliste-web.git
````

### install dependencies
````bash
$ npm install
````

### create build
````bash
$ ./node_modules/.bin/gulp build
````

To create a production build where sources are minified set the environment to `production`:

````bash
$ NODE_ENV=production ./node_modules/.bin/gulp build
````

### development mode
When in development the following command will as well initiate the build process as well as creating a watch on the relevant folders.
The build process will then be run again when certain file has been changed.

````bash
$ ./node_modules/.bin/gulp dev
````

Bear in mind: The development process until now is somewhat fragile, if your source code contains syntax errors the browserify compiler will fail which will in tun cause the dev watcher to fail.
This will be fixed in the near future.

## development server
This repo holds a development server that serves the static file from the build folder.

````bash
$ node devServer.js
````

An optional `port` parameter can be added to specify the port the server listens on.
