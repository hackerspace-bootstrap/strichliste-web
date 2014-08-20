# strichliste-web, WIP

## requirements

* [NPM](https://www.npmjs.org/)

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

It also starts an development server, listening on port `:8081`.

````bash
$ make development
````

To access the development version access http://localhost:8081
