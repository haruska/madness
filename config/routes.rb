# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, skip: [:registrations]

  namespace :admin do
    resources :users
    resources :teams
    resources :tournaments
    resources :brackets

    root to: 'users#index'
  end

  mount GraphiQL::Rails::Engine, at: '/graphiql' if Rails.env.development?

  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  post '/graphql', to: 'graphql#execute'

  resources :brackets
  get '/my_brackets', to: 'brackets#my_brackets'

  resource :tournament

  get '/rules', to: 'pages#rules'

  root 'brackets#my_brackets'

  # send all other routes to react
  get '*pages', to: 'home#index'
end
