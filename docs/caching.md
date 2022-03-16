# Caching

## Assets

Static assets are fingerprinted by the rails pipeline and cached via [Cloudflare](cloudflare.md).

## Rails cache

### In development

To enable caching in dev:

```
bin/rails dev:cache
```

### Cache Store

We use redis for the cache store ([rails doc](https://guides.rubyonrails.org/caching_with_rails.html#activesupport-cache-rediscachestore).) Redis is already used for background workers and using the same reduces operational complexity. The preference is to use the `hiredis` gem for performance reasons.

### Caching computed data

The biggest page in need of caching is the bracket list post tip off. This is fairly static data but some of the values are computed. The brackets are not paginated so all are shown.

#### decision_team_slots / sorted_four

Both `Tournament` and `Bracket` `decision_team_slots` can be cached using ActiveRecord's `    cache_key_with_version` which takes updated_at into account for the object.

Likewise, `Bracket.sorted_four` is based solely on `decision_team_slots` and can be cached.

#### points and possible_points

These are calculations in bracket that should update both on bracket and tournament updated_at.