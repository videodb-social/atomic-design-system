# VideoDB Design System — Single Source of Truth

**Version:** v2.2.2 (company + developers page lift — foundation tunings (vbar, reveal, lead, footer) + opt-in particle gradient + hero cascade, 2026-05-25)
**Prior:** v2.2.1 (cleanup pass — deprecated templates removed, Feature grid renamed, Problem/Solution + Pricing card variant B refreshed, 2026-05-22) · v2.2.0 (homepage promotion batch, 2026-05-22) · v2.1.1 (footer chevron desktop-leak patch, 2026-05-22) · v2.1 (mobile-responsive patch round, 2026-05-21) · v2.0 (initial atomic spec)

## How to use this file

This is the canonical spec for the VideoDB v2 atomic design system. It is optimised for agents that generate marketing pages from briefs — read top-down and you'll have everything you need at each stage of assembly. Sections 1–2 cover page assembly. Section 3 is the per-component anatomy lookup. Sections 5–8 carry the foundation tokens, voice rules, and build conventions. `index.html` is the live source of truth on any conflict — open it locally to see component previews and the canonical CSS.

## TL;DR — the system in 200 words

VideoDB is a perception layer for AI — data infrastructure for video, built for machines and agents. The v2 design system covers every marketing surface (videodb.io and adjacent pages) for an audience of AI engineers, software architects, multimedia developers. It is **single-file, no build step** — every page is a standalone HTML file with the canonical CSS and JS inlined; Three.js loads from CDN only when a Particle dome is on the page. The architecture is atomic: **18 atoms** compose into **21 molecules**, **42 organisms**, 2 motion components + 2 examples + 2 authoring methods + 1 shared atom vocabulary, 7 data-viz pieces, 1 illustration primitive, and 18 page-level templates. Every component carries `--dark` / `--light` (or `--on-dark` / `--on-light`) modifiers; pages alternate dark and light section surfaces in a stable rhythm — first 2–3 dark, middle shuffle, closing 3–4 dark. The brand is pure black with an orange accent (`--orange-500: #F24E1E`), Geist for body, JetBrains Mono for chrome. Flat fills + 1px hairline borders are the visual vocabulary; gradients, multiple fonts, and pixel ornament are out of bounds. Section padding is **96/80/64/52** px top/bottom across desktop → small-phone breakpoints; scroll-reveal decorates `.ds-section-heading` and `.ds-hero` automatically.

## v2.2.2 changelog — what changed (2026-05-25)

Lift round driven by the videodb-website Company + Developers page revamps (pass 1 = 55 pins c-001 → c-055, pass 2 = 49 pins c-056 → c-104). Both pages were rebuilt against the v2.2.1 system and surfaced patterns at every tier — foundation tunings, new molecules, new organisms, new templates — that belong in the design system itself, not as page-scoped `vh-*` overrides.

This is the first release where every entry in the showcase carries its **canonical code name as a chip next to the breadcrumb** so non-technical readers can scan the catalog without opening DevTools. Auto-injected via a manifest in the boot script (`CODE_NAMES`).

### Summary — at a glance

| Tier | Code name | Plain-English purpose | Status |
|---|---|---|---|
| **Foundation · Animation** | `.ds-reveal` | Site-wide scroll entrance — softer, longer, deeper curve | RE-TUNED (720ms / 18px / outQuint) |
| **Foundation · Animation** | `.ds-reveal--slow` | Ceremonial long-form variant for pre-footer ASCII | NEW MODIFIER (50px / 1500ms) |
| **Foundation · Atom** | `.ds-vbar` | Vertical bar bullet — opacity halved (less loud in dense stacks) | RE-TUNED |
| **Foundation · Molecule** | `.ds-section-heading__lead` | Section subcopy — 18 → 16px base | RE-TUNED |
| **Foundation · Organism** | `.ds-footer` | No top border + gradient fill — seamless flow from section above | RE-TUNED |
| **Foundation · Composite** | `.ds-section--blend-to-footer` | Gradient bg fade into the following footer | NEW MODIFIER |
| **Foundation · Container** | `.ds-footer__prelude-ascii` | Canvas wrapper for the pre-footer ASCII illustration | NEW |
| **Foundation · Convention C11** | `main ::selection` palette | Grey body / orange titles — global text-selection styling | NEW CONVENTION |
| **Foundation · Mobile** | `.ds-frame` padding 20 → 32px @ ≤640px | More breathing room on phones | RE-TUNED |
| **Foundation · Mobile** | `.ds-hero__lead` 18 → 16px @ ≤768px | Quieter hero subcopy | RE-TUNED |
| **Molecule** | `.ds-recap-grid` | 5-tile bento photo grid w/ staggered reveal | NEW |
| **Molecule** | `.ds-recap-report` | Month label + flex-end packed stat row | NEW |
| **Molecule** | `.ds-iframe-wrap` | Fixed-width 880px wrapper for embedded iframes (Luma, video, forms) | NEW (generalized from luma-wrap) |
| **Molecule** | `.ds-careers-list` | Layout-only definition-list for job rows | NEW (layout only) |
| **Molecule** | `.ds-kv-list` | Layout-only 2-col label/body rows w/ hover tint | NEW (layout only) |
| **Molecule** | `.ds-digest-form` + `__visual` | Subscribe Band variant w/ side visual | NEW |
| **Molecule** | `.ds-subscribe-band` | Pill input radius baked in as canonical (no modifier needed) | UPDATED |
| **Organism** | `.ds-investor-card` | Circular avatar + name + bio for named investor rows | NEW |
| **Organism** | `.ds-partner-card` | Height-locked logo card for design-partner rows | NEW |
| **Organism** | `.ds-showcase-card` | 3-up media card w/ thumb + body for "Built on" showcase | NEW |
| **Organism** | `.ds-community-ticker` | Testimonial marquee w/ press-and-hold slow mode | NEW (variant on testimonials-ticker) |
| **Organism** | `.ds-quickstart-tabs` | Multi-body code block w/ per-tab typewriter + active-tab clipboard | NEW |
| **Template** | `templates/pre-footer-ascii` | **"To see is to know"** ASCII brand sign-off — canonical close | NEW (replaces closing-particle-field) |
| **Template** | `templates/recap-band` | "What we've been up to" — bento + month/stats report | NEW |
| **Template** | `templates/showcase-3up` | "Built on VideoDB" — 3-up media card row | NEW |
| **Template** | `templates/hero-with-dome` | Hero composition + particle dome + stats strip + cascade reveal | NEW |
| **Template** | `templates/onboarding` | Code block on the right now has typewriter on load | UPDATED |
| **Engine** | `createParticleEngine` | Opt-in `config.gradient = {top, bottom}` for per-vertex color lerp | EXTENDED (non-breaking) |
| **Engine** | `decorateReveals()` | Hero cascade — per-child stagger on `<section id="hero">` | EXTENDED |
| **Showcase chrome** | Anatomy `<pre>` styling | Globalized: grey stroke, dark fill, 30px padding, no per-line bg | RESTYLED |
| **Showcase chrome** | Code-name chip next to breadcrumb | Auto-injected on every preview via `CODE_NAMES` manifest | NEW |
| **Templates STALE** | `templates/closing-particle-field` | Superseded by Pre-footer ASCII band — 1-release deprecation | MOVED TO STALE |

### Counts

- Atoms: 19 (no change)
- Molecules: 15 → **21** (+6 new: recap-grid, recap-report, iframe-wrap, careers-list, kv-list, digest-form; 1 updated: subscribe-band)
- Organisms: 38 → **43** (+5 new: investor-card, partner-card, showcase-card, community-ticker, quickstart-tabs)
- Templates: 13 → **17** active + **1 stale** (4 new: pre-footer-ascii, recap-band, showcase-3up, hero-with-dome; 1 updated: onboarding; 1 moved to Stale: closing-particle-field)
- Conventions: 10 → **11** (+1 new: ::selection palette)
- New modifiers: 3 (`.ds-reveal--slow`, `.ds-section--blend-to-footer`, `data-ds-particle-gradient` attribute family)
- New containers: 1 (`.ds-footer__prelude-ascii`)
- Showcase chrome: 2 improvements (Anatomy pre-block restyled globally; code-name chips on every entry)

### Rationale

The Company + Developers pages both pushed against the same set of foundation frustrations: reveals felt rushed, dividers read too loud, subcopy out-shouted body, footer hairline broke the section-to-footer flow, OS-default text selection was off-brand. Those tunings ride into the system as canonical defaults so every future page inherits the polished baseline.

Beyond foundation tunings, both pages introduced full new patterns at molecule/organism/template tier:

- The **Pre-footer ASCII band** ("To see is to know" + hand-rendered ASCII) is now the canonical brand sign-off across every page. It replaces the older orange-particle closing CTA template, which is moved to a new **Stale folder** for 1-release deprecation.
- The **Showcase, Recap, and Hero-with-dome** templates capture three full folds that recur across the latest page set.
- The **Investor / Partner / Showcase card** organisms cover the named-portrait, design-partner-logo, and 3-up-media-thumbnail patterns respectively. Naming note: the existing `ds-build-card` (editorial "How I built" article card) is unrelated — the `vh-built-card` pattern for "Built on VideoDB" was lifted as `ds-showcase-card` to avoid collision.
- The **Community ticker** is a press-and-hold-to-slow variant of the existing testimonials-ticker — useful when you want kinetic motion but readable on demand.
- The **Quickstart tabs** organism formalizes the multi-body code block with per-tab typewriter + active-tab clipboard pattern used for multi-runtime install rows.
- Two **layout-only molecules** (`ds-careers-list`, `ds-kv-list`) lift the definition-list and key-value-list row layouts without prescribing content — content is caller-supplied.
- A **Subscribe Band** update bakes the pill input radius into the canonical wrapper (no `.ds-input--pill` modifier needed inside `.ds-subscribe-band`).
- One **convention** added: C11 — global `::selection` palette scoped to `<main>` so chrome retains OS default.

### Showcase chrome improvements (every preview benefits)

Two changes apply across the entire showcase, not just the new entries:

1. **Code-name chips next to breadcrumbs.** Every preview page (existing + new) shows its canonical class name in an orange chip next to the breadcrumb (e.g. `Atoms / Button · ds-btn`). Non-technical readers can scan the catalog and read off code names without inspecting CSS. Manifest is `CODE_NAMES` in the boot script — add an entry there when registering a new preview.

2. **Anatomy `<pre>` block restyled globally.** Previously a per-route override applied dark styling to ~10 specific pages; every other page fell back to default browser <pre> with a white stroke and per-line backgrounds. v2.2.2 promotes this to a global `.ds-page pre` rule: grey stroke (`--charcoal`), very dark fill (`--neutral-darker`), 30px padding all around, and `.ds-page pre *` background-transparent to kill the per-line tint that ships from inline span chrome.

### Stale folder

This is the first release with a dedicated **Stale folder** in the sidebar (collapsed by default). Superseded entries land here for 1 release before being removed entirely. Stale entries render their preview pages with a `Deprecated v2.2.2` banner at the top pointing to the canonical replacement. Active deprecations:

- `templates/closing-particle-field` → use `templates/pre-footer-ascii` instead

Per user direction, the following entries that were marked DELETED in v2.2.1 are **kept active** in v2.2.2 (not moved to Stale):

- `templates/lifecycle-grid`
- `templates/use-case-row`
- `organisms/cta-band`
- `templates/onboarding` (kept + enhanced with typewriter on the right-column code block)

### Migration

None required.

- Foundation re-tunings (`.ds-vbar`, `.ds-reveal`, `.ds-section-heading__lead`, `.ds-footer`, mobile `.ds-frame` / `.ds-hero__lead`) are drop-in.
- New modifiers / containers / molecules / organisms / templates are all opt-in. Existing pages render unchanged.
- `::selection` is global but scoped to `<main>` so chrome (header / drawer / footer) keeps OS-default behaviour. Pages that previously hand-rolled their own `::selection` rule should remove it.
- `createParticleEngine` callers that don't supply `config.gradient` see no behaviour change.
- Hero cascade auto-decorator only fires on `<section id="hero">` elements.
- `.ds-subscribe-band` canonical: pages can drop the redundant `.ds-input--pill` modifier inside the wrapper. The modifier still works standalone (for inputs outside a Subscribe Band).
- Pages still pointing at `templates/closing-particle-field` should migrate to `templates/pre-footer-ascii` before v2.2.3.

Full prototype trail: `videodb-website/feedback/DEVELOPERS-REVAMP-REPORT.md` + `videodb-website/src/CHANGELOG.md` (Company + Developers pass entries 2026-05-22 → 2026-05-25).

### `index.html` updates

**Foundation:**
- `.ds-reveal` rule patched + `.ds-reveal--slow` modifier added next to base; `prefers-reduced-motion` block expanded to cover the modifier.
- `.ds-vbar` + `.ds-vbar--orange` opacity values updated; inline comment cites c-077 rationale.
- `.ds-section-heading__lead` base font-size updated to 16px.
- `.ds-footer` `border-top` zeroed; `.ds-footer--dark` and `.ds-footer--light` switched to gradient fills.
- `.ds-footer__prelude-ascii` container rules added below the existing prelude rules; canvas-attribute baseline documented in the inline comment.
- `.ds-section--blend-to-footer.ds-section--dark` + `.ds-section--blend-to-footer.ds-section--light` rules added next to `.ds-section--tight`.
- Global `::selection` palette added below the focus-visible block (two separate rule sets per the browser quirk note).
- Mobile breakpoint block: `.ds-frame` padding `20 → 32px` at `≤640px`; new `.ds-hero__lead { font-size: 16px }` at `≤768px`.
- `.ds-subscribe-band` wrapper + auto-pill rule added next to `.ds-input--pill`.

**Showcase chrome:**
- Per-route Anatomy `<pre>` overrides replaced with global `.ds-page pre` rule (grey stroke, dark fill, 30px padding, descendant background-transparent).
- `.ds-code-name` CSS rule added for the orange code-name chip; `CODE_NAMES` manifest + `injectCodeNames()` function added at the top of the boot script; runs once on DOMContentLoaded and walks every `.ds-page` to inject the chip next to its breadcrumb.
- `.ds-sidebar__group--stale` CSS + new Stale `<details>` group in sidebar containing the deprecated `templates/closing-particle-field` link.
- `.ds-deprecation-banner` CSS + banner inserted at the top of `templates/closing-particle-field`'s preview.

**New CSS (v2.2.2 promotion batch, dedicated section above the v2.2.1 block):**
- `.ds-investor-card`, `.ds-investor-grid` (+ avatar, name-row, name, bio sub-elements)
- `.ds-partner-card__logo`, `.ds-partner-grid`
- `.ds-showcase-card` (+ `__media`, `__media-fallback`, `__body` sub-elements)
- `.ds-recap-grid` (+ tile + p1–p5 area modifiers + responsive)
- `.ds-recap-report` (+ month + month-num + stats sub-elements + 2×2 mobile via display: contents)
- `.ds-iframe-wrap` (+ `--light`, `--neutral` variants)
- `.ds-careers-list` (+ item, head, title, body, cta sub-elements)
- `.ds-kv-list` (+ row, label, body, body--mono sub-elements + hover ::before)
- `.ds-digest-grid`, `.ds-digest-form`, `.ds-digest-form__copy`, `.ds-digest-form__meta`, `.ds-digest-form__visual`
- `.ds-community-ticker` (wraps `.ds-marquee` + per-card `.ds-testimonial-card`)
- `.ds-quickstart-tabs` (multi-body `[data-active-tab]` switching)

**Engine:**
- `createParticleEngine`: gradient hook + per-vertex color buffer + `vertexColors` material flag + opacity-compensation; controller gained `DOME_GRADIENTS` preset map + `data-ds-particle-gradient` / `-top` / `-bottom` attribute resolution.
- `decorateReveals()`: hero-section walker + per-child `data-ds-reveal-delay` tagger + `data-ds-hero-cascaded` sentinel.

**Showcase preview pages added:**
- `v2.2.2/changelog`
- `molecules/recap-grid`, `molecules/recap-report`, `molecules/iframe-wrap`, `molecules/careers-list`, `molecules/kv-list`, `molecules/digest-form`
- `organisms/investor-card`, `organisms/partner-card`, `organisms/showcase-card`, `organisms/community-ticker`, `organisms/quickstart-tabs`
- `templates/pre-footer-ascii`, `templates/recap-band`, `templates/showcase-3up`, `templates/hero-with-dome`

**Showcase preview pages updated:**
- `molecules/subscribe-band` (canonical wrapper + pill bake-in)
- `templates/onboarding` (typewriter on the right-col code block)
- `templates/closing-particle-field` (deprecation banner + breadcrumb retitled "Stale · Templates")

**Sidebar updates:**
- Changelog group: new `v2.2.2/changelog` entry at the top.
- Molecules group: 6 new entries (recap-grid, recap-report, iframe-wrap, careers-list, kv-list, digest-form).
- Organisms · Cards: 3 new entries (investor-card, partner-card, showcase-card).
- Organisms · Social proof: community-ticker added.
- Organisms · Code & lists: quickstart-tabs added.
- Templates group: hero-with-dome, showcase-3up, recap-band, pre-footer-ascii added; closing-particle-field removed from active group.
- New collapsible Stale group at the bottom with closing-particle-field as the lone occupant.

### Quirks & gotchas

1. **`::selection` rule split.** Body-grey and title-orange rules MUST stay in separate selectors. Combining them with a comma triggers the browser to drop the entire chain if any pseudo in the list is unrecognised — silently nuking the palette.
2. **Mobile media-query source order.** When adding new mobile-scoped rules, audit prior `@media` blocks in the same area for collisions — source-order specificity decides the winner inside identical media queries.
3. **`.ds-eyebrow.ds-eyebrow--xs` mobile overrides** still need the chained selector (and sometimes `!important`) to outrank the base `.ds-eyebrow` when going smaller.
4. **Particle engine pixel-ratio cap.** Gradient mode lerps through darker mid-tones — the engine bumps default opacity 0.40 → 0.55 to compensate. If you retune the gradient stops, also retune opacity.
5. **Hero cascade idempotency.** The `data-ds-hero-cascaded="1"` sentinel on the section prevents re-tagging on SPA re-init. Don't remove it manually.
6. **Showcase Anatomy pre-block precedence.** The new global rule uses `!important` on the wrapper styling because the existing per-route overrides also used `!important`. Don't try to override these from a single preview page without `!important` of your own.
7. **`ds-showcase-card` vs `ds-build-card`.** Two different patterns. `ds-build-card` is the existing editorial "How I built" article card. `ds-showcase-card` is the v2.2.2 "Built on VideoDB" 3-up media card. Don't conflate.
8. **`ds-careers-list` + `ds-kv-list` are layout-only.** Caller supplies content. These molecules don't prescribe icons, dept names, or specific copy patterns — they only own row layout + hover behavior.

---

## v2.2.1 changelog — what changed (2026-05-22)

Structural cleanup of the templates and organisms inventory. No new components — this round removes deprecated entries and refreshes 3 existing components to match the live videodb-website implementation.

### Summary

| Section | Change | What |
|---|---|---|
| §3.7 Templates | DELETED | Lifecycle grid (was redundant with Feature + benefit grid and Industries grid) |
| §3.7 Templates | DELETED | Platform overview (was redundant with the new Feature + benefit grid) |
| §3.7 Templates | DELETED | Use case row (low-utility pattern, no live consumers) |
| §3.7 Templates | RENAMED + REWORKED | Feature grid → **Feature and benefit grid**. Existing variants dropped; new canonical variant uses the homepage Platform section (6-card icon + title + body grid). Both light and dark surfaces. |
| §3.7 Templates | REWORKED | **Problem / Solution** canonical variant — existing variants dropped; new variant uses the homepage Problem section pair (`ds-compare-card` × 2) with circular bullets, hairline row separators, no gradients, status pill at the bottom. Both light and dark. |
| §3.3 Organisms · Cards | UPDATED | **ds-logo-card** — the `--grid` variant added in v2.2.0 is now documented inside the main Logo card preview page (no separate sidebar entry). |
| §3.3 Organisms · Pricing | UPDATED | **ds-pricing-card** Variant B — replaced with the homepage Deployment cards (3-card bracket-headed pattern with circular bullets, row hairlines between features, prominent CTA at the bottom). Both light and dark. |
| §3.3 Organisms · Social proof | UPDATED | **ds-customer-wall** — preview reverted to the standard pattern (no `--clean` variant in v2.2.1; the canonical form stays as-is). |
| §3.3 Organisms · Page sections | DELETED | `ds-cta-band` — superseded by the new **Closing CTA — particle field** template (v2.2.0). Existing pages should migrate to the template; cta-band stays deprecated for one release before removal. |

### Tweaks applied after initial v2.2.1 cut

| Area | Tweak |
|---|---|
| `.ds-frame` | **Side rails removed globally** — `border-left: 0; border-right: 0;` added to the docs page CSS so previews match the website (which dropped rails in Phase 1). Old design system rendered hairlines on the left + right edges of every `.ds-frame`; the new convention drops them. |
| `.ds-compare-card--good` | **Gradient dropped.** Previously `linear-gradient(rgba(orange, 0.04), white)` on light and equivalent on dark. New canonical: white (or charcoal on dark) background + orange border. Only the border carries the "this is the solution" semantic. |
| `.ds-compare-card__rows` | **`flex: 1`** added so the rows column grows to fill the available card height. Combined with `margin-top: auto` on the bottom `.ds-pill-status`, the pill anchors to the bottom of the card regardless of how few rows are present. Both compare cards in a Problem/Solution pair stay aligned at the bottom. |
| Logo card Variant A | **Light surface preview added** — the docs page now shows both dark and light versions of the List layout (matching the Variant B grid pattern which already had both). |
| `templates/sync-compare` | **Preview restored.** Was accidentally removed during the v2.2.1 bulk-delete pass alongside the deprecated templates (Lifecycle grid / Platform overview / Use case row). The Sync compare template itself was never deprecated — its preview page has been rebuilt with the canonical 2-column synchronised-hover compare pattern from §3.7. |
| `organisms/customer-wall` | **Preview restored to the full Variant A (Static grid) + Variant B (Ticker) + Usage rules layout.** The temporary `--clean` variant introduced and then reverted in the previous tweak round was an over-simplification; the canonical form has both static grid and ticker variants documented. |

### Counts

- Atoms: 19 (no change)
- Molecules: 15 (no change)
- Organisms: 39 → **38** (cta-band removed)
- Templates: 16 → **13** (Lifecycle grid, Platform overview, Use case row removed; Feature grid renamed in place)
- Conventions: 10 (no change)

### Rationale

The v2.2.0 promotion batch added 7 components from the homepage but left 5 redundant or deprecated entries in the inventory (Lifecycle grid, Platform overview, Use case row, Feature grid, ds-cta-band). v2.2.1 cleans these up so the inventory reflects what designers actually reach for today. The 3 reworked entries (Feature and benefit grid, Problem/Solution, Pricing card variant B) now match what ships on videodb-website, removing drift between docs and implementation.

### Migration

- **Lifecycle grid / Platform overview / Use case row** — no automated migration. Pages using these templates should adopt **Feature and benefit grid** (closest equivalent for a primitives or feature grid).
- **Feature grid → Feature and benefit grid** — rename the template reference. Existing markup may need an update to the new canonical variant if the page wants the homepage Platform-section look.
- **ds-cta-band** — adopt the new **Closing CTA — particle field** template (§3.7) for closing CTAs. The old `ds-cta-band` markup is preserved on legacy pages but should not be used for new builds.

### `index.html` updates

- Sidebar Templates group: removed Lifecycle grid, Platform overview, Use case row. Renamed Feature grid → Feature and benefit grid (orange UPDATED tag).
- Sidebar Organisms · Cards: removed standalone Logo card --grid entry; Logo card now carries an asterisk indicating it has a new variant documented inline.
- Sidebar Organisms · Page sections: removed Closing CTA band.
- Preview pages removed: `#templates/lifecycle-grid`, `#templates/platform-overview`, `#templates/use-case-row`, `#organisms/cta-band`, `#organisms/logo-card-grid` (logo-card-grid content folded into `#organisms/logo-card`).
- Preview pages reworked: `#templates/feature-grid` (now Feature and benefit grid), `#templates/problem-solution`, `#organisms/pricing-card` (Variant B section), `#organisms/customer-wall`.

---

## v2.2.0 changelog — what changed (2026-05-22)

Feature round driven by the homepage refinement cycle on videodb-website (Phase 2). Promoted page-scoped overrides to canonical DS components. Documentation-only — the videodb-website homepage continues to use its `vh-*` override classes; the website itself was not updated in this version.

### Summary

| Section | Change | Component / convention |
|---|---|---|
| §3.1 Atoms | NEW (atom #19) | `.ds-skip-link` |
| §3.2 Molecules | NEW (molecule #15) | `.ds-feature-list` |
| §3.3 Organisms · Cards | NEW VARIANT on `.ds-logo-card` | `.ds-logo-card--grid` |
| §3.3 Organisms · Cards | NEW (Cards #9) | `.ds-testimonial-card` |
| §3.7 Templates | NEW (template #14) | Sticky scroll |
| §3.7 Templates | NEW (template #15) | Closing CTA — particle field |
| §3.7 Templates | NEW (template #16) | Onboarding |
| §2.7 Conventions | NEW (C9) | `inert` for non-active panels in scroll-coupled / tabbed UIs |
| §2.7 Conventions | NEW (C10) | Pointer-coarse fallback for hover-revealed content |

Full HTML, CSS, variants, and use-when guidance for each entry live in the linked canonical sections — not here. This changelog is a record of what changed, not a second copy of the spec.

### Counts

- Atoms: 18 → **19**
- Molecules: 14 → **15**
- Organisms: 38 → **39** (Cards subgroup 8 → 9)
- Templates: 13 → **16**
- Conventions: 8 → **10**

### Rationale

Each candidate was hand-picked from the homepage `vh-*` overrides pool — the prefix originally meant "VideoDB homepage" and was deliberately separate from `ds-*`. After shipping the homepage, the patterns above proved generally reusable (any future page would benefit) and were promoted into the design system. Site-only patterns (hero pill weakening, eyebrow tweaks, mobile-only specifics) remain site-scoped in `videodb-website/src/partials/css_site_overrides.html`.

### Migration

None required. All v2.2.0 additions are net-new components or net-new variants — no breaking changes, no deprecations. Existing pages keep working as-is.

Full prototype trail: `videodb-website/src/CHANGELOG.md` Phase 2 #1 through #30.

### `index.html` updates

- New sidebar group at top: orange "v2.2.0 · NEW" header with 8 entries (changelog + 7 component previews).
- New preview routes: `#v2.2.0/changelog`, `#atoms/skip-link`, `#atoms/content-frame`, `#molecules/feature-list`, `#organisms/logo-card-grid`, `#organisms/testimonial-card`, `#templates/sticky-scroll`, `#templates/closing-particle-field`.
- Per-route preview pages — rendered example, anatomy code block, CSS code block, variants list, "when to use" guidance, prev/next pagination chained back to v2.1's `#templates/hero-split`.

---

## v2.1.1 changelog — what changed (2026-05-22)

Minor patch. Single-rule fix to the footer organism.

### `ds-footer` — chevron desktop-leak fix

The `.vh-footer__nav-chevron` span (accordion-trigger affordance on `.vh-footer__nav-title`) was rendering on desktop because its only styling lived inside `@media (max-width: 768px)`. The span is in the markup unconditionally so the icon leaked above 768px, sitting next to each section label ("PLATFORM ⌄ / SOLUTIONS ⌄ / …").

**Fix** — desktop-default `display: none` on the chevron, plus `cursor: default` on the nav title. Mobile rule (`display: inline-flex` inside `@media (max-width: 768px)`) overrides as before; accordion behavior at ≤768 unchanged.

```css
/* Desktop default — hide the accordion chevron + trigger affordance.
   Mobile media query re-enables both as an accordion. */
.vh-footer .vh-footer__nav-chevron { display: none; }
.vh-footer .vh-footer__nav-title { cursor: default; }
```

Applied to `platform.html`. Same chevron-leak exists on every page that uses the `vh-footer` accordion wrapper — roll out across `index.html`, `developers.html`, `company.html`, `agentic-perception.html`, `programmable-media.html`, `real-time-monitoring.html`, `world-model-data.html` next.

**Affected component:** §3.3 `ds-footer` organism (Editorial variant, `vh-footer` wrapper).

---

## v2.1 changelog — what changed (2026-05-21)

Patch round driven by the platform-page refinement cycle on videodb-website. Promoted from page-scoped overrides to canonical DS. Full rationale and prototype trail in `videodb-website/docs/PLATFORM_REFINEMENT_REPORT.md` + `docs/DS_PROPOSALS.md`.

### Mobile breakpoint canon (NEW — §5.6)

```
--bp-xs:  420px    (small phone)
--bp-sm:  640px    (phone landscape / small tablet)
--bp-md:  768px    (tablet portrait)
--bp-lg:  960px    (tablet landscape)
--bp-xl:  1280px   (laptop)
--bp-2xl: 1440px   (desktop)
```

### Base-rule updates to existing components

| Selector | Change |
|---|---|
| `html, body` | `overflow-x: clip` ≤640 (NOT `hidden` — `hidden` creates a scrollport that breaks `position: sticky`) |
| `.ds-section` | Mobile padding ladder: 96 → 80 (≤960) → 64 (≤640) → 52 (≤420) |
| `.ds-section--tight` | 56 → 40 (≤640) |
| `.ds-frame` | Mobile padding-inline: 32 → 20 (≤640) → 16 (≤380); side borders dropped ≤640 |
| `.ds-section-heading__title` | `font-size: clamp(26px, 4.5vw, 40px)` (was fixed 40px). `--display` modifier: `clamp(32px, 6vw, 56px)` |
| `.ds-section-heading__lead` | Mobile size 18 → 16 (≤768) |
| `.ds-cta-band` | Mobile padding 96/32 → 56/24 (≤768) → 44/18 (≤480). `__inner` `align-items: stretch; width: 100%` ≤768. `__actions { width: 100% }` ≤768. |
| `.ds-cta-pair` | Auto-stack inside `.ds-cta-band` ≤768: column flex, align stretch, width 100%, gap 12, child buttons full-width padding-block 14 |
| `.ds-btn` | Mobile `min-height: var(--touch-target-min, 44px)` (CRITICAL accessibility fix) |
| `.ds-mobile-drawer__sub-list` | Replaced `[hidden]` display:none snap with max-height transition (0↔520, 280ms cubic) |
| `.ds-header-nav` | z-index 50 → 60 (sits above drawer during slide). Mobile padding-inline 32 → 16 (≤768) → 12 (≤420). Wordmark height 20 → 16. Brand `margin-left: 6px` ≤768 |
| `.ds-header-nav__menu-trigger` | Mobile: drop container border + bg; min 44×44 (touch-target floor) |
| `.ascii-illustration canvas`, `.ds-motion-clip > canvas` | Built-in canvas-clamp: `width: 100% !important; height: 100% !important; object-fit: contain` |

### New modifiers on existing components

| Modifier | Used by |
|---|---|
| `.ds-section-heading--split` | Heading left + lead right (1.4fr / 1fr), stacks ≤900. See §3.2. |
| `.ds-section-heading--display` | Larger title clamp(32, 6vw, 56) for hero-adjacent headings |
| `.ds-tabgroup--scroll` | Horizontal scroll-snap on mobile (5+ triggers). See §3.3. |
| `.ds-tabgroup-shell` | Nested-pill: outer light-grey shell wrapping a `ds-tabgroup--light`. See §3.3. |
| `.ds-content-card--dim` + `.is-focused` | Dim-and-focus state convention for cards-driven tab nav. See §3.3. |
| `.ds-hero--split` | NEW hero variant: copy-left / illustration-right 2-col grid (1.25fr / 1fr). Mobile collapses to single-col + illustration becomes background watermark (opacity 0.10 / 0.08). See §3.7. |
| `.ds-hero--split__illustration--tilt-right` / `--tilt-left` | Utility for ±8° rotation on the illustration slot |
| `.ds-mobile-drawer--top-down` | Drawer slides top-to-bottom from behind navbar; in-panel header dropped; stagger-fade-in for items; `:has()`-driven sibling dimming when an accordion section is expanded. See §3.3. |
| `.ds-cta-pair--stack-mobile` | Opt-in stack-and-fill on mobile (auto-applied inside `.ds-cta-band` ≤768) |
| `.ds-header-nav__mobile-cta` | NEW slot inside `.ds-header-nav__actions` — single primary CTA shown only ≤768 |
| `.ds-header-nav__desktop-action` | Class on the desktop-only `Talk to us` + `Start building` pair (hidden ≤768) |
| `.ds-trust-band--chip` | Wraps each item in a hairline-pill (auto-applied ≤640 unless `--flat` is set) |
| `.ds-trust-band--flat` | Opt-out of mobile chip auto-promotion |

### Brand-new components

#### `.ds-menu-toggle` — Atom (NEW, atom #18)

CSS-only hamburger ↔ X icon. Three rounded 1.75px bars. `.is-open` rotates top/bottom 45°/-45° to form a plain X; middle bar scale-fades to 0. 220ms cubic-bezier(0.4, 0, 0.2, 1).

```html
<button class="ds-menu-toggle ds-header-nav__menu-trigger" data-ds-mobile-drawer-open aria-label="Open menu">
  <span class="ds-menu-toggle__icon" aria-hidden="true">
    <span class="ds-menu-toggle__bar ds-menu-toggle__bar--top"></span>
    <span class="ds-menu-toggle__bar ds-menu-toggle__bar--mid"></span>
    <span class="ds-menu-toggle__bar ds-menu-toggle__bar--bot"></span>
  </span>
</button>
```

Trigger receives `.is-open` via JS mirror from drawer state. Replaces both the iconify hamburger AND the in-panel close button. 22×16 icon area inside a 44×44 touch target. Respects `prefers-reduced-motion`.

**Preview:** `index.html#atoms/menu-toggle`

#### `.ds-trust-band` — Molecule (NEW, molecule #13)

Compliance / trust pill row. Was page-scoped inline-style soup; now a proper molecule.

```html
<div class="ds-trust-band ds-trust-band--on-dark">
  <span class="ds-trust-band__item">
    <iconify-icon class="ds-trust-band__icon" icon="solar:check-circle-linear" width="14" height="14"></iconify-icon>
    Fully Managed
  </span>
  <span class="ds-trust-band__item">…</span>
  …
</div>
```

Variants: `--on-dark` (default for dark sections), `--on-light`, `--chip` (each item wraps in a hairline pill — auto-applies ≤640 unless `--flat` is set), `--flat` (opt-out of chip auto-promotion).

**Preview:** `index.html#molecules/trust-band`

#### `.ds-mode-grid` — Molecule (NEW, molecule #14)

2-up grid of `.ds-content-card` with mixed light/dark variants and a code-line strip at the bottom of each card via the new `.ds-content-card__code` sub-element.

```html
<div class="ds-mode-grid">
  <article class="ds-card ds-card--light ds-content-card ds-content-card--light">
    <span class="ds-eyebrow ds-eyebrow--orange">Batch</span>
    <h3 class="ds-content-card__title">Files and archives.</h3>
    <p class="ds-content-card__lead">…</p>
    <div class="ds-content-card__code">
      <span>// upload.file()</span>
      <span>// upload.dataset()</span>
    </div>
  </article>
  <article class="ds-card ds-card--dark ds-content-card ds-content-card--dark">
    …
  </article>
</div>
```

Stacks to 1-col below 768. Token-driven (no new colors, no new radii).

**Preview:** `index.html#molecules/mode-grid`

#### `.ds-search-demo` (planned)

Interactive search-materializes-a-clip composition. Shipped initially as a page-scoped recipe on `platform.html` (typed query → packet rails → result frame w/ cycling scene markers). Promoting to DS pending a JS controller decision: organism (self-contained, harder to customize) vs `ds-motion-clip` recipe (lighter, needs page wiring). Tracked in `docs/DS_PROPOSALS.md` #14.

### New conventions

| # | Convention | Where it lives |
|---|---|---|
| C1 | **Mobile breakpoint canon (6-tier)** | §5.6 — `--bp-xs` … `--bp-2xl` custom properties |
| C2 | **`overflow-x: clip` on `html`/`body` mobile** (never `hidden`) | §1 page scaffold |
| C3 | **`.ds-frame` side-borders off ≤640** | §2 universal conventions |
| C4 | **`scroll-margin-top` for sticky chrome** | §2 — anchor-target cards need `calc(var(--ds-header-h) + 24px)` (extended w/ tabbar if present) |
| C5 | **`prefers-reduced-motion` enforcement across ALL motion components** | §3.4 motion + §6 voice principles. Hard rule, not opt-in. Includes the ASCII renderer JS (FLAGGED CRITICAL — pending JS guard in `scripts/ascii-renderer.js`). |
| C6 | **Canvas-illustration clamp in every illustration slot** | §3.6 illustration — baked in the base rule, not consumer-side |
| C7 | **Scroll-driven content-card focus** | §6 — for cards-driven tab nav: IntersectionObserver rootMargin `-40% 0 -40% 0` toggles `.is-focused`; tab pill mirrors via ARIA-selected sync |
| C8 | **Tab pill sticky behavior on mobile** | §2 — when tabs nav vertical-stacked cards: `position: sticky; top: var(--ds-header-h)` + backdrop-blur; pill scrolls into view via `scrollIntoView({inline: 'center'})` |

### Stale components removed / superseded

These existed in v2.0 and have been deprecated or replaced in v2.1. Consumers should migrate when convenient; legacy pages keep working but new pages should use the v2.1 canonical pattern.

| Stale piece | Replacement | Migration note |
|---|---|---|
| Mobile drawer side-slide pattern (`translateX(100%)`) | `.ds-mobile-drawer--top-down` modifier | Add the modifier class to the drawer root. CSS handles the rest. |
| In-panel drawer header (logo + circle close button inside the drawer) | Site header stays visible during open state; hamburger morphs to X | Hidden via `display: none` on `--top-down` |
| `solar:close-circle-linear` close icon | `.ds-menu-toggle` atom (#18) | Trigger receives `.is-open` via JS mirror from drawer state |
| `solar:hamburger-menu-linear` open icon | `.ds-menu-toggle` atom (#18) | Same as above; one icon replaces both open + close |
| `[hidden]` display:none snap on `.ds-mobile-drawer__sub-list` | max-height transition (0 ↔ 520px, 280–320ms cubic) | Auto-applied on `--top-down`. Use class toggle instead of hidden attribute for animation hooks. |
| Inline-style trust band (`<div style="display: flex; flex-wrap: wrap; gap: 12px 28px; …">`) | `.ds-trust-band` molecule (#13) | Replace inline styles with `.ds-trust-band ds-trust-band--on-dark` (or `--on-light`); items wrap in `.ds-trust-band__item` |
| `overflow-x: hidden` on `html`/`body` | `overflow-x: clip` | `hidden` creates a scrollport that breaks `position: sticky` on the header |
| Consumer-side canvas-clamp boilerplate (`canvas { width: 100% !important; … }` re-implemented per page) | Baked into base `.ascii-illustration` / `.ds-motion-clip` rules | Remove the per-page override; the DS rule handles it |
| Fixed-padding `.ds-section { padding: 96px 0 }` (no mobile ladder) | Built-in mobile padding ladder (96 → 80 → 64 → 52) | Page-scoped section-padding overrides on mobile are no longer needed |
| Fixed-padding `.ds-frame { padding: 0 32px }` (no mobile ladder) | Built-in mobile padding ladder (32 → 20 → 16) | Same as above |

### `index.html` updates

The `index.html` design-system showcase page received the following:

- **New sidebar group** at the top (orange "v2.1 patch · NEW" header) listing every new + changed entry with `NEW` and `*` markers.
- **New preview routes**: `#v2.1/changelog`, `#atoms/menu-toggle`, `#molecules/trust-band`, `#molecules/mode-grid`, `#molecules/section-heading-split`, `#organisms/tabs-scroll`, `#organisms/tabs-nested-pill`, `#organisms/mobile-drawer-top-down`, `#templates/hero-split`.
- **Changed pages marked** with an asterisk `*` next to the heading + in the breadcrumb: `#foundation/typography`, `#foundation/spacing`, `#foundation/layout`, `#atoms/button`, `#molecules/section-heading`, `#molecules/cta-pair`, `#organisms/content-card`, `#organisms/tabs`, `#organisms/site-header`, `#organisms/footer`, `#illustration/ascii`, `#templates/hero`.
- **Per-page change notes** below each `*`-marked page's H1 — orange-bordered callout listing the specific selectors / values / new modifiers added in v2.1. Mechanical to update; one source of truth per page.
- **Anatomy code-block styling** on v2.1 pages: dark-grey container (`var(--charcoal)` border) + darkest-grey fill (`var(--neutral-darker)`) + 28px / 32px padding for readable spec snippets.
- **Live interactions wired** on every new preview that has state: menu-toggle (click to toggle X), tabs nested-pill (click pill OR hover card → ARIA-selected sync across 6 primitives), mobile-drawer-top-down (open-state phone-frame mockup with Solutions expanded).
- **Responsive preview containers** on every component with a mobile variant: hero-split, trust-band, mode-grid, mobile-drawer-top-down. Each uses CSS `resize: horizontal` — drag the bottom-right handle to test responsive behavior in-place.
- **Old `#organisms/mobile-drawer` route consolidated** — content replaced with a redirect stub pointing to `#organisms/mobile-drawer-top-down`. Removed from the Organisms sidebar group; route preserved for legacy bookmarks. The canonical mobile-drawer page now lives only in the v2.1 Patch sidebar group as "Mobile drawer --top-down".
- **Marker legend** documented on the changelog page: `NEW` for net-new, `*` for changed.

---

## Table of contents

1. [Page scaffold (boilerplate)](#1-page-scaffold-boilerplate)
2. [Universal conventions](#2-universal-conventions)
3. [Component anatomy](#3-component-anatomy)
   - [3.1 Atoms (19)](#31-atoms-19)
   - [3.2 Molecules (15)](#32-molecules-15)
   - [3.3 Organisms (38)](#33-organisms-38)
   - [3.4 Motion (2 components + 2 examples + 2 authoring methods)](#34-motion-2-components--2-examples--2-authoring-methods)
   - [3.5 Data Viz (7)](#35-data-viz-7)
   - [3.6 Illustration (1)](#36-illustration-1)
   - [3.7 Templates (13)](#37-templates-13)
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
     the canonical stylesheet block in examples/homepage.html — tokens,
     atoms, molecules, organisms, templates, motion). Do not modify; this is the
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
  <!-- Copy verbatim from the site-header block in examples/homepage.html
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
  <!-- Copy verbatim from the footer block in examples/homepage.html (Editorial variant)
       OR from examples/platform.html (Directory variant). Pick based on page intent
       — see Footer entry in section 3.3. -->
</footer>
```

### Block 5 — System init `<script>`

```html
<script>
  /* Copy verbatim from the system init script in examples/homepage.html.
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
  /* Copy verbatim from the hero Particle dome script in examples/homepage.html ONLY IF the page uses
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

### 2.4 Hero composition — 6 variants

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

### 2.7 Accessibility & focus conventions (NEW in v2.2.0)

Two cross-cutting rules added in v2.2.0 driven by the homepage refinement cycle. Both apply system-wide, not to any specific component.

**C9 — Use `inert` on non-active panels in scroll-coupled or tabbed UIs**

When a panel is visually inactive (sticky scrollytelling, tab content not currently shown, modal-trapped background, etc.), set the HTML `inert` attribute on it. `inert` simultaneously: (1) removes its links from the tab order, (2) hides it from screen readers, (3) blocks pointer events. This keeps visual visibility and tab order in sync — a user's keyboard focus never lands on something they can't see.

```html
<!-- Sticky scroll — step 0 active, others inert -->
<article class="vh-solutions-content" data-vh-step="0">…</article>
<article class="vh-solutions-content" data-vh-step="1" inert>…</article>
<article class="vh-solutions-content" data-vh-step="2" inert>…</article>
<article class="vh-solutions-content" data-vh-step="3" inert>…</article>
```

JS toggles the attribute as the active step changes. Mobile breakpoints that drop the sticky behavior (e.g. ≤900px for sticky scrollytelling) must clear all `inert` attributes so panels are reachable in normal tab order.

**C10 — Pointer-coarse fallback for hover-revealed content**

Anywhere hover reveals content (testimonial card description slide-up, image overlays, hover-to-show tooltips), add a `@media (pointer: coarse)` rule that makes the content always visible. Touch users have no hover — they need the content unconditionally.

```css
.ds-testimonial-card__middle { grid-template-rows: 0fr; transition: grid-template-rows var(--dur-ui) var(--ease-ui); }
.ds-testimonial-card:hover .ds-testimonial-card__middle { grid-template-rows: 1fr; }

@media (pointer: coarse) {
  .ds-testimonial-card__middle { grid-template-rows: 1fr; }
}
```

This is preferred over `@media (max-width: ...)` because `pointer: coarse` is the right semantic — it matches any touch device regardless of viewport size (tablets, phones, touch-enabled laptops).

---

## 3. Component anatomy

Per-component HTML reference for the v2 atomic system. Every dark/light variant works via `--dark` / `--light` modifier on the root class (or `--on-dark` / `--on-light` for atoms that don't carry surface state themselves). Most snippets below show the dark variant — swap modifiers to flip surface. `index.html` is the source of truth on any conflict.

---

### 3.1 Atoms (19)

#### ds-btn (Atom)

Pill-shaped action button. 44px min touch target, 9999px radius.

**Variants/modifiers:**
- `--primary` (orange fill, white label — one per viewport)
- `--secondary-dark` / `--secondary-light` (filled subtle on each surface)
- `--ghost-dark` / `--ghost-light` (outlined, no fill — tertiary actions)
- `--ghost-charcoal` (in-card on dark surfaces; softer than ghost-dark)
- `--sm` (compact, used in site header)
- `--icon` (40×40 square, requires `aria-label`)
- `--success-on-submit` (submit confirmation: `Sending` + spinner, then `Thank you` + check, then reset)
- States: `disabled`, `aria-busy="true"` with `<span class="ds-btn__spinner">` for loading

**HTML:**
```html
<button class="ds-btn ds-btn--primary">Get API key <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>
<button class="ds-btn ds-btn--ghost-dark">Read docs <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon></button>
<button class="ds-btn ds-btn--ghost-charcoal">Choose plan</button>
<button class="ds-btn ds-btn--ghost-dark ds-btn--icon" aria-label="Next"><iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon></button>

<button class="ds-btn ds-btn--primary" type="button" data-ds-success-submit>
  <span class="ds-btn__spinner" aria-hidden="true"></span>
  <span class="ds-btn__label">Subscribe</span>
  <iconify-icon class="ds-btn__icon-arrow" icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon>
  <span class="ds-btn__icon-check">
    <iconify-icon icon="solar:check-circle-bold" width="16" height="16"></iconify-icon>
  </span>
</button>
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
- States: default, `is-focused`, and `[aria-invalid="true"]`
- `[aria-invalid="true"]` — error state. Triggers a 120ms shake animation + applies `--color-error` border. The **canonical form-validation hook** — toggle this attribute via JS when validation fails, remove on successful re-entry.

**HTML:**
```html
<label class="ds-field-label ds-field-label--on-dark">Email</label>
<input class="ds-input ds-input--dark ds-input--pill" type="email" placeholder="you@company.com">

<input class="ds-input ds-input--light" type="email" value="not-an-email" aria-invalid="true" onfocus="this.removeAttribute('aria-invalid')" onblur="this.setAttribute('aria-invalid','true')">
<span class="ds-helper ds-helper--on-light is-error">Enter a valid email</span>
```

**Use when:** Subscribe bands (pill radius), form modals + multi-field forms (card radius). Always paired with a `.ds-field-label` above.

**Docs rule:** Show default, focused, and error as separate states. Error needs `aria-invalid="true"`, helper text, and the shake animation.

---

#### ds-textarea (Atom)

Multi-line input. Card radius, vertical-resize only. Min-height 100px (80px in modal contexts).

**Variants/modifiers:**
- `--dark` / `--light` (surface)
- `[aria-invalid="true"]` — error state. Triggers a 120ms shake animation + applies `--color-error` border. The **canonical form-validation hook** — toggle this attribute via JS when validation fails, remove on successful re-entry.

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
- `[aria-invalid="true"]` — error state. Triggers a 120ms shake animation + applies `--color-error` border. The **canonical form-validation hook** — toggle this attribute via JS when validation fails, remove on successful re-entry.

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

<input class="ds-input ds-input--dark" type="email" value="not-an-email" aria-invalid="true" onfocus="this.removeAttribute('aria-invalid')" onblur="this.setAttribute('aria-invalid','true')">
<span class="ds-helper ds-helper--on-dark is-error">Enter a valid email · we don't share addresses</span>
```

**Behavior:** Error state is split across the field and helper: `aria-invalid="true"` on the associated input applies the same error border + 120ms shake as Atom/Input; `is-error` on `.ds-helper` only turns the message red.

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
- Save-state modifiers: `--unset` / `--ready` / `--saving`

**HTML:**
```html
<span class="ds-pill-status ds-pill-status--dark"><span class="ds-pill-status__dot"></span>Live · v2.4.0</span>
<span class="ds-pill-status ds-pill-status--orange"><span class="ds-pill-status__dot" style="background: currentColor;"></span>Recommended</span>

<!-- Multi-state save indicator -->
<span class="ds-pill-status ds-pill-status--unset"><span class="ds-pill-status__dot"></span>Unset</span>
<span class="ds-pill-status ds-pill-status--ready"><span class="ds-pill-status__dot"></span>Ready to save</span>
<span class="ds-pill-status ds-pill-status--saving"><span class="ds-pill-status__dot"></span>Saving</span>
```

**Use when:** Hero release pill, card-footer status, compare-card bottom. Orange variant reserved for focal "Recommended" tier markers — use sparingly. Save-state modifiers are for compact editor / form save indicators only; the label must carry the state, not colour alone.

---

#### ds-skip-link (Atom)

Visually-hidden-by-default keyboard skip link. Sits at the top of `<header>` as the first focusable element on every page; reveals at top-left of the viewport when keyboard-focused so users can bypass the site header. Targets `#main`.

**Variants/modifiers:**
- None (single canonical form — brand-orange treatment is fixed)

**HTML:**
```html
<a class="ds-skip-link" href="#main">Skip to main content</a>
```

**Use when:** Mandatory on every shippable page. Every `<main>` element must carry `id="main"` so the link resolves. No visual change for mouse / touch users — purely a keyboard / screen-reader affordance. Don't override colors or sizing per page; the brand-orange focus reveal is a system signal.

---

### 3.2 Molecules (15)

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
- `data-ds-count-up` on `.ds-stat__value` (viewport-triggered digit animation)

**HTML:**
```html
<div class="ds-stat ds-stat--dark">
  <span class="ds-stat__value" data-ds-count-up>2.4M</span>
  <span class="ds-stat__label">Hours indexed</span>
</div>
<div class="ds-stat ds-stat--dark">
  <span class="ds-stat__value ds-stat__value--orange" data-ds-count-up>99.99%</span>
  <span class="ds-stat__label">Indexing uptime</span>
</div>
```

**Behavior:** `data-ds-count-up` animates once on viewport entry via IntersectionObserver. The parser preserves prefixes, suffixes, decimal precision, and comma grouping, so `2.4M`, `99.99%`, `3,400+`, and `10×` land in their original format. `prefers-reduced-motion: reduce` renders the final value immediately.

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

<!-- Error state: same validation contract as Atom/Input -->
<div style="display: flex; flex-direction: column; gap: 8px;">
  <label class="ds-field-label ds-field-label--on-dark">Workspace URL</label>
  <input class="ds-input ds-input--dark" type="text" value="ACME!" aria-invalid="true" onfocus="this.removeAttribute('aria-invalid')" onblur="this.setAttribute('aria-invalid','true')">
  <span class="ds-helper ds-helper--on-dark is-error">Lowercase letters and dashes only — strip caps and the bang</span>
</div>
```

**Error behavior:** Use `aria-invalid="true"` on the field for the shared error border + 120ms shake. Use `.ds-helper.is-error` only for the red explanatory message.

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
  <button class="ds-mode-toggle__btn is-active" type="button" aria-pressed="true"><iconify-icon icon="solar:list-linear" width="14" height="14"></iconify-icon> List</button>
  <button class="ds-mode-toggle__btn" type="button" aria-pressed="false"><iconify-icon icon="solar:widget-2-linear" width="14" height="14"></iconify-icon> Grid</button>
</div>
```

**Behavior:** Click sets `.is-active`, updates `aria-pressed`, and moves the slider by updating `--ds-slider-w` / `--ds-slider-x` from the clicked button geometry.

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

**Behavior:** Click sets `.is-active` on the chosen surface button and keeps `aria-pressed` in sync across the pair.

**Use when:** Top-right of a section that supports surface flipping. Position absolute. Use click activation so mouse, touch, keyboard, and assistive tech paths stay aligned.

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

#### ds-feature-list (Molecule)

Stacked feature-item list with hairline-separated rows. Each item: icon + title on top, body paragraph below. 3–5 items per list is the sweet spot.

**Variants/modifiers:**
- Default — adapts automatically to the parent section's `--dark` / `--light` surface

**HTML:**
```html
<ul class="ds-feature-list">
  <li class="ds-feature-list__item">
    <div class="ds-feature-list__head">
      <iconify-icon icon="solar:bolt-linear" width="18" height="18"></iconify-icon>
      <h3 class="ds-feature-list__title">Skills, not SDKs</h3>
    </div>
    <p class="ds-feature-list__body">Build by chaining named capabilities — index, search, edit, stream — instead of wiring services together.</p>
  </li>
  <!-- 2-4 more __item siblings -->
</ul>
```

**Use when:** A section needs a 3-up (or N-up) feature breakdown without escalating to full cards. Pairs naturally with `.ds-content-frame` when a feature list sits beside a code block. Above 5 items, switch to the Feature grid template (§3.7).

---

### 3.3 Organisms (38)

#### Cards (9)

**Feature anchor vs feature tile** — `ds-feature-card` is the magazine-style hero anchor (one per section). For repeating grid tiles, see `ds-feature-tile` in Section 3.5.

##### ds-feature-card (Organism)

Magazine-style hero anchor card — single-lead-story layout with a 5/7 art + body split. NOT for grid layouts — use `ds-feature-tile` for grids. The lead card on a Labs / Blog / Research index where one piece dominates. Below 720px stacks (art on top).

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

**Use when:** Use for ONE focal card per section, typically a hero or section opener. For 2×2 / 3×2 grids of small icon+title+body tiles, use `ds-feature-tile` (Section 3.5 Templates → Feature grid). Subsequent stories use the Content card grid.

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
  <span class="ds-content-card__attribution">github.com/video-db/pair-programmer</span>
  <div class="ds-content-card__meta">
    <span class="ds-tag-chip ds-tag-chip--dark">python</span>
    <span class="ds-tag-chip ds-tag-chip--dark">embeddings</span>
    <a class="ds-arrow-cta ds-arrow-cta--on-dark" href="#" style="margin-left: auto;">Read <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon></span></a>
  </div>
</article>
```

**Use when:** 3-up grids on index pages. Meta row always pinned to bottom via `margin-top: auto`. 2–4 tags max. Use `__attribution` for source / credit / 'powering' lines. Use `__meta` for category tag-chips. Both can coexist.

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

**Variant: `--grid` (v2.2.0)** — Replaces the default `__list` rows with a 3-col grid of hairline-bordered wordmark tiles. Each tile centers a partner wordmark SVG; tiles share the card's surface tint. Use when the card carries 4–9 partner wordmarks (logo-density tile is more legible than the row-by-row list at that count). Mobile (≤720px) falls back to 2-col.

```html
<div class="ds-logo-card ds-logo-card--grid ds-logo-card--dark">
  <div class="ds-logo-card__title">Agent runtimes</div>
  <div class="ds-logo-card__grid">
    <div class="ds-logo-card__tile"><img src="assets/partner-logos/wordmark-logos/anthropic-wordmark-dark-bg.svg" alt="Anthropic"></div>
    <div class="ds-logo-card__tile"><img src="assets/partner-logos/wordmark-logos/openai-wordmark-dark-bg.svg" alt="OpenAI"></div>
    <div class="ds-logo-card__tile"><img src="assets/partner-logos/wordmark-logos/gemini-wordmark-dark-bg.svg" alt="Gemini"></div>
    <!-- 1–6 more __tile siblings -->
  </div>
</div>
```

---

##### ds-testimonial-card (Organism, NEW in v2.2.0)

Single-layer case-study card. Title is always visible; full description slides up from below on hover (desktop) or stays revealed at rest on touch devices. Footer carries an industry tag + arrow CTA. Subtle press-state scale on `:active`.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<a class="ds-testimonial-card ds-testimonial-card--dark" href="#">
  <h3 class="ds-testimonial-card__title">CloudPhysician reduced ICU review time by 40% with VideoDB's clinical agent.</h3>
  <div class="ds-testimonial-card__middle">
    <p class="ds-testimonial-card__lead">Within six weeks, the team had a working agent watching every shift's surgical footage and surfacing the 30-second windows clinicians actually needed to review.</p>
  </div>
  <div class="ds-testimonial-card__footer">
    <span class="ds-testimonial-card__industry">Healthcare</span>
    <span class="ds-arrow-cta ds-arrow-cta--on-dark">Read case study <span class="ds-arrow-cta__circle"><iconify-icon icon="solar:arrow-right-linear" width="12" height="12"></iconify-icon></span></span>
  </div>
</a>
```

**Use when:** Customer-story grids on marketing pages (Traction / Customers sections). 2-up or 3-up grid. Distinct from `.ds-social-card` which is a smaller "where to find us" tile. The hover-reveal middle row is the signature interaction; if your testimonial needs the description always-visible by default, use `.ds-content-card` instead. Mobile (touch) falls back via Convention C10 (§2.7).

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

Right-rail sticky navigation for long-form articles. Vertical list of section anchors with 1px left border that thickens to 2px orange + 2px right-nudge on the active link. Click/focus updates active state for previews; scroll-spy via IntersectionObserver owns the same state in production.

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

**Behavior:** Click or focus sets `.is-active` on the chosen link and moves `aria-current="true"` to that link. Demo links with `href="#"` prevent the default top-of-page jump; production links should point at real H2 anchors.

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
- `--animated` (typewriter type-on, requires `data-ds-typewriter`)

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

**Status variants:**
```html
<!-- Metrics variant — live runtime / latency / version -->
<div class="ds-code-block__status"><span class="ds-status-pulse__dot"></span><span class="ds-eyebrow ds-eyebrow--xs">Live · 120ms · v2.4.0</span></div>

<!-- Filename variant — static quickstart / file-oriented snippet -->
<div class="ds-code-block__status"><span class="ds-status-pulse__dot"></span><span class="ds-eyebrow ds-eyebrow--xs">quickstart.sh</span></div>
```

**Use when:** Quickstart pages, hero (Variant B — Centered with code), use-case row, anywhere multi-line SDK calls show. Status bar optional: use metrics status for live runtime signals, filename status for quickstarts and file-oriented examples. Copy button swaps to "Copied" for 1.2s on success.

**Animated variant:**
```html
<div class="ds-code-block ds-code-block--dark ds-code-block--animated"
     data-ds-typewriter
     data-ds-typewriter-delay="40"
     data-ds-typewriter-start="300">
  <pre class="ds-code-block__code">npx skills add video-db/skills</pre>
</div>
```

- `data-ds-typewriter-delay` — ms per character (default 40)
- `data-ds-typewriter-start` — ms delay before typing begins (default 300)
- Triggers on viewport entry (IntersectionObserver, threshold 0.4)
- Honors `prefers-reduced-motion: reduce` by rendering the final text with a static cursor.

---

##### ds-code-annotation (Organism, "Code annotation chips")

Orange-tinted chips pinned next to specific lines of a Code block. Used to call out "← this is the new bit" markers — streaming line, async boundary, latency landmark. 2-column grid with code on the left, flex-column rail on the right.

**Variants/modifiers:**
- `--dark` / `--light` (surface)

**HTML:**
```html
<div class="ds-code-annotation ds-code-annotation--dark">
  <div class="ds-code-block ds-code-block--dark">
    <div class="ds-code-block__head"><div role="tablist" aria-label="Runtime"><div class="ds-code-tab-pills ds-code-tab-pills--dark"><button class="ds-code-tab-pills__btn is-selected" role="tab" aria-selected="true">python</button></div></div><button class="ds-code-block__copy">Copy</button></div>
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

**v2.1.1 patch — chevron desktop-leak (`vh-footer` accordion wrapper):** the `.vh-footer__nav-chevron` span (accordion-trigger affordance) had no desktop styling and rendered inline next to each section label above 768px. Default it to `display: none` and reset `.vh-footer__nav-title { cursor: default }` outside the mobile media query so the mobile rule (`display: inline-flex` ≤768px) still overrides. Mobile accordion behavior unchanged.

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

### 3.6 Illustration (1)

#### ascii-illustration (Illustration)

Animated ASCII illustration — a preprocessed source PNG resolves through three resolution levels of block characters, then morphs cell-by-cell to binary digits on scroll-into-view. The metaphor mirrors what VideoDB does to a frame at runtime: pixels become the binary representation that agents read. Vanilla JS + canvas, ~6 KB inlined, JetBrains Mono. Honours `prefers-reduced-motion: reduce` (paints final binary state immediately, no animation). Auto-pauses when offscreen via IntersectionObserver.

**Variants/modifiers:**
- `data-src` (required) — path to the preprocessed PNG
- `data-resolution` (default `120`) — column count at the fine level
- `data-color` (default `#F5F5F7`) — character colour, modulated by per-cell brightness alpha
- `data-background` (default `#0A0A0A`) — canvas background
- `data-font-size` (default `12`) — fine-level font size in px (JetBrains Mono)
- `data-replay` (default `always`) — `always` replays on every viewport entry; `once` plays first time only

**HTML:**
```html
<div class="ascii-illustration"
     data-src="assets/illustrations/sources/<concept>-processed.png"
     data-resolution="120"
     data-color="#F5F5F7"
     data-background="#0A0A0A"
     data-font-size="12"
     data-replay="always">
  <canvas></canvas>
</div>
```

**Animation phases (~1.85 s total):**
1. **Coarse dissolve-in** (500 ms) — large chunk-blocks pop in at randomised times at ¼ resolution
2. **Mid snap** (250 ms) — chunks subdivide to ½ resolution
3. **Fine snap** (200 ms) — chunks subdivide to full resolution
4. **Morph** (900 ms) — each fine cell flips blocks → binary at randomised times
5. **Done** — binary state holds until next viewport entry

Per-cell appearance and flip times re-randomise on every replay; the dissolve pattern is never the same twice.

**Source image pipeline.** PNGs are preprocessed once via the `ascii-converter` skill — composite onto white → auto-invert (corner-brightness heuristic) → edge flood-fill (clears opaque dark photo backgrounds) → autocrop to subject + padding → autocontrast → unsharp mask → posterise to 4 brightness levels. Output lands at `assets/illustrations/sources/<concept>-processed.png` plus a sidecar JSON recording every parameter applied.

**Use when:** A page section calls for an illustration that reinforces VideoDB's "pixels become binary" thesis. Hero, inline, or background contexts (defaults differ; see the docs page). Dark surface non-negotiable at v1. One illustration per fold — same discipline as the Particle dome. Don't author with photographic images directly; let the skill preprocess first.

---

### 3.7 Templates (13)

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

#### Hero composition (Template, 6 variants)

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

#### Feature and benefit grid (Template, UPDATED in v2.2.1)

Uses `ds-feature-tile` (small icon + title + body), NOT `ds-feature-card` (which is the hero anchor — see Section 3.3).

3-column grid of feature tiles. Each tile composes a subtle icon tile + title + one-line claim. Two variants: **Left-aligned** (default — content stacks left, for security / value-prop lists) and **Centered** (icon + text centered, for trust-page symmetrical grids).

**Variants/modifiers:**
- `--center` (centered tile composition)
- `--2col` (strict 2-column on desktop, 1-column ≤768px)
- `--3col` (strict 3-column on desktop, 1-column ≤768px)

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

**Use when:** 6 tiles in a 3×2 grid. Left-aligned for capability / security scan-lists; centered for trust pages where symmetry matters. Icon tile is mono by default, flips orange on hover (lighter than the always-orange treatment used in the Feature and benefit grid template).

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

**Animated SVG connector:**
```html
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Static structural lines stay un-classed -->
  <line x1="80" y1="100" x2="200" y2="100" stroke="var(--border-on-dark-strong)" stroke-width="1"/>

  <!-- The ONE flowing connector — focal element -->
  <path class="ds-diagram__connector" d="M 200 100 L 320 100"/>

  <!-- For reversed flow (e.g. response paths): -->
  <!-- <path class="ds-diagram__connector ds-diagram__connector--reverse" d="..."/> -->
</svg>
```

```css
.ds-diagram__connector {
  stroke: var(--orange-500);
  stroke-width: 1.5;
  fill: none;
  stroke-dasharray: 6 4;
  stroke-dashoffset: 0;
  animation: stream-flow 2.4s linear infinite;
}
.ds-diagram__connector--reverse { animation-name: stream-flow-rev; }
@keyframes stream-flow { to { stroke-dashoffset: -200; } }
@keyframes stream-flow-rev { to { stroke-dashoffset: 200; } }
```

**Usage rules:**

> **One flowing connector per section.** Animating every connector turns the diagram into a busy Christmas tree and erases the focal moment. Pick the single most important data path and animate it; leave structural connectors static.

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
              <span class="ds-timeline-roadmap__milestone-body">First 100 videos indexed. SE paired in Slack.</span>
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

**Use when:** Company roadmap, product history, fundraise journey, release-by-release infographics. 5–8 segments, override `style="--cols: 5"` on the wrapper. One `.is-active` segment (typically rightmost). Labels alternate above/below to avoid crowding. Not for changelog (use Carousel) or for workflow steps (use Feature and benefit grid).

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

#### Sticky scroll (Template, NEW in v2.2.0)

Scroll-pinned narrative section. A left-column stack of 3–5 panels translates upward through a fixed 100vh stage as the user scrolls; a right-column illustration crossfades between panel-specific art. Vertical dot progress indicator tracks the active step. Mobile (≤900px) breaks the sticky pinning entirely and renders all panels stacked vertically with their own mobile illustration.

**Anatomy:**

- **`.vh-solutions-wrapper`** — outer 500vh container that gives the sticky stage room to be pinned through (N × 100vh, where N = number of panels + 1).
- **`.vh-solutions-stage`** — 100vh sticky stage (`position: sticky; top: 0`) containing the section heading, progress dots, and the pair of columns.
- **`.vh-solutions-progress`** — vertical dot list on the far left; one `<li>` per panel; `.is-active` flips to brand orange.
- **`.vh-solutions-left-stack`** — left column container holding 4 panels stacked vertically; transform-translated upward by the scroll handler.
- **`.vh-solutions-content[data-vh-step]`** — each panel. Non-active panels carry the HTML `inert` attribute (see Convention C9, §2.7).
- **`.vh-solutions-art[data-vh-step]`** — right-column illustration layers; opacity 0 by default, `.is-active` flips to opacity 1.

**HTML (skeleton):**

```html
<section class="ds-section ds-section--dark vh-solutions-sticky">
  <div class="vh-solutions-wrapper">
    <div class="vh-solutions-stage">
      <div class="ds-frame">
        <div class="vh-solutions-header"><!-- section heading --></div>

        <ol class="vh-solutions-progress" aria-hidden="true">
          <li class="is-active"></li><li></li><li></li><li></li>
        </ol>

        <div class="vh-solutions-pairs">
          <div class="vh-solutions-left">
            <div class="vh-solutions-left-stack">
              <article class="vh-solutions-content" data-vh-step="0">…</article>
              <article class="vh-solutions-content" data-vh-step="1" inert>…</article>
              <article class="vh-solutions-content" data-vh-step="2" inert>…</article>
              <article class="vh-solutions-content" data-vh-step="3" inert>…</article>
            </div>
          </div>
          <div class="vh-solutions-right">
            <div class="vh-solutions-art is-active" data-vh-step="0">…</div>
            <div class="vh-solutions-art" data-vh-step="1">…</div>
            <div class="vh-solutions-art" data-vh-step="2">…</div>
            <div class="vh-solutions-art" data-vh-step="3">…</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Wiring (JS):** scroll handler reads progress (0 → 1) within the wrapper, sets a `translate3d(0, -X%, 0)` on `.vh-solutions-left-stack` where X scales with progress, toggles `.is-active` on the matching right-column art, syncs the active dot, and applies `inert` to non-active panels. Mobile branch (matched via `matchMedia('(max-width: 900px)')`) clears the inert attribute on all panels and disables the scroll handler entirely.

**Use when:** A narrative section with 3–5 sequential ideas earns an extended pinned moment ("here are the four solutions we power"). Don't use for navigation, comparison tables, or quick-scan content — sticky scrollytelling is sequential by design and steals scroll velocity. Cap at 1 instance per page.

---

#### Closing CTA — particle field (Template, NEW in v2.2.0)

Full-bleed closing section with a 2D canvas particle background behind heading + lead + CTA pair. ~150 free-flowing dots animate via `requestAnimationFrame`; respects `prefers-reduced-motion` (renders frame 0 only) and pauses the loop when the section scrolls off-screen via `IntersectionObserver`.

**HTML (skeleton):**

```html
<section class="ds-section ds-section--dark vh-closing">
  <canvas class="vh-closing__particles" aria-hidden="true"></canvas>
  <div class="ds-frame">
    <div class="ds-section-heading ds-section-heading--centered">
      <h2 class="ds-section-heading__title">Build with the perception layer for AI.</h2>
      <p class="ds-section-heading__lead">Six primitives, one SDK, every surface. Start free — committed annual when you outgrow it.</p>
    </div>
    <div class="ds-cta-pair ds-cta-pair--centered">
      <a class="ds-btn ds-btn--primary" href="#">Start building</a>
      <a class="ds-btn ds-btn--ghost-dark" href="#">Talk to us</a>
    </div>
  </div>
</section>
```

**Wiring (JS):** `initClosingParticles()` lives in `scripts.html` — creates ~150 dot particles with randomized velocity, draws them on the canvas every frame with additive blending. Checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` at init and renders only frame 0 in that case. `IntersectionObserver` pauses the rAF loop when the canvas is off-screen.

**Use when:** The final section before the footer on long marketing pages where the closing wants atmospheric weight. One per page, max. Avoid pairing with a `ds-particle-dome` hero on the same page — two motion focal points compete.

---

#### Onboarding (Template, NEW in v2.2.0)

A two-column "install + show me code" fold. Eyebrow + heading + lead at the top, then a bordered content frame containing a 2-up grid: feature list on the left, animated code block on the right. The bordered frame is what gives the pair its "install + show me" cohesion — without it, the feature list and code block would read as two unrelated columns instead of a contained unit. The section heading sits *outside* the frame so it reads with the page rhythm.

**Anatomy:**

- **`.ds-dev-frame`** — bordered content container. 1px hairline + softly tinted fill + `r-card` radius. Adapts to surface (`--dark` / `--light`). Sits inside `.ds-frame`, beneath the section heading. Mobile (≤720) drops padding 40 → 24.
- **`.ds-dev-grid`** — 2-col grid (`1fr 1fr`) with 48px gap. Stacks to 1-col below 720.
- **Left column** — `.ds-feature-list` (3 items) + `.ds-cta-pair` below it
- **Right column** — `.ds-code-block` with the animated typewriter modifier

**HTML (skeleton):**

```html
<section class="ds-section ds-section--light" id="developers">
  <div class="ds-frame">
    <span class="ds-eyebrow ds-eyebrow--orange ds-eyebrow--xs ds-eyebrow--loose">Developer experience</span>
    <div class="ds-section-heading ds-section-heading--light">
      <h2 class="ds-section-heading__title">One command. <span style="color: var(--text-on-light-second);">Your agent gets a video backend.</span></h2>
      <p class="ds-section-heading__lead">Skill-first install across every modern agent runtime. SDKs for Python and TypeScript. Free tier for prototypes; production scales without rewrite.</p>
    </div>

    <div class="ds-dev-frame">
      <div class="ds-dev-grid">

        <div>
          <ul class="ds-feature-list">
            <li class="ds-feature-list__item">
              <div class="ds-feature-list__head">
                <iconify-icon icon="solar:code-square-linear" width="18" height="18"></iconify-icon>
                <h3 class="ds-feature-list__title">Skills, not SDKs</h3>
              </div>
              <p class="ds-feature-list__body">One command bootstraps every primitive…</p>
            </li>
            <!-- 2 more items -->
          </ul>
          <div class="ds-cta-pair" style="margin-top: 32px;">
            <a class="ds-btn ds-btn--primary" href="#">Read the docs</a>
            <a class="ds-btn ds-btn--ghost-light" href="#">View on GitHub</a>
          </div>
        </div>

        <div class="ds-code-block ds-code-block--light ds-code-block--animated">
          <div class="ds-code-block__head"><!-- runtime tabs --></div>
          <pre class="ds-code-block__body">$ claude /install videodb-skills

from videodb import connect

conn  = connect()
video = conn.upload("keynote.mp4")
video.index_spoken_words()
video.index_scenes()</pre>
        </div>

      </div>
    </div>
  </div>
</section>
```

**Surface variants:** the entire template flips dark / light via the parent `.ds-section--dark/--light` modifier — `.ds-dev-frame` auto-tints (rgba(0,0,0,0.025) on light, rgba(255,255,255,0.025) on dark) and the feature-list / code-block / buttons all surface-adapt.

**Use when:** the "show me how to use it" fold on a developer landing page. Pair with a primary + ghost CTA pair beneath the feature list. The bordered frame is what makes it work — it gives the two-column pair visual cohesion.

**Preview:** `index.html#templates/onboarding`

---

## 4. Page recipes

Common page assemblies. Each recipe is a section flow — pick the components in order, then fill with brief copy.

### 4.1 Pricing page

Hero default → Pricing card row (Variant A or B) → Tier finder (if usage-based) → FAQ rows → Closing CTA → Pre-footer Socials → Footer.

### 4.2 Customer story page

Article hero (with byline + tag list) → Pull quote → Article body with Highlights + Callouts + Code blocks → Decision list (the "how we decided") → Closing CTA → Pre-footer Socials → Footer Editorial.

### 4.3 Features / Platform page

Hero variant E (Animated with dome) → Customer wall → Feature and benefit grid → Industries grid → Sync compare → Closing CTA — particle field → Footer Directory.

### 4.4 About / Company page

Hero Centered → Mission statement (Section heading centered + body) → Team grid (Logo card or custom) → Values 3-up (Feature tile grid) → Closing CTA with status pulse → Footer Editorial.

### 4.5 Pages that don't match a recipe

For pages outside these recipes, combine a Hero variant + 6–10 sections that follow the dark/light rhythm + a closing section + Pre-footer Socials + Footer. Most marketing sections fit one of: Hero variant, Customer wall, 2-up compare, 3-up cards, 4-up arch grid, Big stats, Sticky scroll narrative, Closing CTA — particle field.

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

### 6.7 Form validation contract

All form fields use `aria-invalid="true"` as the single validation signal. Visual error state and shake animation are bound to this attribute. The corresponding error message lives in a `ds-helper is-error` sibling. Never use ad-hoc `.has-error` classes or inline error styling.

### 6.8 Form success recipe

On successful form submit, show loading first, then add `ds-btn--success-on-submit` for the confirmation moment, then reset to the original label:

```js
btn.setAttribute('aria-busy', 'true');
btn.disabled = true;
label.textContent = 'Sending';

// After the request succeeds:
btn.removeAttribute('aria-busy');
btn.disabled = false;
label.textContent = 'Thank you';
btn.classList.add('ds-btn--success-on-submit');
setTimeout(() => {
  btn.classList.remove('ds-btn--success-on-submit');
  label.textContent = originalLabel;
}, 1500);
```

---

## 7. Build & deploy

### 7.1 Single-file portability

Every page is a standalone HTML file with the canonical CSS and JS inlined. No build step, no bundler. The canonical CSS lives in the first large `<style>` block of `examples/homepage.html` — copy verbatim into every new page. One-off page CSS goes in a second `<style>` block after the canonical one.

Exception: `404.html` is a deploy-target error page, not a full content page. It may use a minimal self-contained token subset and page-specific CSS as long as it preserves the VideoDB type, dark surface, orange CTA, focus-visible state, and reduced-motion guard.

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
