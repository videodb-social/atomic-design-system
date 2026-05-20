# UI review flow

A Figma-style point-and-click commenting overlay for the design system docs page. Drop pins on any element, leave threaded comments with attachments + links, submit a JSON bundle that an AI agent can read and respond to with a matching bundle. Round-trip review for design systems without a hosted CMS.

## What's in this folder

- `review-mode.css` (~750 lines) — the harness UI styling: pins, sidebar, comment panel, attachment chips, hover labels.
- `review-mode.js` (~1700 lines) — the runtime: pin placement, comment state, file-system handle persistence (via IndexedDB), bundle export/import, response-bundle loader.
- `ds-autotagger.js` (~120 lines) — supplementary tagger for the atomic-design-system's `.ds-*` class names. Adds human-readable `data-comment-id` labels to every clickable element so the pin's target is unambiguous in the JSON.
- `README.md` (this file).

## How to use it

The harness only activates when the page URL has `?review=1` appended. The docs page loads it conditionally — pages without the flag pay 0 KB and behave exactly as normal.

### To leave feedback

1. **Open the docs page with `?review=1` on the URL** — for example, `http://localhost:8090/?review=1` for the local preview, or `https://<deployed-url>/?review=1` for the live site.
2. **Click any element** to drop a pin. Hover labels appear over each taggable element to make the target unambiguous before you click.
3. **A comment panel opens.** Type your comment, paste screenshots (Cmd/Ctrl+V) to add them as attachments, paste URLs in the link field (Enter to add multiple), then click **Save**.
4. **Repeat for every piece of feedback.** Pins are colour-coded: open (orange), needs-review (blue — set when an AI response comes back), resolved (grey).
5. **Click "Submit feedback"** in the right sidebar. The first time you do this, the browser prompts for a folder to write the bundle into — pick one (the harness remembers it via IndexedDB for the next session). The harness writes `feedback-bundle-LATEST.json` plus extracted attachments under `<folder>/attachments/<comment-id>/`.
6. **Share that folder with your collaborator (or AI agent).** They read the bundle, address the comments, and write back a `response-bundle-LATEST.json` to the same folder.
7. **Back in the docs page**, click **Load Claude responses…** in the sidebar. The matching pin statuses flip to blue (needs-review) with the AI's replies attached.
8. **Mark each comment resolved**, or push back with new comments and re-submit. Loop until everything's resolved.

### To enable/disable on a different page

The conditional loader lives in `index.html` near the end of `<body>` — a ~12-line `<script>` that checks `location.search` for `review=1` and dynamically injects the three files in this folder. Copy that block into any other HTML page in this design system to enable review mode there too.

To strip the harness for production:

- Either don't include `?review=1` on the URL (the loader is already conditional — production users never trigger it),
- Or for the most aggressive strip, remove the `<script>` loader block from `index.html`.

## How auto-tagging works

`review-mode.js`'s built-in `autoTag()` was written for a legacy showcase with class names like `.section`, `.btn`, `.card-soft`. The atomic-design-system uses `.ds-*` class names — so a click on (say) `.ds-bar-chart` would return null from `findTaggedAncestor()` and no pin would drop.

`ds-autotagger.js` runs after the bundled tagger and adds labels to every `.ds-*` element a reviewer is likely to click — pages, headings, leads, breadcrumbs, previews, buttons, tables, code blocks, lists, sidebar links, and every Motion + Data Viz component by class. The tags are human-readable (e.g. `Stats · row #1`, `Bar row · VideoDB`, `Sidebar subgroup · Interactive illustrations`) so the JSON bundle is self-documenting.

If you add a new `.ds-*` component to the design system and want it taggable, add a corresponding `document.querySelectorAll('.ds-new-thing').forEach(...)` block inside `dsAutoTag()` in this file.

## What's NOT shipped

- **Hosted backend** — the harness writes JSON to a local folder via the FileSystem Access API. No server, no database, no auth. Two collaborators sync bundles via shared drive / DM / git.
- **Inline editing** — the harness only annotates the existing page. To act on feedback, the AI agent / developer edits the source `index.html` directly and writes a response bundle.
- **Public deploys** — only run review mode on local previews or staging deploys, never on production. (The conditional loader makes the production path 0 KB anyway, but be deliberate.)

## Adopting on another project

The bundle is self-contained. To use it on a different HTML page or another design system:

1. Copy this whole folder into the target repo (e.g. `scripts/ui-review-flow/`).
2. Make sure the target page loads `iconify-icon` from CDN — the harness uses it for the pin UI icons:
   ```html
   <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
   ```
3. Add the conditional loader block to the target HTML (just before `</body>`):
   ```html
   <script>
   (function () {
     if (!/[?&]review=1\b/.test(location.search)) return;
     var base = 'scripts/ui-review-flow/';
     var link = document.createElement('link');
     link.rel = 'stylesheet'; link.href = base + 'review-mode.css';
     document.head.appendChild(link);
     function load(src, cb) {
       var s = document.createElement('script');
       s.src = src; s.onload = cb || null;
       document.body.appendChild(s);
     }
     load(base + 'ds-autotagger.js', function () { load(base + 'review-mode.js'); });
   })();
   </script>
   ```
4. If the target uses different class names (not `.ds-*`), edit `ds-autotagger.js` to target whatever class prefix is in use.
5. Open the page with `?review=1` to verify the harness activates and pins drop.

That's it. No build step, no install, no server.
