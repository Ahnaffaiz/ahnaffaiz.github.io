/**
 * Window manager — a tiling one, not a floating one.
 *
 * Windows never overlap and are never dragged: the screen is divided between
 * whatever is open, and every open, close, minimize or restore re-divides it.
 * The division is fixed by the count alone:
 *
 *   1 → one full-screen tile
 *   2 → two columns
 *   3 → a row of two over a full-width row
 *   4 → two rows of two
 *   5 → a row of three over a row of two, and so on
 *
 * Maximizing is "focus mode": every other window is minimized to the dock, so
 * the maximized one is simply the only tile left. Opening anything afterwards
 * drops back into the split above.
 *
 * Position is a `translate` and the transition rides it, so the shuffle after
 * a window comes or goes is the compositor's work rather than the layout's.
 */

const isCompact = () => window.matchMedia('(max-width: 767px)').matches;

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reads a duration/easing token off the root, with a hard fallback. */
function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

const ms = (name, fallback) => (reduceMotion() ? 0 : parseFloat(token(name, '')) || fallback);

/** How many rows the given number of tiles is split into. */
function rowsFor(count) {
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  return Math.ceil(count / 3);
}

/** Tiles per row, earliest rows taking the remainder — 5 splits 3 over 2. */
function rowCounts(count) {
  const rows = rowsFor(count);
  const base = Math.floor(count / rows);
  const extra = count % rows;
  return Array.from({ length: rows }, (_, row) => base + (row < extra ? 1 : 0));
}

export class WindowManager {
  #host;
  #windows = new Map();
  #z = 1;
  #seq = 0;
  #onChange;
  #iconFor;
  #maximized = null;
  #focused = null;
  #relayoutTimers = new Set();

  constructor(host, { onChange, iconFor } = {}) {
    this.#host = host;
    this.#onChange = onChange ?? (() => {});
    this.#iconFor = iconFor ?? (() => null);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const top = this.#topmost();
      if (top) this.close(top.id);
    });

    // A resized screen re-divides at once: the tiles are already where they
    // belong, so animating the correction would only lag behind the drag.
    window.addEventListener('resize', () => this.#layout({ animate: false }));
  }

  isOpen(id) {
    return this.#windows.has(id);
  }

  /** Every window the dock should light up — minimized ones included. */
  get openIds() {
    return [...this.#windows.keys()];
  }

  get minimizedIds() {
    return [...this.#windows.values()].filter((win) => win.minimized).map((win) => win.id);
  }

  get visibleIds() {
    return this.#tiles().map((win) => win.id);
  }

  /** Open windows holding a tile, in the order they were opened. */
  #tiles() {
    return [...this.#windows.values()]
      .filter((win) => !win.minimized)
      .sort((a, b) => a.seq - b.seq);
  }

  #topmost() {
    let best = null;
    for (const win of this.#tiles()) {
      if (!best || Number(win.el.style.zIndex) > Number(best.el.style.zIndex)) best = win;
    }
    return best;
  }

  /* ---------------- Layout ---------------- */

  /** The rect each tile occupies, in host coordinates. */
  #rects(count) {
    const bounds = this.#host.getBoundingClientRect();
    const gap = parseFloat(token('--cae-tile-gap', '')) || 10;
    const width = bounds.width - gap * 2;
    const height = bounds.height - gap * 2;

    // Narrow screens have no room to split sideways: one tile per row.
    const counts = isCompact() ? Array.from({ length: count }, () => 1) : rowCounts(count);
    const rowHeight = (height - gap * (counts.length - 1)) / counts.length;

    const rects = [];
    counts.forEach((cols, row) => {
      const colWidth = (width - gap * (cols - 1)) / cols;
      for (let col = 0; col < cols; col += 1) {
        rects.push({
          x: gap + col * (colWidth + gap),
          y: gap + row * (rowHeight + gap),
          width: colWidth,
          height: rowHeight,
        });
      }
    });
    return rects;
  }

  #place(el, rect, { animate = true } = {}) {
    if (!animate) el.dataset.settling = 'true';
    el.style.width = `${Math.round(rect.width)}px`;
    el.style.height = `${Math.round(rect.height)}px`;
    el.style.transform = `translate(${Math.round(rect.x)}px, ${Math.round(rect.y)}px)`;
    if (!animate) {
      // Read once so the new values are the transition's starting point.
      void el.offsetWidth;
      delete el.dataset.settling;
    }
  }

  #layout({ animate = true, skip = null } = {}) {
    const tiles = this.#tiles();
    const rects = this.#rects(tiles.length);
    tiles.forEach((win, index) => {
      if (win === skip) return;
      this.#place(win.el, rects[index], { animate });
    });
  }

  /** Re-divides the screen after a window has finished leaving it. */
  #layoutAfter(delay) {
    const timer = setTimeout(() => {
      this.#relayoutTimers.delete(timer);
      this.#layout();
    }, delay);
    this.#relayoutTimers.add(timer);
  }

  /* ---------------- Open ---------------- */

  toggle(app) {
    const win = this.#windows.get(app.id);
    if (!win) return this.open(app);
    if (win.minimized) return this.restore(app.id);
    if (this.#focused === app.id) return this.minimize(app.id);
    return this.focus(app.id);
  }

  open(app) {
    const existing = this.#windows.get(app.id);
    if (existing) return existing.minimized ? this.restore(app.id) : this.focus(app.id);

    // Opening drops focus mode: the new window takes its share of the screen.
    if (this.#maximized) this.#clearMaximize();

    const el = document.createElement('section');
    el.className = 'window';
    el.dataset.app = app.id;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', app.title);
    el.style.zIndex = String(++this.#z);

    el.innerHTML = `
      <header class="window__bar">
        <div class="window__dots">
          <button class="wdot wdot--close" data-act="close" aria-label="Close ${app.title}">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
          </button>
          <button class="wdot wdot--min" data-act="minimize" aria-label="Minimize ${app.title}">
            <span class="material-symbols-rounded" aria-hidden="true">remove</span>
          </button>
          <button class="wdot wdot--max" data-act="maximize" aria-label="Maximize ${app.title}">
            <span class="material-symbols-rounded" aria-hidden="true">crop_square</span>
          </button>
        </div>
        <h2 class="window__title">${app.title}</h2>
        <span class="window__spacer" aria-hidden="true"></span>
      </header>
      <div class="window__body"></div>
    `;

    el.querySelector('.window__body').append(app.render());

    const win = { id: app.id, el, app, seq: this.#seq++, minimized: false, anims: [] };
    this.#windows.set(app.id, win);

    // Sized and placed before it is in the document, so its first frame is
    // already the right tile and only the zoom animates.
    const tiles = this.#tiles();
    const rects = this.#rects(tiles.length);
    this.#place(el, rects[tiles.indexOf(win)], { animate: false });
    this.#host.append(el);

    // Everything already open slides over to make room.
    this.#layout({ skip: win });

    this.#enter(win);
    this.#wire(win);
    this.focus(app.id);
    return win;
  }

  /** Zooms in from behind — the window grows into its tile as the rest shift. */
  #enter(win) {
    const duration = ms('--cae-duration-default-spatial', 500);
    if (!duration) return;
    win.anims = [
      win.el.animate([{ transform: 'scale(0.82)' }, { transform: 'scale(1)' }], {
        duration,
        easing: token('--cae-ease-default-spatial', 'ease'),
        composite: 'add',
      }),
      win.el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: ms('--cae-duration-fast-effects', 150) || 1,
        easing: token('--cae-ease-standard-decel', 'ease'),
      }),
    ];
  }

  #wire(win) {
    const { el } = win;

    el.addEventListener('pointerdown', () => this.focus(win.id), { capture: true });

    el.querySelector('.window__dots').addEventListener('click', (event) => {
      const act = event.target.closest('[data-act]')?.dataset.act;
      if (act === 'close') this.close(win.id);
      if (act === 'minimize') this.minimize(win.id);
      if (act === 'maximize') this.toggleMaximize(win.id);
    });

    el.querySelector('.window__bar').addEventListener('dblclick', (event) => {
      if (!event.target.closest('.wdot')) this.toggleMaximize(win.id);
    });
  }

  focus(id) {
    const win = this.#windows.get(id);
    if (!win || win.minimized) return null;
    win.el.style.zIndex = String(++this.#z);
    this.#focused = id;
    for (const other of this.#windows.values()) {
      other.el.dataset.focused = String(other === win);
    }
    this.#onChange();
    return win;
  }

  /* ---------------- Maximize: focus mode ---------------- */

  toggleMaximize(id) {
    const win = this.#windows.get(id);
    if (!win) return;
    if (this.#maximized === id) return this.#unmaximize();

    // Maximizing is the whole screen, so everything else genies to the dock and
    // waits there — reopening any of them splits the screen again.
    const others = this.#tiles().filter((other) => other !== win);
    win.stash = others.map((other) => other.id);
    this.#maximized = id;
    win.el.dataset.maximized = 'true';
    for (const other of others) this.minimize(other.id, { relayout: false });
    this.#layoutAfter(ms('--cae-duration-fast-spatial', 350) * 0.7);
    this.#onChange();
  }

  #unmaximize() {
    const win = this.#windows.get(this.#maximized);
    const stash = win?.stash ?? [];
    this.#clearMaximize();
    for (const id of stash) this.restore(id, { focus: false });
    this.#layout();
    this.#onChange();
  }

  #clearMaximize() {
    const win = this.#windows.get(this.#maximized);
    if (win) {
      delete win.el.dataset.maximized;
      win.stash = null;
    }
    this.#maximized = null;
  }

  /* ---------------- Leaving the screen ---------------- */

  /**
   * Cancels a window's own animations by reference. `getAnimations()` cannot do
   * it: a minimized window is detached from the document, and animations on a
   * node that is not rendered are not "relevant", so the call comes back empty
   * and a `fill: forwards` exit would survive into the next restore — leaving
   * the window back on screen but still wearing its vanished opacity.
   */
  #stop(win) {
    for (const animation of win.anims ?? []) animation.cancel();
    win.anims = [];
  }

  /** Genie: shrinks into the dock icon it belongs to. */
  #genie(win) {
    const duration = ms('--cae-duration-fast-spatial', 350);
    const rect = win.el.getBoundingClientRect();
    const icon = this.#iconFor(win.id)?.getBoundingClientRect();
    if (!duration || !rect.width) return duration;

    const toX = icon ? icon.left + icon.width / 2 : rect.left + rect.width / 2;
    const toY = icon ? icon.top + icon.height / 2 : rect.bottom;
    const dx = toX - (rect.left + rect.width / 2);
    const dy = toY - (rect.top + rect.height / 2);

    win.anims = [
      win.el.animate(
        [
          { transform: 'translate(0px, 0px) scale(1, 1)' },
          { transform: `translate(${dx * 0.55}px, ${dy * 0.6}px) scale(0.5, 0.32)`, offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.06, 0.04)` },
        ],
        {
          duration,
          easing: token('--cae-ease-emphasized-accel', 'ease'),
          composite: 'add',
          fill: 'forwards',
        },
      ),
      win.el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration,
        easing: token('--cae-ease-standard-accel', 'ease'),
        fill: 'forwards',
      }),
    ];
    return duration;
  }

  /** Zooms out to the back, in place. */
  #vanish(win) {
    const duration = ms('--cae-duration-fast-effects', 150) * 1.6;
    if (!duration) return duration;
    win.anims = [
      win.el.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.86)' }], {
        duration,
        easing: token('--cae-ease-emphasized-accel', 'ease'),
        composite: 'add',
        fill: 'forwards',
      }),
      win.el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration,
        easing: token('--cae-ease-standard-accel', 'ease'),
        fill: 'forwards',
      }),
    ];
    return duration;
  }

  minimize(id, { relayout = true } = {}) {
    const win = this.#windows.get(id);
    if (!win || win.minimized) return;
    if (this.#maximized === id) this.#clearMaximize();

    win.minimized = true;
    win.el.dataset.minimizing = 'true';
    const duration = this.#genie(win);

    // The node stays alive off-screen so a restore brings the window back with
    // its scroll position and any typed-in state intact.
    setTimeout(() => {
      if (!win.minimized) return;
      this.#stop(win);
      win.el.remove();
      delete win.el.dataset.minimizing;
      win.el.style.opacity = '';
    }, duration + 20);

    if (relayout) this.#layoutAfter(duration * 0.7);
    if (this.#focused === id) this.#focused = this.#topmost()?.id ?? null;
    this.#onChange();
    if (this.#focused) this.focus(this.#focused);
  }

  restore(id, { focus = true } = {}) {
    const win = this.#windows.get(id);
    if (!win || !win.minimized) return win ? this.focus(id) : null;
    if (this.#maximized && this.#maximized !== id) this.#clearMaximize();

    win.minimized = false;
    this.#stop(win);
    delete win.el.dataset.minimizing;
    win.el.style.opacity = '';
    win.el.style.zIndex = String(++this.#z);

    const tiles = this.#tiles();
    const rects = this.#rects(tiles.length);
    this.#place(win.el, rects[tiles.indexOf(win)], { animate: false });
    this.#host.append(win.el);
    this.#layout({ skip: win });

    // Back out of the dock icon, the genie run backwards.
    const duration = ms('--cae-duration-default-spatial', 500);
    const icon = this.#iconFor(id)?.getBoundingClientRect();
    if (duration) {
      const rect = win.el.getBoundingClientRect();
      const dx = icon ? icon.left + icon.width / 2 - (rect.left + rect.width / 2) : 0;
      const dy = icon ? icon.top + icon.height / 2 - (rect.top + rect.height / 2) : 0;
      win.anims = [
        win.el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(0.06, 0.04)` },
            { transform: 'translate(0px, 0px) scale(1, 1)' },
          ],
          { duration, easing: token('--cae-ease-default-spatial', 'ease'), composite: 'add' },
        ),
        win.el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: ms('--cae-duration-fast-effects', 150) || 1,
          easing: token('--cae-ease-standard-decel', 'ease'),
        }),
      ];
    }

    if (focus) this.focus(id);
    this.#onChange();
    return win;
  }

  close(id) {
    const win = this.#windows.get(id);
    if (!win) return;
    if (this.#maximized === id) this.#clearMaximize();
    this.#windows.delete(id);

    const wasTiled = !win.minimized;
    win.el.dataset.closing = 'true';
    const duration = wasTiled ? this.#vanish(win) : 0;

    const remove = () => {
      this.#stop(win);
      win.el.remove();
    };
    // A backgrounded tab freezes the animation timeline, so the node is reaped
    // on a timer rather than on `animationend`.
    setTimeout(remove, duration + 40);

    if (wasTiled) this.#layoutAfter(duration * 0.8);
    if (this.#focused === id) this.#focused = null;
    this.#onChange();
    const next = this.#topmost();
    if (next) this.focus(next.id);
  }

  closeAll() {
    for (const id of this.openIds) this.close(id);
  }
}
