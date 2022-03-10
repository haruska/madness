# Cloudflare Setup

By using Cloudflare, we avoid having to have a separate CDN because of their passthru proxy cache.

## SSL Config

You can only use custom domains on paid dynos at Heroku. Therefore, staging does not go through Cloudflare but directly to the heroku URL.

For production, created a origin host SSL cert at Cloudflare and am using that at Heroku by uploading it manually. Using Heroku's Automated Certificate Management (ACM) doesn't work for TLS between Cloudflare and Heroku.

## DNS Config

On Cloudflare there should be a CNAME to both the apex and www of the domain with cache enabled. Cloudflare will use a flattened A-record for both. It is required for the apex. Both the apex and www have different CNAMEs on Heroku.

## WWW redirect

All www urls are redirected to the apex on Cloudflare using their [Bulk Redirects](https://developers.cloudflare.com/rules/bulk-redirects/) beta functionality.