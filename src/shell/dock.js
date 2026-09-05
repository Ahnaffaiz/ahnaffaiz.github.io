/** The sidebar: Arch mark, app icons, brand, and the status tray. */
import { html, esc, icon } from './dom.js';
import { clover } from './shapes.js';

/** Arch Linux mark — a peak with the triangular cutout at its base. */
const archMark = `
  <svg viewBox="0 0 24 24" role="img" aria-label="Arch">
    <path d="M12 1.6 2.35 21.45c.35-.2 2.63-1.27 4.72-1.95L12 8.7l4.93 10.8c2.09.68 4.37 1.75 4.72 1.95Z" />
  </svg>
`;

const trayButtons = [
  { act: 'notify', icon: 'notifications', label: 'Notifications' },
  { act: 'gallery', icon: 'photo_library', label: 'Gallery' },
  { act: 'theme', icon: 'dark_mode', label: 'Theme' },
  { act: 'fullscreen', icon: 'fullscreen', label: 'Fullscreen' },
];

export function createBar({ apps, wm, onLauncher, onGallery, onTheme, onNotify, onFullscreen }) {
  const bar = html`
    <nav class="bar" aria-label="Dock">
      <div class="bar__group">
        <button class="bar__logo" data-tip="Launcher · Ctrl K" aria-label="Open launcher">
          ${archMark}
        </button>
      </div>

      <span class="bar__divider" aria-hidden="true"></span>

      <div class="bar__group bar__group--apps">
        ${apps
          .map(
            (app) => `
              <button class="bar__item" data-app="${esc(app.id)}" data-tip="${esc(app.title)}"
                aria-label="Open ${esc(app.title)}">
                <span class="bar__shape" aria-hidden="true"></span>
                <span class="bar__shape bar__shape--leaf" aria-hidden="true"></span>
                ${icon(app.icon)}
              </button>`,
          )
          .join('')}
      </div>

      <div class="bar__group bar__group--brand">
        <span class="bar__brand">Ahnaffaiz</span>
      </div>

      <div class="bar__group bar__group--tray">
        ${trayButtons
          .map(
            (button) => `
              <button class="bar__item" data-act="${esc(button.act)}" data-tip="${esc(button.label)}"
                aria-label="${esc(button.label)}">
                <span class="bar__shape" aria-hidden="true"></span>
                <span class="bar__shape bar__shape--leaf" aria-hidden="true"></span>
                ${icon(button.icon)}
              </button>`,
          )
          .join('')}
        <span class="bar__divider" aria-hidden="true"></span>
        <span class="bar__clock" data-clock><span data-hh>--</span><span data-mm>--</span></span>
      </div>

      <div class="bar__flyout" role="tooltip"><span></span></div>
    </nav>
  `;

  const flyout = bar.querySelector('.bar__flyout');
  const flyoutLabel = flyout.querySelector('span');

  /* ---------------- Icon background shapes ---------------- */

  /** Rebuilds the clover whenever the icon size changes (it shrinks on touch). */
  function measureShapes() {
    const size =
      parseFloat(getComputedStyle(bar).getPropertyValue('--cae-shape-item')) ||
      bar.querySelector('.bar__item')?.getBoundingClientRect().width ||
      36;
    bar.style.setProperty('--cae-shape-clover', `path("${clover(size)}")`);
  }

  measureShapes();
  window.addEventListener('resize', measureShapes);

  /* ---------------- Hover: the bezel reaches out with the label ---------------- */

  let hovered = null;

  function showFlyout(item) {
    if (item === hovered) return;
    hovered = item;

    if (!item) {
      flyout.dataset.open = 'false';
      return;
    }

    const barRect = bar.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    flyoutLabel.textContent = item.dataset.tip;
    flyout.style.top = `${rect.top - barRect.top + rect.height / 2}px`;
    flyout.dataset.open = 'true';
  }

  bar.addEventListener('pointermove', (event) => showFlyout(event.target.closest('[data-tip]')));
  bar.addEventListener('pointerleave', () => showFlyout(null));

  /* ---------------- Activation: square spins once into an arch ---------------- */

  function spinShape(item) {
    const shapes = item.querySelectorAll('.bar__shape');
    if (!shapes.length) return;

    const styles = getComputedStyle(document.documentElement);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce
      ? 0
      : parseFloat(styles.getPropertyValue('--cae-duration-slow-spatial')) || 650;
    const easing = styles.getPropertyValue('--cae-ease-default-spatial').trim() || 'ease';

    for (const shape of shapes) {
      // One spin at a time; a queued-up stack would fight over the transform.
      for (const running of shape.getAnimations()) running.cancel();

      shape.animate(
        [
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(180deg) scale(0.86)', offset: 0.5 },
          { transform: 'rotate(360deg) scale(1)' },
        ],
        { duration, easing },
      );
    }
  }

  /* ---------------- Clicks ---------------- */

  bar.addEventListener('click', (event) => {
    const logo = event.target.closest('.bar__logo');
    if (logo) return onLauncher(logo);

    const item = event.target.closest('.bar__item');
    if (!item) return;

    const appId = item.dataset.app;
    if (appId) {
      const before = `${wm.isOpen(appId)}:${wm.minimizedIds.includes(appId)}`;
      wm.toggle(apps.find((app) => app.id === appId));
      // Only spin when the window state actually flipped, not on a plain raise.
      if (before !== `${wm.isOpen(appId)}:${wm.minimizedIds.includes(appId)}`) spinShape(item);
      return;
    }

    const act = item.dataset.act;
    spinShape(item);
    if (act === 'gallery') onGallery(item);
    if (act === 'theme') onTheme(item);
    if (act === 'notify') onNotify(item);
    if (act === 'fullscreen') onFullscreen(item);
  });

  /**
   * Reflects window state back onto the dock. A window that left the screen is
   * the same either way — closed or minimized, its tile is gone — so the dock
   * is the only place the two differ: a minimized app keeps a line beside its
   * icon, a closed one keeps nothing.
   */
  function sync() {
    const open = new Set(wm.openIds);
    const minimized = new Set(wm.minimizedIds);
    for (const item of bar.querySelectorAll('[data-app]')) {
      const id = item.dataset.app;
      const running = open.has(id);
      item.dataset.running = String(running);
      item.dataset.minimized = String(minimized.has(id));
      // The clover marks a window holding a tile, not one parked in the dock.
      item.dataset.open = String(running && !minimized.has(id));
    }
  }

  function startClock() {
    const hh = bar.querySelector('[data-hh]');
    const mm = bar.querySelector('[data-mm]');
    const tick = () => {
      const now = new Date();
      hh.textContent = String(now.getHours()).padStart(2, '0');
      mm.textContent = String(now.getMinutes()).padStart(2, '0');
    };
    tick();
    setInterval(tick, 10_000);
  }

  startClock();

  return { el: bar, sync };
}
