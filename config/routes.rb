# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  devise_scope :user do
    get 'email_confirmation', to: 'users/sessions#redirect_from_magic_link'
    post 'sign_in_with_token', to: 'users/sessions#sign_in_with_token'
  end

  namespace :admin do
    resources :users
    resources :teams
    resources :tournaments
    resources :brackets

    root to: 'users#index'
  end

  authenticate :user, ->(u) { u.admin? } do
    mount GraphiQL::Rails::Engine, at: '/graphiql'
    mount Sidekiq::Web => '/sidekiq'
  end

  post '/graphql', to: 'graphql#execute'

  root 'home#index'

  # send all other routes to react
  get '*pages', to: 'home#index'
end
