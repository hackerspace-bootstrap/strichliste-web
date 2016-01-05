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

### make production build

To create a production build where sources are minified set the environment to `production`:

````bash
$ make production
````

This will create a compressed and minified build in /strichliste-web

Notice: For this to work you need node.js installed on your system. 

### configuration

You can edit the settings in `strichliste-web/js/settings.js` after a build, or `/settings.js` if you want the changes to persist a new build.

### development mode

When in development the following command will as well initiate the build process as well as creating a watch on the relevant folders.
The build process will then be run again when certain file has been changed.

It also starts an development server, listening on port `:8081`.

````bash
$ make development
````

Notice: In development mode, the `/settings.js` file will be automatically copied on change to `strichliste-web/js/settings.js`

To access the development version visit [http://localhost:8081](http://localhost:8081)

## user

* [Hackerspace Bamberg - backspace e.V.](https://www.hackerspace-bamberg.de)
* [hackzogtum Coburg](http://www.hackzogtum.de/)
* [Nerd2Nerd](https://www.nerd2nerd.org/)
* [Hackerspace Bremen](https://www.hackerspace-bremen.de/)

If your hackerspace is missing, just send a mail to schinken@hackerspace-bamberg.de
