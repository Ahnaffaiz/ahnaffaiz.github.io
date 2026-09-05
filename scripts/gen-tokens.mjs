/**
 * Generates Material 3 color tokens (--md-sys-color-*) for light and dark
 * schemes from a single seed color, using the official dynamic color spec.
 *
 * Usage: npm run tokens -- [#seedHex] [contrastLevel -1..1]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

const SEED = process.argv[2] ?? '#4C6EF5';
const CONTRAST = Number(process.argv[3] ?? 0);

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/styles/tokens.css');

/** DynamicColor statics on MaterialDynamicColors, in spec order. */
const roles = Object.getOwnPropertyNames(MaterialDynamicColors)
  .filter((name) => !['length', 'name', 'prototype'].includes(name))
  .filter((name) => typeof MaterialDynamicColors[name]?.getArgb === 'function')
  .filter((name) => !name.endsWith('PaletteKeyColor'));

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function schemeVars(isDark) {
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(SEED)), isDark, CONTRAST);
  return roles
    .map((role) => `  --md-sys-color-${kebab(role)}: ${hexFromArgb(MaterialDynamicColors[role].getArgb(scheme))};`)
    .join('\n');
}

const css = `/* GENERATED FILE — do not edit by hand.
 * Run: npm run tokens -- ${SEED} ${CONTRAST}
 * Seed: ${SEED} · scheme: tonal spot · contrast: ${CONTRAST}
 */

:root {
${schemeVars(false)}
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${schemeVars(true)}
  }
}

:root[data-theme='dark'] {
${schemeVars(true)}
}

:root[data-theme='light'] {
${schemeVars(false)}
}
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, css);
console.log(`Wrote ${roles.length} color roles x 4 blocks to ${OUT}`);
