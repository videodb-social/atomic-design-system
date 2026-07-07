#!/usr/bin/env node
/* verify-widows.mjs — VideoDB Design System v2.3
 * Heuristic widow / orphan pre-screen for built HTML, intended to wire into verify-crawl.mjs / CI.
 *
 * Widows ("a queen alone on her line") are the recurring source of layout rework: a headline or
 * lead whose final line is a single short word. True detection needs layout, so this is a fast
 * STATIC pre-screen — it flags candidates for a human to fix with a load-bearing <br> or a small
 * measure tweak. It never rewrites copy.
 *
 * Usage:
 *   node scripts/ds/verify-widows.mjs "dist/**\/*.html" [--strict] [--min-words=4] [--short=6]
 *     --strict      exit 1 if any candidate is found (fail CI); default is advisory (exit 0)
 *     --min-words   only check blocks with at least this many words (default 4)
 *     --short       a trailing word this many chars or fewer counts as a widow risk (default 6)
 *
 * Scopes: h1, h2, h3, .ds-section-heading__title, .ds-hero__display, .ds-cta-band h2, p.ds-hero__lead.
 */
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter(a => a.startsWith('--')).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  })
);
const patterns = args.filter(a => !a.startsWith('--'));
const STRICT = !!flags.strict;
const MIN_WORDS = parseInt(flags['min-words'], 10) || 4;
const SHORT = parseInt(flags.short, 10) || 6;

// Tag/class scopes we care about (no DOM here — match opening tag + capture inner text).
const SELECTORS = [
  /<h1[^>]*>([\s\S]*?)<\/h1>/gi,
  /<h2[^>]*>([\s\S]*?)<\/h2>/gi,
  /<h3[^>]*>([\s\S]*?)<\/h3>/gi,
  /<[^>]+class="[^"]*\b(?:ds-section-heading__title|ds-hero__display|ds-hero__lead)\b[^"]*"[^>]*>([\s\S]*?)<\//gi
];

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function isWidowRisk(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < MIN_WORDS) return false;
  // An explicit <br> right before a lone final word, or a short final word with no protecting nbsp.
  const last = words[words.length - 1].replace(/[.,!?;:]+$/, '');
  return last.length <= SHORT;
}

let candidates = 0;
let filesChecked = 0;

// Minimal glob: supports literal paths and simple ** /* via require-less expansion is out of scope;
// rely on the shell to expand globs, or pass explicit files. Fall back to treating args as files.
const files = patterns.length ? patterns : [];
if (!files.length) {
  console.error('verify-widows: pass HTML file paths (let your shell expand globs).');
  process.exit(STRICT ? 1 : 0);
}

for (const file of files) {
  let html;
  try { html = readFileSync(file, 'utf8'); } catch { continue; }
  filesChecked++;
  for (const re of SELECTORS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(html))) {
      const text = stripTags(m[1]);
      if (text && isWidowRisk(text)) {
        candidates++;
        const preview = text.length > 80 ? text.slice(0, 77) + '…' : text;
        console.log(`  widow risk  ${file}\n              "${preview}"`);
      }
    }
  }
}

console.log(`\nverify-widows: ${candidates} candidate(s) across ${filesChecked} file(s).`);
if (candidates && STRICT) process.exit(1);
process.exit(0);
