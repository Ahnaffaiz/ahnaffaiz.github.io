/**
 * Runtime Material 3 dynamic color. Caelestia derives its whole palette from
 * the current wallpaper; here the wallpaper image is quantized in the browser
 * and the resulting seed drives every `--md-sys-color-*` role.
 *
 * `src/styles/tokens.css` stays as the static fallback before JS runs.
 *
 * First paint never waits on that quantization: the seed of every wallpaper the
 * user has already seen is remembered, so a returning session paints from
 * storage and only re-derives a seed it has never computed — and even then off
 * the main path, once the shell is idle.
 */
import {
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  QuantizerCelebi,
  Score,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

const STORAGE_KEY = 'shell:theme';

/** Quantizing the full-size wallpaper blocks the main thread for seconds; a
 * thumbnail of this edge carries the same palette for a fraction of the work. */
const SAMPLE_EDGE = 96;

const roles = Object.getOwnPropertyNames(MaterialDynamicColors)
  .filter((name) => !['length', 'name', 'prototype'].includes(name))
  .filter((name) => typeof MaterialDynamicColors[name]?.getArgb === 'function')
  .filter((name) => !name.endsWith('PaletteKeyColor'));

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Reads a shell token off the root, with a hard fallback. */
function cssToken(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

const ms = (name, fallback) => parseFloat(cssToken(name, '')) || fallback;

export const state = {
  seed: '#5b9bd5',
  dark: false,
  wallpaper: 'hero',
  /** Seed per wallpaper id, so a wallpaper is only ever quantized once. */
  seeds: {},
};

/** Seeds already quantized this session, keyed by wallpaper id. */
const seedCache = new Map();

/** Runs after the shell has painted, so nothing here delays first frame. */
const whenIdle = (fn) =>
  'requestIdleCallback' in window
    ? requestIdleCallback(fn, { timeout: 1200 })
    : setTimeout(fn, 200);

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
  } catch {
    return null;
  }
}

function write() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — the session still themes correctly.
  }
}

/** Writes the full color-role set for the current seed and mode. */
function paint() {
  const root = document.documentElement;
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(state.seed)), state.dark, 0);

  for (const role of roles) {
    root.style.setProperty(
      `--md-sys-color-${kebab(role)}`,
      hexFromArgb(MaterialDynamicColors[role].getArgb(scheme)),
    );
  }

  root.dataset.theme = state.dark ? 'dark' : 'light';
  root.style.colorScheme = state.dark ? 'dark' : 'light';
}

/* ---------------- Wallpaper transitions ---------------- */

/**
 * A wallpaper change is a slide deck's page turn, not a dissolve: one of the
 * set below is drawn at random each time, so two changes in a row never look
 * alike.
 *
 * Two families. The first moves the whole layer — slides, zooms, a flip. The
 * second cuts the incoming wallpaper into slats that scale up one after the
 * other, so the new image assembles itself out of a curtain: blinds opening,
 * shutters falling, three broad sheets sweeping up.
 *
 * All of it is `transform` and `opacity` — no clip, no filter, nothing that
 * would make the compositor re-blur the frame for a shape change. The rule that
 * keeps the whole-layer moves gap-free: while the incoming layer moves, the
 * outgoing one holds at full opacity underneath it, so an overshooting spatial
 * curve reveals the old wallpaper rather than bare background. `push` moves
 * both, so it takes a curve that does not overshoot.
 */
const HOLD = [{ opacity: 1 }, { opacity: 1 }];

/** Which slat goes first: the rank each one waits its turn by. */
const ORDERS = {
  forward: (i) => i,
  reverse: (i, n) => n - 1 - i,
  /** Outward from the middle, both ways at once. */
  centre: (i, n) => Math.abs(i - (n - 1) / 2),
  /** Inward from both edges. */
  edges: (i, n) => (n - 1) / 2 - Math.abs(i - (n - 1) / 2),
  /** Every other slat, then the ones between them. */
  alternate: (i, n) => (i % 2 ? Math.ceil(n / 2) + (i - 1) / 2 : i / 2),
};

/**
 * The plain crossfade. It is no longer one of the transitions the deck can
 * deal — only advanced turns are dealt now — but it stays on as the fallback
 * the blurred copy behind the frame rides on: a curtain of slats is mush under
 * a 70px blur, so that one crossfades while the sharp screen plays the curtain.
 */
const DISSOLVE = { name: 'dissolve', in: [{ opacity: 0 }, { opacity: 1 }], out: HOLD };

/**
 * Advanced turns only — every one moves, scales, flips or assembles the image
 * out of a curtain. The basic set (a plain dissolve, the single-layer cover
 * slides) has been retired from the pool.
 */
const TRANSITIONS = [
  // Push: both layers travel together, so the seam between them stays exact
  // only under a curve that never overshoots.
  {
    name: 'push-left',
    easing: '--cae-ease-emphasized',
    in: [{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }],
    out: [
      { transform: 'translateX(0%)', opacity: 1 },
      { transform: 'translateX(-100%)', opacity: 1 },
    ],
  },
  {
    name: 'push-up',
    easing: '--cae-ease-emphasized',
    in: [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
    out: [
      { transform: 'translateY(0%)', opacity: 1 },
      { transform: 'translateY(-100%)', opacity: 1 },
    ],
  },

  // Uncover: the old wallpaper is pulled away and the new one is simply behind
  // it, so this pair rides on top instead.
  {
    name: 'uncover-right',
    over: 'out',
    in: HOLD,
    out: [
      { transform: 'translateX(0%)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 1 },
    ],
  },
  {
    name: 'uncover-down',
    over: 'out',
    in: HOLD,
    out: [
      { transform: 'translateY(0%)', opacity: 1 },
      { transform: 'translateY(100%)', opacity: 1 },
    ],
  },

  // Scale and rotation, where the bounce of the spatial curves shows best.
  {
    name: 'zoom-in',
    in: [
      { transform: 'scale(0.72)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    out: HOLD,
  },
  {
    name: 'zoom-through',
    over: 'out',
    in: HOLD,
    out: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.7)', opacity: 0 },
    ],
  },
  {
    name: 'swirl',
    in: [
      { transform: 'rotate(-14deg) scale(1.7)', opacity: 0 },
      { transform: 'rotate(0deg) scale(1)', opacity: 1 },
    ],
    out: HOLD,
  },
  {
    name: 'flip',
    easing: '--cae-ease-emphasized-decel',
    in: [
      { transform: 'rotateY(80deg) scale(1.1)', opacity: 0 },
      { transform: 'rotateY(0deg) scale(1)', opacity: 1 },
    ],
    out: HOLD,
  },

  // Curtains: the incoming wallpaper is cut into slats that grow in turn.
  { name: 'blinds-right', slats: { axis: 'x', count: 16, order: 'forward', origin: 'left center' } },
  { name: 'blinds-left', slats: { axis: 'x', count: 16, order: 'reverse', origin: 'right center' } },
  { name: 'blinds-open', slats: { axis: 'x', count: 14, order: 'centre', origin: 'center' } },
  { name: 'blinds-close', slats: { axis: 'x', count: 14, order: 'edges', origin: 'center' } },
  { name: 'blinds-weave', slats: { axis: 'x', count: 18, order: 'alternate', origin: 'center' } },
  { name: 'shutter-up', slats: { axis: 'y', count: 9, order: 'reverse', origin: 'center bottom' } },
  { name: 'shutter-down', slats: { axis: 'y', count: 9, order: 'forward', origin: 'center top' } },
  // Three broad sheets rather than a fine comb, held wide apart in time.
  {
    name: 'sheets-up',
    slats: { axis: 'y', count: 3, order: 'reverse', origin: 'center bottom', spread: 0.62 },
  },
];

let lastTransition = -1;

/** A different one every time — the deck never plays the same turn twice. */
function pickTransition() {
  if (TRANSITIONS.length < 2) return TRANSITIONS[0];
  let index = lastTransition;
  while (index === lastTransition) index = Math.floor(Math.random() * TRANSITIONS.length);
  lastTransition = index;
  return TRANSITIONS[index];
}

/* ---------------- Wallpaper ---------------- */

let hostPairs = [];
let front = 0;

/**
 * Two stacked layers per host, so a change has something to turn from. There is
 * more than one host: the frame blurs the copy behind it, and the screen shows
 * a sharp copy of its own. The blurred one is flagged — a curtain of slats is
 * wasted behind a 70px blur, so that copy only ever crossfades.
 */
function mountWallpaper(hosts) {
  hostPairs = hosts.filter(Boolean).map((host, index) => ({
    host,
    blurred: index === 0,
    layers: [document.createElement('div'), document.createElement('div')],
    run: 0,
    box: null,
  }));

  for (const entry of hostPairs) {
    for (const layer of entry.layers) {
      layer.className = 'wallpaper__layer';
      entry.host.append(layer);
    }
  }
}

/** Drops a curtain that is still up, mid-run or finished. */
function clearSlats(entry) {
  if (!entry.box) return;
  for (const slat of entry.box.children) {
    for (const animation of slat.getAnimations()) animation.cancel();
  }
  entry.box.remove();
  entry.box = null;
}

/**
 * Cuts the incoming wallpaper into slats and grows them in turn. Each slat
 * carries its own slice of the image — the background is sized to the host and
 * offset by the slat's own position — so the curtain closing is the new
 * wallpaper assembling itself, not a colour sweeping over it.
 */
function playSlats(entry, src, move, duration, easing) {
  const { axis, count, order, origin, spread = 0.45 } = move.slats;
  const rect = entry.host.getBoundingClientRect();
  const rank = ORDERS[order] ?? ORDERS.forward;
  const ranks = Array.from({ length: count }, (_, i) => rank(i, count));
  const last = Math.max(...ranks);

  // The run is split between one slat's own growth and the wait between them.
  const stagger = duration * spread;
  const each = duration - stagger;
  const step = last ? stagger / last : 0;

  const box = document.createElement('div');
  box.className = 'wallpaper__slats';
  const share = 100 / count;

  for (let i = 0; i < count; i += 1) {
    const slat = document.createElement('div');
    slat.className = 'wallpaper__slat';
    slat.style.backgroundImage = `url("${src}")`;
    slat.style.backgroundSize = `${rect.width}px ${rect.height}px`;
    slat.style.transformOrigin = origin;

    if (axis === 'x') {
      slat.style.left = `${i * share}%`;
      slat.style.width = `${share}%`;
      slat.style.backgroundPosition = `${(-i * rect.width) / count}px 0`;
    } else {
      slat.style.top = `${i * share}%`;
      slat.style.height = `${share}%`;
      slat.style.backgroundPosition = `0 ${(-i * rect.height) / count}px`;
    }

    box.append(slat);
  }

  entry.host.append(box);
  entry.box = box;

  // Ends a little over its own cell: percentage sizes land on fractions of a
  // pixel, and the hairline that leaves would show the old wallpaper through.
  const grow =
    axis === 'x'
      ? [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1.02)' }]
      : [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1.02)' }];

  const played = [...box.children].map((slat, i) =>
    slat.animate(grow, { duration: each, delay: ranks[i] * step, easing, fill: 'both' }),
  );

  return Promise.all(played.map((animation) => animation.finished.catch(() => {})));
}

/**
 * Swaps the wallpaper, playing one of the transitions above across every host
 * at once — the blurred copy behind the frame turns the page in step with the
 * sharp one on the screen.
 */
function showImage(src, { animate = true } = {}) {
  if (!hostPairs.length) return;
  front = 1 - front;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = animate && !reduce ? ms('--cae-duration-wallpaper', 1000) : 0;
  const move = duration ? pickTransition() : null;

  for (const entry of hostPairs) {
    const incoming = entry.layers[front];
    const outgoing = entry.layers[1 - front];
    // Switch again mid-turn and the run this one started is abandoned.
    const run = ++entry.run;

    incoming.style.backgroundImage = `url("${src}")`;
    clearSlats(entry);
    for (const layer of entry.layers) {
      for (const animation of layer.getAnimations()) animation.cancel();
    }

    if (!move) {
      incoming.dataset.front = 'true';
      outgoing.dataset.front = 'false';
      incoming.style.zIndex = '';
      outgoing.style.zIndex = '';
      continue;
    }

    // A curtain is drawn over the old wallpaper, so that one stays lit and the
    // incoming layer waits, dark, until the slats have finished assembling it.
    if (move.slats && !entry.blurred) {
      outgoing.dataset.front = 'true';
      incoming.dataset.front = 'false';
      incoming.style.zIndex = '1';
      outgoing.style.zIndex = '0';

      const easing = cssToken('--cae-ease-emphasized-decel', 'ease');
      playSlats(entry, src, move, duration, easing).then(() => {
        if (entry.run !== run) return;
        // Lit underneath first, then the curtain comes down onto its double.
        incoming.dataset.front = 'true';
        outgoing.dataset.front = 'false';
        clearSlats(entry);
      });
      continue;
    }

    // Whole-layer move. Behind the frame's blur a curtain would be mush, so the
    // blurred copy crossfades across the same span instead.
    const spec = move.slats ? DISSOLVE : move;
    const easing = cssToken(spec.easing ?? '--cae-ease-default-spatial', 'ease');

    incoming.dataset.front = 'true';
    outgoing.dataset.front = 'false';

    const overOut = spec.over === 'out';
    incoming.style.zIndex = overOut ? '0' : '1';
    outgoing.style.zIndex = overOut ? '1' : '0';

    for (const layer of entry.layers) layer.style.willChange = 'transform, opacity';

    // The outgoing layer holds its keyframes rather than fading: it is the
    // ground the incoming one moves over, and it is covered by the time the
    // stylesheet drops it back to transparent.
    outgoing.animate(spec.out, { duration, easing });
    incoming
      .animate(spec.in, { duration, easing })
      .finished.catch(() => {})
      .then(() => {
        for (const layer of entry.layers) layer.style.willChange = '';
      });
  }
}

/* ---------------- Light and dark ---------------- */

let modeShiftTimer;

/**
 * Nothing is covered up to change the palette. Every role is rewritten in one
 * repaint, and for as long as this flag is set the stylesheet puts a transition
 * on every colour-bearing property, so each surface walks to its new tone in
 * place. The shell stays legible the whole way across — no sheet, no blank.
 */
function shiftMode() {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const span = reduce ? 0 : ms('--cae-duration-mode-shift', 420);
  if (!span) return;

  root.dataset.modeShift = 'true';
  clearTimeout(modeShiftTimer);
  // Lifted again afterwards: a standing transition on every element would drag
  // on hover states and everything else that changes colour later.
  modeShiftTimer = setTimeout(() => delete root.dataset.modeShift, span + 120);
}

/**
 * Quantizes the wallpaper into a seed color, falling back to the declared one.
 * The image is drawn into a small canvas first: Celebi over a 2560px photo is
 * millions of pixels of main-thread work — long enough that the shell stops
 * answering clicks — while the thumbnail is a few milliseconds.
 */
async function seedFromImage(wallpaper) {
  if (seedCache.has(wallpaper.id)) return seedCache.get(wallpaper.id);

  let seed = wallpaper.seed;
  try {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = wallpaper.src;
    await image.decode();

    const scale = Math.min(1, SAMPLE_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, width, height);

    const { data } = context.getImageData(0, 0, width, height);
    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) continue;
      pixels.push((255 << 24) | (data[i] << 16) | (data[i + 1] << 8) | data[i + 2]);
    }

    const ranked = Score.score(QuantizerCelebi.quantize(pixels, 32));
    if (ranked.length) seed = hexFromArgb(ranked[0]);
  } catch {
    // Tainted canvas or a decode failure — the declared seed still themes it.
  }

  seedCache.set(wallpaper.id, seed);
  state.seeds[wallpaper.id] = seed;
  write();
  return seed;
}

/** Derives and applies the seed for a wallpaper, once the shell is idle. */
function refineSeed(wallpaper) {
  if (seedCache.has(wallpaper.id)) return;
  whenIdle(async () => {
    const seed = await seedFromImage(wallpaper);
    if (state.wallpaper !== wallpaper.id || state.seed === seed) return;
    state.seed = seed;
    paint();
    write();
  });
}

export async function setWallpaper(wallpaper, { keepMode = false } = {}) {
  state.wallpaper = wallpaper.id;
  if (!keepMode) state.dark = wallpaper.dark;

  // Paint immediately from whatever seed is already known, then refine.
  state.seed = seedCache.get(wallpaper.id) ?? state.seeds[wallpaper.id] ?? wallpaper.seed;
  showImage(wallpaper.src);
  paint();
  write();

  refineSeed(wallpaper);
}

export function toggleMode() {
  shiftMode();
  state.dark = !state.dark;
  paint();
  write();
  return state.dark;
}

export function initTheme(wallpapers, hosts) {
  const saved = read();
  // The wallpaper the user last chose wins over the default on every launch.
  const wallpaper = wallpapers.find((w) => w.id === saved?.wallpaper) ?? wallpapers[0];

  state.wallpaper = wallpaper.id;
  state.seeds = saved?.seeds ?? {};
  state.dark = saved?.dark ?? wallpaper.dark;

  // A seed derived in an earlier session is exact, so reuse it and skip the
  // quantizer entirely; `saved.seed` only applies to the wallpaper it came from.
  const remembered =
    state.seeds[wallpaper.id] ?? (saved?.wallpaper === wallpaper.id ? saved?.seed : null);
  if (remembered) seedCache.set(wallpaper.id, remembered);
  state.seed = remembered ?? wallpaper.seed;

  mountWallpaper(Array.isArray(hosts) ? hosts : [hosts]);
  paint();
  // Nothing to turn the page from on a first launch.
  showImage(wallpaper.src, { animate: false });
  write();

  refineSeed(wallpaper);
}
