import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile = readFileSync(new URL('../src/data/profile.js', import.meta.url), 'utf8');
const apps = readFileSync(new URL('../src/apps.js', import.meta.url), 'utf8');
const windows = readFileSync(new URL('../src/styles/windows.css', import.meta.url), 'utf8');

test('about profile exposes the current positioning and portrait', () => {
  assert.match(profile, /profile_2\.png/);
  assert.match(profile, /role: 'Software Developer/);
  assert.match(profile, /6\+ years/);
  assert.match(profile, /contactEmail: 'ahnafsite@gmail\.com'/);
});

test('about profile includes the four requested capability tracks', () => {
  for (const title of ['Web & full-stack', 'Flutter apps', 'Swift for iOS', 'AI automation']) {
    assert.equal(profile.includes(`title: '${title}'`), true);
  }
});

test('about profile keeps the complete education timeline', () => {
  for (const school of ['SD N Saren 2', 'SMP N 1 Gemolong', 'SMA N 1 Gemolong', 'Sebelas Maret University']) {
    assert.match(profile, new RegExp(`school: '${school}'`));
  }
});

test('about profile keeps the single-portrait direction and business-led positioning', () => {
  assert.match(profile, /photo: profilePhoto/);
  assert.match(profile, /aboutCollaborationPhoto/);
  // profile_4 belongs to the Skills hero; nothing the About window reads may
  // pick it up, so the guard covers the about-facing exports only.
  const aboutExports = profile.slice(
    profile.indexOf('export const identity'),
    profile.indexOf('export const skillsIntro'),
  );
  assert.doesNotMatch(aboutExports, /skillsPortrait\b/);
  assert.match(profile, /Business owner/);
  assert.match(profile, /Software engineer/);
  assert.match(profile, /AI enthusiast/);
});

test('about app uses a single portrait and a still collaboration panel', () => {
  assert.doesNotMatch(apps, /aboutPhotos/);
  assert.doesNotMatch(apps, /aboutToolMarks|about-collaboration__tools|about-collaboration__orbit/);
  assert.match(windows, /AHNAF FAIZ/);
  assert.doesNotMatch(windows, /AHNAF \/ FAIZ/);
  assert.match(windows, /\.about-m3-button::after/);
});

test('hero portrait is frameless and merges into the editorial background', () => {
  assert.match(apps, /about-gallery__photo--single/);
  assert.doesNotMatch(apps, /about-gallery__stamp/);
  assert.match(windows, /\.about-gallery::after/);
  assert.match(windows, /\.about-gallery__photo--single\s*\{[^}]*background:\s*transparent;/s);
  assert.match(windows, /\.about-gallery__photo--single\s*\{[^}]*border:\s*0;/s);
});

test('hero portrait stays oversized without cropping the head', () => {
  assert.match(windows, /\.about-gallery__photo--single\s*\{[^}]*top:\s*0;[^}]*height:\s*100%;/s);
  assert.match(windows, /@media \(max-width: 480px\)[\s\S]*?\.about-gallery__photo--single\s*\{[^}]*height:\s*100%;/s);
});

test('hero portrait uses a crop-safe natural image box', () => {
  assert.match(windows, /\.about-gallery__photo--single\s*\{[^}]*top:\s*0;[^}]*height:\s*100%;[^}]*overflow:\s*visible;/s);
  assert.match(windows, /\.about-gallery__photo img\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center top;/s);
});

test('how I think cards share a surface and follow hover with a line', () => {
  assert.match(windows, /\.about-principle\s*\{[^}]*background:\s*var\(--md-sys-color-surface-container\);/s);
  assert.doesNotMatch(windows, /\.about-principle--1\s*\{[^}]*background:/s);
  assert.doesNotMatch(windows, /\.about-principle--3\s*\{[^}]*background:/s);
  assert.match(windows, /\.about-principles__grid::before/);
  assert.match(windows, /\.about-principles__grid:hover::before/);
  assert.match(windows, /\.about-principle:hover h3::after/);
});

test('how I think cards have spaced custom shapes and threaded gaps', () => {
  assert.match(windows, /\.about-principles__grid\s*\{[^}]*gap:\s*24px;/s);
  assert.match(windows, /\.about-principle--1\s*\{[^}]*border-radius:\s*36px 10px 10px 10px;/s);
  assert.match(windows, /\.about-principle--2\s*\{[^}]*border-radius:\s*12px;/s);
  assert.match(windows, /\.about-principle--3\s*\{[^}]*border-radius:\s*10px 36px 10px 10px;/s);
  assert.match(windows, /\.about-principle \+ \.about-principle::before\s*\{[^}]*width:\s*24px;[^}]*repeating-linear-gradient/s);
});

test('how I think icons morph into rotating cookie shapes on hover', () => {
  assert.match(windows, /\.about-principle:hover \.about-principle__icon\s*\{[^}]*border-radius:/s);
  assert.match(windows, /animation:\s*about-cookie-rotate/);
});

test('collaboration CTA has no elevation in light mode', () => {
  assert.match(windows, /\.about-collaboration \.about-m3-button\s*\{[^}]*box-shadow:\s*none;/s);
  assert.match(windows, /\.about-collaboration \.about-m3-button:hover\s*\{[^}]*box-shadow:\s*none;/s);
});

test('collaboration surface has no shine gradient shadow', () => {
  assert.doesNotMatch(windows, /\.about-collaboration\s*\{[^}]*radial-gradient/s);
  assert.match(windows, /\.about-collaboration\s*\{[^}]*background:\s*var\(--md-sys-color-primary\);/s);
});

test('collaboration section includes the frameless secondary portrait', () => {
  assert.match(profile, /profile_3\.png/);
  assert.match(apps, /about-collaboration__photo/);
  assert.match(apps, /about-collaboration__glow/);
  assert.doesNotMatch(windows, /about-tool-flight|about-orbit|\.about-tool-object/);
  assert.match(windows, /\.about-collaboration__photo\s*\{[^}]*position:\s*absolute;[^}]*object-fit:\s*contain;/s);
});

test('about cards are borderless, shadowless, and connected with dividers', () => {
  assert.match(windows, /\.about-principle\s*\{[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(windows, /\.about-principle \+ \.about-principle::before/);
  assert.match(windows, /\.about-education-chip\s*\{[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(windows, /\.about-collaboration\s*\{[^}]*border:\s*0;[^}]*box-shadow:\s*none;/s);
});

test('about app uses a full-bleed surface and no experience or stats section', () => {
  assert.match(apps, /class="[^"]*about-surface/);
  assert.match(apps, /class="about-collaboration"/);
  assert.doesNotMatch(apps, /about-stats|about-timeline|The record/);
  assert.match(windows, /animation-timeline:\s*view\(\)/);
});
