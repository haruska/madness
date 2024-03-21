# Generating Groups of Users

If generating through rails console, the pattern to extract emails (for bcc) is:

```ruby
puts User.all.map { |u| "\"#{u.name}\" <#{u.email}>" }.join("\n"); nil
```

## Pre-tipoff

### Everyone (except admins)

```ruby
puts User.where(admin: false).map { |u| "\"#{u.name}\" <#{u.email}>" }.join("\n"); nil
```

### Never logged in

```ruby
puts User.where(sign_in_count: 0).map { |u| "\"#{u.name}\" <#{u.email}>" }.join("\n"); nil
```