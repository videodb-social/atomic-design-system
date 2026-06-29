/* ds-marquee.js — VideoDB Design System v2.3
 * smoothPause: eases a .ds-marquee track to a stop on hover/focus and back up to speed on leave,
 * instead of the hard `animation-play-state` jump (which looks like a snapped freeze-frame).
 *
 * Markup:
 *   <div class="ds-marquee" data-ds-marquee>
 *     <div class="ds-marquee__track" data-ds-base-dur="85">…tiles…</div>
 *   </div>
 * data-ds-base-dur is the track's normal animation-duration in seconds (used to scale speed).
 * Reduced-motion: pauses/resumes immediately (no easing).
 *
 * Also exposed as window.dsSmoothPause(track, paused) for custom triggers (e.g. scanner-sync).
 */
(function () {
  function smoothPause(track, paused) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { track.style.animationPlayState = paused ? 'paused' : 'running'; return; }

    var base = parseFloat(track.getAttribute('data-ds-base-dur')) || 85;
    var from = track.__rate == null ? 1 : track.__rate;
    var to = paused ? 0 : 1;
    var dur = 420;
    var start = performance.now();
    cancelAnimationFrame(track.__raf);

    function step(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
      var rate = from + (to - from) * e;
      track.__rate = rate;
      if (rate < 0.02) {
        track.style.animationPlayState = 'paused';
      } else {
        track.style.animationPlayState = 'running';
        track.style.animationDuration = (base / rate).toFixed(2) + 's';
      }
      if (t < 1) track.__raf = requestAnimationFrame(step);
    }
    track.__raf = requestAnimationFrame(step);
  }

  function init(m) {
    if (m.__dsMarqueeBound) return;
    m.__dsMarqueeBound = true;
    var track = m.querySelector('.ds-marquee__track');
    if (!track) return;
    m.addEventListener('pointerenter', function () { smoothPause(track, true); });
    m.addEventListener('pointerleave', function () { smoothPause(track, false); });
    m.addEventListener('focusin', function () { smoothPause(track, true); });
    m.addEventListener('focusout', function () { smoothPause(track, false); });
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('.ds-marquee[data-ds-marquee]'), init);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);

  window.dsSmoothPause = smoothPause;
})();
