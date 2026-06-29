/* ds-sticky-wipe.js — VideoDB Design System v2.3
 * Drives --ds-wipe-p (0 -> 1) on a .ds-sticky-wipe element from scroll position. The CSS maps that
 * progress to the "big visual holds, then a content card rises" choreography (see .ds-sticky-wipe
 * in the stylesheet). rAF-throttled and reduced-motion safe.
 *
 * Tunables are read from the element's CSS custom properties:
 *   --ds-wipe-hold-px   scroll distance to hold before the wipe starts (default 150)
 *   --ds-wipe-slowness  >1 slows the wipe relative to scroll (default 2.0)
 *
 * REFERENCE IMPLEMENTATION — tune per page. NOTE: the CSS consuming --ds-wipe-p must round any
 * SVG-wrapper transform to whole pixels (sub-pixel transforms make SVG strokes shimmer).
 */
(function () {
  function readVar(el, name, fallback) {
    var v = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  }

  function init(host) {
    if (host.__dsWipeBound) return;
    host.__dsWipeBound = true;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { host.style.setProperty('--ds-wipe-p', '1'); return; }

    var ticking = false;
    function update() {
      var rect = host.getBoundingClientRect();
      var hold = readVar(host, '--ds-wipe-hold-px', 150);
      var slow = readVar(host, '--ds-wipe-slowness', 2.0);

      var scrolled = Math.max(0, -rect.top);                 // px scrolled into the zone
      var travel = Math.max(1, host.offsetHeight - window.innerHeight);
      var raw = (scrolled - hold) / (travel * slow);
      var p = Math.min(1, Math.max(0, raw));
      host.style.setProperty('--ds-wipe-p', p.toFixed(4));
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('.ds-sticky-wipe'), init);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
