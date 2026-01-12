# Design Plan: Stylistic Variations

## Overview

This document outlines the stylistic variations available for the Bighill Studio website. All variations are combined into a single HTML file (`index.html`) with a theme switcher, allowing users to switch between different visual design approaches. Each theme automatically adapts to the user's system preference (light or dark mode) using CSS media queries.

## Current State

- **Main file**: `index.html` - Single file containing all theme variations
- **Structure**: Single-page site with header, description, services list, contact form, and footer
- **Styling approach**: Inline CSS with CSS custom properties and data-attribute based theme switching
- **Theme switcher**: Row of buttons in the footer that uses URL hash for theme selection

## Implementation Strategy

### Unified File Structure

All stylistic variations are implemented in a single `index.html` file using CSS attribute selectors:

- **Theme switching**: Uses `data-theme` attribute on the `<html>` element
- **Theme persistence**: User's theme choice is stored in the URL hash (e.g., `#modern`, `#elegant`)
- **System preference**: Each theme respects `prefers-color-scheme` media queries for automatic light/dark mode
- **Theme selector**: Row of buttons in the footer, one for each theme
- **URL-based**: Themes can be shared via URL (e.g., `index.html#glass`)

### Theme Implementation Pattern

Each theme is scoped using `[data-theme="theme-name"]` selectors:

```css
[data-theme="theme-name"] {
  --color-bg: #value;
  --color-fg: #value;
  /* ... theme variables */
}

@media (prefers-color-scheme: dark) {
  [data-theme="theme-name"] {
    /* Dark mode overrides */
  }
}

[data-theme="theme-name"] html,
[data-theme="theme-name"] body {
  /* Theme-specific styles */
}
```

## Available Themes

### Theme 1: Minimal (Default)

- **Selector**: `data-theme="minimal"`
- **Style**: Minimal theme with light/dark variants
- **Light Mode**: Darkkhaki background, black text
- **Dark Mode**: Black background, darkkhaki text
- **Typography**: Sans-serif, simple spacing
- **Features**: Clean, minimal design with basic form styling

### Theme 2: Modern

- **Selector**: `data-theme="modern"`
- **Style**: Clean theme with subtle shadows, supports light/dark modes
- **Light Mode**: White/light gray background, dark text
- **Dark Mode**: Dark gray background, light text
- **Features**:
  - Card-based layout with rounded corners
  - Subtle box shadows
  - Modern spacing and typography
  - Soft color palette with accent colors
  - Arrow list markers

### Theme 3: Elegant

- **Selector**: `data-theme="elegant"`
- **Style**: Sophisticated theme with elegant light/dark variants
- **Light Mode**: Light background with elegant dark accents
- **Dark Mode**: Deep dark background (navy/charcoal), light accent colors
- **Features**:
  - Refined serif typography (Georgia)
  - Elegant spacing
  - Subtle gradients
  - Diamond list markers (◆)
  - Professional aesthetic

### Theme 4: Typography

- **Selector**: `data-theme="typography"`
- **Style**: Typography-focused design with light/dark variants
- **Light Mode**: Neutral light palette
- **Dark Mode**: Neutral dark palette
- **Features**:
  - Emphasis on font choices (Palatino)
  - Generous whitespace
  - Clean, readable layout
  - Minimal decorative elements
  - Underline-style form inputs
  - Lowercase button text

### Theme 5: Glass

- **Selector**: `data-theme="glass"`
- **Style**: Modern glassmorphism design with light/dark variants
- **Light Mode**: Light glass effects over warm gradient background
- **Dark Mode**: Dark glass effects over purple gradient background
- **Features**:
  - Frosted glass effects with backdrop blur
  - Layered transparency
  - Gradient backgrounds
  - Circular list markers (○)
  - Modern, sleek appearance

### Theme 6: Monochrome

- **Selector**: `data-theme="monochrome"`
- **Style**: Strict black and white (automatically inverts based on preference)
- **Light Mode**: Black on white
- **Dark Mode**: White on black
- **Features**:
  - High contrast
  - Bold geometric shapes
  - Thick borders
  - Square list markers (■)
  - Uppercase headings
  - Striking simplicity

## Theme Switcher

### Implementation

- **Location**: Footer at the bottom of the page
- **Component**: Row of HTML `<button>` elements, one for each theme
- **Functionality**:
  - Switches `data-theme` attribute on `<html>` element
  - Updates URL hash when theme button is clicked (e.g., `#modern`)
  - Reads theme from URL hash on page load
  - Highlights active theme button with `.active` class
  - Handles browser back/forward navigation via `hashchange` event
  - Falls back to "minimal" theme if hash is invalid or missing
  - Styled to match each theme's aesthetic

### Theme Switcher Styling

The theme buttons adapt their appearance to match the current theme:

- **Minimal**: Simple border matching theme colors, active button has inverted colors
- **Modern**: Card-style with shadow, active button uses accent color
- **Elegant**: Matches elegant border style, active button uses accent color
- **Typography**: Underline style matching form inputs, active button has thicker underline
- **Glass**: Glassmorphism effect with backdrop blur, active button has increased opacity
- **Monochrome**: Bold border matching monochrome style, active button has inverted colors

## Development

### File Organization

```
/
├── index.html (contains all themes with switcher)
├── index-modern.html (legacy - can be removed)
├── index-elegant.html (legacy - can be removed)
├── index-typography.html (legacy - can be removed)
├── index-glass.html (legacy - can be removed)
└── index-monochrome.html (legacy - can be removed)
```

**Note**: The individual theme files (`index-*.html`) are legacy files from the previous implementation. The main `index.html` now contains all themes with a switcher.

### Adding New Themes

To add a new theme:

1. Add theme button to the footer `.theme-buttons` container
2. Add theme name to the `validThemes` array in JavaScript
3. Create theme CSS block using `[data-theme="new-theme"]` selector
4. Define CSS custom properties for the theme
5. Add `@media (prefers-color-scheme: dark)` block for dark mode
6. Style all elements scoped to the theme selector
7. Style the theme buttons for the new theme (add `[data-theme="new-theme"] .theme-button` styles)

### CSS Approach

- **Location**: All styles in `<style>` tag within `index.html`
- **Variables**: Use CSS custom properties scoped to each theme
- **Light/Dark Mode**: Use `@media (prefers-color-scheme: dark)` within each theme block
- **Organization**: Group styles by theme, then by element type
- **Responsive**: All themes work on mobile devices
- **Fallback**: Default styles work for systems that don't specify a preference

### Common Elements to Style

Each theme should style:

1. **Background**: `html`, `body`
2. **Typography**: `h1`, `p`, `li`
3. **Form elements**: `input`, `textarea`, `button`
4. **Form states**: `:focus`, `:hover`, `:disabled`
5. **Form messages**: `.form-message`, `.success`, `.error`
6. **Layout**: `main`, spacing, margins
7. **Lists**: `ul`, `li` styling
8. **Theme switcher**: `footer`, `.theme-buttons`, `.theme-button`

## Testing Checklist

For each theme:

- [x] HTML structure matches base version
- [x] JavaScript functionality works
- [x] Form submission works correctly
- [x] Responsive on mobile devices
- [x] **Light mode displays correctly** (test with system set to light mode)
- [x] **Dark mode displays correctly** (test with system set to dark mode)
- [x] All text is readable in both modes
- [x] Form elements are accessible in both modes
- [x] Color contrast meets accessibility standards in both light and dark modes
- [x] No broken styles or layout issues in either mode
- [x] Smooth transition when system preference changes
- [x] Theme switcher works and updates URL hash
- [x] Theme switcher styling matches each theme
- [x] Theme can be set via URL hash on page load
- [x] Browser back/forward navigation works with theme changes

## Implementation Pattern

Each theme follows this CSS pattern:

```css
/* Theme variables */
[data-theme="theme-name"] {
  --color-bg: #ffffff;
  --color-fg: #000000;
  /* ... other variables */
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  [data-theme="theme-name"] {
    --color-bg: #000000;
    --color-fg: #ffffff;
    /* ... other variables */
  }
}

/* Theme-specific element styles */
[data-theme="theme-name"] html,
[data-theme="theme-name"] body {
  background: var(--color-bg);
  color: var(--color-fg);
  /* ... theme styles */
}
```

## Notes

- All themes maintain the same user experience and functionality
- CSS-only theme switching (no JavaScript required for styling)
- Single self-contained file (no external CSS files)
- **System Preference**: Themes automatically adapt to user's OS/browser preference
- **Manual Toggle**: Users can switch themes via dropdown
- **Theme Persistence**: User's theme choice is stored in URL hash, allowing themes to be shared via URL
- **URL Sharing**: Themes can be bookmarked or shared (e.g., `index.html#glass`)
- **Browser Navigation**: Theme changes work with browser back/forward buttons
- Consider accessibility (WCAG guidelines) for all color choices in both light and dark modes
- Test form functionality in each theme to ensure it works correctly in both modes
- Ensure sufficient contrast ratios in both light and dark variants
- Theme switcher is styled to match each theme's aesthetic

## Future Enhancements

- Consider adding theme preview thumbnails
- Add keyboard shortcuts for theme switching
- Consider adding theme transition animations
- Add option to sync theme with system preference automatically
