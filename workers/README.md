# Contact Form Worker Setup

This directory contains the Cloudflare Worker that handles contact form submissions and sends emails via Resend.

## Prerequisites

1. **Cloudflare Account** (free tier)

   - Sign up at https://cloudflare.com
   - Free tier includes 100,000 requests/day

2. **Resend Account** (free tier)
   - Sign up at https://resend.com
   - Free tier includes 100 emails/day
   - Get your API key from the dashboard

## Deployment Steps

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

Or use npx (no installation needed):

```bash
npx wrangler --version
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with Cloudflare.

### 3. Create a Cloudflare Worker

In the `workers/` directory, create a `wrangler.toml` file:

```bash
cd workers
```

Create `wrangler.toml`:

```toml
name = "contact-form"
main = "contact.js"
compatibility_date = "2024-01-01"

[env.production.vars]
# These will be set via wrangler secret put
```

### 4. Set Environment Variables

Set the Resend API key and email addresses as secrets:

```bash
# Set Resend API key
wrangler secret put RESEND_API_KEY
# When prompted, paste your Resend API key

# Set the "from" email address (must be verified in Resend)
wrangler secret put FROM_EMAIL

# Set the "to" email address (where you want to receive messages)
wrangler secret put TO_EMAIL
```

### 5. Deploy the Worker

```bash
wrangler deploy
```

After deployment, you'll get a URL like:

```
https://contact-form.your-subdomain.workers.dev
```

### 6. Update index.html

Update the `WORKER_URL` in `index.html` with your actual worker URL:

```javascript
const WORKER_URL = "https://contact-form.your-subdomain.workers.dev";
```

Or set it dynamically via a script tag before the form script:

```html
<script>
  window.CONTACT_WORKER_URL = "https://contact-form.your-subdomain.workers.dev";
</script>
```

## Testing

1. Test locally using Wrangler:

```bash
wrangler dev
```

This will start a local server. Update the `WORKER_URL` in `index.html` to `http://localhost:8787` for local testing.

2. Use the test script:

```bash
./test-worker.sh
```

This will send a test request to the local worker (make sure `wrangler dev` is running).

3. Test the deployed worker manually:

```bash
curl -X POST https://contact-form.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Test message"}'
```

## Resend Email Setup

1. **Verify your domain** (recommended):

   - Go to Resend dashboard → Domains
   - Add your domain (e.g., `bighill.studio`)
   - Add the DNS records provided by Resend to your domain's DNS settings
   - Once verified, you can use emails like `contact@bighill.studio`

2. **Or use Resend's test domain** (for quick testing):
   - You can use `onboarding@resend.dev` as the FROM_EMAIL
   - Note: This is only for testing and may have limitations

## Troubleshooting

- **CORS errors**: The worker already includes CORS headers. Make sure your worker URL is correct.
- **Email not sending**: Check Resend dashboard for error logs. Verify your API key and email addresses.
- **Worker errors**: Check Cloudflare dashboard → Workers & Pages → Your worker → Logs

## Security Notes

- The worker validates email format and requires both fields
- API keys are stored as secrets in Cloudflare (not in code)
- CORS is configured to allow requests from your domain
- Consider adding rate limiting or CAPTCHA for production use
