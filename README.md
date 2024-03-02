# Madness Project

This project runs a private friends and family "office pool" for the NCAA March Madness tournament. People fill out brackets, get points for correct picks, and compete with one another.

For more info, see the [DOCUMENTATION](https://haruska.github.io/madness/).
## Development Setup

### Postgres & Redis

```bash
sudo apt install redis-server postgresql
```

Setup regular user in postgres. Recommend no superuser and allowed to create dbs.
```bash
sudo -u postgres createuser --interactive <username>
```

Ensure user can access postgres
```bash
createdb <username>
psql
```

### Project setup

Install ruby from rbenv
```bash
rbenv install $(cat .ruby-version)
```

Standard rails / yarn setup
```bash
bundle install
yarn install
```

Database setup
```
bin/rails db:create:all
bin/rails db:schema:load
bin/rails db:seed
```

### Commands

* `bin/rake`: Run tests
* `bin/dev`: Start dev server. Watchers for rails, sidekiq, react, relay, and dart-sass
* `bin/rubocop -A`: Auto-correct Rubocop violations
* `bin/rake schema`: Generate [GraphQL Schema](schema.graphql)
