/**
 * Tool marks, drawn as geometry rather than shipped brand files: each is a
 * simplified, recognisable silhouette authored here, so nothing is copied and
 * the set stays visually consistent at 22px.
 *
 * The set is monochrome on purpose — every mark inherits `currentColor`, so a
 * row of them reads as one family and follows the Material 3 scheme rather
 * than dragging nine unrelated brand palettes into the card.
 */

const svg = (body) =>
  `<svg class="logo" viewBox="0 0 24 24" role="img" aria-hidden="true">${body}</svg>`;

/** Shorthand for the stroked marks: one weight, one cap, right through the set. */
const stroked = (body, width = 1.8) =>
  svg(
    `<g fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round"
        stroke-linejoin="round">${body}</g>`,
  );

/** The six vertices of a flat-top hexagon inscribed in the box. */
const hexPoints = (r = 9.4) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [12 + Math.cos(a) * r, 12 + Math.sin(a) * r];
  });

export const logos = {
  /** Claude — the radiating asterisk. */
  claude: () =>
    svg(
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 12 + Math.cos(a) * 3.2;
        const y1 = 12 + Math.sin(a) * 3.2;
        const x2 = 12 + Math.cos(a) * 9.4;
        const y2 = 12 + Math.sin(a) * 9.4;
        return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"
          stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />`;
      }).join(''),
    ),

  /**
   * ChatGPT — the hexagonal knot, abstracted: the outer six-sided ring with the
   * three-spoke join that gives the mark its interlocked read.
   */
  chatgpt: () => {
    const p = hexPoints();
    const ring = `M ${p.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ')} Z`;
    const spokes = [0, 2, 4]
      .map((i) => `M 12 12 L ${p[i][0].toFixed(2)} ${p[i][1].toFixed(2)}`)
      .join(' ');
    return stroked(`<path d="${ring}" /><path d="${spokes}" />`, 1.7);
  },

  /** Python — two interlocking hooks. */
  python: () =>
    svg(
      `<path d="M11.8 2.6c-2.9 0-4.7.9-4.7 3v2.3h4.9v.9H5.4C3.3 8.8 2 10.3 2 13.2c0 2.8 1.1 4.4 3.2 4.4h1.7v-2.7c0-2.2 1.8-3.9 4-3.9h4.6c1.8 0 3.1-1.4 3.1-3.1V5.6c0-1.7-1.5-2.6-3.4-2.8-.9-.1-1.7-.2-2.4-.2Zm-2.6 2.1a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3Z" fill="currentColor" />
       <path d="M12.2 21.4c2.9 0 4.7-.9 4.7-3v-2.3H12v-.9h6.6c2.1 0 3.4-1.5 3.4-4.4 0-2.8-1.1-4.4-3.2-4.4h-1.7v2.7c0 2.2-1.8 3.9-4 3.9H8.5c-1.8 0-3.1 1.4-3.1 3.1v3.3c0 1.7 1.5 2.6 3.4 2.8.9.1 1.7.2 2.4.2Zm2.6-2.1a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Z" fill="currentColor" opacity="0.55" />`,
    ),

  /** Vue — the nested chevrons. */
  vue: () =>
    svg(
      `<path d="M2 3.5h4.2L12 13.6 17.8 3.5H22L12 20.8Z" fill="currentColor" />
       <path d="M6.9 3.5h3L12 7.3l2.1-3.8h3L12 12.6Z" fill="currentColor" opacity="0.45" />`,
    ),

  /** React — the electron orbits. */
  react: () =>
    svg(
      `<circle cx="12" cy="12" r="2.1" fill="currentColor" />
       <g fill="none" stroke="currentColor" stroke-width="1.15">
         <ellipse cx="12" cy="12" rx="10" ry="3.9" />
         <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
         <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
       </g>`,
    ),

  /** Node — the hexagon. */
  node: () =>
    svg(
      `<path d="M12 1.8 21.4 7v10L12 22.2 2.6 17V7Z" fill="currentColor" />
       <path d="M12 7.6c-2.2 0-3.4.9-3.4 2.4 0 1.6 1.2 2.1 3.2 2.4 2.1.3 2.3.6 2.3 1.1 0 .6-.5 1-1.9 1-1.5 0-2-.4-2.2-1.2a.4.4 0 0 0-.4-.3h-1a.4.4 0 0 0-.4.4c.1 1.6 1.2 2.6 3.9 2.6 2.4 0 3.8-1 3.8-2.7 0-1.6-1.1-2.1-3.4-2.4-2.2-.3-2.4-.4-2.4-1 0-.5.2-1 1.8-1 1.4 0 1.9.3 2.1 1.1a.4.4 0 0 0 .4.3h1a.4.4 0 0 0 .4-.4c-.2-1.6-1.3-2.3-3.8-2.3Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`,
    ),

  /** Laravel — the angular monogram stroke. */
  laravel: () =>
    svg(
      `<path d="M2 6.2 6.4 3.6l4.4 2.6v5.1l4.4-2.5 4.4 2.5v5.1l-8.8 5.1-8.8-5.1Zm4.4-.8L3.8 6.9l2.6 1.5L9 6.9Zm-3.1 2.4v8.6l7.5 4.3v-8.6Zm8.4 12.9 7.5-4.3v-8.6l-7.5 4.3Zm3.5-11 2.6-1.5 2.6 1.5-2.6 1.5Z" fill="currentColor" />`,
    ),

  /** Flutter — the folded panels. */
  flutter: () =>
    svg(
      `<path d="M13.6 1.5 3.2 11.9l3.2 3.2L20 1.5Z" fill="currentColor" opacity="0.45" />
       <path d="M13.5 11.4 8 16.9l3.3 3.4 3.2-3.2 5.5-5.7Z" fill="currentColor" />
       <path d="m8 16.9 5.5-5.5 2.2 2.2-5.4 5.5Z" fill="currentColor" opacity="0.7" />`,
    ),

  /** Swift — the swift in flight. */
  swift: () =>
    svg(
      `<rect x="1.6" y="1.6" width="20.8" height="20.8" rx="6" fill="currentColor" />
       <path d="M16.6 15.6c-1.9 1.1-4.5 1.2-7.1 0a11.4 11.4 0 0 1-3.6-2.8c.5.4 1.1.7 1.7 1 2.4 1.2 4.8 1.1 6.5.1-2.4-1.9-4.5-4.3-6-6.3.4.4.8.8 1.3 1.1 1.5 1.3 3.9 3 4.8 3.5-1.9-2-3.6-4.5-3.5-4.4a41 41 0 0 0 6.7 5.4c.1.2.2.5.2.8.2.8 0 1.7-.4 2.4.5.6.4 1.7.2 2.2-.3-.9-.9-1.2-1.4-1.3Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`,
    ),
};

/**
 * The second half of the set — every tool the Skills window lists. Same rules
 * as above: one weight, `currentColor` only, readable at 22px. A few marks
 * carry their own lettering; it is set in the shell's own display face so a
 * wordmark still reads as part of the family.
 */

/** Lettering inside a filled mark, punched out in the surface colour. */
const lettered = (text, { size = 8.4, y = 15.2, x = 12 } = {}) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700"
     letter-spacing="-0.4" font-family="var(--cae-font-display)"
     fill="var(--md-sys-color-surface-container-lowest)">${text}</text>`;

/** The rounded slab several wordmarks sit on. */
const slab = (body) =>
  svg(`<rect x="1.8" y="1.8" width="20.4" height="20.4" rx="5.6" fill="currentColor" />${body}`);

/** A database cylinder: top ellipse, two side walls, and an optional accent. */
const cylinder = (accent = '') =>
  svg(
    `<ellipse cx="12" cy="5.6" rx="7.8" ry="3" fill="currentColor" />
     <path d="M4.2 5.6v12.8c0 1.7 3.5 3 7.8 3s7.8-1.3 7.8-3V5.6c0 1.7-3.5 3-7.8 3s-7.8-1.3-7.8-3Z"
       fill="currentColor" opacity="0.42" />${accent}`,
  );

Object.assign(logos, {
  /** Gemini — the four-point spark with concave sides. */
  gemini: () =>
    svg(
      `<path d="M12 1.4c.5 5.1 3.5 8.9 9.4 10.6-5.9 1.7-8.9 5.5-9.4 10.6-.5-5.1-3.5-8.9-9.4-10.6C8.5 10.3 11.5 6.5 12 1.4Z"
         fill="currentColor" />`,
    ),

  /** MCP — the context bridge: three arcs feeding one connector stem. */
  mcp: () =>
    stroked(
      `<path d="M3 15.4 10.8 7.6a3.1 3.1 0 0 1 4.4 4.4L9.6 17.6" />
       <path d="M6.9 19.3 15 11.2a3.1 3.1 0 0 1 4.4 4.4l-4.6 4.6" />
       <path d="M12.6 4.6a3.1 3.1 0 0 1 4.4 0l2.7 2.7" />`,
      1.7,
    ),

  /** OCR — the scan frame reading lines of text. */
  ocr: () =>
    svg(
      `<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
         <path d="M3 8V5.4A2.4 2.4 0 0 1 5.4 3H8M16 3h2.6A2.4 2.4 0 0 1 21 5.4V8M21 16v2.6a2.4 2.4 0 0 1-2.4 2.4H16M8 21H5.4A2.4 2.4 0 0 1 3 18.6V16" />
       </g>
       <g fill="currentColor">
         <rect x="7" y="8.6" width="10" height="1.7" rx="0.85" />
         <rect x="7" y="11.5" width="10" height="1.7" rx="0.85" opacity="0.6" />
         <rect x="7" y="14.4" width="6.4" height="1.7" rx="0.85" opacity="0.4" />
       </g>`,
    ),

  /** Prompt engineering — the instruction bubble with a caret and a cursor. */
  prompt: () =>
    svg(
      `<path d="M4.4 3h15.2A2.4 2.4 0 0 1 22 5.4v9.8a2.4 2.4 0 0 1-2.4 2.4H10l-5.2 3.6a.7.7 0 0 1-1.1-.6v-3H4.4A2.4 2.4 0 0 1 2 15.2V5.4A2.4 2.4 0 0 1 4.4 3Z"
         fill="currentColor" />
       <g fill="none" stroke="var(--md-sys-color-surface-container-lowest)" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
         <path d="m7.4 7.6 2.8 2.7-2.8 2.7" /><path d="M12.4 13.4h4.4" />
       </g>`,
    ),

  /** JavaScript — the wordmark slab. */
  javascript: () => slab(lettered('JS')),

  /** PHP — the wordmark on the elliptical plate. */
  php: () =>
    svg(
      `<ellipse cx="12" cy="12" rx="10.6" ry="6.6" fill="currentColor" />
       ${lettered('php', { size: 7.4, y: 14.6 })}`,
    ),

  /** Dart — the folded wing over the darted body. */
  dart: () =>
    svg(
      `<path d="M2.4 12.6 9.1 5.9l3.2 3.2-6.7 6.7Z" fill="currentColor" opacity="0.45" />
       <path d="M9.1 5.9h6.6l5.9 5.9v9.3h-9.3l-6.6-6.6Z" fill="currentColor" />`,
    ),

  /** HTML — the angle brackets around the slash. */
  html: () =>
    stroked(`<path d="m8.4 7.6-5 4.4 5 4.4" /><path d="m15.6 7.6 5 4.4-5 4.4" /><path d="M13.6 4.8 10.4 19.2" />`, 2),

  /** Tailwind — the two stacked waves. */
  tailwind: () =>
    svg(
      `<path d="M7.4 6.2c-2.6 0-4.2 1.3-4.9 3.9.9-1.3 2-1.8 3.3-1.5.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.9-3.9-.9 1.3-2 1.8-3.3 1.5-.7-.2-1.2-.7-1.8-1.3-.9-1-2-2.1-4.3-2.1Z"
         fill="currentColor" />
       <path d="M12.3 13.9c-2.6 0-4.2 1.3-4.9 3.9.9-1.3 2-1.8 3.3-1.5.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.9-3.9-.9 1.3-2 1.8-3.3 1.5-.7-.2-1.2-.7-1.8-1.3-.9-1-2-2.1-4.3-2.1Z"
         fill="currentColor" opacity="0.55" />`,
    ),

  /** Material 3 — the tonal half-disc inside the ring. */
  material3: () =>
    svg(
      `<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.35" />
       <path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor" />
       <circle cx="12" cy="12" r="4.1" fill="var(--md-sys-color-surface-container-lowest)" />`,
    ),

  /** Human Interface — the Apple silhouette. */
  apple: () =>
    svg(
      `<path d="M16.3 12.6c0-2.2 1.7-3.3 1.8-3.4-1-1.5-2.6-1.7-3.1-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.5Z"
         fill="currentColor" />
       <path d="M14.4 6.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.4-.6.6-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.3Z"
         fill="currentColor" />`,
    ),

  /** Vite — the bolt inside the tapering V. */
  vite: () =>
    svg(
      `<path d="M2.2 4.6 12 21.6 21.8 4.6Z" fill="currentColor" opacity="0.4" />
       <path d="M13.9 2.4 8.6 12.5l3-.4-1.3 6.6 5.4-9.9-3 .4Z" fill="currentColor" />`,
    ),

  /** REST API — the endpoint graph between two braces. */
  restapi: () =>
    svg(
      `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
         <path d="M7 3.4C4.6 3.4 5.4 8 5.4 9.6c0 1.4-.8 2.4-2.4 2.4 1.6 0 2.4 1 2.4 2.4 0 1.6-.8 6.2 1.6 6.2" />
         <path d="M17 3.4c2.4 0 1.6 4.6 1.6 6.2 0 1.4.8 2.4 2.4 2.4-1.6 0-2.4 1-2.4 2.4 0 1.6.8 6.2-1.6 6.2" />
         <path d="M12 9.6v4.8M12 12l-2.6-1.5M12 12l2.6-1.5" />
       </g>
       <g fill="currentColor">
         <circle cx="12" cy="8.2" r="1.7" /><circle cx="8.7" cy="15.4" r="1.5" />
         <circle cx="15.3" cy="15.4" r="1.5" />
       </g>`,
    ),

  /** Next.js — the wordmark disc with the diagonal stem. */
  nextjs: () =>
    svg(
      `<circle cx="12" cy="12" r="10.2" fill="currentColor" />
       ${lettered('N', { size: 10, y: 15.9 })}
       <path d="M14.6 8.4h1.6v8.4h-1.6Z" fill="var(--md-sys-color-surface-container-lowest)" />`,
    ),

  /** VPS — the stacked rack. */
  server: () =>
    svg(
      `<g fill="currentColor">
         <rect x="2.6" y="3.4" width="18.8" height="5.6" rx="2" />
         <rect x="2.6" y="10.6" width="18.8" height="5.6" rx="2" opacity="0.62" />
         <rect x="2.6" y="17.8" width="18.8" height="2.8" rx="1.4" opacity="0.4" />
       </g>
       <g fill="var(--md-sys-color-surface-container-lowest)">
         <circle cx="6.4" cy="6.2" r="1.1" /><circle cx="6.4" cy="13.4" r="1.1" />
       </g>`,
    ),

  /** Nginx — the wordmark hexagon. */
  nginx: () => {
    const p = hexPoints(10);
    const ring = `M ${p.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ')} Z`;
    return svg(`<path d="${ring}" fill="currentColor" />${lettered('N', { size: 10, y: 15.9 })}`);
  },

  /** Docker — the container stack riding the hull. */
  docker: () =>
    svg(
      `<g fill="currentColor">
         <rect x="6.1" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="10.3" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="14.5" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="10.3" y="5.4" width="3.4" height="3.4" rx="0.6" opacity="0.55" />
       </g>
       <path d="M2.4 14.2h19.2c0 3.7-2.9 6.4-7.4 6.4H8.6c-3.6 0-6.2-2.3-6.2-5.6Z" fill="currentColor" opacity="0.75" />`,
    ),

  /** GitHub Actions — the loop with the run marker. */
  actions: () =>
    svg(
      `<g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
         <path d="M20.4 12a8.4 8.4 0 1 1-2.9-6.3" />
       </g>
       <path d="M18.6 2.6v4.2h-4.2Z" fill="currentColor" />
       <circle cx="12" cy="12" r="3.4" fill="currentColor" />`,
    ),

  /** MySQL — the cylinder with the dolphin's wave. */
  mysql: () =>
    cylinder(
      `<path d="M6.6 15.4c2.4.2 4-.7 5.1-2 1-1.3 2.4-2.1 4.4-1.9"
         fill="none" stroke="var(--md-sys-color-surface-container-lowest)"
         stroke-width="1.6" stroke-linecap="round" />`,
    ),

  /** MariaDB — the cylinder under the seal's crest. */
  mariadb: () =>
    cylinder(
      `<path d="M8.2 16.4c1.3-2.6 3.6-3.6 6-3.4l1.8-2 .6 2.6"
         fill="none" stroke="var(--md-sys-color-surface-container-lowest)"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />`,
    ),

  /** PostgreSQL — the elephant's head and tusks. */
  postgres: () =>
    svg(
      `<path d="M12 2.2c4.6 0 7.9 3 7.9 7.3 0 3-1 5.1-1 7.6 0 1.9-1.2 3.2-2.7 3.2-1.2 0-1.9-.8-1.9-2 0-1.5.7-2.7.7-4.4 0-1.6-1.1-2.7-3-2.7s-3 1.1-3 2.7c0 1.7.7 2.9.7 4.4 0 1.2-.7 2-1.9 2-1.5 0-2.7-1.3-2.7-3.2 0-2.5-1-4.6-1-7.6C4.1 5.2 7.4 2.2 12 2.2Z"
         fill="currentColor" />
       <g fill="var(--md-sys-color-surface-container-lowest)">
         <circle cx="9.1" cy="8.6" r="1.3" /><circle cx="14.9" cy="8.6" r="1.3" />
       </g>`,
    ),

  /** Firebase — the folded flame. */
  firebase: () =>
    svg(
      `<path d="M4.6 17.8 8.1 2.6l3.1 5.6-2.3 4.3Z" fill="currentColor" opacity="0.45" />
       <path d="m4.6 17.8 9.7-14.4 2.2 3.6-1.9 3.4 4.8 7.4Z" fill="currentColor" />
       <path d="M4.6 17.8 12 22.2l7.4-4.4-7.4-3.6Z" fill="currentColor" opacity="0.7" />`,
    ),

  /** AWS — the service blocks over the delivery swoosh. */
  aws: () =>
    svg(
      `<g fill="currentColor">
         <rect x="3" y="4" width="5.2" height="5.2" rx="1.4" />
         <rect x="9.4" y="4" width="5.2" height="5.2" rx="1.4" opacity="0.7" />
         <rect x="15.8" y="4" width="5.2" height="5.2" rx="1.4" opacity="0.45" />
       </g>
       <path d="M2.6 14.6c5.2 3.4 13.6 3.4 18.8 0" fill="none" stroke="currentColor"
         stroke-width="1.9" stroke-linecap="round" />
       <path d="m18.6 15.8 3.4-1.6-1.3 3.5Z" fill="currentColor" />`,
    ),

  /** Cloudflare R2 — the object-storage cloud. */
  cloudflare: () =>
    svg(
      `<path d="M17.4 19.4H7a5 5 0 0 1-.5-10 6.4 6.4 0 0 1 12.1 1.6 4.2 4.2 0 0 1-1.2 8.4Z" fill="currentColor" />
       <path d="M9.4 14.2h8.4a1.1 1.1 0 0 1 0 2.2H9.4a1.1 1.1 0 0 1 0-2.2Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`,
    ),

  /** Redis — the layered keyspace. */
  redis: () =>
    svg(
      `<g fill="currentColor">
         <path d="M12 2.6 22 6.4 12 10.2 2 6.4Z" />
         <path d="M12 10 22 6.2v2.6L12 12.6 2 8.8V6.2Z" opacity="0.66" />
         <path d="M12 14.4 22 10.6v2.6L12 17 2 13.2v-2.6Z" opacity="0.45" />
         <path d="M12 18.8 22 15v2.6L12 21.4 2 17.6V15Z" opacity="0.3" />
       </g>`,
    ),

  /** Figma — the five-piece stack. */
  figma: () =>
    svg(
      `<g fill="currentColor">
         <path d="M8.6 1.8h3.2v6.4H8.6a3.2 3.2 0 0 1 0-6.4Z" />
         <path d="M12.2 1.8h3.2a3.2 3.2 0 0 1 0 6.4h-3.2Z" opacity="0.7" />
         <path d="M8.6 8.8h3.2v6.4H8.6a3.2 3.2 0 0 1 0-6.4Z" opacity="0.55" />
         <path d="M8.6 15.8h3.2v3.2a3.2 3.2 0 1 1-3.2-3.2Z" opacity="0.4" />
         <circle cx="15.4" cy="12" r="3.2" opacity="0.85" />
       </g>`,
    ),

  /** Zed — the angular monogram slab. */
  zed: () => slab(lettered('Z', { size: 10.4, y: 16 })),

  /** GitHub — the cat mark. */
  github: () =>
    svg(
      `<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
         fill="currentColor" />`,
    ),
});

/** Kept so `logo: 'codex'` in older data still resolves. */
logos.codex = logos.chatgpt;

export const logoMarkup = (name) => (logos[name] ?? logos.chatgpt)();

/**
 * Contact marks. Same rules as the tool set — one weight, `currentColor` only —
 * but drawn to read at the 34px the Contact window sets them at, where the
 * silhouette carries the recognition rather than a brand colour.
 */
Object.assign(logos, {
  /** Email — the envelope, flap open across the front. */
  email: () =>
    stroked(
      `<rect x="2.6" y="4.9" width="18.8" height="14.2" rx="3.4" />
       <path d="M4.4 8.1l6.6 4.7a1.8 1.8 0 0 0 2 0l6.6-4.7" />`,
    ),

  /** Threads — the hooked loop, open at the top. */
  threads: () =>
    stroked(
      `<path d="M18.4 7.9C17.4 5.2 15.2 3.8 12 3.8 7.6 3.8 5 6.9 5 12.9s2.6 8.9 7.2 8.9" />
       <path d="M12.2 21.8c3.2 0 5.4-1.6 5.4-4.1 0-2.4-1.9-3.8-5-3.8-1.9 0-3.2.9-3.2 2.2 0 1.1 1 1.9 2.3 1.9
                1.9 0 3-1.4 3.2-4.1.2-2.5-1-4-3.1-4-1.4 0-2.4.5-3 1.5" />`,
    ),

  /** Instagram — the rounded frame, lens and highlight. */
  instagram: () =>
    svg(
      `<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
          stroke-linejoin="round">
         <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="5.4" />
         <circle cx="12" cy="12" r="4.2" />
       </g>
       <circle cx="16.9" cy="7.1" r="1.25" fill="currentColor" />`,
    ),

  /** WhatsApp — the tailed bubble with the handset inside it. */
  whatsapp: () =>
    svg(
      `<path d="M12.1 3.4a8.6 8.6 0 0 0-7.3 13.1l-1.3 4.1 4.3-1.3A8.6 8.6 0 1 0 12.1 3.4Z"
         fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
       <path d="M9.5 8.6c.4-.1.7 0 .9.4l.7 1.5c.1.3 0 .5-.2.7l-.6.5c.6 1.3 1.6 2.2 2.9 2.7l.5-.6c.2-.3.5-.3.8-.2
                l1.5.7c.4.2.5.5.4.9-.3 1-1.1 1.6-2.2 1.5-3-.3-5.6-2.9-6-6-.1-1 .4-1.8 1.3-2.1Z"
         fill="currentColor" />`,
    ),
});
