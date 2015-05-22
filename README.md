# karma-app
===========

## Development Environment ##

Requires `ruby`, `bundler`, `node`, and `npm` installed.

1. Install rethinkdb `brew install rethinkdb`
1. Install app dependencies: `make install`
1. Start App: `bundle exec foreman start`

## Database Migrations ##

When making changes to the database schema (adding tables or indexes), you
should create a migration file so the change can be sent to other developers
and run on deploys.

Prerequisites:
  - You must have klei-migrate installed globally: `npm install -g klei-migrate`
  - You must have an empty rethinkdb database named 'karmakard' on first run
  - You must start rethinkdb before running migrations

Run migrations:
  `npm run migrate`

Create a new migration:
  `klei-migrate new [options] Your Migration Name`
