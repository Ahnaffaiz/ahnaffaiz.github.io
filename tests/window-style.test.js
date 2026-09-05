import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const css = readFileSync(new URL('../src/styles/windows.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../src/shell/windows.js', import.meta.url), 'utf8');

function blockFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`^${escaped}\\s*{([\\s\\S]*?)^}`, 'm'));
  assert.ok(match, `Expected to find ${selector} block`);
  return match[1];
}

test('desktop windows use the shell screen corner scale', () => {
  assert.match(blockFor('.window'), /border-radius:\s*var\(--cae-rounding-large-increased\);/);
});

test('window controls are monochrome until hover reveals action icons', () => {
  assert.match(blockFor('.wdot'), /background:\s*color-mix\(in srgb,\s*var\(--md-sys-color-on-surface\)[\s\S]*transparent[\s\S]*\);/);
  assert.match(blockFor('.wdot .material-symbols-rounded'), /opacity:\s*0;/);
  assert.match(blockFor('.window__dots:hover .material-symbols-rounded'), /opacity:\s*1;/);
  assert.match(js, /aria-hidden="true">close<\/span>/);
  assert.match(js, /aria-hidden="true">remove<\/span>/);
  assert.match(js, /aria-hidden="true">crop_square<\/span>/);
});
