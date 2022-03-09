# Heroku CLI

## Setup

1. Install from homebrew and login:
```bash
brew install heroku
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

