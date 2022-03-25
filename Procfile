web: bundle exec puma -C config/puma.rb
worker: trap '' SIGTERM; bundle exec sidekiq -e production -c 3 -q default -q mailers & bundle exec sidekiq -e production -c 1 -q elimination & wait -n; kill -SIGTERM -$$; wait
