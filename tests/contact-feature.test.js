import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const profile = readFileSync(new URL('../src/data/profile.js', import.meta.url), 'utf8');
const apps = readFileSync(new URL('../src/apps.js', import.meta.url), 'utf8');
const windows = readFileSync(new URL('../src/styles/windows.css', import.meta.url), 'utf8');

test('contact data contains only the five requested channels', () => {
  const [, contactsBlock] = profile.match(/export const contacts = \[([\s\S]*?)\];/);
  const contactLabels = [...contactsBlock.matchAll(/\{ label: '([^']+)'/g)].map((match) => match[1]);

  assert.deepEqual(contactLabels, ['Email', 'Threads', 'Instagram', 'GitHub', 'WhatsApp']);
  assert.match(contactsBlock, /value: 'ahnafsite@gmail\.com'/);
  assert.match(contactsBlock, /value: 'www\.threads\.com\/@ahnaf\.faize'/);
  assert.match(contactsBlock, /value: 'www\.instagram\.com\/ahnaf\.faize\/'/);
  assert.match(contactsBlock, /value: 'github\.com\/ahnaffaiz'/);
  assert.match(contactsBlock, /value: '62 8587 7159 577'/);
  assert.match(contactsBlock, /href: 'mailto:ahnafsite@gmail\.com'/);
  assert.match(contactsBlock, /href: 'https:\/\/www\.threads\.com\/@ahnaf\.faize'/);
  assert.match(contactsBlock, /href: 'https:\/\/www\.instagram\.com\/ahnaf\.faize\/'/);
  assert.match(contactsBlock, /href: 'https:\/\/github\.com\/ahnaffaiz'/);
  assert.match(contactsBlock, /href: 'https:\/\/wa\.me\/6285877159577'/);
  assert.doesNotMatch(contactsBlock, /LinkedIn|Resume/);
});

test('contact app renders a simple Material 3 surface without a form', () => {
  assert.match(apps, /class="contact-app contact-surface"/);
  assert.match(apps, /contact-shape-group/);
  assert.match(apps, /contact-icon--large/);
  assert.match(apps, /contact-list/);
  assert.match(apps, /data-state="loading"/);
  assert.doesNotMatch(apps, /data-contact-form|<form|<input|<textarea/);
});

test('contact surface uses transparent blur and restrained motion', () => {
  assert.match(windows, /\.window__body:has\(\.contact-surface\)/);
  assert.match(windows, /\.contact-shape-group/);
  assert.match(windows, /\.contact-icon--large/);
  assert.match(windows, /backdrop-filter: blur\(/);
  assert.match(windows, /@keyframes contact-shape-drift/);
  assert.match(windows, /@keyframes contact-card-in/);
  assert.match(windows, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.contact-app \*/);
});
