/**
 * The Material 3 Expressive linear progress indicator, as the media player
 * draws it: the played part of the track is a travelling wave, the rest is a
 * straight line, a gap separates the two, and a stop dot closes the end.
 *
 * The wave only ripples while the track is running — paused, the amplitude
 * eases to nothing and the whole bar settles into a straight line.
 */

const NS = 'http://www.w3.org/2000/svg';

/** Defaults, in CSS pixels against the bar's own box. The crest travels slowly
 * on purpose — this sits under a recitation, not a loading spinner. */
const DEFAULTS = {
  height: 22,
  stroke: 4,
  amplitude: 3.4, // peak of the wave, at full swing
  wavelength: 24,
  speed: 9, // pixels per second the crest travels
  gap: 7, // between the wave and the remaining track
  stopRadius: 2.5,
  step: 2, // sampling interval along the wave
  interactive: true,
};

const node = (name, attrs) => {
  const element = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
  return element;
};

export function createWaveBar({ host, onSeek, ...options }) {
  const {
    height: HEIGHT,
    stroke: STROKE,
    amplitude: AMPLITUDE,
    wavelength: WAVELENGTH,
    speed: SPEED,
    gap: GAP,
    stopRadius: STOP_R,
    step: STEP,
    interactive,
  } = { ...DEFAULTS, ...options };

  const svg = node('svg', { class: 'wave__svg', height: HEIGHT, 'aria-hidden': 'true' });

  const active = node('path', { class: 'wave__active', fill: 'none', 'stroke-width': STROKE,
    'stroke-linecap': 'round' });
  const rest = node('line', { class: 'wave__rest', 'stroke-width': STROKE,
    'stroke-linecap': 'round' });
  const stop = node('circle', { class: 'wave__stop', r: STOP_R });

  svg.append(rest, active, stop);
  host.append(svg);

  let width = 0;
  let ratio = 0;
  let playing = false;
  let swing = 0; // eased 0–1: how much of AMPLITUDE is in play
  let phase = 0;
  let frame = null;
  let last = 0;

  const mid = HEIGHT / 2;
  const clamp = (v) => Math.min(1, Math.max(0, v));

  const waveAt = (x) =>
    mid + Math.sin(((x + phase) / WAVELENGTH) * Math.PI * 2) * AMPLITUDE * swing;

  /** The wave itself: a sine sampled every `STEP` px, as a polyline path.
   *
   * It always closes on `end`, and never on a bare moveto: a zero-length
   * subpath paints nothing at all — not even its own round cap — so under a
   * step's worth of progress the played part simply was not there. On a
   * half-hour recitation that is the first ten seconds reading as an empty
   * bar; now it opens as the cap's dot and grows out of it. */
  function wavePath(end) {
    const parts = [];
    let sampled = -1;
    for (let x = 0; x <= end; x += STEP) {
      parts.push(`${parts.length ? 'L' : 'M'} ${x.toFixed(1)} ${waveAt(x).toFixed(2)}`);
      sampled = x;
    }
    if (!parts.length) parts.push(`M 0 ${waveAt(0).toFixed(2)}`);

    const tail = Math.max(end, 0.01);
    if (tail > sampled) parts.push(`L ${tail.toFixed(2)} ${waveAt(tail).toFixed(2)}`);
    return parts.join(' ');
  }

  function paint() {
    if (!width) return;
    const inset = STROKE / 2;
    const span = width - inset * 2 - STOP_R * 2 - 2;
    const end = clamp(ratio) * span;
    const restFrom = Math.min(end + GAP, span);

    active.setAttribute('transform', `translate(${inset}, 0)`);
    active.setAttribute('d', wavePath(end));

    rest.setAttribute('x1', inset + restFrom);
    rest.setAttribute('x2', inset + span);
    rest.setAttribute('y1', mid);
    rest.setAttribute('y2', mid);
    // Below a couple of pixels the remaining track is only its own round cap.
    rest.setAttribute('opacity', span - restFrom < 1 ? 0 : 1);

    stop.setAttribute('cx', width - inset - STOP_R);
    stop.setAttribute('cy', mid);
  }

  function tick(now) {
    const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;

    phase -= SPEED * delta;
    const target = playing ? 1 : 0;
    swing += (target - swing) * Math.min(1, delta * 6);

    paint();

    // Once the wave has flattened there is nothing left to animate.
    if (!playing && swing < 0.01) {
      swing = 0;
      paint();
      frame = null;
      last = 0;
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function run() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function measure() {
    width = host.getBoundingClientRect().width;
    svg.setAttribute('width', width);
    svg.setAttribute('viewBox', `0 0 ${width} ${HEIGHT}`);
    paint();
  }

  new ResizeObserver(measure).observe(host);
  measure();

  /* ---------------- Scrubbing ---------------- */

  const ratioAt = (event) => {
    const box = host.getBoundingClientRect();
    return clamp((event.clientX - box.left) / box.width);
  };

  // The desktop meter draws the same bar purely as a readout, so it takes no
  // pointer or key handlers at all.
  if (interactive) {
    host.addEventListener('pointerdown', (event) => {
      host.setPointerCapture(event.pointerId);
      onSeek?.(ratioAt(event));
    });

    host.addEventListener('pointermove', (event) => {
      if (!host.hasPointerCapture(event.pointerId)) return;
      onSeek?.(ratioAt(event));
    });

    host.addEventListener('keydown', (event) => {
      const step = { ArrowLeft: -0.02, ArrowRight: 0.02, Home: -1, End: 1 }[event.key];
      if (step === undefined) return;
      event.preventDefault();
      onSeek?.(clamp(Math.abs(step) === 1 ? (step + 1) / 2 : ratio + step));
    });
  }

  return {
    host,
    measure,
    set(next) {
      ratio = clamp(next);
      if (!frame) paint();
    },
    setPlaying(next) {
      playing = next;
      if (playing) run();
      else run(); // keeps ticking just long enough to flatten the wave
    },
  };
}
