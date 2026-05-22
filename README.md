# VideoDB — Design System + Marketing Pages

The v2 atomic design system for VideoDB, plus marketing pages built on it.

## What's in this repo

```
videodb-design/
├── design.md               # Single source of truth — agent-feed spec
│                           # (scaffold + components + recipes + tokens + principles)
├── index.html              # Live implementation — design system docs page
│                           # (hash-routed previews of every component)
├── examples/               # Generated pages built from design.md + index.html
│   ├── homepage.html       # Marketing homepage example
│   ├── platform.html       # Platform feature page example
│   └── agentic-perception.html # Agentic perception landing page example
├── assets/                 # Logos, customer logos, partner logos, compliance
│   ├── logos/
│   ├── customer-logos/
│   ├── partner-logos/
│   └── compliance-logos/
├── vercel.json             # Clean URL routing (drops .html extensions)
└── README.md
```

History and build decisions live in `01_website/archive/` — `2026-05-19-design-system-development-log.md` is the full v2 rebuild journal. Pre-merge fragments (`PAGE_BUILDER_PROMPT.md`, `components.md`) are archived alongside it.

## Building a new page

Paste `design.md` into your AI agent's context (Claude, ChatGPT, Cursor, etc.) along with the page brief. design.md is the single source of truth for the v2 system — it covers page scaffold boilerplate, universal conventions, every component's HTML anatomy (17 atoms / 12 molecules / 37 organisms / Motion family / 7 Data Viz / 1 illustration / 13 templates), page recipes, brand tokens, and voice principles in one file.

`index.html` remains the canonical live implementation — open it in a browser for visual previews and to copy real shipping HTML if anything in `design.md` conflicts with what ships.

The previous v1 design.md was archived 2026-05-19 to `01_website/archive/2026-05-19-design-md-v1-legacy.md` — it documented a pre-v2 system. The intermediate `PAGE_BUILDER_PROMPT.md` + `components.md` two-file split was merged into the current design.md.

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

## Deploy to Vercel

Push this folder to GitHub, then connect the repo to Vercel:

1. `git init`
2. `git add . && git commit -m "Initial design system + pages"`
3. `git remote add origin git@github.com:<you>/videodb-design.git`
4. `git push -u origin main`
5. In Vercel: New Project → import the repo → Framework Preset: **Other** → Deploy.

Vercel auto-detects static HTML and serves the folder as-is. No build command needed.

### URLs after deploy

| Path | Page |
|---|---|
| `/` | Design system docs |
| `/examples/homepage` | Marketing homepage example |
| `/examples/platform` | Platform page example |
| `/examples/agentic-perception` | Agentic perception example |

The design system's internal navigation uses hash routing (`#atoms/button`, `#organisms/footer`, etc.) — all inside `index.html`.

## What's in the design system

- **Foundations** — tokens, type, color, spacing, motion, scroll reveal
- **18 Atoms** — buttons, inputs, badges, eyebrows, vbars, dot loaders, status pulses, status pills, menu toggle (v2.1)
- **14 Molecules** — form fields, section headings, CTA pairs, code tabs, stat blocks, subscribe band, trust band (v2.1), mode grid (v2.1)
- **37 Organisms** (9 subgroups) — cards (feature / content / pricing / logo / social / etc.), tickers, modals, footer (Directory + Editorial variants), site header, mobile drawer, code blocks
- **Motion** — 2 components (Particle dome, Motion wrapper) + 2 examples (Timeline scrubber, Ingestion pipeline) + 2 authoring methods (Interactions guide, Hyperframes guide), plus a shared atom vocabulary (connectors, arrows, packet tokens, node containers, grid-frame texture)
- **7 Data Viz** — Stats (row + column), Callout metric, Before/after compare, Bar chart, Column chart, Trend line, Architecture flow — all dark + light, all with scroll-reveal entrance + hover interactions, ≥ 11 px label floor
- **1 Illustration** — ASCII pixel-to-binary morph (scroll-triggered, vanilla canvas, honours `prefers-reduced-motion`)
- **13 Templates** — Section structure, Hero composition (5 variants incl. animated), Problem/Solution, Article shell, Lifecycle grid, Platform overview, Feature grid, Industries grid, Use case row, Sync compare, Diagrams, Roadmap timeline, Pre-footer Socials

## Conventions

- **Single-file portability** — each HTML page is fully standalone (CSS + JS inlined). No build step, no module resolution.
- **CDN dependencies** — Iconify, Three.js (only on pages that use the Particle dome), Google Fonts (Geist + JetBrains Mono).
- **Dark + light surfaces** — most components ship both surface variants via `--dark` / `--light` modifiers.
- **Scroll reveal** — section headings + heroes auto-fade-in on viewport entry. Honors `prefers-reduced-motion`.
- **Hash routing** — design system pages route via URL hash. Direct links like `#templates/hero` work.

## Brand

VideoDB. Data infrastructure for video, built for machines and agents. Cyber-minimalist, pure black + orange (#F24E1E), Manrope + JetBrains Mono.

— Maintained by Gaurav.
