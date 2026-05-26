# Atomic Design System — local snapshot

This folder is a **read-only local snapshot** of the VideoDB v2 atomic design system. The upstream source repo lives at [github.com/videodb-social/atomic-design-system](https://github.com/videodb-social/atomic-design-system). New versions land there first and are pulled down into this folder when the marketing site resyncs.

You're looking at the reference material — the actual website pages live one level up at the repo root.

## What's actually in this folder

```
atomic-design-system/
├── README.md               ← you're here
├── design.md               Single source of truth — the agent-feed spec
│                           (scaffold + components + recipes + tokens + principles)
├── index.html      Live implementation — design system docs page
│                           (hash-routed previews of every component).
│                           Renamed locally from upstream `index.html` so it
│                           doesn't collide with the marketing site's index.html.
└── examples/
    └── homepage.html       Structural reference — exact copy of the live
                            marketing homepage. Used by the resync workflow
                            (see DESIGN_SYSTEM.md) and as a "real page built
                            from this system" reference.
```

That's it. Logos, partner logos, compliance badges, the standalone hosting plumbing (`vercel.json`, `404.html`), and the review-mode scripts all live at the marketing-site repo root — they don't need a second copy in here.

## How to use this snapshot

There are two ways:

**As an AI agent feed.** Paste [`design.md`](./design.md) into your AI assistant's context (Claude, ChatGPT, Cursor) along with the brief for the page you're building. It's the single source of truth for the v2 system — page scaffold boilerplate, universal conventions, every component's HTML anatomy, page recipes, brand tokens, and voice principles in one file.

**As a visual reference.** Open [`index.html`](./index.html) directly in a browser (no build step). It's hash-routed, so you can deep-link to any component: `index.html#organisms/footer`, `index.html#templates/hero`, etc. Use this when `design.md` is ambiguous and you want to see what a component actually looks like, or to copy real shipping HTML.

If the two ever disagree, the live HTML wins — `design.md` lags `index.html` by ~a patch version sometimes.

## How this snapshot relates to the marketing site

The marketing site at the repo root **inlines** the design system's canonical CSS into `src/partials/css.html`. That CSS is sourced from this snapshot's `examples/homepage.html` (lines 19–5775 of that file are the canonical `<style>` blocks). Resyncing the snapshot and re-inlining the CSS is a single sed command — see the resync section of [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md).

The marketing site also intentionally diverges from the system in a small number of places — those overrides live in `src/partials/css_site_overrides.html` and are tracked in a table in [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md). Site-specific fixes that should eventually land upstream are tracked separately in [`../DS_PROPOSALS.md`](../DS_PROPOSALS.md).

## What's in the design system itself

For the live, accurate inventory of atoms / molecules / organisms / templates and their version-by-version changes, read [`design.md`](./design.md) directly — it carries an in-file changelog at the top and lists every component with its anatomy. Pinning counts here would just go stale.

The big-picture buckets are:

- **Foundations** — design tokens, type scale, color, spacing, motion, scroll-reveal behaviour
- **Atoms** — buttons, inputs, badges, eyebrows, vbars, dot loaders, status pulses, status pills, menu toggle, skip link, and similar low-level primitives
- **Molecules** — form fields, section headings, CTA pairs, code tabs, stat blocks, subscribe band, trust band, mode grid, feature list, and similar small compositions
- **Organisms** — feature/content/pricing/logo/testimonial cards, tickers, modals, the Directory and Editorial footer variants, the site header, mobile drawer (side-slide + top-down), code blocks
- **Motion family** — Particle dome, Motion wrapper, plus a shared atom vocabulary (connectors, arrows, packet tokens, node containers, grid-frame texture) and authoring guides (Interactions, Hyperframes)
- **Data Viz** — Stats (row + column), Callout metric, Before/after compare, Bar chart, Column chart, Trend line, Architecture flow — all dark + light, all scroll-revealed, ≥ 11px label floor
- **Illustration** — ASCII pixel-to-binary morph (scroll-triggered, vanilla canvas, honours `prefers-reduced-motion`)
- **Templates** — Section structure, Hero compositions, Problem/Solution, Article shell, Feature/benefit grid, Industries grid, Sync compare, Diagrams, Roadmap timeline, Pre-footer Socials, Sticky scroll, Closing CTA, Onboarding

## Local preview

```bash
# From the repo root:
python3 -m http.server 8080
# then open http://localhost:8080/docs/atomic-design-system/index.html
```

No build step. Three.js (for the Particle dome) and Iconify (for icons) load from CDN at runtime.

## Reading the design-system changelog

`design.md` keeps a changelog section at the top of the file, newest version first. Each entry lists the base-rule updates, new modifiers, and removed components for that version. The same content is mirrored in `index.html` under the `#vX.Y.Z/changelog` hash route.

Two visual markers help you scan the sidebar inside `index.html`:

| Marker | Meaning |
|---|---|
| Orange **NEW** | Net-new component, modifier, or template added in this version. |
| Orange `*` | Existing component received base-rule updates, new modifiers, or stale-component removal in this version. The page carries an orange-bordered callout listing what changed. |

## Conventions

- **Single-file portability** — every shipping HTML page is fully standalone (CSS + JS inlined). No build step, no module resolution.
- **CDN dependencies** — Iconify, Three.js (only on pages that use the Particle dome), Google Fonts (Geist + JetBrains Mono).
- **Dark + light surfaces** — most components ship both surface variants via `--dark` / `--light` modifiers.
- **Scroll reveal** — section headings and heroes fade in on viewport entry. Honours `prefers-reduced-motion`.
- **Hash routing inside `index.html`** — direct links like `#templates/hero` work.

## Brand

VideoDB. Data infrastructure for video, built for machines and agents. Cyber-minimalist: pure black + orange (`#F24E1E`), Geist (body, display), JetBrains Mono (eyebrows, metadata, code chrome). The full brand rules — including the non-negotiables and the table of site-specific overrides — live in [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md).

## Where else to look

- [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) — how the marketing site consumes this snapshot. Start here when editing a page.
- [`../DS_PROPOSALS.md`](../DS_PROPOSALS.md) — fixes drafted on the marketing site that should be promoted upstream into this system.
- [`../REVIEW_MODE.md`](../REVIEW_MODE.md) — the `?review=1` pin-and-comment overlay for design feedback.
- [`../../README.md`](../../README.md) — the marketing-site repo overview.
