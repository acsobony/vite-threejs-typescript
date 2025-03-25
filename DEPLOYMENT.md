# Deploying to Cloudflare Workers

This project is configured to be deployed to Cloudflare Workers, a serverless platform for running JavaScript on Cloudflare's edge network.

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed and configured

## Configuration

The deployment configuration is in the `wrangler.toml` file. You need to replace the empty `account_id` value with your Cloudflare account ID.

To find your account ID:
1. Log in to your Cloudflare dashboard
2. The account ID appears in the URL: `https://dash.cloudflare.com/<account_id>/workers`

## Setting Up Worker Dependencies

Before your first deployment, install the worker dependencies:

```bash
cd workers-site
npm install
cd ..
```

## Deployment Commands

The following npm scripts are available for deployment:

- `npm run deploy` - Deploy to the development environment (workers.dev subdomain)
- `npm run deploy:staging` - Deploy to the staging environment
- `npm run deploy:prod` - Deploy to the production environment

## Custom Domains

To use a custom domain (like example.com) instead of the workers.dev subdomain:

1. Add your domain to Cloudflare (if it's not already)
2. Find your zone ID in the Cloudflare dashboard
3. Uncomment and update the `route` and `zone_id` lines in the production environment section of `wrangler.toml`

## Troubleshooting

- If you get authentication errors, run `wrangler login` to authenticate with your Cloudflare account
- If you get a "Missing entry-point to Worker script" error, make sure the `main` and `site` configurations in wrangler.toml are correct

## Local Testing

To test your worker locally before deployment:

```bash
npm run build  # Build your Vite project first
wrangler dev --local
```

This will start a local development server that mimics the Workers environment. 