# Heroku CLI

## Setup

1. Install from script and login:

```bash
curl https://cli-assets.heroku.com/install.sh | sh
heroku login
```

2. Add staging and production git remotes:

```bash
heroku git:remote -r staging -a <staging-app>
heroku git:remote -r production -a <production-app>
```

## Useful Heroku CLI commands

### Env vars management

See [env vars](env-vars.md) doc.

```bash
# list vars
heroku config -r staging

# set var
heroku config:set FOO='barbaz' -r staging

# remove var
heroku config:remove FOO -r staging
```

### Log tailing

```bash
heroku logs -t -r staging
```

### Rails console

```bash
heroku console -r staging
```

### Setup daily backups

After creating the new db, also need to setup the scheduler

```bash
heroku pg:backups:schedule DATABASE_URL --at '04:00 America/Chicago' --app madness
```

### Copy production DB snapshot to staging environment

```bash
heroku pg:backups:url -r production | xargs heroku pg:backups:restore -r staging --confirm madness-staging
```

### Copy staging DB to development

```bash
heroku pg:backups:capture -a madness-staging
heroku pg:backups:download -a madness-staging
rails db:drop:all
rails db:create:all
pg_restore --verbose --clean --no-acl --no-owner -d madness_development latest.dump
```

### Restore previous year backup

After re-enabling Postgres, the backups are on the dashboard. Find the latest backup. For example 'b2955'.

```bash
heroku pg:backups:restore b2955 DATABASE_URL -a madness-staging
```