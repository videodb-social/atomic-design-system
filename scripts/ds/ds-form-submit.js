/* ds-form-submit.js — VideoDB Design System v2.3
 * Drop-in submit handler for Formspark (or any POST endpoint) with an in-page state machine,
 * so a form gives feedback in place instead of redirecting to a generic off-brand thank-you page.
 *
 * Markup:
 *   <form data-ds-form action="https://submit-form.com/XXXX" method="post">
 *     ...fields...
 *     <button type="submit" class="ds-btn">Send <span class="ds-btn__spinner" aria-hidden="true"></span></button>
 *   </form>
 *
 * State machine on the submit button: default -> .is-sending -> .is-success (auto-reset)
 *                                     default -> .is-sending -> .is-error  (clickable, auto-reset)
 *
 * Options (data-* on the form; the reset timeout is a prop, NOT a baked 10s):
 *   data-ds-reset-ms  reset delay after success/error (default 4000)
 *   data-ds-sending   sending label  (default "Sending…")
 *   data-ds-success   success label  (default "Request sent ✓")
 *   data-ds-error     error label    (default "Try again ↻")
 */
(function () {
  function init(form) {
    if (form.__dsFormBound) return;
    form.__dsFormBound = true;

    var btn = form.querySelector('[type="submit"], button:not([type])');
    if (!btn) return;
    var labelEl = btn.querySelector('.ds-btn__label') || btn;
    var defaultLabel = labelEl.textContent;
    var resetMs = parseInt(form.getAttribute('data-ds-reset-ms'), 10) || 4000;
    var labels = {
      sending: form.getAttribute('data-ds-sending') || 'Sending…',
      success: form.getAttribute('data-ds-success') || 'Request sent ✓',
      error:   form.getAttribute('data-ds-error')   || 'Try again ↻'
    };
    var timer;

    function setState(state, label) {
      btn.classList.remove('is-sending', 'is-success', 'is-error');
      if (state) btn.classList.add(state);
      btn.disabled = state === 'is-sending';
      btn.setAttribute('aria-busy', state === 'is-sending' ? 'true' : 'false');
      if (label != null) labelEl.textContent = label;
    }
    function reset() { setState(null, defaultLabel); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        if (typeof form.reportValidity === 'function') form.reportValidity();
        return;
      }
      clearTimeout(timer);
      setState('is-sending', labels.sending);

      var body = new URLSearchParams(new FormData(form)).toString();
      fetch(form.action, {
        method: (form.getAttribute('method') || 'POST').toUpperCase(),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        setState('is-success', labels.success);
        form.reset();
        timer = setTimeout(reset, resetMs);
      }).catch(function () {
        setState('is-error', labels.error);
        timer = setTimeout(reset, resetMs);
      });
    });
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-ds-form]'), init);
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
