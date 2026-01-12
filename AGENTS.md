# Agents

This document describes the agents, assistants, and automated systems used in the Bighill Studio project.

## Overview

This project uses various agents to assist with development, deployment, and maintenance tasks.

## AI Development Assistant

- **Purpose**: Code generation, refactoring, and development assistance
- **Capabilities**:
  - Code generation and editing
  - Documentation creation
  - Bug fixes and improvements
  - Code review assistance

## Primary File

- **Primary focus**: Agents should primarily edit `index.html`
- This is a single-page static site, so most changes will be made to this file

## Project Structure

- This is a minimal static site with a single HTML file (`index.html`)
- CSS is embedded inline within `index.html`
- No build process or external dependencies required for the main site
- Assets (like `hash-favicon.png`) are referenced from the root
- All file paths must be relative (e.g., `./hash-favicon.png`). Absolute file paths can break in GitHub Pages.
- The site includes a footer with theme switcher buttons
- Theme selection is persisted via URL hash (e.g., `index.html#elegant`)
- The `workers/` directory contains a Cloudflare Worker for handling contact form submissions (see `workers/README.md` for details)
- Legacy theme files (`index-*.html`) exist but are not the primary implementation

## Styling Conventions

- Use CSS custom properties (variables) defined in `:root` for colors
- The site supports multiple themes via `data-theme` attribute on the `<html>` element
- Themes are scoped using CSS attribute selectors: `[data-theme="theme-name"]`
- Each theme defines its own color variables (e.g., `--color-bg`, `--color-fg`, `--color-accent`)
- Themes automatically adapt to system light/dark mode preference via `@media (prefers-color-scheme: dark)`
- Available themes: elegant (default), typography, glass, monochrome
- Keep styles inline within the `<style>` tag in `index.html`
- Always prefer vanilla (native) CSS features and practices over javascript
- Any feature request that cannot be solved with vanilla CSS/HTML, should use vanilla JS

## Documentation

- All markdown documentation (e.g., `README.md`, `AGENTS.md`, `ROADMAP.md`) should always align with the current state of the repository
- When making changes to the codebase, update relevant documentation to reflect those changes
- Keep documentation accurate and up-to-date with the actual implementation
