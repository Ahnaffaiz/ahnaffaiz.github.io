/** Notification stack: slides in from the right, expandable, flick to dismiss. */
import { html, esc, icon } from './dom.js';

export function createNotifications() {
  const el = html`<div class="notifs" role="region" aria-label="Notifications"></div>`;

  function push({ title, body, actions = [], timeout = 6000 }) {
    const notif = html`
      <article class="notif">
        <span class="notif__glyph">${icon('info')}</span>
        <div class="notif__content">
          <p class="notif__title">${esc(title)}</p>
          <p class="notif__body">${esc(body)}</p>
          <div class="notif__actions">
            ${actions
              .map(
                (action, index) =>
                  `<button class="btn btn--tonal" data-action="${index}">${esc(action.label)}</button>`,
              )
              .join('')}
          </div>
        </div>
        <button class="notif__dismiss" data-dismiss aria-label="Dismiss">${icon('close')}</button>
      </article>
    `;

    // Same reason as the window exits: a finished CSS animation will not
    // restart when its name changes, so the exit runs through the WAAPI.
    const dismiss = () => {
      if (notif.dataset.dismissing) return;
      notif.dataset.dismissing = 'true';

      const styles = getComputedStyle(document.documentElement);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = reduce
        ? 0
        : parseFloat(styles.getPropertyValue('--cae-duration-fast-effects')) || 150;
      const easing = styles.getPropertyValue('--cae-ease-standard-accel').trim() || 'ease';

      const remove = () => notif.remove();
      notif
        .animate(
          [
            { transform: notif.style.transform || 'translateX(0)', opacity: 1 },
            { transform: 'translateX(120%)', opacity: 0 },
          ],
          { duration, easing, fill: 'forwards' },
        )
        .finished.catch(() => {})
        .then(remove);
      // The timeline is frozen in a background tab; reap on a timer too.
      setTimeout(remove, duration + 80);
    };

    notif.querySelector('[data-dismiss]').addEventListener('click', dismiss);
    notif.addEventListener('click', (event) => {
      const index = event.target.closest('[data-action]')?.dataset.action;
      if (index === undefined) return;
      actions[Number(index)].run?.();
      dismiss();
    });

    // Flick right to dismiss, like the shell's notifications.
    let start = null;
    notif.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      start = event.clientX;
      notif.setPointerCapture(event.pointerId);
    });
    notif.addEventListener('pointermove', (event) => {
      if (start === null) return;
      const dx = Math.max(0, event.clientX - start);
      notif.style.transform = `translateX(${dx}px)`;
      notif.style.opacity = String(Math.max(0, 1 - dx / 260));
    });
    notif.addEventListener('pointerup', (event) => {
      if (start === null) return;
      const dx = event.clientX - start;
      start = null;
      notif.style.transform = '';
      notif.style.opacity = '';
      if (dx > 120) dismiss();
    });

    el.append(notif);
    if (timeout) setTimeout(dismiss, timeout);
    return notif;
  }

  return { el, push };
}
