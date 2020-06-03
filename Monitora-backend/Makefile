# print help
help: ## list available targets (this page)
	 @awk 'BEGIN {FS = ":.*?## "} /^[0-9a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

run:: ## run local webserver
	sls wsgi serve -p 5006

deploy:: ## deploy to Lambda
	sls deploy
