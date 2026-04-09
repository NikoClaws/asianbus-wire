#!/bin/bash
# Deploy AsianBus to Cloudflare Workers
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$PATH"
export CLOUDFLARE_API_TOKEN=$(cat ~/.cloudflare-token)
export CLOUDFLARE_ACCOUNT_ID=$(cat ~/.cloudflare-account-id)

echo "🚀 Deploying to Cloudflare..."
wrangler deploy

echo ""
echo "✅ Deploy complete! Site: https://asianbus.com"
