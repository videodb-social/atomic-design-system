/* ds-proximity-hover.js — VideoDB Design System v2.3
 * Dock-style proximity hover: instead of a binary :hover, siblings scale (and can darken) by the
 * cursor's distance to each item, so a row of items reacts as a soft gradient around the pointer.
 *
 * Markup:
 *   <div data-ds-proximity>
 *     <a class="ds-prox-item" ...>…</a>  (give .ds-prox-item a CSS transition for smoothness:
 *     ...                                  transition: transform var(--ds-duration-hover) var(--ds-ease-canonical))
 *   </div>
 *
 * Tunables (data-* on the container):
 *   data-ds-radius  influence radius in px (default 120)
 *   data-ds-scale   max extra scale at the centre (default 0.06)
 * Reduced-motion: disabled entirely.
 */
(function () {
  function init(group) {
    if (group.__dsProxBound) return;
    group.__dsProxBound = true;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    var items = Array.prototype.slice.call(group.querySelectorAll('.ds-prox-item'));
    if (!items.length) return;
    var radius = parseFloat(group.getAttribute('data-ds-radius')) || 120;
    var maxScale = parseFloat(group.getAttribute('data-ds-scale')) || 0.06;
    var raf = null;

    function onMove(e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        items.forEach(function (it) {
          var r = it.getBoundingClientRect();
          var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          var d = Math.hypot(e.clientX - cx, e.clientY - cy);
          var t = Math.max(0, 1 - d / radius);
          it.style.transform = 'scale(' + (1 + maxScale * t).toFixed(4) + ')';
        });
      });
    }
    function clear() { items.forEach(function (it) { it.style.transform = ''; }); }

    group.addEventListener('pointermove', onMove);
    group.addEventListener('pointerleave', clear);
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ds-proximity]'), init);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
