/**
 * The wallpaper menu: a fullscreen take-over that reads like a game's
 * mode-select. The scenes are a slanted filmstrip of parallelogram tiles; the
 * arrow keys slide the strip so the chosen tile lands under the centre marker,
 * and the wallpaper turns the page live behind the glass as the selection
 * moves. A curved position indicator tracks the strip so the eye always knows
 * where in the deck it is.
 *
 * It sits in front of the whole shell — over the frame, the windows, the lot —
 * so it is mounted on the body rather than the stage, and it is the one surface
 * that owns the arrow keys while it is open.
 */
import { html, esc } from './dom.js';
import { wallpapers } from '../data/profile.js';
import { setWallpaper, state } from '../theme.js';

/** Tile width is a share of the viewport, clamped so the strip reads the same
 * on a phone and a wide monitor. The gap and slant ride along with it. */
function tileWidth(vw) {
  return Math.round(Math.min(560, Math.max(300, vw * 0.52)));
}

export function createWallpaperMenu() {
  const el = html`
    <div class="wpm" role="dialog" aria-modal="true" aria-label="Choose a wallpaper" data-open="false">
      <div class="wpm__scrim" data-close></div>
      <div class="wpm__stage">
        <header class="wpm__head">
          <p class="wpm__eyebrow">Wallpaper</p>
          <h2 class="wpm__title">Choose your scene</h2>
        </header>

        <button class="wpm__nav wpm__nav--prev" data-nav="-1" aria-label="Previous wallpaper">
          <span class="material-symbols-rounded">chevron_left</span>
        </button>
        <div class="wpm__viewport">
          <div class="wpm__track"></div>
          <span class="wpm__marker" aria-hidden="true"></span>
        </div>
        <button class="wpm__nav wpm__nav--next" data-nav="1" aria-label="Next wallpaper">
          <span class="material-symbols-rounded">chevron_right</span>
        </button>

        <div class="wpm__foot">
          <div class="wpm__indicator" aria-hidden="true"></div>
          <div class="wpm__meta">
            <span class="wpm__count"></span>
            <span class="wpm__hint">
              <kbd>←</kbd><kbd>→</kbd> navigate · <kbd>Enter</kbd> select · <kbd>Esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const track = el.querySelector('.wpm__track');
  const viewport = el.querySelector('.wpm__viewport');
  const indicator = el.querySelector('.wpm__indicator');
  const count = el.querySelector('.wpm__count');

  let active = 0;
  let startId = null;
  let tiles = [];
  let dots = [];

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Builds the filmstrip and its indicator once per open, so the staggered
   * entry animation plays every time the menu is summoned. */
  function build() {
    track.innerHTML = wallpapers
      .map(
        (wallpaper, index) => `
          <button class="wpm__tile" type="button" data-index="${index}" style="--i:${index}"
            aria-label="${esc(wallpaper.name)} — ${esc(wallpaper.tag ?? '')}">
            <span class="wpm__thumb">
              <img class="wpm__img" src="${esc(wallpaper.src)}" alt="" loading="lazy" draggable="false" />
              <span class="wpm__shade"></span>
            </span>
            <span class="wpm__label">
              <span class="wpm__num">${String(index + 1).padStart(2, '0')}</span>
              <span class="wpm__name">${esc(wallpaper.name)}</span>
              <span class="wpm__tag">${esc(wallpaper.tag ?? '')}</span>
            </span>
            <span class="wpm__ring" aria-hidden="true"></span>
          </button>`,
      )
      .join('');

    indicator.innerHTML = wallpapers
      .map((_, index) => `<span class="wpm__dot" data-index="${index}"></span>`).join('');

    tiles = [...track.querySelectorAll('.wpm__tile')];
    dots = [...indicator.querySelectorAll('.wpm__dot')];
  }

  /** Centres the active tile under the marker. Pixel maths keeps the slide exact
   * across tile sizes; the transition on the track is what makes it glide. */
  function layout() {
    const vw =
      viewport.clientWidth ||
      window.innerWidth ||
      document.documentElement.clientWidth ||
      1280;
    const width = tileWidth(vw);
    const gap = Math.round(width * 0.015);
    el.style.setProperty('--wpm-tile-w', `${width}px`);
    el.style.setProperty('--wpm-tile-gap', `${gap}px`);
    el.style.setProperty('--wpm-skew', `${Math.round(width * 0.12)}px`);

    const offset = vw / 2 - (active * (width + gap) + width / 2);
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  /** Marks the centred tile and slides the indicator's fill to match. */
  function paintSelection() {
    tiles.forEach((tile, index) => {
      const on = index === active;
      tile.dataset.active = String(on);
      // Depth falls off with distance from centre, so the strip has perspective.
      tile.style.setProperty('--d', String(Math.min(3, Math.abs(index - active))));
      tile.setAttribute('aria-current', on ? 'true' : 'false');
      if (on) tile.setAttribute('tabindex', '0');
      else tile.setAttribute('tabindex', '-1');
    });
    dots.forEach((dot, index) => (dot.dataset.active = String(index === active)));
    indicator.style.setProperty('--active', String(active));

    const current = wallpapers[active];
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(wallpapers.length).padStart(2, '0')}`;
    el.setAttribute('aria-label', `Wallpaper — ${current.name}`);
  }

  /** Moves the selection and turns the wallpaper behind the glass to match. */
  function go(index, { apply = true } = {}) {
    const n = wallpapers.length;
    active = ((index % n) + n) % n;
    layout();
    paintSelection();
    if (apply && wallpapers[active].id !== state.wallpaper) setWallpaper(wallpapers[active]);
  }

  function open() {
    if (el.dataset.open === 'true') return;
    startId = state.wallpaper;
    active = Math.max(0, wallpapers.findIndex((w) => w.id === state.wallpaper));

    build();
    el.dataset.open = 'true';
    // The menu is always laid out (only its opacity toggles), so the viewport
    // has a width to centre against right away — no need to wait for a frame,
    // which a hidden tab would never grant.
    layout();
    paintSelection();
    requestAnimationFrame(() => tiles[active]?.focus({ preventScroll: true }));
  }

  function close() {
    el.dataset.open = 'false';
  }

  /** Escape and the scrim back out: whatever was live when the menu opened is
   * put back, so a browse that changed nothing leaves nothing changed. */
  function cancel() {
    if (state.wallpaper !== startId) {
      const previous = wallpapers.find((w) => w.id === startId);
      if (previous) setWallpaper(previous);
    }
    close();
  }

  const isOpen = () => el.dataset.open === 'true';

  /* ---------------- Input ---------------- */

  track.addEventListener('click', (event) => {
    const tile = event.target.closest('.wpm__tile');
    if (!tile) return;
    const index = Number(tile.dataset.index);
    if (index === active) close();
    else go(index);
  });

  indicator.addEventListener('click', (event) => {
    const dot = event.target.closest('.wpm__dot');
    if (dot) go(Number(dot.dataset.index));
  });

  for (const button of el.querySelectorAll('.wpm__nav')) {
    button.addEventListener('click', () => go(active + Number(button.dataset.nav)));
  }

  el.querySelector('.wpm__scrim').addEventListener('click', cancel);

  // A trackpad's horizontal fling, or a wheel's vertical one, steps the strip —
  // throttled so one gesture is one step rather than a blur of them.
  let wheelLock = 0;
  viewport.addEventListener(
    'wheel',
    (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 8) return;
      event.preventDefault();
      const now = performance.now();
      if (now < wheelLock) return;
      wheelLock = now + 260;
      go(active + (delta > 0 ? 1 : -1));
    },
    { passive: false },
  );

  // Pointer drag flicks the strip left and right on touch and mouse alike.
  let dragX = null;
  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.wpm__nav')) return;
    dragX = event.clientX;
  });
  viewport.addEventListener('pointerup', (event) => {
    if (dragX === null) return;
    const moved = event.clientX - dragX;
    dragX = null;
    if (Math.abs(moved) > 44) go(active + (moved < 0 ? 1 : -1));
  });

  el.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        go(active + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        go(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        go(0);
        break;
      case 'End':
        event.preventDefault();
        go(wallpapers.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        close();
        break;
      case 'Escape':
        event.preventDefault();
        cancel();
        break;
      case 'Tab': {
        // Keep the tab loop inside the menu while it owns the screen.
        const focusable = el.querySelectorAll('.wpm__tile, .wpm__nav');
        if (!focusable.length) break;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        break;
      }
      default:
        break;
    }
  });

  window.addEventListener('resize', () => {
    if (isOpen()) layout();
  });

  return { el, open, close, isOpen };
}
