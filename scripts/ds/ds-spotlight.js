/* ds-spotlight.js — VideoDB Design System v2.3
 * Scroll-driven spotlight for .ds-spotlight-list. Marks the row whose centre is nearest the
 * viewport pivot (50%) as .is-spotlight and fades the rest back; CSS does the visual lift.
 * rAF-throttled and reduced-motion safe.
 *
 * Threshold: a row only lights up within vh*0.3 of the pivot (otherwise the column "releases").
 * Optional finale card (.ds-spotlight-row__finale): once ITS top edge crosses vh*0.45 it takes
 * .is-focus and suppresses the row spotlight, so attention hands off to the closing card.
 */
(function () {
  function init(list) {
    if (list.__dsSpotlightBound) return;
    list.__dsSpotlightBound = true;

    var rows = Array.prototype.slice.call(list.querySelectorAll('.ds-spotlight-row'))
      .filter(function (r) { return !r.classList.contains('ds-spotlight-row__finale'); });
    if (!rows.length) return;

    var finale = list.querySelector('.ds-spotlight-row__finale') ||
                 (list.parentNode && list.parentNode.querySelector('.ds-spotlight-row__finale'));

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { rows.forEach(function (r) { r.classList.add('is-spotlight'); }); return; }

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      var pivot = vh * 0.5;
      var threshold = vh * 0.3;

      var finaleDist = Infinity;
      if (finale) {
        var fr = finale.getBoundingClientRect();
        if (fr.bottom > 0 && fr.top < vh) finaleDist = Math.abs((fr.top + fr.height / 2) - pivot);
      }

      var activeIdx = -1, minDist = Infinity;
      rows.forEach(function (r, i) {
        var rect = r.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var center = rect.top + rect.height / 2;
        var dist = Math.abs(center - pivot);
        if (dist < minDist) { minDist = dist; activeIdx = i; }
      });
      // Release if nothing is near the pivot, or if the finale card is closer than any row.
      if (minDist > threshold || finaleDist < minDist) activeIdx = -1;
      rows.forEach(function (r, i) { r.classList.toggle('is-spotlight', i === activeIdx); });

      if (finale) {
        var r2 = finale.getBoundingClientRect();
        var line = vh * 0.45;
        finale.classList.toggle('is-focus', r2.top <= line && r2.bottom >= line);
      }
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('.ds-spotlight-list'), init);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
