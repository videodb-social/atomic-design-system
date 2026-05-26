/* ============================================================================
   UI review flow — .ds-* auto-tagger
   ----------------------------------------------------------------------------
   The bundled review-mode.js looks for elements carrying a `data-comment-id`
   attribute and uses the closest tagged ancestor as the pin target. Its built-in
   autoTag() targets class names from a legacy showcase (.section, .btn, .card-soft,
   ...). The atomic-design-system uses .ds-* class names — this supplementary
   tagger walks the DOM and adds human-readable data-comment-id labels to every
   .ds-* element a reviewer is likely to click. Without it, clicks would always
   return null from findTaggedAncestor and no pins would drop.

   Loaded only when ?review=1 is on the URL (via the inline loader in index.html).
   Idempotent — runs once on DOMContentLoaded + once 400 ms later (to catch any
   late-mounted DOM) + on every hashchange (to pick up newly-activated pages).
   ============================================================================ */
(function () {
  function dsTag(el, label) {
    if (!el || el.dataset.commentId) return;
    el.dataset.commentId = label;
  }
  function textOf(el, max) {
    return (el && el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, max || 48);
  }
  function dsAutoTag() {
    document.querySelectorAll('.ds-page').forEach(p => {
      dsTag(p, 'Page · ' + (p.dataset.page || 'untitled'));
    });
    document.querySelectorAll('.ds-page h1').forEach(h => dsTag(h, 'H1 · ' + textOf(h, 40)));
    document.querySelectorAll('.ds-page h2').forEach(h => dsTag(h, 'H2 · ' + textOf(h, 40)));
    document.querySelectorAll('.ds-page h3').forEach(h => dsTag(h, 'H3 · ' + textOf(h, 36)));
    document.querySelectorAll('.ds-page .ds-page__lead').forEach(p => dsTag(p, 'Lead · ' + textOf(p, 48)));
    document.querySelectorAll('.ds-page .ds-page__breadcrumb').forEach(b => dsTag(b, 'Breadcrumb · ' + textOf(b, 36)));
    document.querySelectorAll('.ds-preview').forEach((p, i) => {
      const label = p.querySelector('.ds-preview__label');
      dsTag(p, 'Preview · ' + (label ? textOf(label, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-preview__half').forEach(h => {
      const label = h.querySelector('.ds-preview__label');
      dsTag(h, 'Preview half · ' + (label ? textOf(label, 36) : 'surface'));
    });
    document.querySelectorAll('.ds-page .ds-btn').forEach(b => dsTag(b, 'Button · ' + textOf(b, 28)));
    document.querySelectorAll('.ds-page .ds-pill-status, .ds-page .ds-pill').forEach(p => dsTag(p, 'Pill · ' + textOf(p, 24)));
    document.querySelectorAll('.ds-page .ds-eyebrow').forEach(e => dsTag(e, 'Eyebrow · ' + textOf(e, 24)));
    document.querySelectorAll('.ds-page .ds-mono-badge').forEach(b => dsTag(b, 'Mono badge · ' + textOf(b, 24)));
    document.querySelectorAll('.ds-page .ds-tag-chip').forEach(t => dsTag(t, 'Tag chip · ' + textOf(t, 24)));
    document.querySelectorAll('.ds-page .ds-arrow-cta').forEach(a => dsTag(a, 'Arrow CTA · ' + textOf(a, 24)));
    document.querySelectorAll('.ds-page .ds-table').forEach((t, i) => {
      dsTag(t, 'Table #' + (i + 1));
      t.querySelectorAll('tr').forEach((row, ri) => {
        if (ri === 0) return;
        const firstCell = row.querySelector('td');
        if (firstCell) dsTag(row, 'Row · ' + textOf(firstCell, 32));
      });
    });
    document.querySelectorAll('.ds-page pre').forEach((p, i) => dsTag(p, 'Code block #' + (i + 1)));
    document.querySelectorAll('.ds-page .ds-pagination__link').forEach(a => dsTag(a, 'Pagination · ' + textOf(a, 28)));
    document.querySelectorAll('.ds-page .ds-ul').forEach((u, i) => {
      dsTag(u, 'List #' + (i + 1));
      u.querySelectorAll('li').forEach(li => dsTag(li, 'List item · ' + textOf(li, 40)));
    });
    document.querySelectorAll('.ds-sidebar__group').forEach(g => {
      const label = g.querySelector('.ds-sidebar__group-label');
      dsTag(g, 'Sidebar group · ' + (label ? textOf(label, 24) : 'untitled'));
    });
    document.querySelectorAll('.ds-sidebar__subgroup-label').forEach(s => dsTag(s, 'Sidebar subgroup · ' + textOf(s, 24)));
    document.querySelectorAll('.ds-sidebar__link').forEach(a => dsTag(a, 'Sidebar link · ' + textOf(a, 28)));
    // Motion + Data Viz net-new components (highest-priority targets for review)
    document.querySelectorAll('.ds-motion-clip').forEach((c, i) => {
      const cap = c.querySelector('.ds-motion-clip__caption');
      dsTag(c, 'Motion clip · ' + (cap ? textOf(cap, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-stats').forEach((r, i) => {
      const variant = r.classList.contains('ds-stats--column') ? 'column' : 'row';
      dsTag(r, 'Stats · ' + variant + ' #' + (i + 1));
    });
    document.querySelectorAll('.ds-stats__cell').forEach(c => {
      const lbl = c.querySelector('.ds-stats__label');
      dsTag(c, 'Stat cell · ' + (lbl ? textOf(lbl, 24) : 'untitled'));
    });
    document.querySelectorAll('.ds-callout-metric').forEach((m, i) => {
      const body = m.querySelector('.ds-callout-metric__body');
      dsTag(m, 'Callout metric · ' + (body ? textOf(body, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-compare-stat').forEach((c, i) => dsTag(c, 'Before/after · #' + (i + 1)));
    document.querySelectorAll('.ds-bar-chart').forEach((c, i) => {
      const ttl = c.querySelector('.ds-bar-chart__title');
      dsTag(c, 'Bar chart · ' + (ttl ? textOf(ttl, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-bar-chart__row').forEach(r => {
      const lbl = r.querySelector('.ds-bar-chart__label');
      dsTag(r, 'Bar row · ' + (lbl ? textOf(lbl, 28) : 'untitled'));
    });
    document.querySelectorAll('.ds-column-chart').forEach((c, i) => {
      const ttl = c.querySelector('.ds-column-chart__title');
      dsTag(c, 'Column chart · ' + (ttl ? textOf(ttl, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-trend-line').forEach((c, i) => {
      const ttl = c.querySelector('.ds-trend-line__title');
      dsTag(c, 'Trend line · ' + (ttl ? textOf(ttl, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-arch-flow').forEach((c, i) => dsTag(c, 'Architecture flow · #' + (i + 1)));
    document.querySelectorAll('.ds-scrubber').forEach((s, i) => dsTag(s, 'Timeline scrubber · #' + (i + 1)));
    document.querySelectorAll('.ds-scrubber__thumb').forEach((t, i) => {
      const time = t.querySelector('.ds-scrubber__thumb-time');
      dsTag(t, 'Scrubber thumb · ' + (time ? textOf(time, 8) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-scrubber__dot').forEach((d, i) => dsTag(d, 'Scrubber dot · #' + (i + 1)));
    document.querySelectorAll('.ds-particle-dome-stage').forEach((s, i) => dsTag(s, 'Particle dome stage · #' + (i + 1)));
    // v2.2.2 promotion batch — Round 4 net-new components (Company + Developers folds)
    document.querySelectorAll('.ds-content-frame').forEach((f, i) => dsTag(f, 'Content frame · #' + (i + 1)));
    document.querySelectorAll('.ds-feature-list').forEach((l, i) => {
      const ttl = l.querySelector('.ds-feature-list__title');
      dsTag(l, 'Feature list · ' + (ttl ? textOf(ttl, 36) : '#' + (i + 1)));
    });
    document.querySelectorAll('.ds-feature-list__item').forEach(it => {
      const ttl = it.querySelector('.ds-feature-list__title');
      dsTag(it, 'Feature list item · ' + (ttl ? textOf(ttl, 28) : 'untitled'));
    });
    document.querySelectorAll('.ds-compare-card').forEach((c, i) => {
      const pill = c.querySelector('.ds-compare-card__pill');
      const desc = c.querySelector('.ds-compare-card__desc');
      dsTag(c, 'Compare card · ' + (pill ? textOf(pill, 24) : (desc ? textOf(desc, 28) : '#' + (i + 1))));
    });
    document.querySelectorAll('.ds-trust-fold').forEach((t, i) => dsTag(t, 'Trust fold · #' + (i + 1)));
    document.querySelectorAll('.ds-feature-showcase').forEach((s, i) => dsTag(s, 'Feature showcase · #' + (i + 1)));
    document.querySelectorAll('.ds-page .ds-section-heading').forEach(h => {
      const t = h.querySelector('.ds-section-heading__title');
      dsTag(h, 'Section heading · ' + (t ? textOf(t, 36) : 'untitled'));
    });
    // Fallback: any top-level region inside a .ds-page that's still un-tagged
    document.querySelectorAll('.ds-page > div, .ds-page > p, .ds-page > section, .ds-page > article, .ds-page > figure').forEach((el, i) => {
      if (!el.dataset.commentId) dsTag(el, 'Page region · ' + el.tagName.toLowerCase() + ' #' + (i + 1));
    });
  }
  function boot() {
    setTimeout(dsAutoTag, 0);
    setTimeout(dsAutoTag, 400);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('hashchange', () => setTimeout(dsAutoTag, 50));
  window.dsAutoTag = dsAutoTag;
})();
