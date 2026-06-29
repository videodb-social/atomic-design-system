# VideoDB — Design System

Agent source of truth for brand, UI, and design decisions — the v2 atomic design system for videodb.io marketing surfaces.

## What's in this repo

```
videodb-design/
├── design.md               # Single source of truth — agent-feed spec
│                           # (scaffold + components + recipes + tokens + principles)
├── index.html              # Live implementation — design system docs page
│                           # (hash-routed previews of every component)
├── assets/                 # Brand assets
│   ├── logos/              # Wordmarks, combination marks, lockups
│   ├── illustrations/
│   │   └── sources/        # Source files for ASCII / SVG illustrations
│   ├── motion/             # Motion asset sources (Lottie JSON, video references)
│   ├── customer-logos/
│   ├── partner-logos/
│   └── compliance-logos/
├── scripts/
│   └── ds/                 # Drop-in DS utilities (see DS scripts below)
├── vercel.json             # Clean URL routing (drops .html extensions)
└── README.md
```

## Building a new page

Paste `design.md` into your AI agent's context (Claude, ChatGPT, Cursor, etc.) along with the page brief. design.md is the single source of truth for the v2 system — it covers page scaffold boilerplate, universal conventions, every component's HTML anatomy (18 atoms / 21 molecules / 42 organisms / Motion family / 7 Data Viz / 1 illustration / 18 templates), page recipes, brand tokens, and voice principles in one file.

`index.html` remains the canonical live implementation — open it in a browser for visual previews and to copy real shipping HTML if anything in `design.md` conflicts with what ships.

## Local preview

Open any HTML file directly in a browser — no build step, no dependencies to install. Three.js (for the Particle dome) and Iconify (for icons) load from CDN at runtime.

For local serving:

```bash
python3 -m http.server 8080
# → http://localhost:8080/
```

## Changelog — how to read it

Current version: **v2.1.1** (footer chevron desktop-leak patch, 2026-05-22). Prior: v2.1 (mobile-responsive patch round, 2026-05-21), v2.0 (initial atomic spec).

Two synchronised surfaces — both stay in lockstep:

| Surface | Format | Read this when |
|---|---|---|
| `design.md` (top of file) | Markdown changelog sections, newest version first | You want the full agent-feed spec for a version — every base-rule update, every new modifier, every removed component. Also feeds AI agents that build pages. |
| `index.html` sidebar group → `#vX.Y.Z/changelog` route | Live HTML page inside the docs showcase | You want a click-through preview — each changelog entry links to the affected component's anatomy page. Run it locally, jump straight to `http://localhost:8080/#v2.1.1/changelog`. |

**Sidebar markers** (legend lives on each changelog page too):

| Marker | Meaning |
|---|---|
| Orange **NEW** | Net-new component, modifier, or template added in this version. |
| Orange `*` | Existing component received base-rule updates, new modifiers, or stale-component removal in this version. See the page for an orange-bordered callout listing what changed. |

**Per-page change notes** — every `*`-marked component page in `index.html` carries an inline callout below its H1 listing the specific selectors / values / new modifiers that landed in the version that touched it. One source of truth per page; no hunting through changelog cross-references.

**Convention for new patch versions:**

1. Bump the `**Version:**` line at the top of `design.md`.
2. Add a new `## vX.Y.Z changelog — what changed (YYYY-MM-DD)` section above the prior version's section.
3. In `index.html`: add an orange `vX.Y.Z patch · NEW` sidebar group above the prior version's group, link to a new `<section data-page="vX.Y.Z/changelog" class="ds-page">` route.
4. If the new version uses the anatomy `<pre>` styling, extend the selector at the bottom of the head `<style>` block to include `[data-page^="vX.Y.Z/"]`.
5. Add inline patch notes on every component-anatomy page that the version touched.

## Review mode — point-and-click feedback

The design system docs page ships with an optional review harness (in `scripts/ui-review-flow/`) for leaving Figma-style pin comments on any component. Useful for back-and-forth design feedback before a PR, or for collaborators to flag bugs without leaving the page.

**To leave feedback:**

1. Open the docs page with `?review=1` on the URL — e.g. `http://localhost:8080/?review=1` for local, or `https://<deployed-url>/?review=1` for staging.
2. Click any element. A pin drops with a comment panel — type your note, paste screenshots with Cmd/Ctrl+V, add reference URLs. Save.
3. Repeat for every piece of feedback. Pin colours: orange (open), blue (needs review — set after an AI response comes back), grey (resolved).
4. Click **Submit feedback** in the sidebar. The browser picks a folder once (remembered via IndexedDB) and writes `feedback-bundle-LATEST.json` + extracts attachments to `<folder>/attachments/<comment-id>/`. Share that folder with your collaborator / AI agent.
5. When responses come back as `response-bundle-LATEST.json`, click **Load Claude responses…** in the sidebar — pin statuses flip to needs-review with replies attached.

**Pages without `?review=1` are unaffected.** The conditional loader in `index.html` short-circuits before fetching any harness files — production users pay 0 KB.

See `scripts/ui-review-flow/README.md` for the full harness reference (file structure, auto-tagging notes, how to adopt the bundle on another project).

## What's in the design system

- **Foundations** — tokens, type, color, spacing, motion, scroll reveal
- **18 Atoms** — buttons, inputs, badges, eyebrows, vbars, dot loaders, status pulses, status pills, menu toggle, skip link
- **21 Molecules** — form fields, section headings, CTA pairs, code tabs, stat blocks, subscribe band, trust band, mode grid, feature list, recap grid, recap report, iframe wrap, careers list, kv list, digest form
- **42 Organisms** (9 subgroups) — cards (feature / content / pricing / logo / logo-grid / social / testimonial / investor / partner / showcase / etc.), tickers, community ticker, modals, footer (Directory + Editorial variants), site header, mobile drawer (side-slide + top-down), code blocks, quickstart tabs
- **Motion** — 2 components (Particle dome, motion-clip) + 2 examples (Timeline scrubber, Ingestion pipeline) + 2 authoring methods (live-illustrations-guide, Hyperframes guide), plus a shared atom vocabulary (connectors, arrows, packet tokens, node containers, grid-frame texture)
- **7 Data Viz** — Stats (row + column), Callout metric, Before/after compare, Bar chart, Column chart, Trend line, Architecture flow — all dark + light, all with scroll-reveal entrance + hover interactions, ≥ 11 px label floor
- **1 Illustration** — ASCII pixel-to-binary morph (scroll-triggered, vanilla canvas, honours `prefers-reduced-motion`)
- **18 Templates** — Section structure, Hero composition (6 variants incl. animated + split), Problem/Solution, Article shell, Feature and benefit grid, Industries grid, Sync compare, Diagrams, Roadmap timeline, Pre-footer Socials, Sticky scroll, Hero with dome, Recap band, Showcase 3-up, Pre-footer ASCII, Onboarding

## Conventions

- **Single-file portability** — each HTML page is fully standalone (CSS + JS inlined). No build step, no module resolution.
- **CDN dependencies** — Iconify, Three.js (only on pages that use the Particle dome), Google Fonts (Geist + JetBrains Mono).
- **Dark + light surfaces** — most components ship both surface variants via `--dark` / `--light` modifiers.
- **Scroll reveal** — section headings + heroes auto-fade-in on viewport entry. Honors `prefers-reduced-motion`.
- **Hash routing** — design system pages route via URL hash. Direct links like `#templates/hero` work.

## DS scripts (`scripts/ds/`)

Drop-in vanilla JS utilities. No bundler required — `<script src="scripts/ds/foo.js">` on any page.

| File | What it does |
|---|---|
| `ds-form-submit.js` | POST form handler with a sending / success / error state machine on the submit button. Targets `data-ds-form` forms; works with Formspark or any JSON-endpoint. |
| `ds-marquee.js` | Smooth-pause controller for `.ds-marquee[data-ds-marquee]` tracks — eases the scroll speed to zero on hover/focus rather than snapping `animation-play-state`. Also exposes `window.dsSmoothPause()` for custom triggers. |
| `ds-proximity-hover.js` | Dock-style proximity scale: items inside `[data-ds-proximity]` scale softly toward the cursor position, creating a gradient magnification effect without a hard `:hover` boundary. |
| `ds-snippet-copy.js` | Delegated copy-to-clipboard for all `.ds-snippet__copy` buttons on the page. Reads `data-copy-text` when present so the clipboard receives raw text even when the visible code has coloured spans. |
| `ds-spotlight.js` | Scroll-driven row spotlight for `.ds-spotlight-list` — marks the row nearest the viewport pivot as `.is-spotlight`, dims the rest, and hands focus off to a `.ds-spotlight-row__finale` card at the end of the list. |
| `ds-sticky-wipe.js` | Drives `--ds-wipe-p` (0 → 1) on `.ds-sticky-wipe` elements from scroll position, powering the "big visual holds, then a content card rises" choreography. Tune via `--ds-wipe-hold-px` and `--ds-wipe-slowness`. |
| `verify-widows.mjs` | Dev / CI tool: static heuristic screen for typographic widows in headline and lead copy across built HTML files. Pass `--strict` to fail CI on any candidate. |

## Brand

VideoDB. Data infrastructure for video, built for machines and agents. Cyber-minimalist, pure black + orange (#F24E1E), Geist + JetBrains Mono.

— Maintained by the Design Team.
