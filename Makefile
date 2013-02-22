REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \

autotest:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--require should \
	--growl \
	--watch

autonyan:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter nyan \
	--require should \
	--growl \
	--watch

.PHONY: test test-w
