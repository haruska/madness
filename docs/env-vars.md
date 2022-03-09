# Environment Variables

For local development .env files are used which are in .gitignore. To generate from Heroku cli:

```
heroku config -r staging | sed -En 's/([A-Z_]+):\s+(.+)/\1="\2"/p' > .env
``` 

If you do not have access to the staging environment, generally all you need is HOST, EMAIL_SENDER, ADMIN_NAME, and ADMIN_EMAIL to get started.

### General vars

Host is used in a few places (links in emails, etc.)

```
HOST=<url domain ex: madness-staging.herokuapp.com>
```

### User setup

To create the first (and admin) user, we're using the variables in `db:seed`:

```
ADMIN_NAME=<name of the admin>
ADMIN_EMAIL=<email of the admin>
```

### PaperTrail (logging)

PaperTrail is a standard logging addon for Heroku. The app addon adds the variable:

```
PAPERTRAIL_API_TOKEN
```

### GMail (email)

Setup gMail outside of heroku and add keys to staging and production.

Env vars needed:
```
EMAIL_SENDER=<email address at primary domain>
MAILER_PASSWORD=<app-password for gMail>
```

### Heroku Postgres

No special config is required. App addon adds the variables:

```
HEROKU_POSTGRESQL_<COLOR>_URL
DATABASE_URL
```

### Heroku Redis

The production.rb environment config sets the cache to a redis cache pointing to `REDIS_URL`.
The addon adds a TLS url as well that should look into using.

```
REDIS_URL
REDIS_TLS_URL
```

### Sentry

Sentry is setup outside of heroku with different keys for staging and production. That key is
set with:

```
SENTRY_DSN=<public DSN of environment>
```

It is used by both rails and react (injected via a meta tag.)