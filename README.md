# Bighill Studio

This is the source code for the [Bighill Studio](https://bighill.studio) website.

## Features

- **Multiple Themes**: Four different visual themes (elegant, typography, glass, monochrome)
- **Theme Switcher**: Footer buttons to switch between themes
- **URL-based Themes**: Themes can be shared via URL hash (e.g., `index.html#glass`)
- **System Preference**: All themes automatically adapt to light/dark mode
- **Contact Form**: Integrated contact form with Cloudflare Worker backend

## Development

```bash
./run-dev.sh
```

## Production

Push to the `main` branch to deploy the production site using GitHub Pages.

## Contact Form

The site includes a contact form that uses a Cloudflare Worker to send emails via Resend. See [workers/README.md](./workers/README.md) for setup instructions.

## Themes

The site supports four different visual themes, all implemented in a single HTML file using CSS attribute selectors. Users can switch themes using the footer buttons, and themes are persisted via URL hash.
