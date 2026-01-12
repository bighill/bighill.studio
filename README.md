# Bighill Studio

This is the source code for the [Bighill Studio](https://bighill.studio) website.

## Features

- **Glassmorphism Design**: Modern glassmorphic UI with backdrop blur effects
- **Gradient Background**: Beautiful blue-to-purple gradient background
- **Contact Form**: Integrated contact form with Cloudflare Worker backend

## Development

```bash
./run-dev.sh
```

## Production

Push to the `main` branch to deploy the production site using GitHub Pages.

## Contact Form

The site includes a contact form that uses a Cloudflare Worker to send emails via Resend. See [workers/README.md](./workers/README.md) for setup instructions.
