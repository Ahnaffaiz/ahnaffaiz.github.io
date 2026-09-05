import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const css = readFileSync(new URL('../src/styles/panels.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../src/shell/notifications.js', import.meta.url), 'utf8');
const tokens = readFileSync(new URL('../src/styles/shell-tokens.css', import.meta.url), 'utf8');

function blockFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`^${escaped}\\s*{([\\s\\S]*?)^}`, 'm'));
  assert.ok(match, `Expected to find ${selector} block`);
  return match[1];
}

test('notification dismiss uses a scoped compact control', () => {
  assert.match(js, /class="notif__dismiss"/);
  assert.doesNotMatch(js, /class="wctl" data-dismiss/);
  assert.match(blockFor('.notif__dismiss'), /width:\s*32px;/);
  assert.match(blockFor('.notif__dismiss'), /height:\s*32px;/);
  assert.match(blockFor('.notif__dismiss'), /border-radius:\s*var\(--cae-rounding-full\);/);
});

test('notification surface is translucent glass over the wallpaper', () => {
  assert.match(blockFor('.notif'), /background:\s*color-mix\(\s*in srgb,\s*var\(--md-sys-color-surface-container-high\) 58%,\s*transparent\s*\);/);
  assert.match(blockFor('.notif'), /backdrop-filter:\s*blur\(var\(--cae-window-blur\)\) saturate\(1\.35\);/);
  assert.match(blockFor('.notif'), /-webkit-backdrop-filter:\s*blur\(var\(--cae-window-blur\)\) saturate\(1\.35\);/);
  assert.match(blockFor('.notif'), /border:\s*1px solid color-mix\(in srgb,\s*var\(--md-sys-color-outline\) 28%,\s*transparent\);/);
});

test('notification text uses regular shell type', () => {
  assert.match(blockFor('.notif__title'), /font-size:\s*var\(--cae-font-size-normal\);/);
  assert.match(blockFor('.notif__title'), /font-weight:\s*400;/);
  assert.match(blockFor('.notif__body'), /font-size:\s*var\(--cae-font-size-normal\);/);
  assert.match(blockFor('.notif__body'), /font-weight:\s*400;/);
  assert.match(blockFor('.notif .btn--tonal'), /font-size:\s*var\(--cae-font-size-normal\);/);
  assert.match(blockFor('.notif .btn--tonal'), /font-weight:\s*400;/);
});

test('notification card uses compact dimensions', () => {
  assert.match(tokens, /--cae-notif-width:\s*380px;/);
  assert.match(blockFor('.notif'), /gap:\s*var\(--cae-spacing-small\);/);
  assert.match(blockFor('.notif'), /padding:\s*var\(--cae-spacing-medium\);/);
  assert.match(blockFor('.notif__glyph'), /width:\s*32px;/);
  assert.match(blockFor('.notif__glyph'), /height:\s*32px;/);
  assert.match(blockFor('.notif__body'), /margin-top:\s*var\(--cae-spacing-extra-small\);/);
  assert.match(blockFor('.notif__body'), /line-height:\s*1\.45;/);
  assert.match(blockFor('.notif__actions'), /margin-top:\s*var\(--cae-spacing-medium\);/);
  assert.match(blockFor('.notif .btn--tonal'), /padding:\s*7px 14px;/);
});
