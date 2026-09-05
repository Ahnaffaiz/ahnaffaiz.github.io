/**
 * The Terminal window's boot sequence.
 *
 * Three acts, in order:
 *
 *   1. Matrix rain over the whole tile for three seconds, with the boot log
 *      typing itself underneath it.
 *   2. The rain drains away and the portrait resolves — the photo is sampled
 *      into a character grid and the rows drop in staggered, top to bottom.
 *   3. The identity fields type out beside it, then the collaboration prompt.
 *
 * The rain is a canvas because a glyph per cell per frame is far too much DOM.
 * Everything after it is text, so it stays selectable and readable to a screen
 * reader — the whole readout is mirrored into an `aria-label` up front, and the
 * animated parts are hidden from the accessibility tree.
 */

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFZ<>*+-/|=';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reads a token off an element so the canvas can paint in scheme colours. */
const token = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------------- Matrix rain ---------------- */

/**
 * Runs the rain until `stop()` is called or the canvas leaves the document.
 * Columns fall at their own speed and each one re-seeds above the top edge
 * once it has fallen clear, so the field never settles into a pattern.
 */
function rain(canvas) {
  const ctx = canvas.getContext('2d');
  const cell = 13;
  const trail = 10;
  let columns = [];
  let width = 0;
  let height = 0;

  const head = token(canvas, '--term-accent');
  const tail = token(canvas, '--term-tail');
  const font = token(canvas, '--cae-font-mono') || 'monospace';

  const seed = (y) => ({
    y,
    // Pixels a second, so the fall is the same on any refresh rate.
    speed: 140 + Math.random() * 260,
    offset: Math.floor(Math.random() * GLYPHS.length),
  });

  function measure() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${cell}px ${font}`;
    ctx.textBaseline = 'top';

    const count = Math.ceil(width / cell);
    // Columns start scattered over the whole height, so the field is already
    // full on the first frame rather than raining in from the top edge.
    columns = Array.from(
      { length: count },
      (_, i) => columns[i] ?? seed(Math.random() * height),
    );
    columns.length = count;
  }

  function draw(delta, frame) {
    // The trail behind each head is the last frame worn away rather than
    // painted over: the window's glass is the background, so a wash of colour
    // would silt up into a slab. `destination-out` only reads the alpha, which
    // is why the fill colour here is arbitrary.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 0.09;
    ctx.fillStyle = head;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    columns.forEach((col, i) => {
      const x = i * cell;
      col.y += col.speed * delta;
      if (col.y - trail * cell > height) Object.assign(col, seed(-cell * Math.random() * 12));

      // Glyphs land on the row grid rather than the exact sub-pixel position:
      // a head redrawn a few pixels along would otherwise smear into a streak.
      const snapped = Math.floor(col.y / cell) * cell;

      // The head is bright and the glyphs behind it fade out; anything older
      // than the trail has already been worn away above.
      for (let back = 0; back < trail; back += 1) {
        const y = snapped - back * cell;
        if (y < -cell || y > height) continue;
        ctx.globalAlpha = back === 0 ? 1 : Math.max(0.05, 0.62 - back * 0.07);
        ctx.fillStyle = back === 0 ? head : tail;
        const glyph = GLYPHS[(col.offset + back * 7 + (back === 0 ? frame : 0)) % GLYPHS.length];
        ctx.fillText(glyph, x, y);
      }
    });
    ctx.globalAlpha = 1;
  }

  measure();
  const onResize = () => measure();
  window.addEventListener('resize', onResize);

  let raf = 0;
  let last = performance.now();
  let frame = 0;
  const tick = (now) => {
    if (!canvas.isConnected) return stop();
    // A long frame is clamped: a hidden tab must not teleport the whole field.
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    frame += 1;
    draw(delta, frame);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  function stop() {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  }
  return stop;
}

/* ---------------- Portrait → characters ---------------- */

/**
 * The width-to-height ratio of one character cell in `el`, measured rather
 * than assumed: it decides how many rows the portrait needs, and a guess there
 * is what leaves ASCII art stretched or squat.
 */
function cellRatio(el) {
  const probe = document.createElement('span');
  probe.textContent = 'M'.repeat(20);
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;';
  el.append(probe);
  const width = probe.getBoundingClientRect().width / 20;
  const height = probe.getBoundingClientRect().height;
  probe.remove();
  return width && height ? width / height : 0.5;
}

/**
 * Samples the `crop` region of `src` down to a character grid. A cell is taller
 * than it is wide, so the row count is scaled by `ratio` to keep the face in
 * proportion, and transparent pixels stay blank — the portrait is cut out, so
 * what is left reads as a silhouette rather than a rectangle.
 */
function toAscii(src, { columns, ramp, ratio, crop }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onerror = reject;
    img.onload = () => {
      // The crop is in fractions of the source, so it survives a re-export of
      // the photo at another size.
      const box = {
        x: (crop?.x ?? 0) * img.width,
        y: (crop?.y ?? 0) * img.height,
        width: (crop?.width ?? 1) * img.width,
        height: (crop?.height ?? 1) * img.height,
      };
      const rows = Math.max(1, Math.round((columns * box.height * ratio) / box.width));
      const canvas = document.createElement('canvas');
      canvas.width = columns;
      canvas.height = rows;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, columns, rows);
      const { data } = ctx.getImageData(0, 0, columns, rows);

      const lines = [];
      for (let y = 0; y < rows; y += 1) {
        let line = '';
        for (let x = 0; x < columns; x += 1) {
          const i = (y * columns + x) * 4;
          const alpha = data[i + 3] / 255;
          // Rec. 709 luma, then composited onto white so the cut-out
          // background lands on the blank end of the ramp.
          const luma = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const value = luma * alpha + (1 - alpha);
          const step = Math.min(ramp.length - 1, Math.round((1 - value) * (ramp.length - 1)));
          line += ramp[step];
        }
        lines.push(line.replace(/\s+$/, ''));
      }
      resolve(lines);
    };
    img.src = src;
  });
}

/* ---------------- Typing ---------------- */

/**
 * Types `text` into `el` at `cps` characters a second. Driven off the frame
 * clock rather than a timer per character, so the pace holds however the
 * browser is clamping timeouts — and lands instantly if motion is reduced.
 */
function type(el, text, cps = 90) {
  if (reduceMotion() || !text) {
    el.textContent = text;
    return Promise.resolve();
  }
  el.textContent = '';
  return new Promise((resolve) => {
    const started = performance.now();
    const step = (now) => {
      if (!el.isConnected) return resolve();
      const shown = Math.floor(((now - started) / 1000) * cps);
      el.textContent = text.slice(0, shown);
      if (shown >= text.length) {
        el.textContent = text;
        return resolve();
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ---------------- Sequence ---------------- */

/**
 * Drives the three acts inside an already-rendered terminal element. Resolves
 * once the readout is complete; bails quietly if the window is closed first.
 */
export async function bootTerminal(root, { photo, ramp, columns, crop, loaderMs = 3000 }) {
  const stage = root.querySelector('.term-boot');
  const canvas = root.querySelector('.term-rain');
  const log = root.querySelector('.term-boot__log');
  const art = root.querySelector('.term-ascii');
  const readout = root.querySelector('.term-readout');

  const alive = () => root.isConnected;
  const quick = reduceMotion();

  // The portrait is sampled while the rain plays, so act two never waits on it.
  const asciiPromise = toAscii(photo, { columns, ramp, crop, ratio: cellRatio(art) })
    .catch(() => null);

  const stopRain = quick ? () => {} : rain(canvas);

  // Boot lines type over the rain, each given an equal slice of the loader so
  // the last one lands just before the rain drains.
  const entries = [...log.querySelectorAll('.term-boot__line')];
  const slot = (loaderMs - 400) / Math.max(entries.length, 1);
  for (const entry of entries) {
    if (!alive()) return stopRain();
    const started = performance.now();
    entry.classList.add('is-live');
    // Fast enough to finish inside the slot, whatever the line's length.
    await type(entry.querySelector('.term-boot__text'), entry.dataset.text, 130);
    await wait(quick ? 0 : Math.max(0, slot - (performance.now() - started)));
  }

  await wait(quick ? 0 : 260);
  if (!alive()) return stopRain();

  stage.classList.add('is-done');
  await wait(quick ? 0 : 420);
  stopRain();
  stage.remove();
  root.classList.add('is-booted');

  // Act two: the portrait resolves row by row, and the fields type beside it.
  const lines = await asciiPromise;
  if (!alive()) return;
  if (lines) {
    art.textContent = '';
    lines.forEach((line, index) => {
      const row = document.createElement('span');
      row.className = 'term-ascii__row';
      row.style.setProperty('--row', String(index));
      row.textContent = line || ' ';
      art.append(row);
    });
  }

  const fields = [...readout.querySelectorAll('.term-field')];
  for (const field of fields) {
    if (!alive()) return;
    field.classList.add('is-live');
    await type(field.querySelector('.term-field__value'), field.dataset.text, 55);
    await wait(quick ? 0 : 90);
  }

  if (!alive()) return;
  root.querySelector('.term-cta')?.classList.add('is-live');
}
