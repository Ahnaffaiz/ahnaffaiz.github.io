/** Workspace tab: the route a piece of work takes, first step to last. */
import { html, esc, icon } from '../shell/dom.js';
import { shapePath } from '../shell/shapes.js';
import { workflow } from '../data/profile.js';

/** One shape from the Expressive set per step, so no two marks repeat. */
const MARKS = ['clover', 'cookie12', 'gem', 'sunny', 'cookie4', 'softBurst'];

/**
 * How each pair of steps is joined. One line type throughout — a dashed wave —
 * so the route reads as a single thing. The only difference between links is
 * which layer they sit on: half run under the cards and half over, so the wave
 * weaves through the group rather than sitting flat beside it.
 *
 * The third link is the same wave, only bent along the turn from the end of the
 * top row down to the start of the second.
 */
const LINKS = [
  { layer: 'over' }, // analytics → planning
  { layer: 'under' }, // planning → solution
  { layer: 'under', turn: true }, // solution → designing, row to row
  { layer: 'over' }, // designing → coding
  { layer: 'under' }, // coding → deploy
];

const NS = 'http://www.w3.org/2000/svg';
const TAU = Math.PI * 2;
const HEAD = 6; // arrowhead arm length
const DRAW = 460; // ms for one link to draw itself in
const STAGGER = 250; // ms between one link finishing and the next starting

const node = (name, attrs) => {
  const el = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

const poly = (points) =>
  points.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* The wave scales its detail to the run it is given, so a narrow layout thins
 * it out rather than crushing four crests into twelve pixels. */
const cyclesFor = (span) => clamp(span / 24, 1.2, 4);
const ampFor = (span) => clamp(span / 12, 3, 6);

/** Fattest mid-run, tapering to nothing at both ends. */
const swell = (t) => Math.sin(t * Math.PI) ** 0.6;

/** A sine strung between two points on the same line. */
function wave(x0, x1, y) {
  const span = x1 - x0;
  const cycles = cyclesFor(span);
  const amp = ampFor(span);
  const pts = [];
  for (let t = 0; t <= 1; t += Math.min(0.04, 1.5 / span)) {
    pts.push([x0 + span * t, y + Math.sin(t * TAU * cycles) * amp * swell(t)]);
  }
  return poly(pts);
}

const bez = (a, b, c, d, t) => {
  const m = 1 - t;
  return m * m * m * a + 3 * m * m * t * b + 3 * m * t * t * c + t * t * t * d;
};

/**
 * The same wave, bent along the turn from the end of the top row down to the
 * start of the second. The ripple is laid perpendicular to the curve's own
 * tangent, so it reads as one continuous line rather than a curve with a
 * separate wobble bolted on.
 */
function waveTurn(from, to, gap, rowGap) {
  const [x0, y0] = from;
  const [x3, y3] = to;
  // Scaled to the gap between the rows: a fixed reach would drive the curve
  // deep into both cards once that gap tightens.
  const reach = clamp(rowGap * 1.4, 16, 40);
  const c1 = [x0, gap + reach];
  const c2 = [x3, gap - reach];
  const at = (t) => [bez(x0, c1[0], c2[0], x3, t), bez(y0, c1[1], c2[1], y3, t)];

  // Rough arc length, so the crest spacing matches the straight runs.
  let length = 0;
  let prev = at(0);
  for (let t = 0.02; t <= 1; t += 0.02) {
    const p = at(t);
    length += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }

  const cycles = cyclesFor(length);
  const amp = ampFor(length);
  const pts = [];

  for (let t = 0; t <= 1; t += 0.008) {
    const [x, y] = at(t);
    const [nx, ny] = at(Math.min(1, t + 0.004));
    const dx = nx - x;
    const dy = ny - y;
    const len = Math.hypot(dx, dy) || 1;
    // Normal to the tangent, so the ripple rides the curve.
    const off = Math.sin(t * TAU * cycles) * amp * swell(t);
    pts.push([x + (-dy / len) * off, y + (dx / len) * off]);
  }
  return poly(pts);
}

/** Two short arms closing on a point, pointing along `angle`. */
function arrowHead(x, y, angle) {
  const wing = 2.5;
  const arm = (o) => [x + Math.cos(angle + Math.PI + o) * HEAD, y + Math.sin(angle + Math.PI + o) * HEAD];
  const [ax, ay] = arm(-wing / 2);
  const [bx, by] = arm(wing / 2);
  return `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`;
}

export function createWorkspace() {
  const el = html`
    <div class="flow">
      <p class="flow__title">${esc(workflow.title)}</p>
      <div class="flow__stage">
        <svg class="flow__links flow__links--under" data-layer="under" aria-hidden="true"></svg>
        <ol class="flow__steps">
          ${workflow.steps
            .map(
              (step, index) => `
                <li class="step" style="--i:${index}" tabindex="0">
                  <span class="step__index">${index + 1}</span>
                  <span class="step__mark" data-mark="${esc(MARKS[index % MARKS.length])}">
                    <span class="step__icon">${icon(step.icon)}</span>
                  </span>
                  <span class="step__body">
                    <b class="step__name">${esc(step.name)}</b>
                    <span class="step__detail">${esc(step.detail)}</span>
                  </span>
                </li>`,
            )
            .join('')}
        </ol>
        <svg class="flow__links flow__links--over" data-layer="over" aria-hidden="true"></svg>
      </div>
    </div>
  `;

  const stage = el.querySelector('.flow__stage');
  const steps = [...el.querySelectorAll('.step')];
  const marks = [...el.querySelectorAll('.step__mark')];
  const layers = {
    under: el.querySelector('[data-layer="under"]'),
    over: el.querySelector('[data-layer="over"]'),
  };

  /** Each mark is cut against its own measured box, so no lobe is clipped.
   * `offsetWidth`, not a client rect: hovering a step turns and grows its mark,
   * and a rect measures the transformed bounding box — half again as wide at
   * 135 degrees — which would cut an oversized, off-centre path. */
  function cutMarks() {
    for (const mark of marks) {
      const size = mark.offsetWidth || 52;
      mark.style.clipPath = shapePath(mark.dataset.mark, size);
    }
  }

  /** An element's untransformed layout box, relative to `root`, summed up the
   * offset-parent chain — the steps hang off `.flow__steps` rather than the
   * stage itself, and the marks off their own step.
   *
   * Layout offsets rather than client rects, because hover moves these very
   * boxes: a hovered step lifts 4px and its mark turns 135 degrees and grows,
   * so a rect would measure where the card is being drawn instead of where it
   * sits, and the links would be routed to meet a card that is not there. */
  function layoutBox(el, root) {
    let left = 0;
    let top = 0;
    for (let node = el; node && node !== root; node = node.offsetParent) {
      left += node.offsetLeft;
      top += node.offsetTop;
    }
    return { left, top, width: el.offsetWidth, height: el.offsetHeight };
  }

  /**
   * Redraws the route off the real card boxes, so it survives a resize, a
   * reflow, or the mark changing size in CSS. Returns the drawn paths in
   * route order, for the entry animation to reveal one at a time.
   */
  function drawLinks() {
    const width = stage.offsetWidth;
    if (!width) return [];
    const height = stage.offsetHeight;

    for (const svg of Object.values(layers)) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.replaceChildren();
    }

    const boxes = steps.map((step) => {
      const b = layoutBox(step, stage);
      const m = layoutBox(step.querySelector('.step__mark'), stage);
      return {
        left: b.left,
        right: b.left + b.width,
        top: b.top,
        bottom: b.top + b.height,
        cx: b.left + b.width / 2,
        // Measured, not assumed: the links always meet the marks' own centre.
        markY: m.top + m.height / 2,
      };
    });

    const drawn = [];

    LINKS.forEach((link, i) => {
      const a = boxes[i];
      const b = boxes[i + 1];
      if (!a || !b) return;

      const svg = layers[link.layer];
      let d = '';
      let head = null;

      if (link.turn) {
        const gap = (a.bottom + b.top) / 2;
        const to = [b.cx, b.top - HEAD - 2];
        d = waveTurn([a.cx, a.bottom + 2], to, gap, b.top - a.bottom);
        head = arrowHead(to[0], to[1] + HEAD - 1, Math.PI / 2);
      } else {
        const y = a.markY;
        const x0 = a.right + 5;
        const x1 = b.left - 5 - HEAD;
        if (x1 <= x0) return;
        d = wave(x0, x1, y);
        head = arrowHead(x1 + HEAD, y, 0);
      }

      const path = node('path', { class: 'flow__link', d, fill: 'none' });
      svg.append(path);
      // The head is solid, so the crawling dashes never bite off the point.
      const headPath = head
        ? svg.appendChild(node('path', { class: 'flow__head', d: head, fill: 'none' }))
        : null;
      drawn.push({ path, headPath });
    });

    return drawn;
  }

  let links = [];

  function measure() {
    cutMarks();
    links = drawLinks();
  }

  new ResizeObserver(measure).observe(stage);

  /**
   * The route draws itself in order: each link is hidden behind its own length
   * of dash, then unspooled, so the eye is walked from step one through to six.
   * Once a link has landed its inline dash is dropped and the CSS crawl — the
   * steady flow along the finished route — takes back over.
   */
  function drawRoute() {
    links.forEach(({ path, headPath }, i) => {
      const length = path.getTotalLength();
      const delay = i * STAGGER;

      path.classList.add('flow__link--drawing');
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      if (headPath) headPath.style.opacity = '0';

      const run = path.animate(
        [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
        { duration: DRAW, delay, easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)', fill: 'both' },
      );

      run.finished
        .then(() => {
          path.classList.remove('flow__link--drawing');
          path.style.strokeDasharray = '';
          path.style.strokeDashoffset = '';
          if (headPath) headPath.style.opacity = '';
        })
        .catch(() => {
          // Cancelled by a redraw — the next pass sets everything up again.
        });

      if (headPath) {
        headPath.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 180,
          delay: delay + DRAW - 60,
          fill: 'both',
        });
      }
    });
  }

  return {
    el,
    /** Each step arrives, then the route is drawn through them. */
    enter() {
      measure();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      steps.forEach((step, index) => {
        step.animate(
          [
            { opacity: 0, transform: 'translateY(14px) scale(0.96)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          {
            duration: 460,
            delay: index * 90,
            easing: 'cubic-bezier(0.42, 1.67, 0.21, 0.9)',
            fill: 'backwards',
          },
        );
      });

      drawRoute();
    },
  };
}
