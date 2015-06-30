# strichliste-web

## demo

Checkout out the [demo](http://demo.strichliste.org/)!

## requirements

* [NPM](https://www.npmjs.org/)

## installation

### clone repository
````bash
$ git clone git@github.com:hackerspace-bootstrap/strichliste-web.git
````

### configuration

**Before** building a production build, you should look at the configuration. One can find it here:

````
src/script/lib/settings.js
````

Changes on the configuration needs a rebuild to take affect.

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

To access the development version visit [http://localhost:8081](http://localhost:8081)

## user

* [Hackerspace Bamberg - backspace e.V.](https://www.hackerspace-bamberg.de)
* [hackzogtum Coburg](http://www.hackzogtum.de/)
* [Nerd2Nerd](https://www.nerd2nerd.org/)
* [Hackerspace Bremen](https://www.hackerspace-bremen.de/)

If your hackerspace is missing, just send a mail to schinken@hackerspace-bamberg.de
