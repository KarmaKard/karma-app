# karma-app
===========

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
