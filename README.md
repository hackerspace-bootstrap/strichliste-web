# strichliste-web

# DEPRECATED
strichliste1 has been replaced by strichliste2. See https://github.com/strichliste for the new version!


## demo

Checkout out the [demo](http://demo.strichliste.org/)!

## requirements

* [NPM](https://www.npmjs.org/)

## installation

1. Just grab a [release from github](https://github.com/hackerspace-bootstrap/strichliste-web/releases)
2. Extract the tar file to your desired directory (e.g. /var/www/strichliste)
3. Let your webserver point to that directory
4. Adjust your settings in js/settings.js
5. Visit the domain with your browser

## development

When in development the following command will as well initiate the build process as well as creating a watch on the relevant folders.
The build process will then be run again when certain file has been changed.

````bash
$ git clone git@github.com:hackerspace-bootstrap/strichliste-web.git
$ make development
````

This will start the initial `npm install` automatically and start a dev webserver on `http://localhost:8081`.

## users of strichliste-web

* [Hackerspace Bamberg - backspace e.V.](https://www.hackerspace-bamberg.de)
* [hackzogtum Coburg](http://www.hackzogtum.de/)
* [Nerd2Nerd](https://www.nerd2nerd.org/)
* [Hackerspace Bremen](https://www.hackerspace-bremen.de/)
* [Thomann](http://www.thomann.de)
* [Makerspace Aschaffenburg - Schaffenburg e.V.](https://www.schaffenburg.org)
* [C3PB e.V.](https://c3pb.de/)

If your hackerspace is missing, just send a mail to schinken@bamberg.ccc.de
