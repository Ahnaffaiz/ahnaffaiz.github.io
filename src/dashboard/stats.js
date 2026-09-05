/** Stats tab: how I split my time, not what the CPU is doing. */
import { html, esc, icon } from '../shell/dom.js';
import { shapePath } from '../shell/shapes.js';
import { statistics as data } from '../data/profile.js';

const SIZE = 132;
const STROKE = 5;
const RADIUS = (SIZE - STROKE * 2) / 2;
const TAU = Math.PI * 2;
const START = -Math.PI / 2; // twelve o'clock

/* The wave that rides the active arc, per Material 3's expressive progress
 * indicators: a fixed number of crests around the whole circle, so a short arc
 * shows a few and a long one shows many. Tight enough that even the shortest
 * dial reads as a wave rather than a couple of bumps. */
const WAVES = 18;
const AMPLITUDE = 3.6; // peak swing, in px, at full strength
const GAP = 0.16; // radians of clear air between the arc and the track
const STEP = 0.022; // sampling interval along the arc, in radians
const SWEEP = 1200; // ms for the arc to reach its value

/** The shape behind each fact's icon, one from the Expressive set per card. */
const MARKS = ['clover', 'cookie12', 'flower'];

const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * An arc as a polyline. With `amp` at zero this is a plain circular arc; above
 * it the radius rides a sine, which is what makes the active track ripple.
 */
function arcPath(cx, cy, r, from, to, amp, phase) {
  if (to - from < 1e-3) return '';
  const parts = [];
  for (let a = from; a < to; a += STEP) {
    const rr = r + Math.sin(a * WAVES + phase) * amp;
    parts.push(`${parts.length ? 'L' : 'M'} ${(cx + Math.cos(a) * rr).toFixed(2)} ${(cy + Math.sin(a) * rr).toFixed(2)}`);
  }
  // Always land exactly on the end angle, whatever the sampling left over.
  const rr = r + Math.sin(to * WAVES + phase) * amp;
  parts.push(`L ${(cx + Math.cos(to) * rr).toFixed(2)} ${(cy + Math.sin(to) * rr).toFixed(2)}`);
  return parts.join(' ');
}

const ringSvg = (index) => `
  <svg class="meter__svg" viewBox="0 0 ${SIZE} ${SIZE}" aria-hidden="true">
    <defs>
      <linearGradient id="meter-${index}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--md-sys-color-primary)" />
        <stop offset="100%" stop-color="var(--md-sys-color-tertiary)" />
      </linearGradient>
    </defs>
    <path class="meter__track" fill="none" stroke-width="${STROKE}" stroke-linecap="round" />
    <path class="meter__value" fill="none" stroke="url(#meter-${index})" stroke-width="${STROKE}"
      stroke-linecap="round" />
  </svg>
`;

/**
 * One dial. The arc sweeps to its value while the wave is at full strength,
 * then the wave settles out — and comes back whenever the dial is hovered.
 */
function createWaveRing({ root, value }) {
  const active = root.querySelector('.meter__value');
  const track = root.querySelector('.meter__track');
  const centre = SIZE / 2;

  let progress = 0; // 0–1, eased toward `target`
  let target = 0;
  let swing = 0; // 0–1, how much of AMPLITUDE is in play
  let wanted = 0;
  let phase = 0;
  let frame = null;
  let last = 0;
  let startedAt = 0;

  function paint() {
    const to = START + progress * TAU;
    active.setAttribute('d', arcPath(centre, centre, RADIUS, START, to, AMPLITUDE * swing, phase));

    // The track is only what is left over, so the two never overlap.
    const from = to + GAP;
    const end = START + TAU - GAP;
    track.setAttribute('d', from < end ? arcPath(centre, centre, RADIUS, from, end, 0, 0) : '');
  }

  function tick(now) {
    const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;

    if (startedAt) {
      const t = Math.min(1, (now - startedAt) / SWEEP);
      progress = target * easeOut(t);
      // Full swing while the arc is moving; it settles once the arc lands.
      if (t >= 1) {
        startedAt = 0;
        wanted = 0;
      }
    }

    phase += delta * 2.4;
    swing += (wanted - swing) * Math.min(1, delta * 4);
    paint();

    if (startedAt || swing > 0.005 || Math.abs(progress - target) > 0.001) {
      frame = requestAnimationFrame(tick);
      return;
    }
    swing = 0;
    paint();
    frame = null;
    last = 0;
  }

  const run = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  paint();

  return {
    /** Sweeps from nothing to the value, wave at full strength. */
    play(reduce) {
      target = value / 100;
      if (reduce) {
        progress = target;
        swing = 0;
        paint();
        return;
      }
      progress = 0;
      wanted = 1;
      startedAt = 0;
      requestAnimationFrame((now) => {
        startedAt = now;
        run();
      });
    },
    /** Hovering brings the wave back without touching the value. */
    setHover(on) {
      wanted = on ? 1 : startedAt ? 1 : 0;
      run();
    },
  };
}

/** Counts an integer up to `to`, on the same curve the arcs use. */
function countUp(el, to, delay, reduce) {
  if (reduce) {
    el.textContent = String(to);
    return;
  }
  const start = document.timeline.currentTime + delay;
  const step = (now) => {
    const t = Math.min(1, Math.max(0, (now - start) / SWEEP));
    el.textContent = String(Math.round(to * easeOut(t)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function createStats() {
  const el = html`
    <div class="perf">
      <div class="perf__meters">
        ${data.meters
          .map(
            (meter, index) => `
              <figure class="meter" style="--i:${index}" tabindex="0">
                <div class="meter__dial">
                  ${ringSvg(index)}
                  <span class="meter__readout">
                    <b data-count="${meter.value}">0</b><i>%</i>
                  </span>
                </div>
                <figcaption class="meter__label">
                  ${icon(meter.icon)}<span>${esc(meter.label)}</span>
                </figcaption>
              </figure>`,
          )
          .join('')}
      </div>

      <ul class="fact-list">
        ${data.facts
          .map((fact, index) => {
            // `100+` counts to 100 and keeps its suffix; `2` is just a number.
            const [, digits = '', suffix = ''] = /^(\d*)(.*)$/.exec(String(fact.value)) ?? [];
            return `
              <li class="fact" style="--i:${index}" tabindex="0">
                <span class="fact__mark" data-mark="${esc(MARKS[index % MARKS.length])}">
                  ${icon(fact.icon)}
                </span>
                <b class="fact__value">
                  <span data-count="${esc(digits)}">${digits ? '0' : ''}</span>${esc(suffix)}
                </b>
                <span class="fact__label">${esc(fact.label)}</span>
                ${fact.detail ? `<span class="fact__detail">${esc(fact.detail)}</span>` : ''}
              </li>`;
          })
          .join('')}
      </ul>
    </div>
  `;

  /* ---------------- Dials ---------------- */

  const dials = [...el.querySelectorAll('.meter')].map((root, index) => {
    const ring = createWaveRing({ root, value: data.meters[index].value });
    // Hover and keyboard focus both bring the wave back.
    for (const [on, events] of [
      [true, ['pointerenter', 'focus']],
      [false, ['pointerleave', 'blur']],
    ]) {
      for (const type of events) root.addEventListener(type, () => ring.setHover(on));
    }
    return ring;
  });

  /* ---------------- Fact shapes ---------------- */

  // Each mark is cut to an Expressive shape against its own measured box, so a
  // card that lays out wider never crops its lobes. `offsetWidth`, not a client
  // rect: hovering a fact turns and grows its mark, and a rect measures the
  // transformed bounding box rather than the layout box the path is cut for.
  const marks = [...el.querySelectorAll('.fact__mark')];

  function cutMarks() {
    for (const mark of marks) {
      const size = mark.offsetWidth || 44;
      mark.style.clipPath = shapePath(mark.dataset.mark, size);
    }
  }

  cutMarks();

  /* ---------------- Entry ---------------- */

  const counters = [...el.querySelectorAll('[data-count]')];

  function animate() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cutMarks();
    dials.forEach((ring, index) => {
      setTimeout(() => ring.play(reduce), index * 110);
    });
    counters.forEach((node, index) => {
      if (node.dataset.count === '') return;
      countUp(node, Number(node.dataset.count), index * 90, reduce);
    });
  }

  return {
    el,
    enter: animate,
  };
}
