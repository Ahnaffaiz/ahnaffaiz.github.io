/**
 * Material 3 Expressive shape set, as `clip-path: path()` strings.
 *
 * The lobed family — cookie, sunny, flower, burst, clover — is one polar
 * function sampled and smoothed, so they stay a family rather than a pile of
 * hand-drawn paths. Everything is generated against a square box of `size`.
 */

const round = (v) => Math.round(v * 100) / 100;
const TAU = Math.PI * 2;

/**
 * Closes a smooth path through points sampled from a polar function, using the
 * Catmull-Rom to Bézier conversion so neighbouring samples stay tangent.
 */
function polarPath(size, radiusAt, samples) {
  const c = size / 2;
  const points = [];

  for (let i = 0; i < samples; i += 1) {
    const angle = (i / samples) * TAU - Math.PI / 2;
    const r = radiusAt(angle) * c;
    points.push([c + r * Math.cos(angle), c + r * Math.sin(angle)]);
  }

  const at = (i) => points[(i + points.length) % points.length];
  const parts = [`M ${round(points[0][0])} ${round(points[0][1])}`];

  for (let i = 0; i < points.length; i += 1) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    parts.push(
      `C ${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ` +
        `${round(p2[0])} ${round(p2[1])}`,
    );
  }

  parts.push('Z');
  return parts.join(' ');
}

/** One circular arc as cubic Béziers, split so no segment exceeds 90°. */
function arcToCubics(cx, cy, radius, from, to) {
  const segments = Math.max(1, Math.ceil(Math.abs(to - from) / (Math.PI / 2)));
  const step = (to - from) / segments;
  const k = (4 / 3) * Math.tan(step / 4);
  const out = [];

  for (let i = 0; i < segments; i += 1) {
    const a0 = from + i * step;
    const a1 = a0 + step;
    const p0 = [cx + radius * Math.cos(a0), cy + radius * Math.sin(a0)];
    const p3 = [cx + radius * Math.cos(a1), cy + radius * Math.sin(a1)];
    const p1 = [p0[0] - k * radius * Math.sin(a0), p0[1] + k * radius * Math.cos(a0)];
    const p2 = [p3[0] + k * radius * Math.sin(a1), p3[1] - k * radius * Math.cos(a1)];
    out.push([p1, p2, p3]);
  }

  return out;
}

/**
 * Four-leaf clover: the union of four circles set into the corners of the box.
 * Where two neighbours cross is the shallow dent in the middle of each side.
 */
export function clover(size, lobe = 0.265) {
  const r = lobe * size;
  const mid = size / 2;
  const h = Math.sqrt(Math.max(0, r * r - (mid - r) ** 2));

  const centres = [
    [size - r, r],
    [size - r, size - r],
    [r, size - r],
    [r, r],
  ];
  const dents = [
    [mid, r - h],
    [size - r + h, mid],
    [mid, size - r + h],
    [r - h, mid],
  ];

  const angle = ([cx, cy], [x, y]) => Math.atan2(y - cy, x - cx);
  const parts = [`M ${round(dents[0][0])} ${round(dents[0][1])}`];

  for (let i = 0; i < 4; i += 1) {
    const centre = centres[i];
    const from = angle(centre, dents[i]);
    let to = angle(centre, dents[(i + 1) % 4]);
    while (to < from) to += TAU; // always take the outer sweep

    for (const [p1, p2, p3] of arcToCubics(centre[0], centre[1], r, from, to)) {
      parts.push(
        `C ${round(p1[0])} ${round(p1[1])} ${round(p2[0])} ${round(p2[1])} ` +
          `${round(p3[0])} ${round(p3[1])}`,
      );
    }
  }

  parts.push('Z');
  return parts.join(' ');
}

/**
 * A circle sampled the same way the lobed family is, so a `clip-path` can
 * interpolate between it and any lobed shape of the same sample count.
 */
export const circle = (size, samples = 32) => polarPath(size, () => 1, samples);

/** Scalloped rounds. `depth` is how far each lobe swings, as a fraction of the radius. */
const lobed = (depth, perLobe) => (size, count) =>
  polarPath(size, (angle) => 1 - depth + depth * Math.cos(count * (angle + Math.PI / 2)), count * perLobe);

export const cookie = lobed(0.07, 8);
export const sunny = lobed(0.13, 8);
export const flower = lobed(0.2, 10);
export const softBurst = lobed(0.16, 6);

/** Pointed rays rather than round lobes. */
export function burst(size, count = 12) {
  return polarPath(
    size,
    (angle) => 0.62 + 0.38 * Math.abs(Math.cos((count / 2) * (angle + Math.PI / 2))) ** 0.35,
    count * 6,
  );
}

/** A fully rounded top over a small-cornered base. */
export function arch(size) {
  const r = size / 2;
  const foot = size * 0.16;
  const parts = [`M 0 ${round(size - foot)}`, `L 0 ${round(r)}`];

  for (const [p1, p2, p3] of arcToCubics(r, r, r, Math.PI, TAU)) {
    parts.push(
      `C ${round(p1[0])} ${round(p1[1])} ${round(p2[0])} ${round(p2[1])} ` +
        `${round(p3[0])} ${round(p3[1])}`,
    );
  }

  parts.push(
    `L ${round(size)} ${round(size - foot)}`,
    `Q ${round(size)} ${round(size)} ${round(size - foot)} ${round(size)}`,
    `L ${round(foot)} ${round(size)}`,
    `Q 0 ${round(size)} 0 ${round(size - foot)}`,
    'Z',
  );
  return parts.join(' ');
}

/** A regular polygon with softened corners. */
export function polygon(size, sides = 5, roundness = 0.18) {
  const c = size / 2;
  const points = [];
  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * TAU - Math.PI / 2;
    points.push([c + c * Math.cos(angle), c + c * Math.sin(angle)]);
  }

  const parts = [];
  for (let i = 0; i < sides; i += 1) {
    const prev = points[(i - 1 + sides) % sides];
    const here = points[i];
    const next = points[(i + 1) % sides];
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const start = lerp(here, prev, roundness);
    const end = lerp(here, next, roundness);

    parts.push(
      i === 0 ? `M ${round(start[0])} ${round(start[1])}` : `L ${round(start[0])} ${round(start[1])}`,
      `Q ${round(here[0])} ${round(here[1])} ${round(end[0])} ${round(end[1])}`,
    );
  }

  parts.push('Z');
  return parts.join(' ');
}

/** Every shape this module can draw, by name, so callers can pick one by string. */
export const shapes = {
  clover: (size) => clover(size),
  /* Circles sampled to match a lobed shape's own point count, so `clip-path`
   * interpolates between the pair instead of jumping. `cookie4` is 32 points,
   * `cookie12` is 96. */
  circle: (size) => circle(size, 32),
  circle12: (size) => circle(size, 96),
  cookie: (size) => cookie(size, 7),
  cookie4: (size) => sunny(size, 4),
  cookie8: (size) => cookie(size, 8),
  cookie12: (size) => cookie(size, 12),
  sunny: (size) => sunny(size, 8),
  flower: (size) => flower(size, 8),
  burst: (size) => burst(size, 12),
  softBurst: (size) => softBurst(size, 10),
  arch: (size) => arch(size),
  pentagon: (size) => polygon(size, 5, 0.18),
  gem: (size) => polygon(size, 6, 0.22),
  diamond: (size) => polygon(size, 4, 0.24),
};

/** The raw SVG path data for a named shape — for `Path2D`, or an SVG `d`. */
export function shapeData(name, size) {
  const make = shapes[name] ?? shapes.cookie;
  return make(size);
}

/** `clip-path` value for a named shape at a given box size. */
export function shapePath(name, size) {
  return `path("${shapeData(name, size)}")`;
}
