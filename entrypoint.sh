#!/usr/bin/env bash

# fail fast
set -e

export RACK_ENV=$SVC_ENV
export RAILS_ENV=$SVC_ENV

function wait_for_host_port {
  if [[ $# != 2 ]]; then echo "usage: $FUNCNAME host port"; return 1; fi

  host=$1
  port=$2
  echo "Waiting for '$host:$port' to become available"
  while ! nc -z $host $port  > /dev/null 2>&1; do echo .; sleep 2; done
  echo "The service on '$host:$port' is now available"
}

# NOTE: needs netcat in dockerfile for testing port readiness
function wait_for_services {
  for svc in $SERVICES; do
    host=${svc%%:*}
    port=${svc##*:}
    # SERVICES contains a list of env var names since they are typically set for
    # the service you depend on, e.g. DB_HOST:DB_PORT, so the call below looks
    # up the value of the envvars that host/port are set to
    wait_for_host_port ${!host} ${!port}
  done
}

function app_init {
  # Run bundler if needed - useful in dev
  if [[ "$SVC_ENV" == "development" ]]; then
    bundle check || bundle install
    yarn install
  fi
}
export -f app_init

function db_init {
  echo "Setting up db"
  bundle exec rake db:create db:migrate
}
export -f db_init

function db_reset {
  echo "Resetting db"
  bundle exec rake db:reset
}
export -f db_reset

function db_migrate {
  echo "Migrating db"
  bundle exec rake db:create db:migrate
}
export -f db_migrate

function db_seed {
  echo "Seeding db"
  bundle exec rake db:seed
}
export -f db_seed

function build_assets {
  echo "building assets"
  yarn build
  yarn build:css
}
export -f build_assets

function start_app {
  echo "Starting app"

  # Remove a potentially pre-existing server.pid for Rails.
  rm -f tmp/pids/server.pid

  if [[ -z $DEBUG_APP ]]; then
    echo "*** Starting app without debugger support ***"
    exec bundle exec rails server -b 0.0.0.0 -p $SVC_PORT -e $SVC_ENV
  else
    echo "*** Starting app with debugger support ***"
    exec bundle exec rdebug-ide --host 0.0.0.0 --port 1235 --dispatcher-port 26162 --rubymine-protocol-extensions -- bin/rails server -b 0.0.0.0 -p $SVC_PORT -e $SVC_ENV
  fi
}
export -f start_app

function start_console {
  echo "Starting console"
  exec bundle exec rails console -e $SVC_ENV
}
export -f start_console

function start_worker {
  echo "Starting worker"
  exec bundle exec sidekiq -c 5 -q default -q mailers -q elimination -q scores
}
export -f start_worker

action=$1; shift

mkdir -p log tmp/pids

case $action in

  app)
    wait_for_services
    app_init
    db_init
    build_assets
    start_app
  ;;

  worker)
    wait_for_services
    start_worker
  ;;

  console)
    wait_for_services
    app_init
    db_init
    start_console
  ;;

  db_init)
    wait_for_services
    db_init
  ;;

  db_reset)
    wait_for_services
    db_reset
  ;;

  db_migrate)
    wait_for_services
    db_migrate
  ;;

  db_seed)
    wait_for_services
    db_seed
  ;;

  test)
    wait_for_services
    export RAILS_ENV=test RACK_ENV=test
    app_init
    db_init
    echo "Starting tests"
    bundle exec rake
  ;;

  build_assets)
    wait_for_services
    build_assets
  ;;

  bash)
    if [ "$#" -eq 0 ]; then
      bash_args=( -il )
    else
      bash_args=( "$@" )
    fi
    exec bash "${bash_args[@]}"
  ;;

  exec)
    exec "$@"
  ;;

  sh)
    exec sh "$@"
  ;;

  *)
    echo "Unknown action: '$action', defaulting to exec"
    exec $action "$@"
  ;;

esac