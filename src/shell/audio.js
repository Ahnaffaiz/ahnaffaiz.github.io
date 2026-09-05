/**
 * The shell's player.
 *
 * With `music.src` set it plays that file — served from `public/`, so playback
 * is entirely offline. With `src` left null it instead generates a slow
 * pentatonic pad over a drone in the browser, which needs no file at all. The
 * rest of the player behaves the same either way.
 */

const SCALE = [0, 3, 5, 7, 10, 12, 15, 19]; // minor pentatonic, two octaves
const ROOT = 174.61; // F3, low enough to sit under everything else

export function createPlayer({ src } = {}) {
  let ctx = null;
  let analyser = null;
  let master = null;
  let element = null;
  let voices = [];
  let timer = null;
  let fade = null;
  let playing = false;
  let clock = null;
  const listeners = new Set();
  const timeListeners = new Set();

  const emit = () => listeners.forEach((fn) => fn(playing));

  /** Seconds played / total. The generated pad has no timeline, so it reports a
   * nominal loop length and counts against the audio clock instead. */
  const PAD_LOOP = 240;

  function position() {
    if (element) return { time: element.currentTime, duration: element.duration || 0 };
    if (!ctx) return { time: 0, duration: PAD_LOOP };
    return { time: ctx.currentTime % PAD_LOOP, duration: PAD_LOOP };
  }

  const emitTime = () => {
    const at = position();
    timeListeners.forEach((fn) => fn(at));
  };

  /** One rAF loop drives every timeline readout, so they never drift apart.
   *
   * The frame is cancelled rather than left to expire, and `runClock` always
   * schedules: guarding on `clock` alone trusted an id that `pause` had already
   * abandoned, so a play landing in the same frame as a pause or a reset found
   * the guard set, scheduled nothing, and then watched the stale callback see
   * `playing === false` and clear itself — leaving the track running with no
   * clock at all and the timeline frozen where it stopped. */
  function stopClock() {
    if (clock) cancelAnimationFrame(clock);
    clock = null;
  }

  function runClock() {
    stopClock();
    const step = () => {
      emitTime();
      clock = playing ? requestAnimationFrame(step) : null;
    };
    clock = requestAnimationFrame(step);
  }

  /** The media element, built before any AudioContext so its metadata — and
   * with it the track length — is available before the first gesture. */
  function ensureElement() {
    if (element || !src) return element;
    element = new Audio(src);
    element.loop = true;
    element.preload = 'metadata';
    element.crossOrigin = 'anonymous';
    element.addEventListener('loadedmetadata', emitTime);
    return element;
  }

  function setup() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(analyser);
    analyser.connect(ctx.destination);

    if (src) {
      ctx.createMediaElementSource(ensureElement()).connect(master);
      return;
    }

    // A drone of two slightly detuned saws, filtered right down: the bed.
    const bed = ctx.createGain();
    bed.gain.value = 0.09;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 520;
    lowpass.Q.value = 0.6;
    bed.connect(lowpass).connect(master);

    for (const detune of [-6, 6]) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = ROOT / 2;
      osc.detune.value = detune;
      osc.connect(bed);
      osc.start();
      voices.push(osc);
    }

    // A slow sweep across the filter keeps the drone from sitting still.
    const sweep = ctx.createOscillator();
    const sweepDepth = ctx.createGain();
    sweep.frequency.value = 0.05;
    sweepDepth.gain.value = 180;
    sweep.connect(sweepDepth).connect(lowpass.frequency);
    sweep.start();
    voices.push(sweep);
  }

  /** One soft bell note, long attack and longer tail. */
  function pluck() {
    if (!ctx || src) return;
    const note = SCALE[Math.floor(Math.random() * SCALE.length)];
    const freq = ROOT * 2 ** (note / 12);
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.random() * 1.4 - 0.7;

    osc.connect(gain).connect(pan).connect(master);
    osc.start(now);
    osc.stop(now + 6);
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing || src) return;
    pluck();
    timer = setTimeout(schedule, 1800 + Math.random() * 2600);
  }

  async function play() {
    // A pause leaves the element running for the length of its fade. Pressing
    // play inside that window — which is exactly what pause-then-play and
    // reset-then-play do — used to let the old timer land afterwards and pause
    // the element behind the player's back: the disc kept spinning and the
    // meter kept running, but the track was stopped and the timeline sat at
    // whatever second it had reached. Cancel the fade before anything awaits.
    clearTimeout(fade);
    fade = null;

    setup();
    await ctx.resume();
    playing = true;

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.linearRampToValueAtTime(0.9, now + 1.2);

    if (element) await element.play().catch(() => {});
    schedule();
    emit();
    runClock();
  }

  function pause() {
    if (!ctx) return;
    playing = false;
    clearTimeout(timer);

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.0001, now + 0.4);

    if (element) fade = setTimeout(() => element.pause(), 400);
    emit();
    emitTime();
    stopClock();
  }

  function reset() {
    pause();
    if (element) element.currentTime = 0;
    // The generated pad has no timeline; restarting simply reseeds the notes.
    emitTime();
  }

  /** Absolute seek, in seconds. Clamped, so a drag past either end is safe. */
  function seek(seconds) {
    if (!element) return;
    const total = element.duration || 0;
    element.currentTime = Math.min(Math.max(seconds, 0), total ? total - 0.25 : 0);
    emitTime();
  }

  /** Relative jump, for the skip buttons either side of play. */
  const nudge = (delta) => seek((element?.currentTime ?? 0) + delta);

  return {
    play,
    pause,
    reset,
    seek,
    nudge,
    toggle: () => (playing ? pause() : play()),
    /** Current position, for a caller that needs it before the first tick. */
    position,
    /** Loads the file's metadata without starting playback or an AudioContext,
     * so the timeline can show a real length before the first press. */
    prime() {
      ensureElement();
      emitTime();
    },
    get playing() {
      return playing;
    },
    get analyser() {
      return analyser;
    },
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    onTime(fn) {
      timeListeners.add(fn);
      fn(position());
      return () => timeListeners.delete(fn);
    },
  };
}
