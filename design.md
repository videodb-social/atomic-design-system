# VideoDB Design System — Single Source of Truth

## How to use this file

This is the canonical spec for the VideoDB v2 atomic design system. It is optimised for agents that generate marketing pages from briefs — read top-down and you'll have everything you need at each stage of assembly. Sections 1–2 cover page assembly. Section 3 is the per-component anatomy lookup. Sections 5–8 carry the foundation tokens, voice rules, and build conventions. `index.html` is the live source of truth on any conflict — open it locally to see component previews and the canonical CSS.

## TL;DR — the system in 200 words

VideoDB is a perception layer for AI — data infrastructure for video, built for machines and agents. The v2 design system covers every marketing surface (videodb.io and adjacent pages) for an audience of AI engineers, software architects, multimedia developers. It is **single-file, no build step** — every page is a standalone HTML file with the canonical CSS and JS inlined; Three.js loads from CDN only when a Particle dome is on the page. The architecture is atomic: 17 atoms compose into 12 molecules, 37 organisms, a Motion family (2 components + 2 examples + 2 authoring methods, plus shared atom vocabulary), 7 Data Viz components (stats, charts, diagrams), and 13 page-level templates. Every component carries `--dark` / `--light` (or `--on-dark` / `--on-light`) modifiers; pages alternate dark and light section surfaces in a stable rhythm — first 2–3 dark, middle shuffle, closing 3–4 dark. The brand is pure black with an orange accent (`--orange-500: #F24E1E`), Geist for body, JetBrains Mono for chrome. Flat fills + 1px hairline borders are the visual vocabulary; gradients, multiple fonts, and pixel ornament are out of bounds. Section padding is 96px top/bottom; scroll-reveal decorates `.ds-section-heading` and `.ds-hero` automatically. Motion-bearing organisms (Motion family + Data Viz) honour `prefers-reduced-motion: reduce` and IntersectionObserver-pause when offscreen.

## Table of contents

1. [Page scaffold (boilerplate)](#1-page-scaffold-boilerplate)
2. [Universal conventions](#2-universal-conventions)
3. [Component anatomy](#3-component-anatomy)
   - [3.1 Atoms (17)](#31-atoms-17)
   - [3.2 Molecules (12)](#32-molecules-12)
   - [3.3 Organisms (37)](#33-organisms-37)
   - [3.4 Motion](#34-motion-2-components--2-examples--2-authoring-methods) — 2 components + 2 examples + 2 authoring methods
   - [3.5 Data Viz (7)](#35-data-viz-7)
   - [3.6 Templates (13)](#36-templates-13)
4. [Page recipes](#4-page-recipes)
5. [Brand tokens (foundation reference)](#5-brand-tokens-foundation-reference)
6. [Voice, tone & principles (compressed)](#6-voice-tone--principles-compressed)
7. [Build & deploy](#7-build--deploy)
8. [Notes on inventory structure](#8-notes-on-inventory-structure)
9. [When stuck](#when-stuck)

---

## 1. Page scaffold (boilerplate)

A complete VideoDB v2 page is six stacked blocks. You write only `<main>`; everything else is shared chrome — copy verbatim from `examples/homepage.html` and update per-page values noted below.

### Block 1 — Doctype + `<head>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VideoDB — {Page-specific title here}</title>
<meta name="description" content="{Page-specific description here.}">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">

<!-- Iconify (required for all pages — icons throughout the system) -->
<link rel="preconnect" href="https://code.iconify.design">
<link rel="preconnect" href="https://api.iconify.design" crossorigin>
<script defer src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

<!-- Three.js (required ONLY on pages using ds-particle-dome — drop the line if not used) -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<style>
  /* Inline the full design system CSS here (copied verbatim from
     examples/homepage.html lines 19-5451 — tokens, atoms, molecules, organisms,
     templates, motion). ~5,400 lines. Do not modify; this is the
     canonical stylesheet for the v2 system.

     For brand-new pages that introduce one-off layout CSS, add a
     second <style> block after this one — never modify the canonical
     block inline. */
</style>
</head>
```

**Per-page changes:** `<title>` and `<meta name="description">` only. Everything else is shared.

**Optional per-page:** Drop the Three.js `<script>` line if the page does not use `ds-particle-dome`.

### Block 2 — `<body>` opening + Site header

```html
<body>
<header class="ds-header-nav ds-header-nav--dark" role="banner" style="position: sticky; top: 0; z-index: 50;">
  <!-- Copy verbatim from examples/homepage.html lines 5460-5532 (organisms/site-header
       with organisms/nav-dropdown for the Solutions mega-menu) -->
</header>
```

Update menu items only if your page introduces new top-level nav (rare). For a standard marketing page, copy verbatim.

### Block 3 — `<main>` (this is where your content goes)

```html
<main>
  <!-- ════════════════════════════════════════════════════════════════════
       Page sections go here. Stack 8-13 sections following the
       dark / light rhythm convention (see "Universal conventions" below).
       Each section uses the ds-section + ds-frame + ds-section-heading
       template pattern.

       For per-component HTML anatomy, see section 3.
       For component selection by intent, see section 4 (page recipes).
       ════════════════════════════════════════════════════════════════════ -->
</main>
```

### Block 4 — `<footer>`

```html
<footer class="ds-footer ds-footer--dark ds-footer--editorial">
  <!-- Copy verbatim from examples/homepage.html lines 6056-6127 (Editorial variant)
       OR from examples/platform.html (Directory variant). Pick based on page intent
       — see Footer entry in section 3.3. -->
</footer>
```

### Block 5 — System init `<script>`

```html
<script>
  /* Copy verbatim from examples/homepage.html lines 6129-6876 (~750 lines).
     Contains hash-route activator + initializers for every interactive
     organism. Call signature at boot:

       activatePage(parseHash());
       initDotLoaders();        // 7×7 dot-loader engine
       initTierFinders();       // ds-tier-finder slider
       initMarquees();          // ds-logo-wall ticker variant
       initTestimonialTickers();// ds-testimonials-ticker WAAPI
       initCarousels();         // ds-carousel
       initTabs();              // ds-tabs arrow-key nav
       initNavDropdowns();      // ds-nav-dropdown hover mega-menu
       initSyncCompare();       // sync-compare slider
       initParticleDomes();     // ds-particle-dome (no-op if dome absent)
       initScrollReveals();     // auto-decorates .ds-section-heading + .ds-hero

     All initializers are no-ops on pages that don't contain the
     corresponding component. Safe to leave the full block on every page. */
</script>
```

### Block 6 — Hero particle dome `<script>` (optional)

```html
<script>
  /* Copy verbatim from examples/homepage.html lines 6888-7012 ONLY IF the page uses
     a hero Particle dome (templates/hero Variant E).
     Initializes a 12,000-point Three.js field with breathing + distortion +
     multi-axis rotation. Falls back to a radial-gradient CSS glow if
     WebGL/Three.js fails. Respects prefers-reduced-motion.

     The script targets `#vh-hero-dome` — ensure the hero markup contains
     `<div id="vh-hero-dome" class="ds-particle-dome" data-ds-particle-scale="hero"></div>`.

     Drop this entire block on pages without a Particle dome. */
</script>
</body>
</html>
```

### Boilerplate-only checklist before deploy

- [ ] `<title>` and `<meta name="description">` updated for this page
- [ ] Three.js script tag present **only** if page uses `ds-particle-dome`
- [ ] Hero dome init script present **only** if page uses `ds-particle-dome`
- [ ] Footer variant matches page intent (Directory for IA-heavy pages, Editorial for brand-statement pages)
- [ ] Inline `<style>` block contains the full canonical CSS (5,400+ lines from examples/homepage.html)

---

## 2. Universal conventions

### 2.1 Section structure

Every section is:

```html
<section class="ds-section ds-section--dark"> <!-- or --light -->
  <div class="ds-frame"> <!-- max-width 1200px + auto-margins -->
    <div class="ds-section-heading ds-section-heading--dark">
      <span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs">01 / Section name</span>
      <h2 class="ds-section-heading__title">Headline.</h2>
      <p class="ds-section-heading__lead">Optional subtitle.</p>
    </div>
    <!-- Section content here — cards / grids / etc. -->
  </div>
</section>
```

Add `--centered` modifier on `.ds-section-heading` for centered hero-style sections. Section padding is 96px top/bottom — don't override unless intent demands a tighter cadence.

### 2.2 Dark / light section rhythm

- **First 2–3 sections always dark** — Hero + Trust badges + Logo wall. Anchors the page in brand colour.
- **Middle sections shuffle** dark / light to break up the dark wall. Content-heavy informational sections (Problem, Architecture, Solutions, Dev experience) typically read better on light.
- **Closing 3–4 sections dark** — Closing CTA, Pre-footer Socials, Etymology, Footer. Strong chrome finale.

### 2.3 Scroll reveal (auto)

Section headings and heroes fade-in on viewport entry automatically via `data-ds-reveal` decoration. Section headings and hero composition require no extra wiring — the controller picks them up.

For **card grids** that should stagger-reveal, add manually:

```html
<article class="ds-feature-card" data-ds-reveal data-ds-reveal-delay="0">...
<article class="ds-feature-card" data-ds-reveal data-ds-reveal-delay="80">...
<article class="ds-feature-card" data-ds-reveal data-ds-reveal-delay="160">...
```

80ms increments. Cap at 4 elements in a sequence.

### 2.4 Hero composition — 5 variants

Pick by intent:

| Variant | Use when |
|---|---|
| **A — Default** with stats strip | Performance / scale pitch with small numeric stats |
| **B — Centered with code** | "Try it now" — embedded `.ds-code-block` is the focal proof |
| **C — Big stats** | Homepage scale-pitch where the numbers ARE the headline |
| **D — Image ticker** | Visual value-prop — "look what teams have built" |
| **E — Animated** | Particle dome behind centered hero — brand-statement moments only |

All start with `<div class="ds-hero ds-hero--centered">` (centered variants) or `<div class="ds-hero">`. Full HTML in section 3.5 (Templates).

### 2.5 Footer — 2 variants

- **Directory (A)** — fat-footer nav grid + compliance row. Default for most pages with deep IA (Product, Developers, Pricing).
- **Editorial (B)** — prelude band + nav + compact compliance + status pulse. Use on brand-statement closers (about, manifesto, single-narrative landing).

### 2.6 Asset paths

Always `assets/...`, never `../merged-design-system-cleanup/assets/...`. Examples:

```html
<img src="assets/logos/wordmark-dark.png" alt="VideoDB">
<img src="assets/customer-logos/hoichoi.png" alt="Hoichoi">
<img src="assets/compliance-logos/soc2-logo-dark-bg.png" alt="SOC 2">
<img src="assets/partner-logos/anthropic-logo-dark-bg.svg" alt="Anthropic">
```

For partner logos on light surfaces, swap to `-light-bg.svg` / `-light-bg.png`. Some are `-any-bg.svg` (Gemini, Claude, Seedance, Zapier — work on both).

---

## 3. Component anatomy

Per-component HTML reference for the v2 atomic system. Every dark/light variant works via `--dark` / `--light` modifier on the root class (or `--on-dark` / `--on-light` for atoms that don't carry surface state themselves). Most snippets below show the dark variant — swap modifiers to flip surface. `index.html` is the source of truth on any conflict.

---

### 3.1 Atoms (17)

#### ds-btn (Atom)

Pill-shaped action button. 44px min touch target, 9999px radius.

**Variants/modifiers:**
- `--primary` (orange fill, white label — one per viewport)
- `--secondary-dark` / `--secondary-light` (filled subtle on each surface)
- `--ghost-dark` / `--ghost-light` (outlined, no fill — tertiary actions)
- `--ghost-charcoal` (in-card on dark surfaces; softer than ghost-dark)
- `--sm` (compact, used in site header)
- `--icon` (40×40 square, requires `aria-label`)
- States: `disabled`, `aria-busy="true"` with `<span class="ds-btn__spinner">` for loading

**HTML:**
```html
<button class="ds-btn ds-btn--primary">Get API key <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>
<button class="ds-btn ds-btn--ghost-dark">Read docs <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon></button>
<button class="ds-btn ds-btn--ghost-charcoal">Choose plan</button>
<button class="ds-btn ds-btn--ghost-dark ds-btn--icon" aria-label="Next"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>
```

**Use when:** Primary CTAs in heroes and closing bands. Always pair primary + ghost via `.ds-cta-pair`. Never two primaries in one viewport.

---

#### ds-eyebrow (Atom)

JetBrains Mono uppercase 11px label, 0.18em letter-spacing. Sits above every section title.

**Variants/modifiers:**
- `--on-dark` / `--on-light` (surface-aware text color)
- `--orange` (brand accent for section codes)
- `--xs` (tighter scale for cramped contexts)
- `--loose` (extra letter-spacing for editorial chrome)
- `--muted-on-dark` / `--muted-on-light` / `--strong-on-dark` / `--strong-on-light`

**HTML:**
```html
<span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs">01 / The Platform</span>
<span class="ds-eyebrow ds-eyebrow--on-dark">Engineering · Note</span>
```

**Use when:** Always paired with a display heading directly below. Never standalone. Section numbering pattern: `01 / Section name` in orange.

---

#### ds-vbar (Atom)

2px × 16px solid bar. The only bullet style in the system for feature lists.

**Variants/modifiers:**
- Default (neutral text color)
- `--orange` (highlights upgraded / featured features)

**HTML:**
```html
<ul style="list-style: none; padding: 0;">
  <li><span class="ds-vbar"></span>5 GB storage</li>
  <li><span class="ds-vbar ds-vbar--orange"></span>Unlimited indexing</li>
</ul>
```

**Use when:** Feature lists inside pricing cards, compare cards, use-case rows. Never use discs, checkmarks, dashes, or numbered lists — vbar is the brand's typographic identity.

---

#### ds-status-pulse (Atom)

8px orange dot with 1.2s pulse animation. Paired with an uppercase mono label like "Live", "Streaming", "Active".

**Variants/modifiers:**
- `--dark` / `--light` (text color for label)

**HTML:**
```html
<span class="ds-status-pulse ds-status-pulse--dark"><span class="ds-status-pulse__dot"></span>Live</span>
```

**Use when:** Code-block status bars, live-feed indicators, footer status pill, anywhere a "this is heartbeating" cue is needed. One per surface.

---

#### ds-bracket (Atom, "Bracket header")

Signature pattern: bracketed mono label + uppercase tag, used in pricing cards and compare cards.

**Variants/modifiers:**
- `--on-dark` / `--on-light` (neutral text color per surface)
- `--orange` (recommended / featured tier marker — both halves go orange)

**HTML:**
```html
<div class="ds-bracket ds-bracket--on-dark"><span class="ds-bracket__label">[$0 / MONTH]</span><span class="ds-bracket__tag">Free</span></div>
<div class="ds-bracket ds-bracket--orange"><span class="ds-bracket__label">[CUSTOM]</span><span class="ds-bracket__tag">Enterprise</span></div>
```

**Use when:** Tier headers on pricing cards (Variant B detached), Problem/Solution compare cards, sync-compare column headers. Square brackets are literal text, not CSS.

---

#### ds-tag-chip (Atom)

Mono uppercase 11px chip with 4px small radius. Metadata-level signaling for tags, languages, capability badges.

**Variants/modifiers:**
- `--dark` / `--light` (surface-aware fill + border)

**HTML:**
```html
<span class="ds-tag-chip ds-tag-chip--dark">python</span>
<span class="ds-tag-chip ds-tag-chip--dark">indexing</span>
```

**Use when:** Content cards, article meta rows, capability badges. Always neutral — never orange, never color-coded. For interactive filtering, switch to `.ds-pill-tab` tablist.

---

#### ds-input (Atom)

Pill or card-radius text field. 16px font-size (prevents iOS auto-zoom).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--pill` (9999px radius for inline subscribe forms; default is card radius)
- States: `is-focused`, `is-error`, `is-buzzing` (200ms shake on invalid submit)

**HTML:**
```html
<label class="ds-field-label ds-field-label--on-dark">Email</label>
<input class="ds-input ds-input--dark ds-input--pill" type="email" placeholder="you@company.com">

<input class="ds-input ds-input--light is-error" type="email" value="not-an-email">
<span class="ds-helper ds-helper--on-light is-error">Enter a valid email</span>
```

**Use when:** Subscribe bands (pill radius), form modals + multi-field forms (card radius). Always paired with a `.ds-field-label` above.

---

#### ds-textarea (Atom)

Multi-line input. Card radius, vertical-resize only. Min-height 100px (80px in modal contexts).

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<label class="ds-field-label ds-field-label--on-dark">Project description</label>
<textarea class="ds-textarea ds-textarea--dark" rows="3" placeholder="Tell us what you're building"></textarea>
```

**Use when:** Form modals, contact forms, comment composers. Pin `font-family: Geist` — browsers default textareas to monospace.

---

#### ds-select (Atom)

Card-radius dropdown with custom chevron caret (inline SVG, `appearance: none` strips the OS arrow). Inherits input styling.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<label class="ds-field-label ds-field-label--on-dark">Your role</label>
<select class="ds-select ds-select--dark">
  <option value="" disabled selected>Select…</option>
  <option>Founder / Exec</option>
  <option>Engineering</option>
  <option>Product</option>
</select>
```

**Use when:** 3–8 options. Below 3 use radios; above 8 use autocomplete. Placeholder option must be `disabled` so it can't be re-submitted.

---

#### ds-checkbox (Atom)

18×18 subtle-radius checkbox. Orange-500 fill + white tick when checked. Independent-state (many-of-many).

**Variants/modifiers:**
- `--dark` / `--light` (surface-aware border + bg)

**HTML:**
```html
<label class="ds-field-choice"><input class="ds-checkbox ds-checkbox--dark" type="checkbox" checked> Email digest</label>
<label class="ds-field-choice"><input class="ds-checkbox ds-checkbox--dark" type="checkbox"> Slack alerts</label>
```

**Use when:** Multi-select preferences, opt-ins, terms acceptance. Subtle 4px radius distinguishes checkbox from radio at a glance.

---

#### ds-radio (Atom)

18×18 pill-radius radio. Orange-500 fill when checked. One-of-many.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<label class="ds-field-choice"><input class="ds-radio ds-radio--dark" type="radio" name="bill" checked> Monthly</label>
<label class="ds-field-choice"><input class="ds-radio ds-radio--dark" type="radio" name="bill"> Annual</label>
```

**Use when:** Billing-period toggles, plan switchers, anywhere only one option in a group can be active. Wrap input inside `<label class="ds-field-choice">` for click-the-text behavior.

---

#### ds-mono-badge (Atom)

Dot-pattern punched-through badge. Section ID marker (e.g. `N/01`, `V/02`). Text uses multi-offset text-shadow halo to preserve the dot texture across glyphs.

**Variants/modifiers:**
- `--dark` / `--light` (matching surface for halo color)

**HTML:**
```html
<span class="ds-mono-badge ds-mono-badge--dark"><span class="ds-mono-badge__text">N/01</span></span>
<span class="ds-mono-badge ds-mono-badge--dark"><span class="ds-mono-badge__text">V/01 · Storage</span></span>
```

**Use when:** Section-code marker at the start of folds. Not for general labeling — that's `.ds-eyebrow`'s job.

---

#### ds-helper (Atom, "Helper text")

12px subtle text below an input. Carries hint, validation feedback, or "no data submitted" note.

**Variants/modifiers:**
- `--on-dark` / `--on-light` (surface)
- `is-error` (flips text color to `--color-error` red)

**HTML:**
```html
<span class="ds-helper ds-helper--on-dark">We'll send a one-time confirmation</span>
<span class="ds-helper ds-helper--on-dark is-error">Enter a valid email · we don't share addresses</span>
```

**Use when:** Below an input for hint / constraint / validation. Don't use for required-field asterisks — every visible field is required unless explicitly optional.

---

#### ds-arrow-cta (Atom)

Editorial link variant. Uppercase mono label + orange circle holding an arrow. The signature "Learn more →" pattern that bridges body copy to a deeper surface.

**Variants/modifiers:**
- `--on-dark` / `--on-light` (surface)

**HTML:**
```html
<a class="ds-arrow-cta ds-arrow-cta--on-dark" href="#">Learn more <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></span></a>
```

**Use when:** Section closers, content cards, lifecycle stages, industry tiles. Quieter than a button, more visible than a plain link.

---

#### ds-dot-loader (Atom, "Dot loader")

7×7 grid driven frame-by-frame from JSON. The brand-signature loader. Three frame sets: `wave` (130ms cadence), `snake` (130ms), `pulse` (220ms).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--orange` (brand-orange pulse variant for emphasis loads)
- `data-frames="wave|snake|pulse"`, `data-speed` (ms)

**HTML:**
```html
<div class="ds-dot-loader ds-dot-loader--dark" data-frames="wave" aria-label="Loading"></div>
<div class="ds-dot-loader ds-dot-loader--dark ds-dot-loader--orange" data-frames="pulse" data-speed="220" aria-label="Loading"></div>
```

**Use when:** Page-level loads, auth callbacks, indexing completion, agent run starts. `aria-label` required. Other loaders in the system: `.ds-spinner` (inline 22px), `.ds-skeleton` (shimmer block), `.ds-progress` (2px indeterminate top-band).

---

#### ds-field-label (Atom, "Label")

Sentence-case Geist 12 / 500 input label. Short — "Name", "Email". Sits 8px above its associated input.

**Variants/modifiers:**
- `--on-dark` / `--on-light` (surface)

**HTML:**
```html
<label class="ds-field-label ds-field-label--on-dark">Name</label>
<input class="ds-input ds-input--dark" type="text" placeholder="Jane Smith">
```

**Use when:** Always paired with an input. Sentence case, never UPPERCASE — that's the eyebrow's role.

---

#### ds-pill-status (Atom, "Status pill")

Card-footer indicator. Pill radius with a leading dot — orange by default (the "this is a status" semantic). Closely related to the `ds-status-pulse` heartbeat dot but here paired with a longer label inside a pill background.

**Variants/modifiers:**
- `--dark` / `--light` / `--orange` (full-orange "Recommended" variant)

**HTML:**
```html
<span class="ds-pill-status ds-pill-status--dark"><span class="ds-pill-status__dot"></span>Live · v2.4.0</span>
<span class="ds-pill-status ds-pill-status--orange"><span class="ds-pill-status__dot" style="background: currentColor;"></span>Recommended</span>
```

**Use when:** Hero release pill, card-footer status, compare-card bottom. Orange variant reserved for focal "Recommended" tier markers — use sparingly.

---

### 3.2 Molecules (12)

#### ds-section-heading (Molecule)

The canonical opener for every section / fold. Eyebrow + display heading + lead paragraph, stacked at 16px gap with 720px max-width on body copy. The most-used molecule in the kit.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--centered` (center-aligned for hero-style sections)

**HTML:**
```html
<div class="ds-section-heading ds-section-heading--dark">
  <span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs">01 / The Platform</span>
  <h2 class="ds-section-heading__title">Video as a queryable table.</h2>
  <p class="ds-section-heading__lead">VideoDB explodes every video into multidimensional indexes — visual objects, spoken words, timecoded moments — so agents can query specific seconds the same way they query rows.</p>
</div>
```

**Use when:** Opens every section. One per section. Lead is optional but recommended for narrative folds.

---

#### ds-stat (Molecule, "Stat block")

Big mono numeral + uppercase mono label. The metric primitive — 3–4 of these in a row makes a complete social-proof / capability strip. Value at 56px Geist 300 with tabular-nums.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `.ds-stat__value--orange` (focal-stat highlight — use sparingly)

**HTML:**
```html
<div class="ds-stat ds-stat--dark">
  <span class="ds-stat__value">2.4M</span>
  <span class="ds-stat__label">Hours indexed</span>
</div>
<div class="ds-stat ds-stat--dark">
  <span class="ds-stat__value ds-stat__value--orange">99.99%</span>
  <span class="ds-stat__label">Indexing uptime</span>
</div>
```

**Use when:** 3–5 per row in stat strips inside Hero (Variant C — Big stats) or above closing CTA bands. Label stays under 5 words.

---

#### ds-cta-pair (Molecule)

Primary + Ghost button paired side-by-side with a 12px gap. Wraps on narrow viewports automatically.

**HTML:**
```html
<div class="ds-cta-pair">
  <button class="ds-btn ds-btn--primary">Get API key <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>
  <button class="ds-btn ds-btn--ghost-dark">Read docs <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon></button>
</div>
```

**Use when:** Hero CTAs, closing CTA bands. Always Primary + Ghost — never Primary + Primary (competing CTAs).

---

#### ds-snippet (Molecule, "Copy snippet")

Single-line CLI / code sample with inline copy-to-clipboard. The developer-marketing essential. A `$` prefix is added via `::before` on the line span — underlying text is just the command.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--install` (larger padding + brand-orange command text for install-page hero)

**HTML:**
```html
<div class="ds-snippet ds-snippet--dark">
  <code class="ds-snippet__line">pip install videodb</code>
  <button class="ds-snippet__copy" type="button">Copy</button>
</div>

<div class="ds-snippet ds-snippet--dark ds-snippet--install">
  <code class="ds-snippet__line">curl -fsSL https://artifacts.videodb.io/install | bash</code>
  <button class="ds-snippet__copy" type="button">Copy</button>
</div>
```

**Use when:** Inline tutorial commands (default), install-page hero (`--install`). One install variant per page so the orange stays semantic. Multi-line → use Code block organism instead.

---

#### ds-tag-list (Molecule)

Row of `.ds-tag-chip` atoms with 8px gap + flex-wrap. The card-meta pattern.

**HTML:**
```html
<div class="ds-tag-list">
  <span class="ds-tag-chip ds-tag-chip--dark">python</span>
  <span class="ds-tag-chip ds-tag-chip--dark">indexing</span>
  <span class="ds-tag-chip ds-tag-chip--dark">agents</span>
</div>
```

**Use when:** Article hero meta, content-card footers, capability badges. 2–6 tags per list.

---

#### ds-form-field (Molecule)

Field label + Input + optional helper text, stacked vertically. The atomic unit of form composition. 8px gap label→input; 6px gap input→helper.

**HTML:**
```html
<div style="display: flex; flex-direction: column; gap: 8px;">
  <label class="ds-field-label ds-field-label--on-dark">Workspace URL</label>
  <input class="ds-input ds-input--dark" type="text" placeholder="acme">
  <span class="ds-helper ds-helper--on-dark">Lowercase letters and dashes only · 3–32 chars</span>
</div>
```

**Use when:** Every form. Label is mandatory — placeholder isn't a label. Required-field asterisks are forbidden (every visible field is required unless explicitly noted optional).

---

#### subscribe-band (Molecule, composition)

Inline email-capture composition: field label + pill input + primary button + helper text. Canonical newsletter / waitlist surface — used in section footers, modal CTAs, the homepage subscribe block.

**Anatomy:** label (top), input + button on one row (12px gap), helper below. Input flexes to fill; button is fixed-width.

**HTML:**
```html
<div style="display: flex; flex-direction: column; gap: 12px;">
  <label class="ds-field-label ds-field-label--on-dark">Your email</label>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <input class="ds-input ds-input--dark ds-input--pill" type="email"
           placeholder="you@company.com" style="flex: 1; min-width: 220px;">
    <button class="ds-btn ds-btn--primary" type="button">
      Subscribe <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon>
    </button>
  </div>
  <span class="ds-helper ds-helper--on-dark">Useful signal only · no spam · unsubscribe anytime</span>
</div>
```

Swap `--on-dark`/`--dark` for `--on-light`/`--light` on light surfaces.

**Use when:** Newsletter signup, waitlist capture, modal email gate. Single field only — for name + email, switch to a multi-field form inside a card. Helper carries trust copy ("no spam", "unsubscribe anytime"). Disable submit on click — swap button to its loading state so the user can't double-submit.

---

#### ds-mode-toggle (Molecule)

Binary control with a sliding pill indicator. JS reads each button's `offsetWidth/offsetLeft` on click and writes `--ds-slider-w/--ds-slider-x` so the slider transitions in CSS.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--equal` (equal-width buttons)

**HTML:**
```html
<div class="ds-mode-toggle ds-mode-toggle--dark ds-mode-toggle--equal" role="group" aria-label="View mode" style="--ds-slider-w: 82px; --ds-slider-x: 4px;">
  <span class="ds-mode-toggle__slider"></span>
  <button class="ds-mode-toggle__btn is-active" type="button"><iconify-icon icon="solar:list-linear" width="14" height="14"></iconify-icon> List</button>
  <button class="ds-mode-toggle__btn" type="button"><iconify-icon icon="solar:widget-2-linear" width="14" height="14"></iconify-icon> Grid</button>
</div>
```

**Use when:** Binary view switches — list/grid, monthly/annual, light/dark. Three+ options → switch to `.ds-pill-tab` tablist.

---

#### ds-surface-toggle (Molecule)

Sun / moon button pair that flips a section's surface between dark and light. 32×32 icon-only buttons in a 4px-padded pill container.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `is-active` per button

**HTML:**
```html
<div class="ds-surface-toggle ds-surface-toggle--dark" role="group" aria-label="Surface">
  <button class="ds-surface-toggle__btn is-active" type="button" aria-label="Dark surface" aria-pressed="true"><iconify-icon icon="solar:moon-linear" width="14" height="14"></iconify-icon></button>
  <button class="ds-surface-toggle__btn" type="button" aria-label="Light surface" aria-pressed="false"><iconify-icon icon="solar:sun-linear" width="14" height="14"></iconify-icon></button>
</div>
```

**Use when:** Top-right of a section that supports surface flipping. Position absolute. Fires on `mousedown`, not `click`, to feel instant.

---

#### ds-code-tab-pills (Molecule)

Compact tab-pill group designed to sit above a code block. Mono labels, 12px, white-on-charcoal selected state.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `is-selected` per button

**HTML:**
```html
<div role="tablist" aria-label="Runtime">
  <div class="ds-code-tab-pills ds-code-tab-pills--dark">
    <button class="ds-code-tab-pills__btn is-selected" role="tab" aria-selected="true">npx</button>
    <button class="ds-code-tab-pills__btn" role="tab" aria-selected="false">pip</button>
    <button class="ds-code-tab-pills__btn" role="tab" aria-selected="false">typescript</button>
  </div>
</div>
```

**Use when:** Inside a Code block organism to switch runtime (npx/pip/typescript) or framework (react/vue/svelte). Default to the most-popular runtime.

---

#### ds-pill (Molecule, "Tablist composition")

Tablist composed of `.ds-pill-tab` atoms. Selected state inverts the surface (solid white on dark, solid charcoal on light). Transparent border on all pills locks box height. Arrow-key nav between tabs; Home/End jump to first/last.

**Variants/modifiers:**
- `.ds-pill-tab--dark` / `--light` per button
- `is-selected` + `aria-selected="true"` on the active tab
- Wrap in `role="tablist"` with `aria-label`

**HTML:**
```html
<div role="tablist" aria-label="Mode">
  <button class="ds-pill-tab ds-pill-tab--dark is-selected" role="tab" aria-selected="true">All</button>
  <button class="ds-pill-tab ds-pill-tab--dark" role="tab" aria-selected="false">Ingest</button>
  <button class="ds-pill-tab ds-pill-tab--dark" role="tab" aria-selected="false">Search</button>
</div>
```

**Use when:** Tablist groups of 3+ options where the tab is chrome / filter-like (runtime / language / view). Below 3 use Mode toggle; above 7 use a select. For focal section-level switching (orange-active), use `.ds-tabs` organism instead.

---

#### ds-bracket-head (Molecule, "Bracket head + tag")

Pattern: use the `.ds-bracket` atom as a header unit — bracket label on the left, tier-name tag on the right. Featured tier flips both halves to orange together.

**HTML:**
```html
<div class="ds-bracket ds-bracket--on-dark"><span class="ds-bracket__label">[$0 / MONTH]</span><span class="ds-bracket__tag">Free</span></div>
<div class="ds-bracket ds-bracket--orange"><span class="ds-bracket__label">[CUSTOM]</span><span class="ds-bracket__tag">Enterprise</span></div>
```

**Use when:** Pricing card heads (detached variant), Problem/Solution compare cards. One orange variant per pricing surface.

---

### 3.3 Organisms (37)

#### Cards (8)

##### ds-feature-card (Organism)

Magazine-style hero anchor card. 5/7 split — art region left, copy right. The lead card on a Labs / Blog / Research index where one piece dominates. Below 720px stacks (art on top).

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<article class="ds-card ds-card--dark ds-feature-card ds-feature-card--dark">
  <div class="ds-feature-card__art"></div>
  <div class="ds-feature-card__body">
    <span class="ds-eyebrow">Engineering · Featured</span>
    <h3 class="ds-feature-card__title">Building a 4 PB live-broadcast agent on RTStream</h3>
    <p class="ds-feature-card__lead">How one customer ingested 4 PB of live video and built an agent that answers questions about footage as it streams.</p>
    <span class="ds-feature-card__byline">Sankalp Nagaonkar · 14 min read</span>
  </div>
</article>
```

**Use when:** One per index page — for the lead story only. Subsequent stories use the Content card grid.

---

##### ds-content-card (Organism)

Single-column research / labs / notes card. Eyebrow + title + lead + meta row, with 220px min-height so a grid stays visually even. The repeating unit for Labs / Research / Engineering index pages.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<article class="ds-card ds-card--dark ds-content-card ds-content-card--dark">
  <span class="ds-eyebrow">Research · Note</span>
  <h3 class="ds-content-card__title">Multimodal embedding alignment</h3>
  <p class="ds-content-card__lead">How we keep CLIP, Whisper, and our internal scene-graph embeddings in the same semantic space so a single query can hit all indexes at once.</p>
  <div class="ds-content-card__meta">
    <span class="ds-tag-chip ds-tag-chip--dark">python</span>
    <span class="ds-tag-chip ds-tag-chip--dark">embeddings</span>
    <a class="ds-arrow-cta ds-arrow-cta--on-dark" href="#" style="margin-left: auto;">Read <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon></span></a>
  </div>
</article>
```

**Use when:** 3-up grids on index pages. Meta row always pinned to bottom via `margin-top: auto`. 2–4 tags max.

---

##### ds-dispatch-card (Organism)

Newsletter / release-announcement card. Two-column composition: title + lead left, subscribe form right. The hero-weight conversion pattern. Uses 16px radius (heavier than 12px content cards).

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<article class="ds-card ds-card--dark ds-dispatch-card ds-dispatch-card--dark">
  <div>
    <div class="ds-dispatch-card__kicker">Dispatch · Issue 24 · May 16</div>
    <h3 class="ds-dispatch-card__title">RTStream beta, Director v2, and a 4 PB customer story</h3>
    <p class="ds-dispatch-card__lead">What shipped this week, what's next, and one engineering deep-dive.</p>
  </div>
  <div class="ds-dispatch-card__form">
    <label class="ds-field-label ds-field-label--on-dark">Subscribe</label>
    <input class="ds-input ds-input--dark ds-input--pill" type="email" placeholder="you@company.com">
    <button class="ds-btn ds-btn--primary" type="button">Get the dispatch</button>
  </div>
</article>
```

**Use when:** Closing a marketing section or fronting a Changelog / Dispatch index page. Kicker carries issue + date metadata.

---

##### ds-project-tile (Organism)

Dark numbered tile for the Open-Source / Project grid. Art panel on top (160px, numbered marker top-left + centered orange icon), content body below.

**Variants/modifiers:**
- `--dark` (canonical) / `--light` (exception for embedded use)

**HTML:**
```html
<div class="ds-project-grid">
  <article class="ds-project-tile ds-project-tile--dark">
    <div class="ds-project-tile__art">
      <span class="ds-project-tile__marker">N/01</span>
      <iconify-icon class="ds-project-tile__icon" icon="solar:satellite-linear"></iconify-icon>
    </div>
    <div class="ds-project-tile__body">
      <span class="ds-eyebrow">Capture</span>
      <h3 class="ds-project-tile__title">CaptureSDK</h3>
      <p class="ds-project-tile__lead">RTMP, HLS, and WebRTC into a single ingest API.</p>
      <a class="ds-arrow-cta ds-arrow-cta--on-dark ds-project-tile__cta" href="#">View on GitHub <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon></span></a>
    </div>
  </article>
</div>
```

**Use when:** Open-source project index on the Agents / Projects page. Numbered N/01, N/02, etc. in source order. Icon stays orange at 70% opacity.

---

##### ds-research-card (Organism)

Publication entry card. Light-surface only by convention. Kicker (source + date) + title + authors + summary + CTA, stacked at 14px gap. Background lifts on hover instead of border-shift.

**Variants/modifiers:**
- `--dark` / `--light` (surface; light is canonical)

**HTML:**
```html
<article class="ds-research-card ds-research-card--light">
  <span class="ds-research-card__kicker">arXiv · May 2026</span>
  <h3 class="ds-research-card__title">Do thought streams matter? Evaluating reasoning in vision-language models for long-form video understanding</h3>
  <div class="ds-research-card__authors">Shivam Sharma, Sankalp Nagaonkar, Ashish Choithani</div>
  <p class="ds-research-card__lead">We test whether continuous chain-of-thought traces help VLMs answer questions about hour-long videos.</p>
  <a class="ds-arrow-cta ds-arrow-cta--on-light" href="#">Read the paper <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon></span></a>
</article>
```

**Use when:** Research index pages. Authors comma-separated on one line — no truncation, no avatars. Titles can be long (2–3 lines is expected).

---

##### ds-build-card (Organism)

"How I built X" feature card. Mono kicker + title + description + top-right corner arrow that pops orange and rotates on hover. Whole card wraps in `<a>`.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<a class="ds-build-card ds-build-card--dark" href="#">
  <div class="ds-build-card__body">
    <span class="ds-eyebrow ds-eyebrow--xs ds-eyebrow--loose ds-eyebrow--muted-on-dark">How I built · Ashish</span>
    <h3 class="ds-build-card__title">How I built CallMD: AI call intelligence on top of VideoDB</h3>
    <p class="ds-build-card__desc">A practical build story for a local-first call intelligence app that records, transcribes, and exports structured Markdown.</p>
  </div>
  <iconify-icon class="ds-build-card__arrow" icon="solar:arrow-right-up-linear" width="24" height="24"></iconify-icon>
</a>
```

**Use when:** Editorial grid for build-story articles. Stack vertically in a single column. Kicker format: `How I built · <Author>`.

---

##### ds-logo-card (Organism)

Title + list of brand-logo rows. Each row pairs a 36×36 icon frame with a name and optional mono value (model version, plan, tier). Hairline divider between rows.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<div class="ds-logo-card ds-logo-card--dark" style="max-width: 320px;">
  <div class="ds-logo-card__title">Models</div>
  <ul class="ds-logo-card__list">
    <li class="ds-logo-card__row">
      <span class="ds-logo-card__icon-frame"><img src="assets/partner-logos/gemini-logo-any-bg.svg" alt="Gemini"></span>
      <span class="ds-logo-card__name">Gemini</span>
      <span class="ds-logo-card__value">2.0</span>
    </li>
    <li class="ds-logo-card__row">
      <span class="ds-logo-card__icon-frame"><img src="assets/partner-logos/openai-logo-dark-bg.svg" alt="OpenAI"></span>
      <span class="ds-logo-card__name">OpenAI</span>
      <span class="ds-logo-card__value">gpt-4o</span>
    </li>
  </ul>
</div>
```

**Use when:** Partner / model / integration tier tiles. Title is mandatory. Width caps at ~320px — stack in 2–3 columns, don't stretch.

---

##### ds-social-card (Organism)

Small "where to find us" tile. Icon top-left + title + meta line below + whole card wraps in `<a>`. Hover flips icon to orange.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<a class="ds-social-card ds-social-card--dark" href="#">
  <span class="ds-social-card__icon"><iconify-icon icon="ri:github-fill" width="28" height="28"></iconify-icon></span>
  <h3 class="ds-social-card__title">Github</h3>
  <span class="ds-social-card__meta">3100+ Stars</span>
</a>
```

**Use when:** Pre-footer Socials template. 4–6 per grid. One-line meta only ("3100+ Stars", "@videodb", "Workshops & demos").

---

#### Pricing & tier (2)

##### ds-price-card (Organism, "Pricing card")

Tier card built from existing atoms. Two variants: **Connected** (`--featured` for one focal tier inside `.ds-pricing-grid`, subtle bg tint) and **Detached** (`--detached` for three standalone cards inside `.ds-pricing-row`, `--active` for the orange-ringed focal tier).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--featured` (Connected: focal tier — subtle bg tint)
- `--detached` (Variant B: standalone card with full border)
- `--active` (Detached: orange-ring + glow on focal tier)

**HTML (Variant A — Connected):**
```html
<div class="ds-pricing-grid ds-pricing-grid--dark">
  <article class="ds-price-card">
    <div class="ds-price-card__head">
      <span class="ds-price-card__bracket">[$0 / MONTH]</span>
      <span class="ds-price-card__plan">Free</span>
    </div>
    <p class="ds-price-card__desc">Prototype and explore. Full API access, no credit card.</p>
    <ul class="ds-price-card__features">
      <li>5 GB video storage</li>
      <li>10 hours of indexing / month</li>
    </ul>
    <button class="ds-btn ds-price-card__cta ds-price-card__cta--dark">Get started</button>
  </article>
  <article class="ds-price-card ds-price-card--featured">
    <div class="ds-price-card__head">
      <span class="ds-price-card__bracket ds-price-card__bracket--featured">[$15 / MONTH]</span>
      <span class="ds-price-card__plan">Pro</span>
    </div>
    <p class="ds-price-card__desc">For developers shipping to production.</p>
    <ul class="ds-price-card__features"><li>Unlimited indexing</li></ul>
    <button class="ds-btn ds-price-card__cta ds-price-card__cta--dark">Subscribe</button>
  </article>
</div>
```

**HTML (Variant B — Detached + active):**
```html
<div class="ds-pricing-row">
  <article class="ds-price-card ds-price-card--detached ds-price-card--dark ds-price-card--active">
    <div class="ds-bracket ds-bracket--orange"><span class="ds-bracket__label">[$49 / MONTH]</span><span class="ds-bracket__tag">Usage</span></div>
    <p class="ds-price-card__desc">For developers shipping to production.</p>
    <ul class="ds-price-card__features">
      <li><span class="ds-vbar ds-vbar--orange"></span>Unlimited indexing</li>
      <li><span class="ds-vbar ds-vbar--orange"></span>500k API calls / month</li>
    </ul>
    <a class="ds-price-card__cta" href="#">Start free trial</a>
  </article>
</div>
```

**Use when:** Connected (A) for page-level pricing surfaces where the row is the section. Detached (B) for modals, comparison popovers, or reusable single cards. Exactly one featured / active tier. 3–4 tiers max.

---

##### ds-tier-finder (Organism)

Slider-driven tier picker. Drag the slider, the active marker updates, stat panel recomputes (storage / API calls / support). Pairs with pricing cards when "which tier fits me" is a real question.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<div class="ds-tier-finder ds-tier-finder--dark" data-ds-tier-finder>
  <div class="ds-tier-finder__head">
    <div>
      <div class="ds-tier-finder__label">Selected tier</div>
      <div class="ds-tier-finder__current-tier" data-tier-name>Usage</div>
      <div class="ds-tier-finder__current-price" data-tier-price>$49 / month · per 100 hours indexed</div>
    </div>
    <div>
      <div class="ds-tier-finder__label">Hours indexed / month</div>
      <div class="ds-tier-finder__current-tier ds-tier-finder__current-tier--hours" data-tier-hours>50</div>
    </div>
  </div>
  <div class="ds-tier-finder__slider">
    <div class="ds-tier-finder__track"><div class="ds-tier-finder__track-fill" data-tier-fill style="--ds-tier-fill: 50%;"></div></div>
    <div class="ds-tier-finder__zones"><div class="ds-tier-finder__zone"></div><div class="ds-tier-finder__zone"></div><div class="ds-tier-finder__zone"></div></div>
    <input type="range" min="1" max="100" value="50" step="1" aria-label="Hours indexed per month">
  </div>
  <div class="ds-tier-finder__markers">
    <span class="ds-tier-finder__marker" data-tier-marker="free">Free · 10 hrs</span>
    <span class="ds-tier-finder__marker is-active" data-tier-marker="usage">Usage · 100 hrs</span>
    <span class="ds-tier-finder__marker" data-tier-marker="enterprise">Enterprise · ∞</span>
  </div>
  <div class="ds-tier-finder__detail">
    <div><div class="ds-tier-finder__stat-label">Included storage</div><div class="ds-tier-finder__stat-value" data-tier-storage>100 GB</div></div>
    <div><div class="ds-tier-finder__stat-label">API calls / month</div><div class="ds-tier-finder__stat-value" data-tier-calls>500k</div></div>
    <div><div class="ds-tier-finder__stat-label">Support level</div><div class="ds-tier-finder__stat-value" data-tier-support>Email · 24h</div></div>
  </div>
</div>
```

**Use when:** Usage-based pricing pages, below the pricing cards. Always render an active state on first paint. Pair with — don't replace — the pricing cards above.

---

#### Editorial (6)

##### ds-article-hero (Organism)

Display heading + lead + byline + optional tag list. The first surface on any article. Larger and more prose-shaped than a Section heading; sits inside its own enclosing surface.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<article class="ds-article-hero ds-article-hero--dark">
  <div class="ds-article-hero__kicker"><a href="#" style="color: inherit; text-decoration: none;">← Engineering</a> <span>/</span> Field Note 24</div>
  <h2 class="ds-article-hero__title">The hidden 6 MB Lambda trap: compression and payload limits</h2>
  <p class="ds-article-hero__lead">When Postman lies and AWS rejects: a story about boundary measurement and gzip negotiation.</p>
  <div class="ds-tag-list">
    <span class="ds-tag-chip ds-tag-chip--dark">aws</span>
    <span class="ds-tag-chip ds-tag-chip--dark">lambda</span>
  </div>
  <span class="ds-article-hero__byline">Rohit Garg · Field note · 5 min read · May 16, 2026</span>
</article>
```

**Use when:** Top of every article (Labs note, blog post, research entry, changelog item). Kicker is the only navigation — don't add a separate back button. Title under 2 lines.

---

##### ds-article-toc (Organism)

Right-rail sticky navigation for long-form articles. Vertical list of section anchors with 1px left border that thickens to 2px orange + 2px right-nudge on the active link. Scroll-spy via IntersectionObserver in production.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `is-active` per link, `aria-current="true"`

**HTML:**
```html
<nav class="ds-article-toc ds-article-toc--dark" aria-label="On this page">
  <span class="ds-article-toc__label">In this note</span>
  <a class="ds-article-toc__link" href="#">Problem</a>
  <a class="ds-article-toc__link is-active" href="#" aria-current="true">Compression negotiation</a>
  <a class="ds-article-toc__link" href="#">What we changed</a>
</nav>
```

**Use when:** Article-shell template, sticky right rail. One link per H2 (no H3 entries — keeps the rail scannable).

---

##### ds-highlight (Organism)

Inline orange-marker emphasis for body copy. Linear gradient (transparent on top, orange-22% in the lower half) so the mark survives line wraps without overflowing ascenders.

**Variants/modifiers:**
- Default (focal-phrase marker)
- `--search` (lighter opacity for find-in-page contexts where many matches exist)

**HTML:**
```html
<p>VideoDB makes video <span class="ds-highlight">queryable, programmable, and composable</span> — every visual object becomes a row.</p>

<p>Three matches found for <span class="ds-highlight ds-highlight--search">scene</span>: opening, closing, and transition.</p>
```

**Use when:** One or two per article max for default. Search variant when count > 2 (find-in-page, code-annotation matches).

---

##### ds-pullquote (Organism, part of Editorial primitives)

3px orange left bar + italicized body. Inline-emphasis primitive for a single sentence that should land after the reader leaves.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<blockquote class="ds-pullquote ds-pullquote--dark" style="max-width: 540px;">Measure the bytes at the boundary that enforces the limit — not at the boundary you trust to be honest.</blockquote>
```

**Use when:** Long-form articles, 0–2 per piece. The remember-this sentence. Different intent than callout (sidebar list) and decision list (reasoning chain).

---

##### ds-callout (Organism, "Labeled callout", part of Editorial primitives)

Soft-tint card with orange mono label + dash-bulleted body list. For "Try this", "Debug separately", or "Things to verify" asides.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<aside class="ds-callout ds-callout--dark" style="max-width: 540px;">
  <span class="ds-callout__label">Debug these separately</span>
  <ul class="ds-callout__list">
    <li>Raw response bytes — what your handler returned.</li>
    <li>Transferred bytes — what AWS emitted on the wire.</li>
    <li>Whether the request was sent with <code>Accept-Encoding: gzip</code>.</li>
  </ul>
</aside>
```

**Use when:** Long-form articles, 1–3 per piece. Sidebar list interruption to the main narrative.

---

##### ds-decision-list (Organism, part of Editorial primitives)

Hairline-row table: numbered rank + uppercase kicker + body explanation. Documents a reasoning chain ("we chose X over Y because Z").

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<ol class="ds-decision-list ds-decision-list--dark">
  <li class="ds-decision-list__row">
    <span class="ds-decision-list__rank">01</span>
    <span class="ds-decision-list__kicker">Structural layer</span>
    <span class="ds-decision-list__body">Move heavy artifacts to S3 + return a presigned URL — keep the Lambda response under 1 MB.</span>
  </li>
  <li class="ds-decision-list__row">
    <span class="ds-decision-list__rank">02</span>
    <span class="ds-decision-list__kicker">Tactical layer</span>
    <span class="ds-decision-list__body">Compress in the app when inline JSON must be returned — don't trust API Gateway.</span>
  </li>
</ol>
```

**Use when:** Long-form articles, 0–1 per piece. Ranked reasoning chain that should scan, not just read.

---

#### Code & lists (4)

##### ds-code-block (Organism)

Multi-line code sample with runtime switcher up top, copy button on the right, code body in the middle, optional status bar at bottom. Dark by convention (IDE surface).

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<div class="ds-code-block ds-code-block--dark">
  <div class="ds-code-block__head">
    <div role="tablist" aria-label="Runtime">
      <div class="ds-code-tab-pills ds-code-tab-pills--dark">
        <button class="ds-code-tab-pills__btn is-selected" role="tab" aria-selected="true">npx</button>
        <button class="ds-code-tab-pills__btn" role="tab" aria-selected="false">pip</button>
        <button class="ds-code-tab-pills__btn" role="tab" aria-selected="false">typescript</button>
      </div>
    </div>
    <button class="ds-code-block__copy" type="button">Copy</button>
  </div>
  <pre class="ds-code-block__body">npx videodb init my-project
cd my-project && npm install
videodb index ./samples/clip.mp4
videodb query "shot 12 · skyline · golden hour"</pre>
  <div class="ds-code-block__status"><span class="ds-status-pulse__dot"></span><span class="ds-eyebrow ds-eyebrow--xs">Live · 120ms · v2.4.0</span></div>
</div>
```

**Use when:** Quickstart pages, hero (Variant B — Centered with code), use-case row, anywhere multi-line SDK calls show. Status bar optional. Copy button swaps to "Copied" for 1.2s on success.

---

##### ds-code-annotation (Organism, "Code annotation chips")

Orange-tinted chips pinned next to specific lines of a Code block. Used to call out "← this is the new bit" markers — streaming line, async boundary, latency landmark. 2-column grid with code on the left, flex-column rail on the right.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<div class="ds-code-annotation ds-code-annotation--dark">
  <div class="ds-code-block ds-code-block--dark">
    <div class="ds-code-block__head"><div role="tablist"><div class="ds-code-tab-pills ds-code-tab-pills--dark"><button class="ds-code-tab-pills__btn is-selected" role="tab">python</button></div></div><button class="ds-code-block__copy">Copy</button></div>
    <pre class="ds-code-block__body">collection = videodb.connect()
video = collection.upload(url)

stream = video.index_stream()
result = video.query("shot 12")</pre>
  </div>
  <div class="ds-code-annotation__rail">
    <span class="ds-code-annotation__chip" style="margin-top: 100px;">
      <span class="ds-status-pulse__dot ds-code-annotation__chip-dot"></span>Streaming
    </span>
    <span class="ds-code-annotation__chip" style="margin-top: 20px;">
      <span class="ds-status-pulse__dot ds-code-annotation__chip-dot"></span>Indexing · 12s
    </span>
  </div>
</div>
```

**Use when:** Quickstart docs, deep-dive pages where specific lines need a callout. One chip per concept; vertical alignment via `margin-top` per chip. Below 640px the rail wraps inline.

---

##### ds-entry-row (Organism)

Editorial list-row pattern — alternative to a card grid when an index should feel like a list of articles rather than a stage of cards. Kicker meta + title + excerpt left, arrow right. Hover lifts title to orange + translates arrow 4px right.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<ul class="ds-entry-row-list">
  <li><a class="ds-entry-row ds-entry-row--dark" href="#">
    <div class="ds-entry-row__inner">
      <span class="ds-eyebrow ds-eyebrow--on-dark">Field note · Apr 20, 2026 · 2 min</span>
      <h3 class="ds-entry-row__title">The hidden 6 MB Lambda trap: compression and payload limits</h3>
      <p class="ds-entry-row__excerpt">When Postman lies and AWS rejects — a story about boundary measurement.</p>
    </div>
    <span class="ds-entry-row__arrow">→</span>
  </a></li>
</ul>
```

**Use when:** Labs / Engineering / Blog index pages with 20+ entries where a card grid would feel overwhelming. Title at 22px (same scale as Content card title).

---

##### ds-faq (Organism, "FAQ row")

Native `<details>` Q+A using semantic disclosure rather than custom JS. The summary is the question, the body is the answer. Toggle indicator: 32×32 circle with `+`/`−` rendered via pseudo-elements that rotate on `:open`.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `open` attribute for first row

**HTML:**
```html
<div class="ds-faq ds-faq--dark">
  <details class="ds-faq__row" open>
    <summary>How does VideoDB index footage?<span class="ds-faq__toggle"></span></summary>
    <div class="ds-faq__body">Multimodal embeddings + scene-cut detection + transcripts, all aligned to a single timeline. Each visual object and spoken word becomes a row an agent can query.</div>
  </details>
  <details class="ds-faq__row">
    <summary>What's the storage and bandwidth model?<span class="ds-faq__toggle"></span></summary>
    <div class="ds-faq__body">You pay only for hours indexed and bandwidth streamed — there's no per-second storage tax.</div>
  </details>
</div>
```

**Use when:** Pricing pages, support pages, anywhere structured Q+A. Use native `<details>` — don't reimplement as accordions.

---

#### Media (2)

##### ds-playlist-card (Organism)

Two patterns for the same content unit. **Row** = horizontal queue / sidebar / "Up next" layout (thumb left, body middle, arrow right). **Tile** = index-grid layout (thumb on top, title below) — 3–4 per row in `.ds-playlist-grid`.

**Variants/modifiers:**
- `--dark` / `--light` per part class
- `.ds-playlist-row` (horizontal queue) vs `.ds-playlist-tile` (grid)

**HTML (Row variant):**
```html
<a class="ds-playlist-row ds-playlist-row--dark" href="#">
  <div class="ds-playlist-row__thumb">
    <span class="ds-playlist-row__play"><iconify-icon icon="solar:play-bold" width="18" height="18"></iconify-icon></span>
    <span class="ds-playlist-row__duration">12:48</span>
  </div>
  <div class="ds-playlist-row__body">
    <h3 class="ds-playlist-row__title">Building agentic editing pipelines with Director</h3>
    <span class="ds-eyebrow ds-eyebrow--on-dark ds-eyebrow--loose">Tutorial · Episode 03 · May 8, 2026</span>
  </div>
  <span class="ds-playlist-row__arrow">→</span>
</a>
```

**HTML (Tile variant):**
```html
<div class="ds-playlist-grid">
  <a class="ds-playlist-tile ds-playlist-tile--dark" href="#">
    <div class="ds-playlist-tile__thumb">
      <span class="ds-playlist-tile__play"><iconify-icon icon="solar:play-bold" width="22" height="22"></iconify-icon></span>
      <span class="ds-playlist-tile__count"><iconify-icon icon="solar:videocamera-record-linear" width="12" height="12"></iconify-icon> 6 videos</span>
    </div>
    <h3 class="ds-playlist-tile__title">VideoDB Skills · Video Processing Tools</h3>
  </a>
</div>
```

**Use when:** Row for queues inside a video page ("Up next"). Tile for Skills / All-tutorials index pages. Don't mix the two on the same page.

---

##### ds-video-embed (Organism)

Aspect-ratio-locked container for an inline video player. The iframe handles all player chrome; this organism contributes only the 16:9 surface, 16px radius, charcoal background, optional caption strip below.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- Optional `.ds-video-caption` below

**HTML:**
```html
<div class="ds-video-embed ds-video-embed--dark">
  <div class="ds-video-embed__placeholder">
    <span class="ds-video-embed__play"><iconify-icon icon="solar:play-bold" width="28" height="28"></iconify-icon></span>
  </div>
</div>
<div class="ds-video-caption ds-video-caption--dark">
  <span>Demo · Building a query agent</span>
  <span>02:18</span>
</div>
```

**Use when:** Inline video inside articles. In production, swap the placeholder for `<iframe src="https://player.videodb.io/embed?v=…">`. Max-width 960px.

---

#### Social proof (3)

##### ds-logo-wall (Organism, "Customer wall")

Static grid of customer logos. No animation by design — "we ship for these teams" reads as permanence. Cells share a hairline 1px gap so the wall reads as one surface. Ticker variant uses `.ds-marquee` primitive.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- Variant A: `.ds-logo-wall` grid; Variant B: `.ds-metrics-ticker` wrapping `.ds-marquee` with logos

**HTML (Variant A — Grid):**
```html
<div class="ds-logo-wall ds-logo-wall--dark">
  <div class="ds-logo-wall__cell"><img loading="lazy" src="assets/customer-logos/hoichoi.png" alt="Hoichoi"></div>
  <div class="ds-logo-wall__cell"><img loading="lazy" src="assets/customer-logos/svf.png" alt="SVF"></div>
  <div class="ds-logo-wall__cell"><img loading="lazy" src="assets/customer-logos/art-of-living.png" alt="Art of Living"></div>
  <div class="ds-logo-wall__cell"><img loading="lazy" src="assets/customer-logos/clario.png" alt="Clario"></div>
  <!-- 6–12 cells total -->
</div>
```

**HTML (Variant B — Ticker, with `.ds-marquee`):**
```html
<div class="ds-metrics-ticker ds-metrics-ticker--dark">
  <div class="ds-marquee">
    <div class="ds-marquee__track" style="--ds-marquee-duration: 60s;">
      <img class="ds-logo-img" src="assets/customer-logos/hoichoi.png" alt="Hoichoi">
      <img class="ds-logo-img" src="assets/customer-logos/svf.png" alt="SVF">
      <!-- duplicate every item with aria-hidden="true" for the loop -->
      <img class="ds-logo-img" aria-hidden="true" src="assets/customer-logos/hoichoi.png" alt="">
      <img class="ds-logo-img" aria-hidden="true" src="assets/customer-logos/svf.png" alt="">
    </div>
  </div>
</div>
```

**Use when:** Grid for the trust fold above the headline (permanence). Ticker for slim mid-page bands (liveness). 6–12 logos total. Don't use both on the same surface.

---

##### ds-metrics-ticker (Organism)

Horizontal marquee of uppercase-mono key facts. Live indicators reuse `.ds-status-pulse__dot`. Items pause on hover + auto-pause when scrolled offscreen via IntersectionObserver. Built on the shared `.ds-marquee` primitive.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--ds-marquee-duration` custom prop (loop time)

**HTML:**
```html
<div class="ds-metrics-ticker ds-metrics-ticker--dark">
  <div class="ds-marquee">
    <div class="ds-marquee__track" style="--ds-marquee-duration: 60s;">
      <span class="ds-metrics-ticker__item"><span class="ds-status-pulse__dot"></span>Live · 2.4M hours indexed</span>
      <span class="ds-metrics-ticker__item">120ms median query</span>
      <span class="ds-metrics-ticker__item">38 SDK methods</span>
      <span class="ds-metrics-ticker__item">OSS · MIT licensed</span>
      <!-- duplicate set with aria-hidden="true" for the seamless loop -->
      <span class="ds-metrics-ticker__item" aria-hidden="true"><span class="ds-status-pulse__dot"></span>Live · 2.4M hours indexed</span>
      <span class="ds-metrics-ticker__item" aria-hidden="true">120ms median query</span>
      <span class="ds-metrics-ticker__item" aria-hidden="true">38 SDK methods</span>
      <span class="ds-metrics-ticker__item" aria-hidden="true">OSS · MIT licensed</span>
    </div>
  </div>
</div>
```

**Use when:** Slim trust-bands between sections. Each item is one atomic fact — no paragraphs. One Live dot per ticker max.

---

##### ds-testimonials-ticker (Organism)

Three patterns for social proof. **A: Single-row ticker** (slim marquee — avatar + name + quote scrolling). **B: Card grid** (static 3-column rich cards with platform icon + engagement meta). **C: Two-row ticker** (rich cards in two opposite-direction rows that slow to 18% on hover via WAAPI `playbackRate`).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--ds-marquee-duration` (loop time, e.g. 90s)

**HTML (Variant B — Card grid):**
```html
<div class="ds-testimonial-grid">
  <article class="ds-testimonial-card ds-testimonial-card--dark">
    <div class="ds-testimonial-card__head">
      <div class="ds-testimonial-card__avatar">RG</div>
      <div class="ds-testimonial-card__author">
        <span class="ds-testimonial-card__name">Rohit Garg</span>
        <span class="ds-testimonial-card__handle">@rohitg · 3d</span>
      </div>
      <iconify-icon class="ds-testimonial-card__platform" icon="ri:twitter-x-line" width="16" height="16"></iconify-icon>
    </div>
    <p class="ds-testimonial-card__body">VideoDB replaced four separate tools in our stack. Production deployment took an afternoon.</p>
    <div class="ds-testimonial-card__meta">
      <span class="ds-testimonial-card__meta-item"><iconify-icon icon="solar:heart-linear" width="14" height="14"></iconify-icon> 124</span>
      <span class="ds-testimonial-card__meta-item"><iconify-icon icon="solar:chat-round-linear" width="14" height="14"></iconify-icon> 18</span>
      <span class="ds-testimonial-card__meta-item"><iconify-icon icon="solar:repeat-linear" width="14" height="14"></iconify-icon> 42</span>
    </div>
  </article>
  <!-- repeat for 6 cards total -->
</div>
```

**Use when:** Single-row for slim trust-bands. Card grid for dedicated testimonials folds (6 cards, scannable). Two-row for kinetic "lots of voices" treatment. Whole card can wrap in `<a>` to link to the source post. Engagement meta only if numbers are real.

---

#### Interactive (5)

##### ds-modal (Organism)

Generic dialog with backdrop blur + lift shadow. Three layers: backdrop (full-viewport blur + dim), dialog box (charcoal/white, 16px radius), close affordance (white circle below the modal). Three intent variants — Action (decision), Info (acknowledge), Form (input).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- Intent: Action / Info / Form (composition difference, not class)

**HTML (Action variant):**
```html
<article class="ds-modal ds-modal--dark" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <h3 id="m-title" class="ds-modal__title">Switch workspace?</h3>
  <p class="ds-modal__lead">You'll exit the current indexing session. Any pending uploads will continue in the background.</p>
  <div class="ds-modal__actions">
    <button class="ds-btn ds-btn--ghost-charcoal" type="button">Cancel</button>
    <button class="ds-btn ds-btn--primary" type="button">Switch</button>
  </div>
</article>
```

**Use when:** Action for irreversible decisions. Info for release notes / disclosures (single dismiss button). Form for invite-team / request-access flows. Production: `position: fixed; inset: 0`, body-scroll-lock on open, first input focused ~100ms after open, focus returns to trigger on close.

---

##### ds-carousel (Organism)

Manual prev/next scroller with CSS scroll-snap. Slides snap to start-align so the user always sees full slides. Prev/next buttons disable when the viewport hits either edge.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `data-ds-carousel`, `data-ds-carousel-prev`, `data-ds-carousel-next` for JS

**HTML:**
```html
<div class="ds-carousel ds-carousel--dark" data-ds-carousel>
  <div class="ds-carousel__header">
    <h3 class="ds-carousel__title">Release notes</h3>
    <div class="ds-carousel__controls">
      <button class="ds-carousel__btn" type="button" data-ds-carousel-prev aria-label="Previous"><iconify-icon icon="solar:arrow-left-linear" width="14" height="14"></iconify-icon></button>
      <button class="ds-carousel__btn" type="button" data-ds-carousel-next aria-label="Next"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>
    </div>
  </div>
  <div class="ds-carousel__viewport">
    <div class="ds-carousel__track">
      <article class="ds-carousel__slide"><span class="ds-carousel__slide-meta">May 2026</span><h4 class="ds-carousel__slide-title">RTStream beta</h4><p>Live agent-controlled playback. Sub-second latency.</p></article>
      <article class="ds-carousel__slide"><span class="ds-carousel__slide-meta">Apr 2026</span><h4 class="ds-carousel__slide-title">Director v2</h4><p>Agent framework rewritten — compose in 50 lines.</p></article>
    </div>
  </div>
</div>
```

**Use when:** Release notes / changelog entries / project highlights — finite sets where the user picks one item at a time.

---

##### ds-tooltip (Organism)

Hover / focus-within inline disclosure. Trigger word carries a dashed underline + `cursor: help`; hovering reveals a positioned tooltip 10px above. Pure CSS, no JS.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<p>Hover the dotted phrase to see <span class="ds-tooltip ds-tooltip--dark"><button class="ds-tooltip__trigger" type="button">RTStream</button><span class="ds-tooltip__content" role="tooltip">Live agent-controlled playback over a video index. Sub-second latency.</span></span> in action.</p>
```

**Use when:** Inline term definitions inside body copy. For definition, not action — never hide an action behind a tooltip. Trigger must be a real `<button>` so keyboard users can `:focus-within` reveal it.

---

##### ds-nav-dropdown (Organism)

Hover-driven mega-menu. Menubar = row of pill-on-hover triggers; each one with a submenu fades in a multi-column panel below it (bordered icon tiles + label + description per row). JS adds `.is-open` on mouseenter/focus, closes via 120ms grace timer.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `data-ds-nav-dropdown` on the nav, `data-ds-nav-dropdown-item` on each item

**HTML:**
```html
<nav class="ds-nav-dropdown ds-nav-dropdown--dark" data-ds-nav-dropdown aria-label="Primary">
  <ul class="ds-nav-dropdown__bar" role="menubar">
    <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none">
      <button class="ds-nav-dropdown__trigger" type="button" role="menuitem" aria-haspopup="true" aria-expanded="false">
        <span>Platform</span>
        <iconify-icon class="ds-nav-dropdown__chevron" icon="solar:alt-arrow-down-linear" width="14" height="14"></iconify-icon>
      </button>
      <div class="ds-nav-dropdown__panel" role="menu">
        <div class="ds-nav-dropdown__columns">
          <div class="ds-nav-dropdown__column">
            <h3 class="ds-nav-dropdown__column-title">Build</h3>
            <ul class="ds-nav-dropdown__list">
              <li><a class="ds-nav-dropdown__link" href="#" role="menuitem">
                <span class="ds-nav-dropdown__link-icon"><iconify-icon icon="solar:cloud-upload-linear" width="18" height="18"></iconify-icon></span>
                <span class="ds-nav-dropdown__link-body">
                  <span class="ds-nav-dropdown__link-label">Ingest</span>
                  <span class="ds-nav-dropdown__link-desc">Upload, capture, stream</span>
                </span>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </li>
    <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none">
      <a class="ds-nav-dropdown__trigger" href="#" role="menuitem">Developers</a>
    </li>
  </ul>
</nav>
```

**Use when:** Inside the Site header for primary navigation. Items without submenus render as plain pill links. Mega-menu for items with rich IA.

---

##### ds-tabs (Organism)

Pill-shaped tab group with orange-on-active. Distinct from `.ds-pill-tab` (white-on-charcoal, used for runtime / chrome switching) — `.ds-tabs` uses orange because the choice is focal, not filter-like.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `is-selected` per trigger; `hidden` attr on inactive panels

**HTML:**
```html
<div data-ds-tabs-root>
  <div class="ds-tabgroup ds-tabgroup--dark" data-ds-tabs role="tablist" aria-label="Sections">
    <button class="ds-tabgroup__trigger is-selected" type="button" role="tab" aria-selected="true" data-target="ov">Overview</button>
    <button class="ds-tabgroup__trigger" type="button" role="tab" aria-selected="false" data-target="pr">Pricing</button>
    <button class="ds-tabgroup__trigger" type="button" role="tab" aria-selected="false" data-target="fa">FAQ</button>
  </div>
  <div class="ds-tabgroup-panel ds-tabgroup-panel--dark" role="tabpanel" data-ds-tabs-panel="ov">Six primitives compose into agent-shaped behaviours.</div>
  <div class="ds-tabgroup-panel ds-tabgroup-panel--dark" role="tabpanel" data-ds-tabs-panel="pr" hidden>Usage-based pricing: pay only for hours indexed.</div>
  <div class="ds-tabgroup-panel ds-tabgroup-panel--dark" role="tabpanel" data-ds-tabs-panel="fa" hidden>Common questions — bring-your-own-models, regions, SLA tiers.</div>
</div>
```

**Use when:** Section-level switchers where the user makes a meaningful choice between sections. 3–5 tabs. Arrow-key nav built in.

---

#### Page sections (2)

##### ds-cta-band (Organism, "Closing CTA band")

The "Get started" band that closes every marketing page. Display heading + lead + CTA pair. Two surface variants (Neutral / Tinted), plus a Stat-overlay composition for proof-driven moments.

**Variants/modifiers:**
- `--dark` / `--light` (surface, Neutral)
- `--tinted-dark` / `--tinted-light` (brand-orange gradient bg, for highest-intent)
- `.ds-cta-band__stat-row` (optional stat overlay)

**HTML (Neutral):**
```html
<div class="ds-cta-band ds-cta-band--dark">
  <div class="ds-cta-band__inner">
    <span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs">Get started</span>
    <h2 class="ds-cta-band__title">Build agents that watch.</h2>
    <p class="ds-cta-band__lead">Free tier covers your first 10 hours. No credit card. Director, CaptureSDK, and the MCP server are all open source.</p>
    <div class="ds-cta-band__actions">
      <div class="ds-cta-pair">
        <a class="ds-btn ds-btn--primary" href="#">Get API key</a>
        <a class="ds-btn ds-btn--ghost-dark" href="#">Read the docs</a>
      </div>
    </div>
  </div>
</div>
```

**HTML (With stat overlay):**
```html
<div class="ds-cta-band ds-cta-band--dark">
  <div class="ds-cta-band__inner">
    <h2 class="ds-cta-band__title">Built for production from day one.</h2>
    <div class="ds-cta-band__stat-row">
      <div class="ds-stat ds-stat--dark"><span class="ds-stat__value ds-stat__value--orange">4.2B</span><span class="ds-stat__label">queries served</span></div>
      <div class="ds-stat ds-stat--dark"><span class="ds-stat__value">99.99%</span><span class="ds-stat__label">SLA uptime</span></div>
      <div class="ds-stat ds-stat--dark"><span class="ds-stat__value">3,400+</span><span class="ds-stat__label">developers</span></div>
    </div>
    <div class="ds-cta-band__actions"><div class="ds-cta-pair"><a class="ds-btn ds-btn--primary" href="#">Get API key</a><a class="ds-btn ds-btn--ghost-dark" href="#">See pricing</a></div></div>
  </div>
</div>
```

**Use when:** Closing band at the bottom of every marketing page. One per page. Neutral by default; Tinted for Pricing / Enterprise pages. Stat overlay only with real numbers.

---

##### ds-compare-table (Organism, "Comparison table")

Feature × tier matrix. First column = feature name, subsequent columns = tiers. Cell content = text values, iconify check / em-dash for booleans, or short value strings. Row groups break long matrices into sections.

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `is-highlight` on a column header + each cell in that column (one focal tier max)
- `.ds-compare-table__row-group` for section headers

**HTML:**
```html
<div class="ds-compare-wrap ds-compare-wrap--dark">
  <table class="ds-compare-table ds-compare-table--dark">
    <thead>
      <tr>
        <th scope="col">Feature</th>
        <th scope="col">Free<span class="ds-compare-table__col-price">$0 / mo</span></th>
        <th scope="col" class="is-highlight">Pro<span class="ds-compare-table__col-price">$49 / mo</span></th>
        <th scope="col">Enterprise<span class="ds-compare-table__col-price">Custom</span></th>
      </tr>
    </thead>
    <tbody>
      <tr class="ds-compare-table__row-group"><td colspan="4">Indexing</td></tr>
      <tr><td>Hours indexed / month</td><td>10</td><td class="is-highlight">500</td><td>Unlimited</td></tr>
      <tr><td>Custom embedding models</td><td><span class="ds-compare-table__dash">—</span></td><td class="is-highlight"><iconify-icon class="ds-compare-table__check" icon="solar:check-circle-bold" width="18" height="18"></iconify-icon></td><td><iconify-icon class="ds-compare-table__check" icon="solar:check-circle-bold" width="18" height="18"></iconify-icon></td></tr>
    </tbody>
  </table>
</div>
```

**Use when:** Pricing pages, feature-comparison pages. One highlighted column max. Row groups when 8+ rows. Check / em-dash, not Yes/No. Show real values, not "Limited". Horizontal scrolls on narrow viewports.

---

#### Repo & chrome (5)

##### ds-announcement (Organism, "Announcement bar")

Top-of-page chrome strip. Eyebrow + body text + optional inline CTA link + close button. Three variants: Neutral (quiet, ongoing notes), Orange (loud, product launches / events), and minimal (no CTA, status messages).

**Variants/modifiers:**
- `--dark` / `--light` (Neutral)
- `--orange` (launch / event)
- Optional `.ds-announcement__cta` link
- Always carries `.ds-announcement__close`

**HTML:**
```html
<div class="ds-announcement ds-announcement--dark" role="region" aria-label="Announcement">
  <span class="ds-announcement__eyebrow">V2.4</span>
  <span class="ds-announcement__text">RTStream is now generally available.</span>
  <a class="ds-announcement__cta" href="#">Read the announcement <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></a>
  <button class="ds-announcement__close" type="button" aria-label="Dismiss"><iconify-icon icon="solar:close-circle-linear" width="16" height="16"></iconify-icon></button>
</div>

<div class="ds-announcement ds-announcement--orange" role="region" aria-label="Announcement">
  <span class="ds-announcement__eyebrow">Oct 15 · SF</span>
  <span class="ds-announcement__text">Join us at AI Engineer Summit — talks, demos, and free credits.</span>
  <a class="ds-announcement__cta" href="#">Reserve a seat <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></a>
  <button class="ds-announcement__close" type="button" aria-label="Dismiss"><iconify-icon icon="solar:close-circle-linear" width="16" height="16"></iconify-icon></button>
</div>
```

**Use when:** Above the site header. One announcement at a time. Neutral for ongoing notes, Orange for time-bound launches. Close button is non-negotiable; production stores dismissed-bar ID in localStorage.

---

##### ds-header-nav (Organism, "Site header")

The top chrome bar of every public page. Brand wordmark left + `.ds-nav-dropdown` centre + utility actions right (Sign in ghost + primary "Get API key" using `.ds-btn--sm`). Backdrop-blurred 80% chrome plate. Below 1024px the centre + sign-in fold into a hamburger.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<header class="ds-header-nav ds-header-nav--dark">
  <div class="ds-header-nav__inner">
    <a class="ds-header-nav__brand" href="#" aria-label="VideoDB home">
      <img class="ds-header-nav__wordmark" src="assets/logos/wordmark-dark.png" alt="VideoDB" loading="lazy">
    </a>
    <div class="ds-header-nav__center">
      <nav class="ds-nav-dropdown ds-nav-dropdown--dark" data-ds-nav-dropdown aria-label="Primary">
        <ul class="ds-nav-dropdown__bar" role="menubar">
          <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none">
            <button class="ds-nav-dropdown__trigger" type="button" role="menuitem" aria-haspopup="true" aria-expanded="false">
              <span>Platform</span>
              <iconify-icon class="ds-nav-dropdown__chevron" icon="solar:alt-arrow-down-linear" width="14" height="14"></iconify-icon>
            </button>
            <!-- panel here -->
          </li>
          <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none"><a class="ds-nav-dropdown__trigger" href="#" role="menuitem">Developers</a></li>
          <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none"><a class="ds-nav-dropdown__trigger" href="#" role="menuitem">Pricing</a></li>
          <li class="ds-nav-dropdown__item" data-ds-nav-dropdown-item role="none"><a class="ds-nav-dropdown__trigger" href="#" role="menuitem">Customers</a></li>
        </ul>
      </nav>
    </div>
    <div class="ds-header-nav__actions">
      <a class="ds-header-nav__signin" href="#">Sign in</a>
      <a class="ds-btn ds-btn--primary ds-btn--sm" href="#">Get API key</a>
      <button class="ds-header-nav__menu-trigger" type="button" aria-label="Open menu"><iconify-icon icon="solar:hamburger-menu-linear" width="18" height="18"></iconify-icon></button>
    </div>
  </div>
</header>
```

**Use when:** Top of every page. Production: `position: fixed; top: 0; z-index: var(--z-overlay)`. One primary CTA, one ghost. Announcement bar sits above the header when both are stacked. The hamburger trigger is paired with `ds-mobile-drawer` below 1024px (see next entry).

---

##### ds-mobile-drawer (Organism, "Mobile drawer")

Full-height slide-in panel that takes over from `ds-nav-dropdown` below 1024px. Mirrors the desktop nav structure (top-level links + Solutions accordion + CTA pair). Slides in from the right, scrim behind, sticky CTAs at the bottom. Always paired one-to-one with the site header's hamburger trigger.

**Variants/modifiers:**
- `--dark` / `--light` (surface — match the site header's variant)
- `.is-open` state (added by `initMobileDrawers()` on trigger click)
- `[hidden]` on `.ds-mobile-drawer__sub-list` for collapsed accordion sections; `.is-expanded` on `.ds-mobile-drawer__section-trigger` rotates the chevron

**Behaviour:** slides 220ms `var(--ease-ui)`. Scrim fades 200ms. Closes on scrim click, close button, escape key, or any nav link click. Body scroll locked while open. Focus moves to close button on open; focus restored to trigger on close. Tab/Shift+Tab traps inside the panel. `prefers-reduced-motion: reduce` disables animations and renders instant.

**HTML:**
```html
<div class="ds-mobile-drawer ds-mobile-drawer--dark" id="mobile-drawer"
     role="dialog" aria-modal="true" aria-label="Site navigation"
     aria-hidden="true" data-ds-mobile-drawer>
  <div class="ds-mobile-drawer__scrim" data-ds-mobile-drawer-close></div>
  <div class="ds-mobile-drawer__panel">
    <div class="ds-mobile-drawer__header">
      <a class="ds-mobile-drawer__brand" href="#" aria-label="VideoDB home">
        <img src="assets/logos/wordmark-dark.png" alt="VideoDB" width="100">
      </a>
      <button class="ds-mobile-drawer__close" type="button" aria-label="Close menu" data-ds-mobile-drawer-close>
        <iconify-icon icon="solar:close-circle-linear" width="20" height="20"></iconify-icon>
      </button>
    </div>
    <nav class="ds-mobile-drawer__nav" aria-label="Primary">
      <a class="ds-mobile-drawer__item ds-mobile-drawer__link" href="#platform">Platform</a>
      <div class="ds-mobile-drawer__section" data-ds-mobile-drawer-section>
        <button class="ds-mobile-drawer__section-trigger" type="button" aria-expanded="false">
          <span>Solutions</span>
          <iconify-icon class="ds-mobile-drawer__chevron" icon="solar:alt-arrow-down-linear" width="14" height="14"></iconify-icon>
        </button>
        <ul class="ds-mobile-drawer__sub-list" hidden>
          <li><a class="ds-mobile-drawer__sub-item" href="#solutions">
            <span class="ds-mobile-drawer__sub-icon"><iconify-icon icon="solar:eye-linear" width="18" height="18"></iconify-icon></span>
            <span class="ds-mobile-drawer__sub-body">
              <span class="ds-mobile-drawer__sub-label">Agentic Perception</span>
              <span class="ds-mobile-drawer__sub-desc">Eyes, ears, memory for agents</span>
            </span>
          </a></li>
          <!-- 3 more sub-items: Real-time Monitoring, Programmable Media, World Model Data -->
        </ul>
      </div>
      <a class="ds-mobile-drawer__item ds-mobile-drawer__link" href="#developers">Developers</a>
      <a class="ds-mobile-drawer__item ds-mobile-drawer__link" href="#company">Company</a>
      <a class="ds-mobile-drawer__item ds-mobile-drawer__link" href="#docs">Docs</a>
    </nav>
    <div class="ds-mobile-drawer__actions">
      <a class="ds-btn ds-btn--ghost-dark" href="#contact">Talk to us</a>
      <a class="ds-btn ds-btn--primary" href="#start">Start building</a>
    </div>
  </div>
</div>
```

**Trigger wiring (in the site header):**

```html
<button class="ds-header-nav__menu-trigger" type="button"
        aria-label="Open menu" aria-controls="mobile-drawer"
        aria-expanded="false" data-ds-mobile-drawer-open>
  <iconify-icon icon="solar:hamburger-menu-linear" width="18" height="18"></iconify-icon>
</button>
```

**Placement in the page:** drop the drawer markup between `</header>` and `<main>`. The `initMobileDrawers()` boot routine wires every `[data-ds-mobile-drawer-open]` trigger to its `aria-controls`'d drawer.

**Use when:** Always — every public page should ship one. Below 1024px only (CSS hides it above). One drawer per page. Don't nest accordions deeper than one level. CTA pair at the bottom is sticky and always visible above the fold of the drawer.

---

##### ds-repo-card (Organism)

Open-source repo card — Director, CaptureSDK, MCP Server. Two variants: **Compact** (icon + slug + description + meta strip for grids of 3+) and **Prominent** (GitHub badge + "Open repo ↗" CTA + org/name + description + stats footer for featured 2-up). Whole card wraps in `<a>` (anywhere-click).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--prominent` (featured variant)
- Lang colour dots follow GitHub convention (Python `#3776AB`, JS `#F7DF1E`, TS `#007ACC`)

**HTML (Compact):**
```html
<div class="ds-repo-grid">
  <a class="ds-repo-card ds-repo-card--dark" href="#">
    <div class="ds-repo-card__head">
      <span class="ds-repo-card__icon"><iconify-icon icon="solar:code-square-linear" width="18" height="18"></iconify-icon></span>
      <span class="ds-repo-card__slug">video-db/director</span>
    </div>
    <p class="ds-repo-card__desc">Orchestration runtime — compose primitives into agent-shaped behaviours.</p>
    <div class="ds-repo-card__meta">
      <span><iconify-icon icon="solar:star-linear" width="12" height="12"></iconify-icon> 4.2k</span>
      <span><span class="ds-repo-card__lang-dot" style="background: #3776AB;"></span>Python</span>
      <span>2h ago</span>
    </div>
  </a>
</div>
```

**HTML (Prominent):**
```html
<a class="ds-repo-card ds-repo-card--dark ds-repo-card--prominent" href="#">
  <div class="ds-repo-card__head">
    <span class="ds-repo-card__github"><iconify-icon icon="ri:github-fill" width="20" height="20"></iconify-icon></span>
    <span class="ds-repo-card__cta">Open repo <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon></span>
  </div>
  <h3 class="ds-repo-card__name"><span class="ds-repo-card__org">videodb /</span> videodb-python</h3>
  <p class="ds-repo-card__desc">Official Python SDK. Ingest, index, search, and stream video with one client.</p>
  <div class="ds-repo-card__stats">
    <span class="ds-repo-card__stat"><span class="ds-repo-card__stat-dot"></span> Python</span>
    <span class="ds-repo-card__stat"><iconify-icon icon="solar:star-linear" width="14" height="14"></iconify-icon> 1.2k</span>
    <span class="ds-repo-card__stat"><iconify-icon icon="solar:branching-paths-down-linear" width="14" height="14"></iconify-icon> 142</span>
  </div>
</a>
```

**Use when:** Compact for grids of 3+ in an open-source section. Prominent for featured 2-up on a homepage / agents page.

---

##### ds-footer (Organism)

Site footer. Two variants — **Directory** (4-column nav grid + legal strip + compliance band; default for product / IA pages) and **Editorial** (eyebrow tagline + huge display prelude + nav grid + compact compliance pills + status-pulse indicator; brand-statement closer for landing / manifesto pages).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `--editorial` (Variant B — adds prelude + compliance row + status pulse)

**HTML (Directory — Variant A):**
```html
<footer class="ds-footer ds-footer--dark">
  <div class="ds-footer__inner">
    <div class="ds-footer__top">
      <div class="ds-footer__brand-block">
        <img class="ds-footer__wordmark-img" src="assets/logos/wordmark-dark.png" alt="VideoDB" loading="lazy">
        <span class="ds-footer__tagline">Data infrastructure for video, built for machines and agents.</span>
      </div>
      <div class="ds-footer__nav-grid">
        <div class="ds-footer__nav-col">
          <h3 class="ds-footer__nav-title">Product</h3>
          <ul class="ds-footer__nav-list">
            <li><a class="ds-footer__nav-link" href="#">Platform</a></li>
            <li><a class="ds-footer__nav-link" href="#">Pricing</a></li>
          </ul>
        </div>
        <!-- 3 more columns: Developers, Company, Legal -->
      </div>
    </div>
    <div class="ds-footer__legal">
      <span>© 2026 VideoDB · videodb.io</span>
      <div class="ds-footer__legal-links">
        <a class="ds-footer__legal-link" href="#">Terms</a>
        <a class="ds-footer__legal-link" href="#">Privacy</a>
      </div>
      <div class="ds-footer__socials">
        <a class="ds-footer__social" href="#" aria-label="X"><iconify-icon icon="ri:twitter-x-line" width="14" height="14"></iconify-icon></a>
        <a class="ds-footer__social" href="#" aria-label="GitHub"><iconify-icon icon="ri:github-fill" width="14" height="14"></iconify-icon></a>
      </div>
    </div>
    <div class="ds-footer__compliance">
      <span class="ds-footer__compliance-label">Compliance</span>
      <img loading="lazy" src="assets/compliance-logos/soc2-logo-dark-bg.png" alt="SOC 2">
      <img loading="lazy" src="assets/compliance-logos/gdpr-logo-dark-bg.png" alt="GDPR">
      <img loading="lazy" src="assets/compliance-logos/hipaa-logo-dark-bg.png" alt="HIPAA">
      <img loading="lazy" src="assets/compliance-logos/iso-logo-dark-bg.png" alt="ISO 27001">
    </div>
  </div>
</footer>
```

**HTML (Editorial — Variant B, key extras):**
```html
<footer class="ds-footer ds-footer--dark ds-footer--editorial">
  <div class="ds-footer__inner">
    <div class="ds-footer__prelude">
      <p class="ds-footer__prelude-line">To see is to know.</p>
    </div>
    <div class="ds-footer__top"><!-- brand-block + nav-grid as above --></div>
    <div class="ds-footer__bottom">
      <div class="ds-footer__bottom-left">
        <div class="ds-footer__compliance-row" aria-label="Compliance">
          <img loading="lazy" src="assets/compliance-logos/soc2-logo-dark-bg.png" alt="SOC 2">
          <img loading="lazy" src="assets/compliance-logos/gdpr-logo-dark-bg.png" alt="GDPR">
        </div>
        <span>© Copyright VideoDB 2026. All Rights Reserved.</span>
      </div>
      <div class="ds-footer__bottom-right">
        <div class="ds-footer__socials--inline">
          <a class="ds-footer__social--inline" href="#" aria-label="LinkedIn"><iconify-icon icon="ri:linkedin-fill" width="16" height="16"></iconify-icon></a>
          <a class="ds-footer__social--inline" href="#" aria-label="X"><iconify-icon icon="ri:twitter-x-line" width="16" height="16"></iconify-icon></a>
        </div>
        <span class="ds-footer__status"><span class="ds-footer__status-dot"></span>All Systems Operational</span>
      </div>
    </div>
  </div>
</footer>
```

**Use when:** Directory for most pages with deep IA (Product, Developers, Pricing). Editorial for brand-statement closers (about, manifesto, single-narrative landing). Compliance row is non-negotiable. Editorial prelude line is the page-finale moment — under 8 words.

---

### 3.4 Motion (2 components + 2 examples + 2 authoring methods)

A first-class component family for motion-bearing content. Organised in four sub-groups: **Atoms** (shared vocabulary primitives for any motion piece), **Components** (reusable, drop-anywhere), **Interactive illustrations** (live SVG+CSS+JS, ≤5 KB per piece — authored via the *Interactions guide*), **Pre-rendered animations** (Hyperframes MP4 organisms — authored via the *Hyperframes guide*). Every entry honours `prefers-reduced-motion: reduce` and auto-pauses when offscreen.

Two terms are used throughout this section and Data Viz:
- **Animated** — motion happens autonomously (loop, time-based, scroll-revealed). The user does not drive it.
- **Interactive** — motion responds to user input (hover, click, focus). The user drives it. Some pieces are both (auto-cycle when idle, hover overrides).

#### Motion atoms — vocabulary (Motion · Atoms)

Shared primitives every Motion organism and Data Viz diagram in the system composes from. Documented as a single page (`#motion/atoms`) so the vocabulary stays explicit:

- **Connector line** — hairline SVG `<path>` (1.5 px, white-22% on dark / black-22% on light). Always axis-aligned. L-bends are three axis-aligned segments — horizontal → vertical → horizontal. Never diagonal. Solid stroke is the default; dotted (`stroke-dasharray: 3 4`) signals a pending / optional / derived relationship — one dotted edge per diagram max.
- **Connector arrow** — uniform 12 × 10 polygon at every connector terminus. Always at terminus, never mid-path (mid-path arrowheads imply two-way flow, not sanctioned).
- **Packet token** — 7 px orange circle with 6 px glow, centred via `transform: translate(-50%, -50%)`. Traverses connector paths with axis-aligned motion only (no diagonal interpolation between waypoints). Multiple packets on one path stagger their begin times. Fade in over first 10 % of cycle, fade out over last 12 % so they never touch the source-box edge nor the arrowhead.
- **Node container** — hairline `<rect>` (1 px border, 4 px radius) with JBM 9 px uppercase eyebrow + Geist 14 px label. Vertical padding balanced (~18 px top / ~17 px bottom in a 60 px rect). Two variants: default (neutral hairline) and focal (1.5 px orange border + 5 % orange fill). **One focal node per diagram.**
- **Grid frame texture** — 12 × 12 px radial-gradient dot pattern (`rgba(255,255,255,0.07) 1px, transparent 1px`). Texture for thumbnail / preview containers — used in Timeline scrubber thumbnails. If more textures emerge (cross-hatch, grain, stipple), promote to a top-level Patterns & textures library section.

**Compose, don't reinvent.** New Motion organisms reach for these atoms before inventing primitives. Orange fills appear only on Packets (always) and on the Focal node (one per diagram) — never on connectors, arrows, or default nodes.

---

#### ds-particle-dome (Motion · Component)

The brand-signature ambient animation. 15,000-particle (production) or 5,000-particle (preview) hemispherical point cloud that **breathes** — size oscillates with inverse-coupled per-vertex distortion, plus multi-axis rotation. Renders to WebGL via Three.js (r128, ~150 KB gzipped, dynamically loaded on first appearance, cached after). Dark-only at v1. Respects `prefers-reduced-motion: reduce` (holds first frame). Auto-pauses when offscreen via IntersectionObserver.

**Variants/modifiers:**
- `data-ds-particle-dome` (mounts the dome)
- `data-ds-particle-scale="preview"` (5K points, contained surfaces) / `"hero"` (15K points, production)
- `aria-hidden="true"` always (decorative)

**HTML:**
```html
<div class="ds-particle-dome" data-ds-particle-dome data-ds-particle-scale="hero" aria-hidden="true" style="position: absolute; inset: 0; z-index: 0;"></div>
```

**Use when:** Hero only — Variant E of the Hero composition template. Composes inside a `.ds-hero` parent with `position: relative`; content sits above at `z-index: 1`. Dark surface non-negotiable (additive blending requires it). Never below the fold. Marketing home / product hero / launch page only — don't pay the 150 KB on inner pages.

---

#### ds-motion-clip (Motion · Component, "Motion wrapper")

Reusable `<figure>` + `<video>` wrapper for any pre-rendered MP4 motion organism. Composes a video element with the system's autoplay contract (`autoplay muted loop playsinline preload="metadata"`), surface variants (`--dark` / `--light`), reduced-motion gate (pause at first frame), IntersectionObserver pause when offscreen, graceful fallback on failed load. Aspect ratio locked at 16:9 to match the canonical 1920×1080 render canvas. Every Hyperframes-rendered example in this section composes this wrapper — the wrapper is the atomic primitive; each MP4 is content placed inside it.

**Variants/modifiers:**
- `--dark` / `--light` surface modifier (border + fallback fill)
- `data-ds-motion-clip` (boots reduced-motion gate + offscreen pause)
- `[data-ds-motion-failed]` (set on video error — triggers poster / solid-fill fallback)

**HTML:**
```html
<figure class="ds-motion-clip ds-motion-clip--dark" data-ds-motion-clip>
  <video class="ds-motion-clip__video"
         src="assets/motion/<slug>.mp4"
         poster="assets/motion/<slug>.poster.jpg"
         width="1920" height="1080"
         autoplay muted loop playsinline preload="metadata"
         aria-label="<one-sentence description of the composition>"></video>
  <figcaption class="ds-motion-clip__caption">Pre-rendered MP4 · 1920×1080 · 12s loop</figcaption>
</figure>
```

**Use when:** Embedding any Hyperframes-rendered motion organism on a consuming page. Width 720–960 px on desktop reads cleanly. One motion clip per fold. `aria-label` required — describes what the composition shows. `preload="metadata"` defers body bytes until first visible-paint. 0 KB JS at runtime on the consuming page — Hyperframes is build-time.

---

#### Interactive illustrations — Interactions guide (Motion · Authoring method)

Documentation page (`#motion/live-illustrations-guide`) — the live SVG / CSS / JS authoring method for motion organisms that respond to user input. Composition ships inline (≤ 5 KB CSS + HTML + JS combined), runs at runtime, no external animation library at v0.1 (vanilla CSS transitions + small JS loops). Auto-cycle when idle + interactive override on hover / click / focus. Hover always wins; cycle pauses on user engagement, resumes on mouse-leave. Composes Motion atoms (connector / arrow / packet / node / grid-frame) where applicable. Class prefix `ds-<slug>__<part>` + `data-ds-<slug>` boot hook. See Timeline scrubber below for the canonical instance.

#### Timeline scrubber (Motion · Example, interactive)

A live SVG/CSS illustration of natural-language search across a video timeline. Auto-cycles through 6 timestamped moments when idle; **hover any thumbnail to override and scrub to that moment**; mouse-leave resumes the cycle. Search bar types out `person wearing a safety vest` character-by-character on first viewport entry. 13 monthly data points (well, 6 thumbnails) wired via `data-i` indices on the markup. ≤ 6 KB inline. No external animation library.

**HTML structure** (abridged — see `#motion/timeline-scrubber`):
```html
<div class="ds-scrubber" data-ds-scrubber>
  <div class="ds-scrubber__search">…typed query + blink cursor…</div>
  <div class="ds-scrubber__strip">
    <div class="ds-scrubber__meta">Timeline · <data>6 moments found</data></div>
    <div class="ds-scrubber__track">…6 dots…</div>
  </div>
  <div class="ds-scrubber__thumbs">
    <button class="ds-scrubber__thumb" data-i="0">…</button>
    …×5 more…
  </div>
</div>
```

**Use when:** Inline in product-page sections explaining natural-language search. Width 720–1080 px on desktop; thumbnail grid collapses to 2-col below 480 px. Hover responsiveness is the point — don't strip it. One per fold.

---

#### Pre-rendered animations — Hyperframes guide (Motion · Authoring method)

Documentation page (`#motion/hyperframes-guide`) — the build-time HTML+GSAP→MP4 authoring method via [Hyperframes](https://github.com/heygen-com/hyperframes). Use when the brief calls for sustained narrative motion (10+ s), multi-zone packet flows, deterministic timing that survives across browsers, or 0 KB runtime JS. Project structure: `hyperframes/<slug>/` with `index.html` + `brand-tokens.css` + `meta.json` + `package.json` (`npm run dev / lint / render`). Composition contract: 1920×1080 canvas, 30 fps, 12 s seamless loop, H.264 codec, encoded size ≤ 5 MB. Render command: `npm run render` (wraps `npx hyperframes render` + copy to stable filename). Output lands at `assets/motion/<slug>.mp4` in this repo, embedded via the Motion wrapper.

**Key design principle:** axis-aligned packet motion — GSAP keyframes change `left` OR `top` between consecutive waypoints, never both. Diagonal interpolation cuts across L-bend geometry and breaks "packet rides the wire."

#### Ingestion pipeline (Motion · Example, pre-rendered)

First Hyperframes example. 12-second MP4 organism. Brief: *Upload from anywhere. Normalize formats with built-in transcoding. Stream globally in seconds, then index, search, and automate.* Five multi-format video sources funnel into a single H.264 transcoder, then fan out to three downstream actions (index frames, search semantics, automate workflows). Orange packet dots traverse axis-aligned L-bend connector lines on continuous cycles. Footer caption sets the brief verbatim. Embedded via the Motion wrapper.

**Asset:** `assets/motion/ingestion-pipeline.mp4` (~370 KB, H.264, 1920×1080, 12 s loop).

**Source:** `hyperframes/v08-02-ingestion-pipeline/` in the main project repo. Render via `npm run render` from the composition folder.

**Use when:** Inline in product-page sections explaining ingestion. Width 720–960 px on desktop. Not a hero. Caption it. Don't trim or stop mid-cycle — the composition is paced for 12 s.

---

### 3.5 Data Viz (7)

Quantitative narrative components — stats, charts, diagrams. Every entry ships in dark + light surface variants, every entry honours `prefers-reduced-motion: reduce` and pauses when offscreen, every label / tick is **≥ 11 px** (locked floor). Greys on non-focal elements are deliberately recessive so the orange focal accent wins the eye: bars + columns sit at 28 % alpha on dark / 22 % alpha on light. Count-up animations on numeric values are forbidden — static values land harder; only structural elements (bar fills, line stroke-draw, jackpot-style before→after roll) animate on entrance.

#### ds-stats (Data Viz, "Stats")

Quantitative anchors for narrative claims. Each cell carries a display-scale value + JBM uppercase label. Two layout variants: **row** (3–4 stats across, hero / under-heading rhythm) and **column** (3 stats stacked, side-panel rhythm). Both ship in dark + light. Stagger entrance on viewport reveal (80 ms per cell, 500 ms total, one-shot via `data-ds-stats-reveal`); subtle hover lift on each cell (background tints 2–3 % of surface contrast, value scales 1.02). No hairline border between cells — cells sit on transparent background.

**Variants/modifiers:**
- `--row` (default 3–4 cells horizontal flex) / `--column` (3 cells vertical grid)
- `--dark` / `--light` surface modifier
- `data-ds-stats-reveal` (boots stagger entrance)

**HTML:**
```html
<div class="ds-stats ds-stats--row ds-stats--dark" data-ds-stats-reveal>
  <div class="ds-stats__cell">
    <div class="ds-stats__value">240<span class="ds-stats__unit">ms</span></div>
    <div class="ds-stats__label">P95 query latency</div>
  </div>
  <!-- …repeat ×2–3 more… -->
</div>
```

**Use when:** Row variant under section headings (4-up for hero scale-pitch). Column variant as a 220 px side panel beside body copy. Don't animate count-up — values land static.

---

#### ds-callout-metric (Data Viz, "Callout metric")

A single quantitative claim sized as a section-level moment. Orange left bar + display-scale value + body clause + JBM uppercase provenance note. 5-beat **staged reveal** on viewport entry: 0 ms orange bar draws top→bottom (350 ms) → 350 ms container background tints in → 600 ms value fades + lifts → 850 ms body text fades + lifts → 1050 ms source microcopy fades + lifts. Total ~1.45 s.

**HTML:**
```html
<div class="ds-callout-metric ds-callout-metric--dark" data-ds-callout-reveal>
  <div class="ds-callout-metric__value">240<span class="ds-callout-metric__unit">ms</span></div>
  <div class="ds-callout-metric__body">P95 query latency across 2.4M hours of indexed video.</div>
  <div class="ds-callout-metric__note">SOURCE · /benchmarks/p95-latency</div>
</div>
```

**Use when:** Interrupting long-form narrative with a measured fact. One per fold. Provenance note required — without it the number reads as marketing. Body clause caps at two lines.

---

#### ds-compare-stat (Data Viz, "Before / after")

Two-cell layout showing a measured delta. Before metric on the left in muted type, arrow + percent change in the middle, after metric on the right in orange. On viewport reveal, the after value rolls from the before number to the target with **jackpot animation** — ease-out cubic over 1.4 s, digits formatted with commas, suffix preserved.

**HTML:**
```html
<div class="ds-compare-stat ds-compare-stat--dark" data-ds-compare-reveal>
  <div class="ds-compare-stat__before">
    <div class="ds-compare-stat__label">BEFORE · v1 retrieval</div>
    <div class="ds-compare-stat__value">1,840<span class="ds-compare-stat__unit">ms</span></div>
  </div>
  <div class="ds-compare-stat__delta">
    <svg width="64" height="16">…arrow polyline…</svg>
    <div class="ds-compare-stat__pct">−87%</div>
  </div>
  <div class="ds-compare-stat__after">
    <div class="ds-compare-stat__label">AFTER · v2 multimodal</div>
    <div class="ds-compare-stat__value">
      <span data-ds-jackpot data-from="1840" data-to="240" data-suffix="ms">1,840<span class="ds-compare-stat__unit">ms</span></span>
    </div>
  </div>
</div>
```

**Use when:** Showing improvement deltas — lower-is-better metrics (latency, cost, error) use negative percent; higher-is-better (recall, throughput) uses positive. Same unit on both sides; never mix units.

---

#### ds-bar-chart (Data Viz, "Bar chart")

Horizontal bars for comparing labelled categories on a single quantitative axis. JBM uppercase axis labels, hairline gridlines, focal-row orange (one per chart — typically the VideoDB row), other rows in white-28% / black-22%. Bars scroll-reveal from 0 → target width on viewport entry (700 ms ease-out, 80 ms stagger per row). Hover any row: row background tints 3 %, bar brightness +15 %, focal rows get an orange glow shadow.

**Variants/modifiers:**
- `--dark` / `--light` surface modifier
- `__bar--focal` cell modifier — orange fill (one per chart)
- `data-ds-reveal-bars` (boots scroll-reveal stagger)

**HTML:**
```html
<div class="ds-bar-chart ds-bar-chart--dark" data-ds-reveal-bars>
  <div class="ds-bar-chart__title">Index-to-query latency · lower is better</div>
  <div class="ds-bar-chart__row">
    <div class="ds-bar-chart__label">VideoDB</div>
    <div class="ds-bar-chart__track"><div class="ds-bar-chart__bar ds-bar-chart__bar--focal" style="width: 14%"></div></div>
    <div class="ds-bar-chart__value">240 ms</div>
  </div>
  <!-- …repeat ×N more… -->
  <div class="ds-bar-chart__axis">0 ms<span></span>1,760 ms</div>
</div>
```

**Use when:** Unordered category comparison (typically vs competitors). Label widths cap at 25 % — long labels truncate with ellipsis. For ordered sequences, use Column chart.

---

#### ds-column-chart (Data Viz, "Column chart")

Vertical columns for time-series or ordered categorical data. Same chrome as bar chart — mono labels, hairline gridlines, focal-column orange. Scroll-reveal grows columns 0 → target height (700 ms ease-out, 60 ms stagger). Hover any column: column lifts 3 px, brightness +15 %, focal columns get the orange glow.

**HTML:**
```html
<div class="ds-column-chart ds-column-chart--dark" data-ds-reveal-columns>
  <div class="ds-column-chart__title">Queries / month · 2025 — 2026</div>
  <div class="ds-column-chart__plot">
    <div class="ds-column-chart__col">
      <div class="ds-column-chart__bar" style="height: 24%"></div>
      <div class="ds-column-chart__x">Sep</div>
    </div>
    <!-- …repeat ×7 more, last column gets __bar--focal… -->
  </div>
</div>
```

**Use when:** Time-series (months, quarters) or ranked categorical sequences. Latest / focal column highlights in orange.

---

#### ds-trend-line (Data Viz, "Trend line")

SVG line + area chart for smoothly-varying time-series. 1.5 px orange stroke, optional 22 % orange area fill, JBM uppercase x-axis. ViewBox 760×240 with 20 px inset (end dot has breathing room, no clipping). Scroll-reveal stroke-draws the line over 1200 ms, area fades in, end-dot pops.

**Hover interaction:** 13 data points wired via invisible hit-area buttons. Hover (or focus via keyboard) → vertical dashed guideline + orange active dot with glow + floating tooltip (`MAY '25 / 4.2k ops/hr`). Mouse-leave clears state. Each hit-area has aria-label for screen-reader accessibility.

**HTML structure** (abridged — see `#dataviz/trend-line`):
```html
<div class="ds-trend-line ds-trend-line--dark" data-ds-reveal-trend data-ds-trend-hover>
  <div class="ds-trend-line__title">Embedding throughput · ops / hour</div>
  <div class="ds-trend-line__plot">
    <svg viewBox="0 0 760 240">
      <line class="ds-trend-line__gridline" …/>
      <path class="ds-trend-line__area" …/>
      <path class="ds-trend-line__line" …/>
      <line class="ds-trend-line__guide" data-ds-trend-guide/>
      <circle class="ds-trend-line__active-dot" data-ds-trend-active-dot/>
    </svg>
    <div class="ds-trend-line__tooltip" data-ds-trend-tooltip>…month + value…</div>
    <div class="ds-trend-line__hit-row" data-ds-trend-hit-row>
      <button data-i="0" data-month="May '25" data-value="4.2k ops/hr" data-x="20" data-y="190"></button>
      <!-- …×12 more… -->
    </div>
  </div>
  <div class="ds-trend-line__axis">May '25 / Aug / Nov / Feb '26 / May '26</div>
</div>
```

**Use when:** Direction-of-travel claims — growth curves, latency trends, accuracy over training runs. Single line per chart at v0.1; multi-series is a separate composition.

---

#### ds-arch-flow (Data Viz, "Architecture flow")

Live SVG system architecture diagram — boxes connected by labelled edges with continuous packet flow tokens traversing each connection via `<animateMotion>`. Reads as a system schematic. Distinct from `motion/ingestion-pipeline` — that's a pre-rendered narrative MP4; this is runtime-interactive (resizes, replays).

**Z-order** matters: paths + arrows (bottom) → packet tokens with opacity fade in/out (middle) → solid-fill node containers (top). Packets disappear behind nodes; arrows terminate 12 px before each box edge with uniform 12 × 10 polygons; node text baselines balanced (~18 top / ~17 bottom inside the rect). One focal node (orange border + tinted fill) per diagram.

**HTML structure** (abridged):
```html
<div class="ds-arch-flow ds-arch-flow--dark">
  <svg viewBox="0 0 720 360">
    <!-- Layer 1: connector lines + arrowheads -->
    <g stroke="rgba(255,255,255,0.28)" stroke-width="1.2">…paths…</g>
    <g fill="rgba(255,255,255,0.55)">…arrowhead polygons…</g>
    <!-- Layer 2: packet tokens (animateMotion + opacity fade) -->
    <g>…<circle><animateMotion><mpath/></animateMotion><animate attributeName="opacity"/></circle>…</g>
    <!-- Layer 3: nodes (solid fill on top) -->
    <g><rect fill="var(--neutral-dark)" …/>…eyebrow + label…</g>
  </svg>
</div>
```

**Use when:** Showing system topology with continuous data flow — agent integrations, ingestion paths, pipeline overview. Cap at 6 nodes / 8 edges (above that, edges become hard to read at typical column widths). Compose from Motion atoms (Connector / Arrow / Packet / Node container) — don't invent new primitives.

---

### 3.6 Templates (13)

#### Section structure (Template)

The page-section primitive. Every other template sits on this. Three layers: `.ds-section` (surface + 96px top/bottom rhythm) → `.ds-frame` (max-width 1200px, railed gutter borders) → `.ds-col-offset` (12-col grid: 2fr code rail + 10fr content at desktop).

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">01 /<br>Section</div></div>
      <div>
        <div class="ds-section-heading ds-section-heading--dark">
          <h2 class="ds-section-heading__title">Section structure example.</h2>
          <p class="ds-section-heading__lead">Left column is the mono-uppercase code label. Right column carries the section content.</p>
        </div>
        <!-- body content: cards, tickers, editorial primitives, etc. -->
      </div>
    </div>
  </div>
</section>
```

**Use when:** Every marketing-page section. Section code label is the navigation kicker (e.g. `03 / Lifecycle`). For centered hero-style sections, omit `.ds-col-offset` and drop the section heading inline.

---

#### Hero composition (Template, 5 variants)

The page-opener. Five variants ship: **A — Default** (live pill + display + lead + CTA pair + small mono-stats strip), **B — Centered with code** (eyebrow + centered display + lead + single CTA + Code block), **C — Big stats** (homepage scale-pitch, 4-up display-scale stats grid), **D — Image ticker** (centered + full-width marquee of value-prop cards), **E — Animated** (centered + Particle dome behind).

**HTML (Variant A — Default with stats strip):**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">01 /<br>Hero</div></div>
      <div>
        <span class="ds-pill-status ds-pill-status--dark" style="margin-bottom: 32px;"><span class="ds-pill-status__dot"></span>Live · v2.4.0</span>
        <h1 class="ds-hero__display">The video database,<br><span class="ds-hero__display-second">built for agents.</span></h1>
        <p class="ds-hero__lead">A queryable layer over hours of footage. Multimodal embeddings, scene cuts, transcripts — aligned to a single timeline you can search in milliseconds.</p>
        <div class="ds-cta-pair">
          <a class="ds-btn ds-btn--primary" href="#">Get API key <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></a>
          <a class="ds-btn ds-btn--ghost-dark" href="#">Read docs <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon></a>
        </div>
        <div class="ds-hero__stats">
          <div class="ds-hero__stat"><strong>2.4M</strong>Hours indexed</div>
          <div class="ds-hero__stat"><strong>120ms</strong>Avg query latency</div>
          <div class="ds-hero__stat"><strong>38</strong>Frontier models</div>
          <div class="ds-hero__stat"><strong class="is-orange">∞</strong>Queries per agent</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**HTML (Variant C — Big stats, replaces small stats strip with `.ds-hero__big-stats`):**
```html
<div class="ds-hero__big-stats">
  <div class="ds-hero__big-stat"><span class="ds-hero__big-stat-value">2.4M</span><span class="ds-hero__big-stat-label">Hours indexed</span></div>
  <div class="ds-hero__big-stat"><span class="ds-hero__big-stat-value">120ms</span><span class="ds-hero__big-stat-label">Median query</span></div>
  <div class="ds-hero__big-stat"><span class="ds-hero__big-stat-value">38</span><span class="ds-hero__big-stat-label">SDK methods</span></div>
  <div class="ds-hero__big-stat"><span class="ds-hero__big-stat-value is-orange">∞</span><span class="ds-hero__big-stat-label">Agent ready</span></div>
</div>
```

**HTML (Variant E — Animated, centered + Particle dome):**
```html
<section class="ds-section ds-section--dark" style="position: relative; overflow: hidden;">
  <div class="ds-particle-dome" data-ds-particle-dome data-ds-particle-scale="hero" aria-hidden="true" style="position: absolute; inset: 0; z-index: 0;"></div>
  <div class="ds-frame" style="position: relative; z-index: 1;">
    <div>
      <div class="ds-hero ds-hero--centered">
        <span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs" style="display: block; margin-bottom: 18px;">V2.4 · RTStream is generally available</span>
        <h1 class="ds-hero__display">Give your AI eyes and ears.<br><span class="ds-hero__display-second">A queryable layer over hours of footage.</span></h1>
        <p class="ds-hero__lead">Multimodal embeddings, scene cuts, transcripts — aligned to a single timeline you can search in milliseconds.</p>
        <div class="ds-cta-pair">
          <a class="ds-btn ds-btn--primary" href="#">Get API key</a>
          <a class="ds-btn ds-btn--ghost-dark" href="#">Read docs</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Variant A for performance / scale pages with small numeric stats. Variant B for "try it now" — code is the focal proof. Variant C for homepage scale-pitch where numbers ARE the headline. Variant D for visual value-prop ("look what teams have built"). Variant E for brand-statement pages — animated dome, dark-only.

---

#### Problem / Solution (Template)

Two-up compare-card grid. Left card states today's broken state (neutral); right card states VideoDB's resolution (orange-tinted, `--good`). Two compositions ship: **Side-by-side** (section-code rail + heading + cards) and **Centered** (centered intro above the compare cards, cream-tinted right card, header-row bracket labels, full-width bottom pill).

**HTML (Side-by-side Variant A):**
```html
<section class="ds-section ds-section--light">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">02 /<br>The problem</div></div>
      <div>
        <div class="ds-section-heading ds-section-heading--light">
          <h2 class="ds-section-heading__title">Today's video stack was built for human playback. Agents need something queryable.</h2>
          <p class="ds-section-heading__lead">Making video usable for AI means stitching six to eight tools. VideoDB replaces all of it with one API.</p>
        </div>
        <div class="ds-compose-grid-2">
          <article class="ds-compare-card">
            <div class="ds-bracket ds-bracket--on-light"><span class="ds-bracket__label">[TODAY]</span><span class="ds-bracket__tag">The frankenstack</span></div>
            <p class="ds-compare-card__desc">Six tools glued together. Every team rebuilds the same pipeline.</p>
            <ul class="ds-compare-card__rows">
              <li><span><span class="ds-vbar"></span>Object storage (S3 / GCS)</span><span class="ds-compare-card__row-tag">Storage</span></li>
              <li><span><span class="ds-vbar"></span>FFmpeg / Mux</span><span class="ds-compare-card__row-tag">Transcode</span></li>
              <li><span><span class="ds-vbar"></span>Whisper / AssemblyAI</span><span class="ds-compare-card__row-tag">Speech</span></li>
              <li><span><span class="ds-vbar"></span>Pinecone / Weaviate</span><span class="ds-compare-card__row-tag">Vectors</span></li>
            </ul>
            <span class="ds-pill-status ds-pill-status--light"><span class="ds-pill-status__dot"></span>Brittle · slow · expensive</span>
          </article>
          <article class="ds-compare-card ds-compare-card--good">
            <div class="ds-bracket ds-bracket--orange"><span class="ds-bracket__label">[VIDEODB]</span><span class="ds-bracket__tag">One backend</span></div>
            <p class="ds-compare-card__desc">Every primitive in one SDK. Composable, model-agnostic, agent-ready.</p>
            <ul class="ds-compare-card__rows">
              <li><span><span class="ds-vbar ds-vbar--orange"></span>Encrypted at rest</span><span class="ds-compare-card__row-tag">Managed</span></li>
              <li><span><span class="ds-vbar ds-vbar--orange"></span>Native scene-cut + transcripts</span><span class="ds-compare-card__row-tag">Indexed</span></li>
              <li><span><span class="ds-vbar ds-vbar--orange"></span>Multimodal embeddings</span><span class="ds-compare-card__row-tag">Searchable</span></li>
              <li><span><span class="ds-vbar ds-vbar--orange"></span>One Python / Node SDK</span><span class="ds-compare-card__row-tag">Unified</span></li>
            </ul>
            <span class="ds-pill-status ds-pill-status--orange"><span class="ds-pill-status__dot"></span>Built for agents</span>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Section 2 of a marketing page — the "why VideoDB exists" beat. Left = problem, right = solution (eye scans left-to-right). 5–8 rows per card. Centered variant when the comparison IS the page hero (no section-code rail).

---

#### Article shell (Template)

Editorial layout for long-form content — field notes, write-ups, engineering blog posts. Composes Article hero at the top + two-column body (prose left, sticky Article TOC right rail) + article-ending nav back to parent. Body type is 17px / 1.7 line-height.

**HTML:**
```html
<section class="ds-section ds-section--light">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">AS /<br>Article shell</div></div>
      <div>
        <article class="ds-article-hero ds-article-hero--light" style="margin-bottom: 32px;">
          <p class="ds-article-hero__kicker">
            <a href="#" style="color: inherit; text-decoration: none;">← Field Notes</a>
            <span style="opacity: 0.4;">/</span>
            <span>Media Infra</span>
          </p>
          <h2 class="ds-article-hero__title">The hidden 6 MB Lambda trap</h2>
          <p class="ds-article-hero__lead">When Postman lies and AWS rejects: a story about boundary measurement.</p>
          <span class="ds-article-hero__byline"><strong style="font-weight: 500;">Rohit Garg</strong> · Field note · 5 min</span>
        </article>
        <div class="ds-article-shell">
          <aside class="ds-article-shell__rail">
            <nav class="ds-article-toc ds-article-toc--light" aria-label="Article contents">
              <p class="ds-article-toc__label">In this note</p>
              <ul class="ds-article-toc__list">
                <li><a href="#" class="is-active">Problem</a></li>
                <li><a href="#">The Lambda boundary</a></li>
                <li><a href="#">Fix</a></li>
              </ul>
            </nav>
          </aside>
          <div class="ds-article-body">
            <p><strong>The problem.</strong> We were returning a 6.4 MB JSON blob from a Lambda function via API Gateway…</p>
            <!-- prose, pull quotes, callouts, decision lists, code blocks here -->
            <nav class="ds-article-ending" aria-label="Back to parent">
              <a class="ds-article-ending__link" href="#"><span aria-hidden="true">←</span> <span>Back to Field Notes</span></a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Long-form pages — Labs notes, blog posts, engineering field notes. TOC sticky at desktop, stacks above body at mobile (<1024px). Compose Editorial primitives (pull quote, callout, decision list, highlight) inside the prose column.

---

#### Lifecycle grid (Template)

Sequential-primitive grid. 6 cards, each numbered + titled + briefly described. Used for documenting ordered step-sets where the user benefits from seeing the whole sequence at once (the six VideoDB primitives, feature lifecycles). First card carries `.is-start` for the orange-accent "begin here" cue.

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">L /<br>Lifecycle</div></div>
      <div>
        <div class="ds-section-heading ds-section-heading--dark">
          <h2 class="ds-section-heading__title">A single backend for the entire video lifecycle.</h2>
          <p class="ds-section-heading__lead">Six primitives, one SDK. Each card opens onto its own SDK reference + examples.</p>
        </div>
        <div class="ds-lifecycle-grid">
          <div class="ds-lifecycle-card is-start" tabindex="0">
            <div><div class="ds-lifecycle-card__num">01</div><h3 class="ds-lifecycle-card__title">Ingest</h3></div>
            <p class="ds-lifecycle-card__desc">Stream, upload, sync from any source. Hot-folder ingest, S3 mirrors, direct API.</p>
          </div>
          <div class="ds-lifecycle-card" tabindex="0">
            <div><div class="ds-lifecycle-card__num">02</div><h3 class="ds-lifecycle-card__title">Index</h3></div>
            <p class="ds-lifecycle-card__desc">Multimodal embeddings — transcripts, scenes, faces — per asset.</p>
          </div>
          <div class="ds-lifecycle-card" tabindex="0">
            <div><div class="ds-lifecycle-card__num">03</div><h3 class="ds-lifecycle-card__title">Memory</h3></div>
            <p class="ds-lifecycle-card__desc">Persistent agent context across sessions and tasks.</p>
          </div>
          <div class="ds-lifecycle-card" tabindex="0">
            <div><div class="ds-lifecycle-card__num">04</div><h3 class="ds-lifecycle-card__title">Search</h3></div>
            <p class="ds-lifecycle-card__desc">Sub-second semantic queries across petabytes.</p>
          </div>
          <div class="ds-lifecycle-card" tabindex="0">
            <div><div class="ds-lifecycle-card__num">05</div><h3 class="ds-lifecycle-card__title">Director</h3></div>
            <p class="ds-lifecycle-card__desc">Orchestrate edits and pipelines as code.</p>
          </div>
          <div class="ds-lifecycle-card" tabindex="0">
            <div><div class="ds-lifecycle-card__num">06</div><h3 class="ds-lifecycle-card__title">RTStream</h3></div>
            <p class="ds-lifecycle-card__desc">Live agent-controlled playback to any endpoint.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Documenting the platform's six primitives or any ordered step-set. 6 cards is the sweet spot. Distinct from Platform overview — Lifecycle says "follow these in order", Platform overview says "here are the pieces, use what you need." Centered variant when the lifecycle IS the page (`/how-it-works`).

---

#### Platform overview (Template)

3-column grid of "primitive" cards. Each card composes an orange icon tile + mono `P/0X` number kicker + title + description. Distinct from Lifecycle grid (sequential numbered steps with "begin here" cue) — Platform overview is the SDK reference grid where any primitive can be the entry point.

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark">
        <h2 class="ds-section-heading__title">Six primitives.<br><span style="color: var(--text-on-dark-second);">Everything your agents need to see and hear.</span></h2>
        <p class="ds-section-heading__lead">Compose them. Use one, use all. Intelligence is pluggable — integrate frontier models natively.</p>
      </div>
      <div class="ds-primitive-grid">
        <div class="ds-primitive-card">
          <div class="ds-primitive-card__icon"><iconify-icon icon="solar:cloud-upload-linear" width="22" height="22"></iconify-icon></div>
          <div class="ds-primitive-card__num">P/01</div>
          <h3 class="ds-primitive-card__title">Ingest</h3>
          <p class="ds-primitive-card__desc">Stream, upload, sync from any source. MP4, MOV, HLS, live streams.</p>
        </div>
        <div class="ds-primitive-card">
          <div class="ds-primitive-card__icon"><iconify-icon icon="solar:database-linear" width="22" height="22"></iconify-icon></div>
          <div class="ds-primitive-card__num">P/02</div>
          <h3 class="ds-primitive-card__title">Index</h3>
          <p class="ds-primitive-card__desc">Multimodal embeddings, scene-cut, transcripts. One queryable timeline.</p>
        </div>
        <!-- P/03 Memory, P/04 Search, P/05 Director, P/06 RTStream -->
      </div>
    </div>
  </div>
</section>
```

**Use when:** Platform / product pages as the canonical "what's in the SDK" grid. 3 columns at desktop, 2 at tablet, 1 at mobile. 6 cards. Each card opens onto its own primitive reference page in production (wrap in `<a>`).

---

#### Feature grid (Template)

3-column grid of feature tiles. Each tile composes a subtle icon tile + title + one-line claim. Two variants: **Left-aligned** (default — content stacks left, for security / value-prop lists) and **Centered** (icon + text centered, for trust-page symmetrical grids).

**HTML (Left-aligned variant A):**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark">
        <h2 class="ds-section-heading__title">Security, packaged as feature cards.</h2>
        <p class="ds-section-heading__lead">Six-card grid for compact value-prop or feature lists. Hover lifts the icon to brand orange.</p>
      </div>
      <div class="ds-feature-tile-grid">
        <div class="ds-feature-tile">
          <div class="ds-feature-tile__icon"><iconify-icon icon="solar:lock-keyhole-minimalistic-linear" width="20" height="20"></iconify-icon></div>
          <h3 class="ds-feature-tile__title">Encrypted in transit</h3>
          <p class="ds-feature-tile__desc">SSL encryption during transit.</p>
        </div>
        <div class="ds-feature-tile">
          <div class="ds-feature-tile__icon"><iconify-icon icon="solar:shield-check-linear" width="20" height="20"></iconify-icon></div>
          <h3 class="ds-feature-tile__title">Encrypted at rest</h3>
          <p class="ds-feature-tile__desc">256-bit AES encryption at rest.</p>
        </div>
        <!-- 4 more tiles -->
      </div>
    </div>
  </div>
</section>
```

For centered variant, add `.ds-feature-tile-grid--center` and use `.ds-section-heading--centered`.

**Use when:** 6 tiles in a 3×2 grid. Left-aligned for capability / security scan-lists; centered for trust pages where symmetry matters. Icon tile is mono by default, flips orange on hover (lighter than Platform overview's always-orange).

---

#### Industries grid (Template)

"Split intro + tile grid" layout. Eyebrow + display heading + lead + Arrow CTA on the left column; 2-column grid of feature tiles on the right with `--icon-bare` modifier (standalone icon, no bg tile). 5fr / 7fr column split.

**HTML:**
```html
<section class="ds-section ds-section--light">
  <div class="ds-frame">
    <div>
      <div class="ds-split-grid">
        <div class="ds-split-grid__intro">
          <span class="ds-eyebrow ds-eyebrow--xs ds-eyebrow--loose ds-eyebrow--strong-on-light" style="display: inline-flex; align-items: center; gap: 10px;">
            <span style="display: inline-block; width: 6px; height: 6px; background: var(--orange-500); border-radius: 50%;"></span>
            Industries
          </span>
          <h2 class="ds-split-grid__intro-title">Built for teams that put video at the heart of their stack.</h2>
          <p class="ds-split-grid__intro-lead">Production-grade video infrastructure where indexing speed and agent compatibility are non-negotiable.</p>
          <div style="margin-top: 8px;">
            <a class="ds-arrow-cta ds-arrow-cta--on-light" href="#">See customers <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></span></a>
          </div>
        </div>
        <div class="ds-split-grid__cards">
          <div class="ds-feature-tile ds-feature-tile--icon-bare">
            <div class="ds-feature-tile__icon"><iconify-icon icon="solar:videocamera-record-linear" width="24" height="24"></iconify-icon></div>
            <h3 class="ds-feature-tile__title">Media & Entertainment</h3>
            <p class="ds-feature-tile__desc">Search across years of footage. Generate clips, recap shows, build context for streaming agents.</p>
          </div>
          <div class="ds-feature-tile ds-feature-tile--icon-bare">
            <div class="ds-feature-tile__icon"><iconify-icon icon="solar:basketball-linear" width="24" height="24"></iconify-icon></div>
            <h3 class="ds-feature-tile__title">Sports</h3>
            <p class="ds-feature-tile__desc">Index every play. Agents query by team, player, situation — instant highlight reels.</p>
          </div>
          <!-- Education, News & Broadcast, Surveillance, Enterprise -->
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Industries / verticals folds on marketing pages. 6 tiles in 2×3 — below 4 use a CTA pair; above 8 split into categories. Bare icon (no bg tile) reads as content marker rather than chrome. One Arrow CTA only.

---

#### Use case row (Template)

Two-column "here's the use case, here's the 5-line code that solves it" section. Left column: vbar-bulleted list of build steps + Arrow CTA. Right column: real Code block organism showing the SDK call.

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark ds-section-heading--centered">
        <h2 class="ds-section-heading__title">From archive to agent action,<br><span style="color: var(--text-on-dark-second);">in three lines of code.</span></h2>
      </div>
      <div class="ds-use-case-grid">
        <div>
          <ul class="ds-use-case-list">
            <li><span class="ds-vbar ds-vbar--orange"></span><span><strong>Connect any source.</strong> Buckets, RTMP, HLS, live feeds.</span></li>
            <li><span class="ds-vbar ds-vbar--orange"></span><span><strong>Index automatically.</strong> Scenes, transcripts, embeddings.</span></li>
            <li><span class="ds-vbar ds-vbar--orange"></span><span><strong>Query natively.</strong> SDK or MCP. Direct semantic search.</span></li>
            <li><span class="ds-vbar ds-vbar--orange"></span><span><strong>Stream the result.</strong> RTStream feeds back to the agent in ms.</span></li>
          </ul>
          <div style="margin-top: 32px;"><a class="ds-arrow-cta ds-arrow-cta--on-dark" href="#">Read the build log <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></span></a></div>
        </div>
        <div class="ds-code-block ds-code-block--dark">
          <div class="ds-code-block__head"><div role="tablist"><div class="ds-code-tab-pills ds-code-tab-pills--dark"><button class="ds-code-tab-pills__btn is-selected" role="tab" aria-selected="true">python</button></div></div><button class="ds-code-block__copy">Copy</button></div>
          <pre class="ds-code-block__body">import videodb

conn  = videodb.connect()
video = conn.upload("keynote.mp4")
video.index_spoken_words()
video.index_scenes()

result = video.search("latency")
print(result.timestamps)</pre>
          <div class="ds-code-block__status"><span class="ds-status-pulse__dot"></span><span class="ds-eyebrow ds-eyebrow--xs">Live · agent.py · v2.4.0</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Product pages where value-prop is "look how short the code is". 4–5 bullets, ~10–15 line code. Bold lead + descriptor pattern on each bullet. Single language tab in the code block (other languages live in the docs).

---

#### Sync compare (Template)

Two-column paired-row compare with synchronised hover. Hovering or focusing any row on one side highlights its paired row on the other (matched by `data-row` attribute). Right column uses `--good` for soft warm-orange tint.

**HTML:**
```html
<section class="ds-section ds-section--light">
  <div class="ds-frame">
    <div class="ds-col-offset">
      <div><div class="ds-section-code">SC /<br>Compare</div></div>
      <div>
        <div class="ds-section-heading ds-section-heading--light">
          <h2 class="ds-section-heading__title">One backend vs. six.<br><span style="color: var(--text-on-light-second);">Hover any row to see its paired equivalent.</span></h2>
          <p class="ds-section-heading__lead">Synchronised hover — hovering a row on one side highlights the paired row on the other.</p>
        </div>
        <div class="ds-sync-compare" data-ds-sync>
          <div class="ds-sync-compare__col">
            <div class="ds-bracket ds-bracket--on-light" style="margin-bottom: 18px;"><span class="ds-bracket__label">[FRANKENSTACK]</span><span class="ds-bracket__tag">Today</span></div>
            <div class="ds-sync-compare__row" data-row="storage"><span class="ds-sync-compare__row-label"><span class="ds-vbar"></span>Object storage</span><span class="ds-sync-compare__row-value">S3 + GCS</span></div>
            <div class="ds-sync-compare__row" data-row="transcode"><span class="ds-sync-compare__row-label"><span class="ds-vbar"></span>Transcode</span><span class="ds-sync-compare__row-value">FFmpeg / Mux</span></div>
            <div class="ds-sync-compare__row" data-row="speech"><span class="ds-sync-compare__row-label"><span class="ds-vbar"></span>Speech</span><span class="ds-sync-compare__row-value">Whisper</span></div>
            <div class="ds-sync-compare__row" data-row="vectors"><span class="ds-sync-compare__row-label"><span class="ds-vbar"></span>Vectors</span><span class="ds-sync-compare__row-value">Pinecone</span></div>
          </div>
          <div class="ds-sync-compare__col ds-sync-compare__col--good">
            <div class="ds-bracket ds-bracket--orange" style="margin-bottom: 18px;"><span class="ds-bracket__label">[VIDEODB]</span><span class="ds-bracket__tag">Unified</span></div>
            <div class="ds-sync-compare__row" data-row="storage"><span class="ds-sync-compare__row-label"><span class="ds-vbar ds-vbar--orange"></span>Encrypted at rest</span><span class="ds-sync-compare__row-value">Managed</span></div>
            <div class="ds-sync-compare__row" data-row="transcode"><span class="ds-sync-compare__row-label"><span class="ds-vbar ds-vbar--orange"></span>Auto-encode</span><span class="ds-sync-compare__row-value">Built-in</span></div>
            <div class="ds-sync-compare__row" data-row="speech"><span class="ds-sync-compare__row-label"><span class="ds-vbar ds-vbar--orange"></span>Native speech</span><span class="ds-sync-compare__row-value">Multimodel</span></div>
            <div class="ds-sync-compare__row" data-row="vectors"><span class="ds-sync-compare__row-label"><span class="ds-vbar ds-vbar--orange"></span>Native embeddings</span><span class="ds-sync-compare__row-value">Per-asset</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** When you want users to compare across columns at the row level, not the column level — the comparison is the pair. Row count must match between columns. Centered variant when the table IS the page hero.

---

#### Diagrams (Template)

Composable diagram primitive — no chart library required. Each card carries a subtle dot-grid backdrop + tick-label head row + pill-shaped status rows (dot · label · value) + gradient progress bar that can run past 100% to signal overflow. Three row states: default, `is-fail` (orange-tinted), `is-success` (lifted neutral).

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark">
        <h2 class="ds-section-heading__title">Tokenized diagrams.<br><span style="color: var(--text-on-dark-second);">No chart library required.</span></h2>
      </div>
      <div class="ds-diagram-grid">
        <div class="ds-diagram-card">
          <div class="ds-diagram-head">
            <span class="ds-diagram-tick">Payload path</span>
            <span class="ds-diagram-tick is-muted">Raw limit first</span>
          </div>
          <div class="ds-diagram-rows">
            <div class="ds-diagram-row"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Flask response</span><span class="ds-diagram-value">JSON</span></div>
            <div class="ds-diagram-row"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Lambda runtime</span><span class="ds-diagram-value">6 MB cap</span></div>
            <div class="ds-diagram-row is-fail"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Raw payload</span><span class="ds-diagram-value">6.4 MB</span></div>
            <div class="ds-diagram-row"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Gateway gzip</span><span class="ds-diagram-value">never runs</span></div>
          </div>
          <div class="ds-diagram-bar"><span class="ds-diagram-bar-fill" style="width: 106%;"></span></div>
        </div>
        <div class="ds-diagram-card">
          <div class="ds-diagram-head">
            <span class="ds-diagram-tick">Indexed pipeline</span>
            <span class="ds-diagram-tick is-muted">Under budget</span>
          </div>
          <div class="ds-diagram-rows">
            <div class="ds-diagram-row is-success"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Ingest queue</span><span class="ds-diagram-value">120 ms</span></div>
            <div class="ds-diagram-row is-success"><span class="ds-diagram-dot"></span><span class="ds-diagram-label">Embed batch</span><span class="ds-diagram-value">340 ms</span></div>
          </div>
          <div class="ds-diagram-bar"><span class="ds-diagram-bar-fill" style="width: 78%;"></span></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Postmortems, performance comparisons, capacity diagrams, technical data-narrative content. Two cards side-by-side is the sweet spot. Tick labels: max 3 words, two per card. Not for marketing pages — reads as engineering.

---

#### Roadmap timeline (Template)

Horizontal milestone-bar infographic. Two-tone mission heading at the top + segmented timeline bar below with milestone labels alternating above/below the bar. Segments tint progressively brighter left-to-right; one `.is-active` segment paints brand orange ("you are here").

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark">
        <h2 class="ds-section-heading__title">Our mission is to make video usable for AI <span style="color: var(--text-on-dark-second);">— every frame, every transcript, every scene, queryable as easily as text.</span></h2>
      </div>
      <div class="ds-timeline-roadmap">
        <div class="ds-timeline-roadmap__row ds-timeline-roadmap__row--above">
          <div></div>
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">Aug 15, 2022</span>
              <span class="ds-timeline-roadmap__milestone">Internal preview</span>
            </div>
          </div>
          <div></div>
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">Jun, 2023</span>
              <span class="ds-timeline-roadmap__milestone">$12M Seed</span>
            </div>
          </div>
          <div></div>
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">May, 2026</span>
              <span class="ds-timeline-roadmap__milestone">V2.4 · RTStream + MCP</span>
            </div>
          </div>
        </div>
        <div class="ds-timeline-roadmap__bar">
          <div class="ds-timeline-roadmap__seg"></div>
          <div class="ds-timeline-roadmap__seg"></div>
          <div class="ds-timeline-roadmap__seg"></div>
          <div class="ds-timeline-roadmap__seg"></div>
          <div class="ds-timeline-roadmap__seg"></div>
          <div class="ds-timeline-roadmap__seg is-active"></div>
        </div>
        <div class="ds-timeline-roadmap__row ds-timeline-roadmap__row--below">
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">Mar, 2022</span>
              <span class="ds-timeline-roadmap__milestone">First commit</span>
            </div>
          </div>
          <div></div>
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">Jan, 2023</span>
              <span class="ds-timeline-roadmap__milestone">Public alpha</span>
            </div>
          </div>
          <div></div>
          <div class="ds-timeline-roadmap__label">
            <span class="ds-vbar ds-vbar--orange"></span>
            <div class="ds-timeline-roadmap__label-body">
              <span class="ds-timeline-roadmap__date">Nov 14, 2023</span>
              <span class="ds-timeline-roadmap__milestone">VideoDB GA</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Company roadmap, product history, fundraise journey, release-by-release infographics. 5–8 segments, override `style="--cols: 5"` on the wrapper. One `.is-active` segment (typically rightmost). Labels alternate above/below to avoid crowding. Not for changelog (use Carousel) or workflow steps (use Lifecycle grid).

---

#### Pre-footer Socials (Template)

Section that sits above the Footer on most public pages. Centered heading + lead + auto-fit grid of Social card organisms. Goal: emphasize the brand's surfaces (GitHub / Discord / X / YouTube / Docs / Blog) before the user hits the footer chrome.

**HTML:**
```html
<section class="ds-section ds-section--dark">
  <div class="ds-frame">
    <div>
      <div class="ds-section-heading ds-section-heading--dark ds-section-heading--centered">
        <h2 class="ds-section-heading__title">Everywhere we live</h2>
        <p class="ds-section-heading__lead">Pick your surface. Plug in.</p>
      </div>
      <div class="ds-social-grid">
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="ri:github-fill" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">Github</h3>
          <span class="ds-social-card__meta">3100+ Stars</span>
        </a>
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="ri:discord-fill" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">Discord</h3>
          <span class="ds-social-card__meta">500+ members</span>
        </a>
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="ri:twitter-x-line" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">X / Twitter</h3>
          <span class="ds-social-card__meta">@videodb</span>
        </a>
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="ri:youtube-fill" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">Youtube</h3>
          <span class="ds-social-card__meta">Workshops &amp; demos</span>
        </a>
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="solar:code-2-linear" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">Documentation</h3>
          <span class="ds-social-card__meta">docs.videodb.io</span>
        </a>
        <a class="ds-social-card ds-social-card--dark" href="#">
          <span class="ds-social-card__icon"><iconify-icon icon="solar:book-2-linear" width="28" height="28"></iconify-icon></span>
          <h3 class="ds-social-card__title">Blog</h3>
          <span class="ds-social-card__meta">Team deep-dives</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Use when:** Directly above the Footer on most public pages. 4–6 tiles. Centered heading + lead, no eyebrow — the grid IS the chrome. Each tile = one surface (don't mix surface-types with categories). Meta is one line, <6 words.

---

## 4. Page recipes

Common page assemblies. Each recipe is a section flow — pick the components in order, then fill with brief copy.

### 4.1 Pricing page

Hero default → Pricing card row (Variant A or B) → Tier finder (if usage-based) → FAQ rows → Closing CTA → Pre-footer Socials → Footer.

### 4.2 Customer story page

Article hero (with byline + tag list) → Pull quote → Article body with Highlights + Callouts + Code blocks → Decision list (the "how we decided") → Closing CTA → Pre-footer Socials → Footer Editorial.

### 4.3 Features / Platform page

Hero variant E (Animated with dome) → Logo wall → Platform primitives 6-up → Feature grid → Use case row → Sync compare → Closing CTA → Footer Directory.

### 4.4 About / Company page

Hero Centered → Mission statement (Section heading centered + body) → Team grid (Logo card or custom) → Values 3-up (Feature tile grid) → Closing CTA with status pulse → Footer Editorial.

### 4.5 Pages that don't match a recipe

For pages outside these recipes, combine a Hero variant + 6–10 sections that follow the dark/light rhythm + Closing CTA + Pre-footer Socials + Footer. Most marketing sections fit one of: Hero variant, Customer wall, 2-up compare, 3-up cards, 4-up arch grid, Big stats, Solutions 2x2, Closing CTA band.

### 4.6 Build sequence for any marketing page

1. **Define content first.** Write a Markdown brief — 8–13 sections, each with eyebrow / headline / lead / content / optional CTA. Don't open HTML until copy is locked.
2. **Scaffold from `examples/homepage.html`.** Copy the file, rename, strip the body sections, keep head + footer + scripts (see section 1 — Page scaffold).
3. **Build top-down.** Site header → Hero → Section 2 → … → Closing CTA → Pre-footer Socials → Footer.
4. **Pick dark/light per section** as you go. Lock the first 3 dark; alternate after.
5. **Pick the right component** for each section — see section 3.
6. **Add stagger reveals** to card grids only. Section headings handle themselves.
7. **Verify HTML balance** before deploy: section / article / div / footer / nav opens match closes.
8. **Test reduced-motion.** Toggle in OS prefs, reload, confirm animations stop and content is at final state.

---

## 5. Brand tokens (foundation reference)

Token names + values + purpose. Used for inline-style escape hatches when a component-level modifier isn't enough.

### 5.1 Color tokens

**Brand orange ramp**
- `--orange-400: #FF7E32` — hover / lighter accent
- `--orange-500: #F24E1E` — primary brand orange (`--color-primary`)
- `--orange-600: #D14016` — pressed / accent (`--color-accent`)
- `--orange-700: #A23310` — deepest tint
- `--orange-rgb: 242, 78, 30` — channel token for `rgba(var(--orange-rgb), alpha)`

**Neutrals & surfaces**
- `--neutral-darker: #050505` — page background
- `--neutral-dark: #0A0A0A` — dark section surface
- `--neutral-light: #F5F5F7` — light section surface
- `--surface-light: #E8E8EA` — alt light surface
- `--surface-light-hover: #DCDCDE` — light surface hover
- `--surface-chrome-dark: rgba(10,10,10,0.80)` — translucent chrome (header / footer / drawer)
- `--surface-chrome-light: rgba(255,255,255,0.80)` — light-surface counterpart

**Text on dark**
- `--text-on-dark: #FFFFFF` · `--text-on-dark-display: rgba(255,255,255,0.95)`
- `--text-on-dark-muted: rgba(255,255,255,0.75)` · `--text-on-dark-subtle: rgba(255,255,255,0.65)`
- `--text-on-dark-second: rgba(255,255,255,0.60)` — display second line

**Text on light**
- `--text-on-light: #111111` · `--text-on-light-display: rgba(0,0,0,0.90)`
- `--text-on-light-muted: rgba(0,0,0,0.75)` · `--text-on-light-subtle: rgba(0,0,0,0.60)`
- `--text-on-light-second: rgba(0,0,0,0.65)` — display second line

**Borders & scrims**
- `--border-on-dark: rgba(255,255,255,0.08)` · `--border-on-dark-strong: rgba(255,255,255,0.12)`
- `--border-on-light: rgba(0,0,0,0.08)` · `--border-on-light-strong: rgba(0,0,0,0.12)`
- `--scrim-hover-on-dark: rgba(255,255,255,0.04)` · `--scrim-hover-on-light: rgba(0,0,0,0.04)`
- `--scrim-glass: rgba(255,255,255,0.10)` · `--scrim-glass-strong: rgba(255,255,255,0.18)` — over imagery
- `--scrim-glass-border: rgba(255,255,255,0.60)` · `--scrim-dark-pill: rgba(0,0,0,0.65)` — dark pills over images
- `--color-error: #E5484D` — error / `is-error` state

### 5.2 Type system

- **Body / display:** `'Geist', sans-serif` (weights 300 / 400 / 500 / 600)
- **Mono:** `'JetBrains Mono', monospace` (weights 500 / 600) — eyebrows, meta, code
- **Display H1:** Geist 300 with tabular-nums on stats
- **Eyebrow:** JetBrains Mono uppercase 11px / 0.18em letter-spacing
- **Body copy:** 17px / 1.7 line-height inside articles

### 5.3 Spacing scale

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` px. Section padding is 96px top/bottom; gutter / card gap defaults to 32px.

### 5.4 Radii

- `--r-control: 9999px` — pill (buttons, status pills, pill inputs)
- `--r-card: 12px` — content cards, default inputs
- `--r-surface-md: 16px` — dispatch card, modal, video embed, repo prominent
- `--r-surface: 32px` — large surfaces (hero ornaments)
- `--r-subtle: 4px` — checkboxes, tag chips, small chrome

### 5.5 Motion tokens

- `--ease-ui: cubic-bezier(0.4, 0, 0.2, 1)` — standard UI ease
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — fade-out / reveal
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — playful overshoot (rare)
- `--dur-fast: 150ms` — micro transitions
- `--dur-ui: 200ms` — decorative cap (default control transitions)
- `--dur-ext: 300ms` — extended (drawer slide, modal open)

### 5.6 Sizing tokens

- `--touch-target-min: 44px` — minimum hit area for any interactive control
- `--ds-header-h: 60px` — site header height (controls scroll-padding offset)
- `.ds-frame` max-width: `1200px` — page content gutter

---

## 6. Voice, tone & principles (compressed)

### 6.1 Voice rules

- Precise, developer-first, engineering-heavy. Assume the reader understands AI/ML basics.
- Functional headlines — short, punchy, action-oriented.
- Action-oriented CTAs — "Get API Key", "Quickstart", "Subscribe", "Talk to us".
- Avoid marketing fluff ("revolutionary", "next-generation", "AI-powered" without substance).
- No emoji-heavy copy.
- No vague claims without numeric or named proof.
- Break long sentences. Avoid excessive "and"; use periods or em-dashes.

### 6.2 Core metaphors

Reach for these when copywriting headlines and body:

- **Explode video** — what VideoDB does to a file.
- **Multidimensional indexes** — the output of indexing.
- **Perception layer for AI** — the system's role.
- **See and hear** — what agents gain.
- **Queryable, programmable, composable** — the developer experience.
- **Under-the-hood machinery / invisible layer** — what VideoDB is positionally.

### 6.3 Headlines pattern

- **Two-tone display heading is canonical.** First line is the assertion, second line is the qualifier in muted tone via `<span class="ds-hero__display-second">` or inline `style="color: var(--text-on-dark-second);"`.
- Short, punchy, action-oriented examples:
  - "Build agents that watch."
  - "Video as a queryable table."
  - "One backend for the entire video lifecycle."
  - "Give your AI eyes and ears."
- Don't mix multiple display fonts inside one heading.

### 6.4 CTA pattern

- Always pair **primary + ghost** inside `<div class="ds-cta-pair">` for hero and closing CTAs. Never two primaries in one viewport.
- Verbs only: "Get API key", "Read docs", "Start building", "Talk to us", "Subscribe", "Quickstart".
- Primary buttons close with `solar:arrow-right-linear`; ghost buttons that lead off-domain close with `solar:arrow-right-up-linear`.

### 6.5 Eyebrow pattern

- **Section numbering:** `01 / Section name` (uppercase mono via `.ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs ds-eyebrow--loose`).
- **Release notes / hero kickers:** `V2.4 · Release note · Short tagline`.
- **Article meta:** `Field note · Apr 20, 2026 · 2 min`.
- Eyebrows never stand alone — always paired with the heading directly below.

### 6.6 System anti-patterns (Don't do these)

- Don't add new colors outside the orange + neutral palette. Use existing tokens.
- Don't introduce new fonts. Geist + JetBrains Mono only.
- Don't write new classes when an existing component covers it. Browse the system first.
- Don't auto-decorate every element with `data-ds-reveal`. Headlines + heroes only.
- Don't add parallax, scroll-scrub, or other scroll-driven effects beyond the sanctioned reveal.
- Don't mix multiple display fonts in one heading.
- Don't use gradient surfaces. Flat fills + 1px hairline borders are the visual vocabulary.
- Don't include the Particle dome below the fold. Hero only.
- Don't ship a footer without the compliance row. Use a plain `<footer>` with a meta strip instead if compliance doesn't apply.
- Don't use discs, checkmarks, dashes, or numbered lists for feature bullets — `ds-vbar` is the brand's bullet identity.
- Don't use Yes/No in compare tables — use the iconify check or em-dash, with real values where possible.
- Don't competing-CTA: one primary per viewport.
- Don't required-field asterisks: every visible field is required unless explicitly optional.

---

## 7. Build & deploy

### 7.1 Single-file portability

Every page is a standalone HTML file with the canonical CSS and JS inlined. No build step, no bundler. The canonical CSS lives in `examples/homepage.html` lines 19–5451 (~5,400 lines) — copy verbatim into every new page. One-off page CSS goes in a second `<style>` block after the canonical one.

### 7.2 CDN dependencies

- **Iconify** (`code.iconify.design/iconify-icon/1.0.7`) — required on every page.
- **Google Fonts** (Geist 300/400/500/600 + JetBrains Mono 500/600) — required on every page; preconnect tags above.
- **Three.js r128** (`cdnjs.cloudflare.com`) — required **only** on pages with `ds-particle-dome`. Drop the script tag otherwise. ~150 KB gzipped.

### 7.3 Vercel routing

- `vercel.json` drops the `.html` extension on URLs.
- Inside `index.html` the docs use hash routing (`#atoms/button`, `#organisms/feature-card`, etc.) — pages activate via the `activatePage(parseHash())` boot call.

### 7.4 File structure of the repo

```
videodb-design/
├── design.md        # This file — single source of truth
├── index.html       # Live implementation — open to look up any component
├── examples/        # Generated pages built from the design system
│   ├── homepage.html
│   ├── platform.html
│   └── agentic-perception.html
├── assets/
│   ├── logos/
│   ├── customer-logos/
│   ├── partner-logos/
│   └── compliance-logos/
├── vercel.json      # Clean URL routing
└── README.md
```

To look up any component spec live: open `index.html` in a browser, navigate to `#atoms/button`, `#molecules/section-heading`, `#organisms/feature-card`, `#templates/hero`, `#motion/particle-dome`, etc.

---

## 8. Notes on inventory structure

Architectural observations about how the system is organized — not gaps in coverage.

- **Editorial primitives ship as one doc page, three distinct primitives** — `index.html` has a single `organisms/editorial-primitives` page covering Pull quote, Labeled callout, and Decision list. They're documented as three separate entries in section 3.3 because they're independent primitives composed independently. Together with `ds-highlight`, `ds-article-hero`, and `ds-article-toc`, that's the 6 editorial organisms.
- **Additional loading primitives** — `ds-spinner`, `ds-skeleton`, and `ds-progress` ship in the same `atoms/loaders` page as `ds-dot-loader` and `ds-status-pulse`. They aren't counted as separate atoms in the inventory but exist as utility classes — see the end of the `ds-dot-loader` entry in section 3.1 for usage.

---

## When stuck

- Open `index.html` and navigate to the relevant component / template page for the live preview.
- Read the live preview's source via browser DevTools to see exact CSS.
- Match the existing pattern. If a need doesn't fit any component, document the gap before reaching for new CSS.
