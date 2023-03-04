# Authentication

Authentication is setup with Devise. Before 2023, used Auth0 then Devise but only passwordless.


## Changing Devise Modules

All of the modules are listed in user.rb but some unused ones are commented out. The [original migration]
(https://github.com/haruska/madness/blob/d1c7bae6536ebfc65671d5d0753fcc008dd5ff03/db/migrate
/20220220190509_add_devise_to_users.rb) also contains commented out columns that are needed if any of those modules 
are enabled.