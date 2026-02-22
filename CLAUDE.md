# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Helena Spiritual Journey — an Astro 5 static site deployed to Cloudflare Workers via Wrangler. A landing page for Helena Houdova's Sacred Pilgrimage with a Lemurian visual theme (golden and purple, dreamy, sparkling, bold).

## Commands

- **Dev server:** `pnpm run dev` (localhost:4321)
- **Build:** `pnpm run build` (outputs to `dist/`)
- **Preview build locally:** `pnpm run preview`
- **Deploy to Cloudflare:** `pnpm run deploy` (builds then runs `wrangler deploy`)
- **Cloudflare local preview:** `pnpm run cf-preview` (builds then runs `wrangler dev`)

## Architecture

- **Framework:** Astro 5 with strict TypeScript (`astro/tsconfigs/strict`)
- **Styling:** Tailwind CSS with shadcn/ui components
- **Package manager:** pnpm
- **Deployment:** Cloudflare Workers — static assets served from `dist/` with 404-page fallback (configured in `wrangler.jsonc`)
- **Astro config:** `astro.config.mjs`

## UI & Styling Rules

- **Use Tailwind CSS** for all styling. Prefer utility classes over custom CSS. Only write custom CSS when Tailwind utilities are insufficient (e.g., complex gradients, `background-clip: text`, keyframe animations).
- **Use shadcn/ui** for interactive components (buttons, cards, dialogs, etc.). Always check if a shadcn/ui component exists before building from scratch. Customize shadcn/ui components via Tailwind classes and CSS variables — do not fork or rewrite them.
- **Map design tokens to Tailwind config.** The color palette, spacing scale, and typography from `DESIGN.md` must be defined in `tailwind.config.*` as custom theme extensions so they are available as utility classes (e.g., `bg-gold-solar`, `text-pearl-white`, `font-heading`).
- **Never hardcode hex values in templates.** Always reference design tokens via Tailwind classes or CSS custom properties.

## Design System

**`DESIGN.md` is the single source of truth for all visual design decisions.** Always consult it before implementing any UI work. It defines:

- **Color palette** — Gold, purple, accent, and background tokens with exact hex values
- **Typography** — Cormorant Garamond (headings), Raleway (body), Cormorant Unicase (labels) with a full type scale
- **Spacing & layout** — 8px grid, three container widths (680/960/1200px), section background alternation
- **Visual effects** — Sparkle particles, glass morphism, sacred geometry textures, gold gradient text, noise overlay
- **Component patterns** — Hero, feature cards, CTA buttons, quote blocks, section headers
- **Motion** — Scroll reveals, shimmer animation, timing guidelines; all behind `prefers-reduced-motion`
- **Responsive** — Mobile-first breakpoints at 768px, 1024px, 1440px
- **Accessibility** — Contrast ratios verified, focus rings, semantic HTML requirements
- **Performance budget** — <1.5MB initial weight, <2.5s LCP, <30KB CSS, <15KB JS

When in doubt about any visual decision — color, spacing, font size, animation timing, component structure — defer to `DESIGN.md`.

## Content

- **`copy.md`** contains all landing page copy (5 sections: Hero, The Pilgrimage, Sacred Circle, Join In Person, Final CTA). Use this as the source for all page text.

## Project Structure

- `src/pages/` — file-based routing (`.astro` files become HTML pages)
- `src/components/` — reusable Astro and UI components
- `src/layouts/` — page layouts
- `src/styles/` — global styles and Tailwind base layer
- `public/` — static assets copied as-is to build output
- `dist/` — build output (gitignored)
- `.astro/` — generated type definitions
