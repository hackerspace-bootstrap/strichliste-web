install:
	@npm install

development:
	make install
	@node devServer.js &
	@./node_modules/gulp/bin/gulp.js dev

production:
	make install
	@NODE_ENV=production ./node_modules/gulp/bin/gulp.js build
