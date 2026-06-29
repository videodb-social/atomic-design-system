/* ds-snippet-copy.js — VideoDB Design System v2.3
 * One delegated copy handler for every snippet on the page. Add `.ds-snippet__copy` to a button
 * inside a `.ds-snippet` and it copies for free — no per-snippet wiring.
 *
 * It reads `data-copy-text` when present (use it when the visible line has coloured spans so the
 * clipboard gets the raw command, not the marked-up text); otherwise it falls back to the snippet's
 * value/code text. Shows "Copied" for 1600ms, then restores the label.
 */
(function () {
  var COPIED_MS = 1600;

  function flash(btn) {
    var prev = btn.getAttribute('data-label') || btn.textContent;
    btn.textContent = 'Copied';
    btn.classList.add('is-copied');
    setTimeout(function () {
      btn.textContent = prev;
      btn.classList.remove('is-copied');
    }, COPIED_MS);
  }

  function copyText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(btn); }, function () { flash(btn); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
      flash(btn);
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.ds-snippet__copy');
    if (!btn) return;
    var snippet = (btn.closest && btn.closest('.ds-snippet')) || btn.parentNode;
    var text = btn.getAttribute('data-copy-text');
    if (text == null && snippet) {
      var val = snippet.querySelector('.ds-snippet__value, code, pre');
      text = (val ? val.textContent : snippet.textContent).trim();
    }
    if (text == null) return;
    copyText(text, btn);
  });
})();
