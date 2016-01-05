NAME="strichliste-web"
VERSION = $(shell git rev-parse --short HEAD)

install:
	@npm install

development: install
	@node devServer.js &
	@node ./node_modules/gulp/bin/gulp.js dev

production: install
	@NODE_ENV=production ./node_modules/gulp/bin/gulp.js build

release: production
	@tar cvfz $(NAME)-$(VERSION).tar.gz strichliste-web