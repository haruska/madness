# Authentication

Authentication is setup with Devise. Before 2023, used Auth0 then Devise but only passwordless.


## Changing Devise Modules

All of the modules are listed in user.rb but some unused ones are commented out. The [original migration]
(https://github.com/haruska/madness/blob/d1c7bae6536ebfc65671d5d0753fcc008dd5ff03/db/migrate
/20220220190509_add_devise_to_users.rb) also contains commented out columns that are needed if any of those modules 
are enabled.

You can change the wording of any success or errors in [locales/devise.en.yml](https://github.com/haruska/madness/blob/a96086b75dd588aa3d76d4b805fd84caf74f0615/config/locales/devise.en.yml)
