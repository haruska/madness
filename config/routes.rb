# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  devise_scope :user do
    get 'email_confirmation', to: 'users/sessions#redirect_from_magic_link'
  end

  namespace :admin do
    resources :users
    resources :teams
    resources :tournaments
    resources :brackets

    root to: 'users#index'
  end

  mount GraphiQL::Rails::Engine, at: '/graphiql' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'

  root 'home#index'

  # send all other routes to react
  get '*pages', to: 'home#index'
end
