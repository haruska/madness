# frozen_string_literal: true

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # needed to override passwordless bad redirect to /sign-in
  get '/sign_out', to: 'home#sign_out', as: :sign_out

  # Defines the root path route ("/")
  root 'home#index'

  # mount passwordless engine
  passwordless_for :users, at: '/', as: :auth
end
