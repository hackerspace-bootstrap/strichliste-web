# Contributing

1. Fork the project
2. Create your own branch (`git checkout -b feature`)
3. Push to the branch to your forked repository (`git push origin feature`)
4. Create new pull request

Please squash intermediate commits if they're not necessary to understand the changeset

## Setup Development Environment

### API Server

You should run your own API-Server for developing features. 

```bash
$ git clone https://github.com/hackerspace-bootstrap/strichliste.git
$ make setup
$ make start
```

The server will listen on *8080* as default. 

## Frontend

To start the development environment, just type in:

```bash
$ make development
```

This will install all dependencies and create an uncompressed/unminified build. Also it will start a webserver which listens on `http://localhost:8081` and watches your files for changes for rebuild. 

Please adjust your settings.js according to your API server. This is for the default setup `http://localhost:8080`
