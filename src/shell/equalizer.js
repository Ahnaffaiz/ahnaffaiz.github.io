/**
 * Spectrum drawing for the player.
 *
 * Three variants read the same analyser, so they always agree:
 *   `ring` — a band of flowing curves around the record, all one colour
 *   `bar`  — the desktop meter: rounded columns standing on a baseline
 *
 * Both are drawn in a single colour: only alpha and height carry the level.
 */
import { shapeData } from './shapes.js';

/* The lobed shapes are generated once against a unit box and then scaled per
 * frame, so the polar sampling never runs inside the draw loop. */
const UNIT = 100;
const shapeCache = new Map();

function unitShape(name) {
  if (!shapeCache.has(name)) shapeCache.set(name, new Path2D(shapeData(name, UNIT)));
  return shapeCache.get(name);
}

/** Stamps a cached unit shape centred on (x, y), at `size` px, turned by `turn`. */
function stampShape(ctx, name, x, y, size, turn) {
  const scale = size / UNIT;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(turn);
  ctx.scale(scale, scale);
  ctx.translate(-UNIT / 2, -UNIT / 2);
  ctx.fill(unitShape(name));
  ctx.restore();
}

const readColour = (role) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--md-sys-color-${role}`).trim() ||
  '#888';

/** Rounded bar, drawn from a baseline so it grows the way a meter should. */
function roundedBar(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, Math.max(height, 1) / 2);
  ctx.beginPath();
  ctx.moveTo(x, y + height);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height);
  ctx.closePath();
  ctx.fill();
}

export function createEqualizer({
  canvas,
  analyser,
  variant = 'bar',
  bars = 48,
  colour = 'primary',
}) {
  // The player builds its analyser lazily on first play, so this may be a
  // getter rather than a node.
  const getAnalyser = typeof analyser === 'function' ? analyser : () => analyser;
  const ctx = canvas.getContext('2d');
  let frame = null;
  let running = false;
  let phase = 0;
  const levels = new Float32Array(bars);
  const peaks = new Float32Array(bars);
  let data = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /** Samples the spectrum into `bars` buckets, easing toward the new value.
   * Peaks fall on their own, slower, so each bar leaves a marker behind it. */
  function sample() {
    const node = getAnalyser();
    if (node) {
      if (!data || data.length !== node.frequencyBinCount) {
        data = new Uint8Array(node.frequencyBinCount);
      }
      node.getByteFrequencyData(data);
    }

    for (let i = 0; i < bars; i += 1) {
      let target = 0;
      if (data) {
        // Low bins carry most of the energy in a voice, so weight the spread.
        const from = Math.floor((i / bars) ** 1.6 * data.length * 0.7);
        const to = Math.max(from + 1, Math.floor(((i + 1) / bars) ** 1.6 * data.length * 0.7));
        let sum = 0;
        for (let b = from; b < to; b += 1) sum += data[b];
        target = sum / (to - from) / 255;
      }
      const ease = target > levels[i] ? 0.35 : 0.09;
      levels[i] += (target - levels[i]) * ease;
      peaks[i] = Math.max(levels[i], peaks[i] - 0.006);
    }
  }

  /** The energy across the whole spectrum — drives the halo and the disc glow. */
  const energy = () => {
    let sum = 0;
    for (let i = 0; i < bars; i += 1) sum += levels[i];
    return sum / bars;
  };

  /**
   * The desktop meter: slim rounded columns standing on the bottom edge, laid
   * out from the middle outwards — the low end of the spectrum sits at the
   * centre and every pair steps up in frequency towards the two ends.
   */
  function drawBar(width, height) {
    const paint = readColour(colour);
    const gap = Math.max(1, (width / bars) * 0.4);
    const barWidth = Math.max(1.5, width / bars - gap);
    const middle = (bars - 1) / 2;

    for (let i = 0; i < bars; i += 1) {
      // Distance from the middle picks the bucket, so the two halves rise
      // together and the spread reads centre-out rather than left-to-right.
      const step = Math.min(
        bars - 1,
        Math.round((Math.abs(i - middle) / middle) * (bars - 1)),
      );
      const level = Math.min(1, levels[step] * 1.5);
      const h = Math.max(2, level * height);
      const x = i * (barWidth + gap);

      // One colour throughout; only the alpha moves, so the strip stays calm.
      ctx.fillStyle = paint;
      ctx.globalAlpha = 0.34 + level * 0.56;
      roundedBar(ctx, x, height - h, barWidth, h, barWidth / 2);
    }
    ctx.globalAlpha = 1;
  }

  /* The band around the record. Rather than discrete bars it is a stack of
   * closed curves sharing one radius function, each running at its own phase —
   * so they drift apart and back together the way a ribbon of smoke does. */
  const BAND_LAYERS = 8;
  const BAND_SAMPLES = 200;
  const HARMONICS = 6; // how many sine terms the spectrum feeds
  const LOBES = 12; // the band is always this cookie, playing or at rest
  const LOBE_DEPTH = 0.055;
  const TAU = Math.PI * 2;

  const amps = new Float32Array(HARMONICS);

  /** Folds the spectrum into a handful of harmonic amplitudes. */
  function harmonics(scale) {
    const span = bars / HARMONICS;
    for (let h = 0; h < HARMONICS; h += 1) {
      let sum = 0;
      const from = Math.floor(h * span);
      const to = Math.max(from + 1, Math.floor((h + 1) * span));
      for (let i = from; i < to; i += 1) sum += levels[i];
      // Shared out across the harmonics, so the six terms together stay inside
      // the band's width instead of summing into a knot. Higher harmonics
      // ripple less, or the curve turns to noise.
      amps[h] = ((sum / (to - from)) * scale * (1 - h * 0.11)) / HARMONICS;
    }
  }

  /**
   * A single colour, many overlapping curves: the band reads as one flowing
   * object. The radius always carries the same twelve shallow lobes — the
   * record's own shape — and the harmonics ride on top of it.
   */
  function drawRing(width, height) {
    const paint = readColour(colour);
    const cx = width / 2;
    const cy = height / 2;
    // Everything is a fraction of the canvas radius, so the band keeps its
    // relationship to the record at any stage size. The constants are solved so
    // that even with every harmonic peaking at once the innermost curve clears
    // the disc (0.62R) and the outermost stays inside the canvas.
    const R = Math.min(width, height) / 2;
    const base = R * 0.83;
    const half = R * 0.07; // half the band's resting width
    const level0 = energy();

    phase += 0.005 + level0 * 0.012;
    harmonics(base * 0.15);

    ctx.strokeStyle = paint;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 1.25;

    for (let l = 0; l < BAND_LAYERS; l += 1) {
      // -1 at the inner edge of the band, +1 at the outer.
      const spread = (l / (BAND_LAYERS - 1)) * 2 - 1;
      const layerPhase = phase * (1 + l * 0.11) + l * 0.8;

      ctx.beginPath();
      for (let i = 0; i <= BAND_SAMPLES; i += 1) {
        const a = (i / BAND_SAMPLES) * TAU - Math.PI / 2;

        // The shared skeleton: the twelve-lobed cookie, never anything else.
        let r = base + spread * half;
        r *= 1 - LOBE_DEPTH + LOBE_DEPTH * Math.cos(LOBES * a);

        // Then the spectrum, as a few slow harmonics riding the curve.
        for (let h = 0; h < HARMONICS; h += 1) {
          r += amps[h] * Math.sin((h + 2) * a + layerPhase * (1 + h * 0.09));
        }

        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Densest through the middle of the band, feathering out at both edges.
      ctx.globalAlpha = 0.12 + (1 - Math.abs(spread)) * 0.34;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  const painters = { ring: drawRing, bar: drawBar };

  function tick() {
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    sample();

    (painters[variant] ?? drawBar)(width, height);

    const quiet = levels.every((v) => v < 0.004);
    if (!running && quiet) {
      frame = null;
      ctx.clearRect(0, 0, width, height);
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  return {
    start() {
      running = true;
      if (!frame) frame = requestAnimationFrame(tick);
    },
    /** Keeps drawing until the bars have fallen, so it never cuts off mid-air. */
    stop() {
      running = false;
    },
    /** Overall level, 0–1 — for anything outside the canvas that reacts to it. */
    energy,
    destroy() {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    },
  };
}
