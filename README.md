# Helena Spiritual Journey

A landing page for Helena Houdova's Sacred Pilgrimage — built with Astro 5, Tailwind CSS, and deployed to Cloudflare Workers as a static site.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:4321)
pnpm run dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start local dev server on port 4321 |
| `pnpm run build` | Build static site to `dist/` |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run deploy` | Build and deploy to Cloudflare Workers |
| `pnpm run cf-preview` | Build and preview via Wrangler locally |

## Project Structure

```
src/
├── pages/
│   ├── index.astro              # Language detection redirect (/ → /en/ or /cs/)
│   ├── [lang]/index.astro       # Main landing page (generates /en/ and /cs/)
│   └── 404.astro                # Custom 404 page
├── layouts/
│   └── BaseLayout.astro         # HTML shell, meta tags, scroll reveal, fonts
├── components/
│   ├── CTAButton.astro          # Animated call-to-action button
│   ├── DestinationCard.astro    # Destination card with dual images
│   ├── FeatureCard.astro        # Glass-morphism feature card
│   ├── ImageFeatureCard.astro   # Feature card with thumbnail
│   ├── ImageGallery.astro       # Masonry image gallery
│   ├── ImagePair.astro          # Side-by-side image pair
│   ├── LanguageSwitcher.astro   # EN/CS toggle (top-right)
│   ├── QuoteBlock.astro         # Styled blockquote
│   ├── SacredGeometry.astro     # Decorative hexagonal overlay
│   ├── SectionHeader.astro      # Section label + heading + divider
│   ├── SparkleCanvas.astro      # Animated particle canvas
│   └── sections/                # Page sections (Hero, Pilgrimage, etc.)
├── i18n/
│   ├── ui.ts                    # Locale helpers: t(), getLocaleFromUrl()
│   └── translations/
│       ├── en.json              # English translations
│       └── cs.json              # Czech translations
└── styles/
    └── global.css               # Tailwind theme tokens and global styles
```

## Internationalization

The site supports **English** and **Czech**. Translations live in JSON files at `src/i18n/translations/`.

- `/en/` — English
- `/cs/` — Czech
- `/` — Auto-detects via `lang_pref` cookie or `navigator.language`, then redirects

To add or edit copy, update the corresponding key in `en.json` and `cs.json`. All text is resolved at build time — no runtime API calls.

### Adding a New Language

1. Add the locale code to the `locales` array in `src/i18n/ui.ts`
2. Add it to `i18n.locales` in `astro.config.mjs`
3. Add a new static path in `src/pages/[lang]/index.astro` → `getStaticPaths()`
4. Create a new translation file (e.g., `src/i18n/translations/de.json`) with all keys
5. Import it in `src/pages/[lang]/index.astro` and add to the `translations` record
6. Add the locale to the redirect script in `src/pages/index.astro`

## Design System

`DESIGN.md` is the single source of truth for all visual decisions — colors, typography, spacing, effects, and component patterns. Consult it before making any UI changes.

Key highlights:
- **Theme:** Lemurian — golden light filtering through purple depths
- **Fonts:** Cormorant Garamond (headings), Raleway (body), Cormorant Unicase (labels)
- **Colors:** Defined as Tailwind tokens in `src/styles/global.css` (e.g., `bg-gold-solar`, `text-purple-deep`)

## Content

All landing page copy is maintained in `copy.md` (the prose source) and the JSON translation files (the structured source used at build time).

## Deployment

The site deploys to **Cloudflare Workers** as a static asset bundle. Configuration is in `wrangler.jsonc`.

```bash
# Deploy to production
pnpm run deploy
```

Make sure you're authenticated with Cloudflare (`wrangler login`) before deploying.

## License

Private — all rights reserved.
