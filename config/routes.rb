# frozen_string_literal: true

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'

  # needed to override passwordless bad redirect to /sign-in
  get '/sign_out', to: 'home#sign_out', as: :sign_out

  root 'home#index'

  # mount passwordless engine
  passwordless_for :users, at: '/', as: :auth

  # send all other routes to react
  get '*pages', to: 'home#index'
end
