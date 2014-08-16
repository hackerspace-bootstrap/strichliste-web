# strichliste-web, WIP

## requirements

* [NPM](https://www.npmjs.org/)
* [Bower](http://bower.io/)

## installation

### clone repository
````bash
$ git clone git@github.com:hackerspace-bootstrap/strichliste-web.git
````

### make production build

To create a production build where sources are minified set the environment to `production`:

````bash
$ make production
````

### development mode

When in development the following command will as well initiate the build process as well as creating a watch on the relevant folders.
The build process will then be run again when certain file has been changed.

It also contains an development server, listening on port :8081

````bash
$ make development
````

Bear in mind: The development process until now is somewhat fragile, if your source code contains syntax errors the browserify compiler will fail which will in tun cause the dev watcher to fail.
This will be fixed in the near future.
