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

## File Editing Guidelines

### Primary File

- **Primary focus**: Agents should primarily edit `index.html`
- This is a single-page static site, so most changes will be made to this file

### Project Structure

- This is a minimal static site with a single HTML file
- CSS is embedded inline within `index.html`
- No build process or external dependencies required
- Assets (like `hash-favicon.png`) are referenced from the root
- All file paths must be relative (e.g., `./hash-favicon.png`). Absolute file paths will break in GitHub Pages.

### Styling Conventions

- Use CSS custom properties (variables) defined in `:root` for colors
- Current color scheme:
  - `--color-bg`: Background color (currently `black`)
  - `--color-fg`: Foreground/text color (currently `darkkhaki`)
- Keep styles inline within the `<style>` tag in `index.html`
- Always prefer **modern** CSS features and practices.
