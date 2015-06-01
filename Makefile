SERVER_DEPS = server/node_modules
CLIENT_DEPS = client/node_modules
FAKES3_DATA = tmp/fakes3_root
RETHINKDB_DATA = tmp/rethinkdb_data

$(CLIENT_DEPS):
		@cd client && npm install

$(SERVER_DEPS):
		@cd server && npm install

install: $(CLIENT_DEPS) $(SERVER_DEPS)
		@bundle install

build: $(CLIENT_DEPS)
		@cd client && npm run build

migrate: $(SERVER_DEPS)
		@cd server && npm run migrate

deploy:
		@ansible-playbook -v -i inventories/beta deploy.yml --ask-sudo-pass --vault-password-file ../.vault_pass

clean-deps:
		@rm -rf $(CLIENT_DEPS)
		@rm -rf $(SERVER_DEPS)

clean-data:
		@rm -rf $(FAKES3_ROOT)
		@rm -rf $(RETHNKDB_DATA)
