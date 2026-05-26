# assets/

All static images referenced by the site. Logos only — no photography, illustrations, or icons (those come from Iconify via CDN).

| Folder | What's in it | Naming convention |
|---|---|---|
| [`logos/`](logos/) | VideoDB's own brand marks — wordmark and icon, in dark/light variants. | `wordmark-{dark,light}.png`, `square-{dark,light}.png`, `icon.png` |
| [`customer-logos/`](customer-logos/) | Customer logos used in the "trusted by" strip on the homepage and other pages. PNG, transparent background. | `<brand-slug>.png` (lowercase, hyphens) |
| [`partner-logos/`](partner-logos/) | Ecosystem partners (model providers, automation platforms). Top level holds **icon-mark** SVGs; the [`wordmark-logos/`](partner-logos/wordmark-logos/) subfolder holds **wordmark** SVGs (mark + brand name baked into one SVG). The homepage ecosystem grid uses the wordmark variants. | Top level: `<brand>-logo-<dark-bg\|light-bg\|any-bg>.svg`. Wordmarks: `<brand>-wordmark-<dark-bg\|light-bg>.svg` |
| [`compliance-logos/`](compliance-logos/) | Certifications shown on platform / security pages — GDPR, HIPAA, ISO, SOC 2. Each ships in two variants (one for dark sections, one for light). | `<cert>-logo-<dark-bg\|light-bg>.png` |

## Adding a new logo

1. Drop the file into the right subfolder using the naming convention above.
2. Reference it from `src/pages/<page>.html` with a relative path like `assets/customer-logos/<brand>.png`.
3. Rebuild that page with `scripts/build.sh <page>`.

**For partner & compliance logos:** if the brand has both dark-bg and light-bg variants, ship both. The page picks based on the section's `ds-section` light/dark variant. If the artwork looks identical on either, use the `-any-bg.svg` suffix instead.

**File sizes:** keep customer/partner logos under ~30 KB. The eight HTML pages each weigh ~330 KB already — every logo loads on the homepage's "trusted by" strip.

## Source files

These are the deployed copies. Original Figma / Illustrator source files live in the design system repo, not here.
