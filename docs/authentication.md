# Authentication

Authentication is setup with Devise. Before 2023, used Auth0 then Devise but only passwordless. Now there is a more 
standard email/password based authentication. Signups are still disabled (an admin has to manually add a new user to 
invite.)


## Changing Devise Modules

All of the modules are listed in user.rb but some unused ones are commented out. The [original migration]
(https://github.com/haruska/madness/blob/d1c7bae6536ebfc65671d5d0753fcc008dd5ff03/db/migrate
/20220220190509_add_devise_to_users.rb) also contains commented out columns that are needed if any of those modules 
are enabled.

You can change the wording of any success or errors in [locales/devise.en.yml](https://github.com/haruska/madness/blob/a96086b75dd588aa3d76d4b805fd84caf74f0615/config/locales/devise.en.yml)

## Current setup

* Most devise config is in config/initializers/devise.rb.
* config/routes.rb has the `devise_for` config (currently skipping registrations routes)
* app/models/user.rb shows which modules are enabled
  * password-based
  * forgot password flows enabled (recoverable)
  * password length and email format validated (validatable)
  * user can select "remember me" to avoid getting logged out between sessions (rememberable)
    * set to 2-weeks expire but re-ups the two weeks on each visit
  * info about login counts, ip address, last logged in, etc for admin help (trackable)
* Almost everything is default devise
* design saas in app/assets/stylesheets/controllers/_devise.scss
* success and error messaging is in locales/devise.en.yml
  * currently only one change to remove "sign up" verbage
