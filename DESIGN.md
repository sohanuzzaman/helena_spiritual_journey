# DESIGN.md — Lemurian Visual Design System

The definitive visual design reference for Helena Houdova's Sacred Pilgrimage landing page. Every implementation decision flows from this document.

---

## 1. Design Philosophy — The Lemurian Aesthetic

The visual language draws from a single metaphor: **a Lemurian temple submerged beneath a luminous ocean** — golden light filtering through purple depths, crystalline structures glowing from within, and the quiet gravity of a space that has existed for millennia.

### Core Principles

- **Submerged luminescence** — Light behaves as though it's filtering through deep water. Golden rays penetrate purple depths. Every element carries an inner glow — buttons pulse softly, text shimmers, backgrounds breathe with gradient shifts. Nothing is flat; everything is lit from within.

- **Crystalline structure** — Faceted edges, prismatic color refractions, hexagonal sacred geometry, and the distinctive parallel striations of Lemurian seed crystals. Layout geometry borrows from crystalline lattice patterns — clean, angular, but never cold.

- **Ancient yet timeless** — This is eternal, not old. The aesthetic evokes a civilization that was *more* advanced, not less. Think carved precision, not crumbling ruins. Polished obsidian, not weathered sandstone.

- **Sacred space** — Generous negative space. Slow visual rhythms. Deep dark backgrounds that recede infinitely. The page is a temple — still, reverent, intentional. Not a social media feed.

- **Organic warmth** — Soft gradients, gentle particle movement, organic curves on buttons and cards. This prevents the crystalline structure from becoming sterile. The warmth of candlelight, the softness of incense smoke.

### Emotional Keywords
`reverence` · `intimacy` · `wonder` · `ancient memory` · `warmth` · `immersion` · `devotion` · `luminosity`

---

## 2. Color Palette

### Gold Family (Primary)

| Token | Hex | Usage |
|---|---|---|
| `--gold-solar` | `#F2C94C` | Primary CTAs, key highlights, focus rings |
| `--gold-warm` | `#D4A843` | Hover states on gold elements |
| `--gold-honey` | `#C4912A` | Active/pressed states |
| `--gold-ancient` | `#8B6914` | Deep borders, subtle accents, divider lines |
| `--gold-glow` | `#F5D97E` | Text highlights, sparkle particles, star dots |
| `--gold-pale` | `#FBF0D1` | Faint gold tint for overlays, subtle backgrounds |

### Purple Family (Secondary)

| Token | Hex | Usage |
|---|---|---|
| `--purple-deep` | `#1A0A2E` | Primary page background (`--bg-depth`) |
| `--purple-amethyst` | `#2D1B4E` | Card backgrounds, section alternation |
| `--purple-violet` | `#6B3FA0` | Decorative borders, sacred geometry strokes |
| `--purple-orchid` | `#9B6DCC` | Hover accents, secondary interactive states |
| `--purple-lavender` | `#C9A8E8` | Muted/secondary text, decorative fills |
| `--purple-mist` | `#E8D5F5` | Light body text on dark backgrounds |

### Accent — Crystalline & Earth

| Token | Hex | Usage |
|---|---|---|
| `--crystal-blue` | `#4A90D9` | Links (non-CTA) |
| `--crystal-teal` | `#3DB8A0` | Secondary accent, badges, tags |
| `--rose-quartz` | `#E8A0B4` | Warm feminine accent, decorative flourishes |
| `--pearl-white` | `#F5F0EB` | Primary body text |
| `--moonstone` | `#D4CFC9` | Secondary/subdued text |

### Backgrounds & Surfaces

| Token | Value | Usage |
|---|---|---|
| `--bg-abyss` | `#0D0618` | Deepest layer — hero section, final CTA |
| `--bg-depth` | `#1A0A2E` | Standard section backgrounds |
| `--bg-surface` | `#231445` | Cards, elevated panels, modals |
| `--bg-glass` | `rgba(45, 27, 78, 0.6)` | Glass morphism panels |

### Key Gradients

```css
/* Hero text & CTA shimmer — multi-stop gold */
--gradient-gold-shimmer: linear-gradient(
  135deg,
  #C4912A 0%,
  #F2C94C 25%,
  #F5D97E 50%,
  #F2C94C 75%,
  #C4912A 100%
);

/* Vertical section depth — descending darkness */
--gradient-purple-depth: linear-gradient(
  180deg,
  #1A0A2E 0%,
  #0D0618 100%
);

/* Horizontal section divider — fade through gold */
--gradient-divider: linear-gradient(
  90deg,
  transparent 0%,
  #6B3FA0 20%,
  #F2C94C 50%,
  #6B3FA0 80%,
  transparent 100%
);

/* Diagonal accent — gold-to-purple wash */
--gradient-gold-purple: linear-gradient(
  135deg,
  #F2C94C 0%,
  #9B6DCC 100%
);
```

### Contrast Ratios (verified)

| Combination | Ratio | WCAG |
|---|---|---|
| `--pearl-white` (#F5F0EB) on `--bg-abyss` (#0D0618) | ~15.8:1 | AAA |
| `--pearl-white` (#F5F0EB) on `--bg-depth` (#1A0A2E) | ~13.1:1 | AAA |
| `--gold-solar` (#F2C94C) on `--bg-abyss` (#0D0618) | ~9.2:1 | AAA |
| `--gold-solar` (#F2C94C) on `--bg-depth` (#1A0A2E) | ~7.5:1 | AA |
| `--purple-mist` (#E8D5F5) on `--bg-depth` (#1A0A2E) | ~10.4:1 | AAA |
| `--purple-deep` (#1A0A2E) on `--gold-solar` (#F2C94C) | ~7.5:1 | AA |

---

## 3. Typography

### Font Stack

| Role | Family | Weights | Source |
|---|---|---|---|
| Headings | Cormorant Garamond | 400, 500, 600, 700 | Google Fonts |
| Body | Raleway | 300, 400, 500 | Google Fonts |
| Accent/Labels | Cormorant Unicase | 500 | Google Fonts |

**Fallback stacks:**
- Headings: `'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif`
- Body: `'Raleway', 'Lato', 'Helvetica Neue', Arial, sans-serif`

**Why these fonts:**
- **Cormorant Garamond** — A Renaissance-era serif with tall ascenders and fine serifs. Feels timeless and ceremonial without being stuffy. Weight 400 for hero text preserves delicate elegance; weight 500-600 for section headers adds gravitas.
- **Raleway** — A clean geometric sans-serif. Weight 300 creates an ethereal, light body feel that contrasts beautifully with the ornate headings. Never competes with the serif.
- **Cormorant Unicase** — Small-caps variant of Cormorant. Used exclusively for ceremonial section overline labels ("THE PILGRIMAGE", "SACRED CIRCLE"). Letter-spacing stretched to 0.2em for inscribed-in-stone effect.

### Google Fonts Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Unicase:wght@500&family=Raleway:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

### Type Scale

Built on an 18px base with a perfect fourth ratio (1.333).

| Element | Size | Font | Weight | Line Height | Color | Additional |
|---|---|---|---|---|---|---|
| Hero headline | `clamp(3rem, 8vw, 6rem)` | Cormorant Garamond | 400 | 1.05 | Gold gradient text | `text-transform: none` |
| H1 | `clamp(2.5rem, 5vw, 4rem)` | Cormorant Garamond | 500 | 1.15 | `--pearl-white` | — |
| H2 | `clamp(1.75rem, 3.5vw, 2.5rem)` | Cormorant Garamond | 500 | 1.2 | `--pearl-white` | — |
| H3 | `clamp(1.25rem, 2.5vw, 1.75rem)` | Cormorant Garamond | 600 | 1.3 | `--pearl-white` | — |
| Body | `1.125rem` (18px) | Raleway | 300 | 1.7 | `--pearl-white` | — |
| Body emphasis | `1.125rem` | Raleway | 400 | 1.7 | `--pearl-white` | — |
| Section label | `0.875rem` | Cormorant Unicase | 500 | 1.4 | `--gold-solar` | `letter-spacing: 0.2em; text-transform: uppercase` |
| Quote | `clamp(1.5rem, 3vw, 2rem)` | Cormorant Garamond | 400 italic | 1.5 | `--gold-glow` | — |
| Small / caption | `0.8125rem` | Raleway | 400 | 1.5 | `--moonstone` | — |

### Gold Gradient Text (Hero Headline)

```css
.hero-headline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.05;
  background: linear-gradient(
    135deg,
    #C4912A 0%,
    #F2C94C 25%,
    #F5D97E 50%,
    #F2C94C 75%,
    #C4912A 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 4. Spacing & Layout

### Grid System

Base unit: **8px**. All spacing derives from this unit.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `0.5rem` (8px) | Tight gaps, icon padding |
| `--space-2` | `1rem` (16px) | Element gaps, small padding |
| `--space-3` | `1.5rem` (24px) | Card padding, list spacing |
| `--space-4` | `2rem` (32px) | Component gaps |
| `--space-6` | `3rem` (48px) | Section inner spacing |
| `--space-8` | `4rem` (64px) | Section padding (mobile) |
| `--space-12` | `6rem` (96px) | Section padding (tablet) |
| `--space-16` | `8rem` (128px) | Section padding (desktop) |

### Content Containers

```css
.container-narrow  { max-width: 680px;  margin-inline: auto; padding-inline: 1.5rem; }
.container-standard { max-width: 960px;  margin-inline: auto; padding-inline: 1.5rem; }
.container-wide    { max-width: 1200px; margin-inline: auto; padding-inline: 1.5rem; }
```

### Section Structure

Every section is **full-bleed** (spans full viewport width). Content is constrained within containers. Sections alternate between `--bg-abyss` and `--bg-depth` to create a sense of descending depth:

```
[Hero]           → --bg-abyss    (deepest)
[The Pilgrimage] → --bg-depth    (slightly lifted)
[Sacred Circle]  → --bg-abyss    (deep again)
[Join In Person] → --bg-depth    (lifted)
[Final CTA]      → --bg-abyss    (deepest)
```

### Section Padding (responsive)

```css
.section {
  padding-block: var(--space-8);  /* 4rem mobile */
}

@media (min-width: 768px) {
  .section { padding-block: var(--space-12); }  /* 6rem tablet */
}

@media (min-width: 1024px) {
  .section { padding-block: var(--space-16); }  /* 8rem desktop */
}
```

---

## 5. Visual Elements & Effects

### Sparkle Particles

Canvas-based golden particles floating gently upward in the hero section. Subtle, ambient, never distracting.

```
Particle count:  30–50
Size:            1–3px
Color:           --gold-glow (#F5D97E) at 40–80% opacity
Speed:           0.2–0.5px per frame (very slow rise)
Drift:           Gentle horizontal sine wave
Spawn:           Random across full width, bottom 20% of canvas
Lifespan:        Fade in over 1s, drift for 4–8s, fade out over 1s
Canvas:          position: fixed, z-index: 1, pointer-events: none
```

Particles are disabled entirely when `prefers-reduced-motion: reduce` is active, and on mobile (below 768px) particle count is halved to 15-25.

### Glass Morphism Cards

```css
.glass-card {
  background: var(--bg-glass); /* rgba(45, 27, 78, 0.6) */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(107, 63, 160, 0.3); /* --purple-violet at 30% */
  border-radius: 12px;
  padding: var(--space-3);
}
```

### Sacred Geometry Background Texture

A Flower of Life SVG pattern applied as a background image at very low opacity. It should be subliminal — felt, not seen.

```css
.section-with-geometry {
  background-image: url('/textures/flower-of-life.svg');
  background-repeat: repeat;
  background-size: 300px 300px;
  background-position: center;
  opacity: 1; /* The SVG itself is set to 3–5% opacity fill */
}
```

### Noise Texture Overlay

A fine-grain PNG noise texture overlaid on the entire page at very low opacity. Prevents gradient banding and adds organic depth.

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/textures/noise.png');
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.025;
  pointer-events: none;
  z-index: 9999;
}
```

### Image Treatment

All photographs receive a consistent treatment:

```css
.image-treated {
  border-radius: 8px;
  box-shadow:
    0 0 30px rgba(242, 201, 76, 0.15),  /* golden glow */
    0 8px 32px rgba(0, 0, 0, 0.4);       /* depth shadow */
  filter: saturate(1.05) contrast(1.02);
}

/* Golden vignette overlay */
.image-treated::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(139, 105, 20, 0.2) 100%
  );
  pointer-events: none;
}
```

### Section Dividers

Gradient horizontal lines between sections, centered, 200px wide on mobile scaling to 400px on desktop:

```css
.section-divider {
  width: clamp(200px, 30vw, 400px);
  height: 1px;
  margin-inline: auto;
  background: var(--gradient-divider);
}
```

---

## 6. Component Design Patterns

### Hero Section

```
┌──────────────────────────────────────────────┐
│  [Video background / Static image]           │
│  [Particle canvas overlay]                   │
│  [Dark gradient overlay for legibility]      │
│                                              │
│         SACRED PILGRIMAGE  ← overline label  │
│                                              │
│      The Earth is calling.                   │
│       I am answering.     ← gold gradient    │
│                                              │
│     [subheadline text in pearl-white]        │
│                                              │
│      ┌─────────────────────┐                 │
│      │ Subscribe on Instagram │  ← gold CTA  │
│      └─────────────────────┘                 │
│                                              │
│  min-height: 100vh                           │
│  background: --bg-abyss                      │
└──────────────────────────────────────────────┘
```

- Desktop: Video background (muted, autoplay, loop)
- Mobile (<768px): Static poster image, no video
- Overlay: `linear-gradient(to bottom, rgba(13, 6, 24, 0.3) 0%, rgba(13, 6, 24, 0.7) 100%)`
- Content is vertically and horizontally centered (`display: grid; place-items: center`)

### Feature Cards (Sacred Circle Items)

```css
.feature-card {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(107, 63, 160, 0.3);
  border-left: 3px solid var(--gold-solar);
  border-radius: 12px;
  padding: var(--space-3);
  transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 0 20px rgba(242, 201, 76, 0.1),
    0 12px 40px rgba(0, 0, 0, 0.3);
}
```

Layout: Single column on mobile, 2-column grid on tablet+.

### CTA Buttons

Pill-shaped with a shimmer animation that sweeps the gold gradient across on hover.

```css
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 9999px;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--purple-deep);
  background: var(--gradient-gold-shimmer);
  background-size: 200% 100%;
  background-position: 0% 50%;
  box-shadow:
    0 0 20px rgba(242, 201, 76, 0.25),
    0 4px 16px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-position 0.6s ease-out, box-shadow 0.3s ease-out;
  text-decoration: none;
}

.cta-button:hover {
  background-position: 100% 50%;
  box-shadow:
    0 0 30px rgba(242, 201, 76, 0.4),
    0 6px 24px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  background-position: 100% 50%;
  box-shadow:
    0 0 15px rgba(242, 201, 76, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### Quote Blocks

```css
.quote-block {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.5;
  color: var(--gold-glow);
  border-left: 2px solid var(--gold-ancient);
  padding-left: var(--space-3);
  max-width: 680px;
  margin-inline: auto;
}
```

### Section Headers

Each section opens with a three-part header: overline label, main heading, and a short gradient divider.

```
      THE PILGRIMAGE            ← Cormorant Unicase, gold, 0.875rem, spaced
    Where the earth remembers   ← Cormorant Garamond 500, pearl-white, H2 size
    ─────── ✦ ───────           ← gradient divider, 120px wide, centered
```

```css
.section-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.section-header__label {
  font-family: 'Cormorant Unicase', serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-solar);
  margin-bottom: var(--space-2);
}

.section-header__title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.2;
  color: var(--pearl-white);
  margin-bottom: var(--space-3);
}

.section-header__divider {
  width: 120px;
  height: 1px;
  margin-inline: auto;
  background: var(--gradient-divider);
}
```

---

## 7. Motion & Animation

All animations respect the user's motion preference. Every animation block must be wrapped:

```css
@media (prefers-reduced-motion: no-preference) {
  /* animations go here */
}
```

### Scroll Reveal (Fade-In-Up)

Elements enter the viewport by fading up from 30px below. Triggered by Intersection Observer (vanilla JS, no library).

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```js
// Vanilla JS — Intersection Observer for scroll reveals
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => observer.observe(el));
```

### CTA Shimmer

A subtle, continuous shimmer that sweeps across the CTA button every few seconds when idle.

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes shimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .cta-button--animated {
    animation: shimmer 4s ease-in-out infinite;
  }
}
```

### Floating / Breathing (Decorative Elements)

For sacred geometry decorations and particle-like orbs:

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }

  @keyframes breathe {
    0%, 100% { opacity: 0.3; }
    50%      { opacity: 0.6; }
  }
}
```

### Timing Guidelines

| Context | Duration | Easing |
|---|---|---|
| Hover transitions | 0.3–0.4s | `ease-out` |
| Scroll reveals | 0.6–0.8s | `ease-out` |
| Shimmer loop | 3–4s | `ease-in-out` |
| Float / breathe | 4–6s | `ease-in-out` |
| Page-load entrance | 0.8–1.2s | `ease-out` |

**Overall feel:** Slow, reverent, unhurried. Nothing snaps or bounces. Everything eases in like incense smoke.

---

## 8. Image & Media Guidelines

### Photography Direction

- **Color grading:** Warm shadows pushed toward purple/indigo. Highlights pushed toward gold/amber. Overall warmth, never cool or clinical.
- **Golden hour emphasis:** Shoot or select imagery captured during golden hour. The low, warm light naturally matches the palette.
- **Sacred sites:** Temples, ancient stone, natural vortex formations, crystal caves, ceremonial spaces. Texture-rich surfaces that hold visual interest.
- **Helena's presence:** Photographed from behind, in silhouette, or with face partially turned. She is a pilgrim walking the path, not a model posing. Conveys devotion and movement, not self-promotion.
- **Mood:** Reverent, intimate, luminous. Avoid anything that reads as tourism, luxury travel, or influencer content.

### Video Specifications

| Property | Value |
|---|---|
| Content | Slow atmospheric footage — flickering candles, morning mist over temples, water reflections, stone corridors |
| Frame rate | 24fps (cinematic) |
| Playback | Muted autoplay loop (`autoplay muted loop playsinline`) |
| Formats | WebM (primary), MP4 (fallback) |
| Target size | 2–4MB per clip |
| Resolution | 1920x1080 (desktop), serve 720p to mobile |
| Mobile behavior | Static poster image below 768px (no video download) |

### AI Image Placeholder Prompts

For development before final photography is ready:

- **Hero background:** *"Aerial view of ancient temple ruins at golden hour, mist rising from jungle canopy, warm golden light streaming through stone columns, purple shadows in the foreground, cinematic, atmospheric, 24mm wide angle"*
- **Section texture:** *"Close-up of Lemurian seed crystal, golden light refracting through translucent quartz striations, deep purple background, macro photography, ethereal glow"*
- **Helena silhouette:** *"Woman in flowing white dress walking toward ancient stone archway, shot from behind, golden sunrise light creating a halo effect, sacred temple setting, cinematic composition"*

---

## 9. Responsive Design

### Breakpoints

```css
/* Mobile-first — base styles are for mobile */
/* Tablet */   @media (min-width: 768px)  { ... }
/* Desktop */  @media (min-width: 1024px) { ... }
/* Large */    @media (min-width: 1440px) { ... }
```

### Responsive Behavior

| Feature | Mobile (<768px) | Tablet (768px+) | Desktop (1024px+) |
|---|---|---|---|
| Hero background | Static poster image | Video loads | Video, full effects |
| Hero headline size | `3rem` | `~5vw` | `6rem` |
| Section padding | `4rem` top/bottom | `6rem` | `8rem` |
| Feature cards | Single column | 2-column grid | 2-column grid |
| Sparkle particles | 15–25, or disabled | 30–50 | 30–50 |
| Container padding | `1.5rem` inline | `1.5rem` inline | `1.5rem` inline |
| Touch targets | 44px minimum | 44px minimum | — |
| Sacred geometry bg | Hidden (perf) | Visible, 3% opacity | Visible, 5% opacity |
| CTA button | Full width | Auto width | Auto width |

### Mobile-Specific Notes

- No horizontal scroll at any viewport width
- CTA buttons stretch to full container width below 768px for easy thumb tapping
- Quote blocks reduce left padding to `1rem`
- Section dividers reduce to 120px width
- Images are `width: 100%; height: auto`

---

## 10. Accessibility

### Color Contrast

All text/background combinations meet or exceed WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text). Key pairings verified in Section 2.

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .particle-canvas {
    display: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

### Semantic HTML

- Proper heading hierarchy: one `<h1>` per page, sequential `<h2>` → `<h3>`
- Sections wrapped in `<section>` with `aria-labelledby` pointing to section heading
- Decorative elements (particles, sacred geometry, noise overlay) get `aria-hidden="true"`
- Video backgrounds: `aria-hidden="true"`, no meaningful audio
- All `<img>` tags have descriptive `alt` text (except purely decorative images which use `alt=""`)

### Focus Management

```css
:focus-visible {
  outline: 2px solid var(--gold-solar);
  outline-offset: 3px;
  border-radius: 4px;
}
```

Gold focus rings on deep purple backgrounds provide excellent visibility (~7.5:1 contrast).

### Additional Considerations

- Link text is descriptive (no "click here")
- CTA button text clearly indicates destination ("Subscribe on Instagram")
- Skip-to-content link hidden until focused
- Font sizes never below 13px rendered

---

## 11. Performance Budget

| Resource | Target | Notes |
|---|---|---|
| Initial page weight (no video) | < 1.5MB | HTML + CSS + JS + fonts + hero image |
| Hero video | 2–4MB | Loaded lazily, only on desktop (768px+) |
| Web fonts (all 3 families) | < 150KB | Subset to Latin if possible |
| CSS (total) | < 30KB gzipped | Single stylesheet |
| JS (particles + reveals) | < 15KB gzipped | Vanilla JS, no frameworks |
| Largest Contentful Paint (LCP) | < 2.5s | Hero image/video + headline |
| First Input Delay (FID) | < 100ms | Minimal JS |
| Cumulative Layout Shift (CLS) | < 0.1 | Font `display: swap`, sized image containers |

### Loading Strategy

1. **Critical CSS** inlined in `<head>` (hero section styles, above-fold typography)
2. **Fonts** loaded via `<link rel="preconnect">` + `font-display: swap`
3. **Hero image** loaded eagerly with `fetchpriority="high"`
4. **Hero video** loaded with `preload="none"`, starts loading after page load via JS (desktop only)
5. **Particle canvas** initialized after `DOMContentLoaded`
6. **Sacred geometry SVGs** and noise texture loaded as CSS backgrounds (low priority)
7. **Below-fold images** use `loading="lazy"`
