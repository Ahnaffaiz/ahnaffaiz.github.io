import './styles/tokens.css';
import './styles/typescale.css';
import './styles/base.css';
import './styles/icons.css';
import './styles/shell-tokens.css';
import './styles/shell.css';
import './styles/windows.css';
import './styles/panels.css';
import './styles/terminal.css';
import './styles/dashboard.css';
import './styles/wallpaper-menu.css';
// Last: its colour transitions must win the tie against every component's own.
import './styles/mode-shift.css';

import { apps } from './apps.js';
import { wallpapers, identity } from './data/profile.js';
import { initTheme, setWallpaper, toggleMode, state } from './theme.js';
import { html } from './shell/dom.js';
import { initRipples } from './shell/ripple.js';
import { WindowManager } from './shell/windows.js';
import { createBar } from './shell/dock.js';
import { createDashboard } from './shell/dashboard.js';
import { createLauncher } from './shell/launcher.js';
import { createWallpaperMenu } from './shell/wallpaper-menu.js';
import { createNotifications } from './shell/notifications.js';
import { createOsd } from './shell/osd.js';
import { createPlayer } from './shell/audio.js';
import { createEqualizer } from './shell/equalizer.js';
import { music } from './data/profile.js';

const shell = document.querySelector('#shell');
const backdrop = shell.querySelector('.wallpaper');

/**
 * First frame is the wallpaper, the frame and the dock — nothing else. The
 * dashboard, the desktop meter and the palette quantizer are all built after
 * the shell has painted, and no window is opened for the user.
 */
const whenIdle = (fn) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 120);

/* ---------------- Frame and screen ---------------- */

// One slab for every edge, with the screen sitting inside it.
const frame = html`<div class="frame" aria-hidden="true"></div>`;

const desktop = html`
  <main class="screen" id="desktop">
    <div class="wallpaper" aria-hidden="true"></div>
    <div class="windows" id="windows"></div>
  </main>
`;

const stage = html`<div class="stage"></div>`;

// The handle is the top bezel itself, so it sits on the shell above the frame
// rather than inside the stage — the stage begins below the topbar and clips.
const trigger = html`
  <button class="notch-zone" id="notch" aria-label="Show dashboard" aria-expanded="false"></button>
`;

shell.append(frame, desktop, stage, trigger);

// The frame blurs the backdrop copy; the screen shows the sharp one.
initTheme(wallpapers, [backdrop, desktop.querySelector('.wallpaper')]);
initRipples();

const windowLayer = desktop.querySelector('#windows');
const wm = new WindowManager(windowLayer, {
  onChange: () => sync(),
  // Where a window genies to when it is minimized, and comes back out of.
  iconFor: (id) => barItem(id),
});

/* ---------------- Notifications, OSD ---------------- */

const notifications = createNotifications();
document.body.append(notifications.el);

const osd = createOsd();
desktop.append(osd.el);

/* ---------------- Music and the desktop meter ---------------- */

const player = createPlayer({ src: music.src });

let meterEnabled = false;
let syncDeskMeter = () => {};

/**
 * The desktop equalizer spans the full width of the screen and stands on its
 * bottom edge — over the wallpaper, under every window. One canvas and an
 * analyser hookup, neither of which the first frame needs.
 */
function buildMeter() {
  const meter = html`
    <div class="desk-meter" aria-hidden="true">
      <canvas class="desk-meter__canvas"></canvas>
    </div>
  `;
  desktop.append(meter);

  const deskEqualizer = createEqualizer({
    canvas: meter.querySelector('.desk-meter__canvas'),
    analyser: () => player.analyser,
    variant: 'bar',
    // Slim columns across the whole width, mirrored about the middle.
    bars: 120,
    // The strip stands on the bottom bezel, so it is painted in the bezel's
    // own tone rather than the accent.
    colour: 'surface-container',
  });

  syncDeskMeter = () => {
    const on = meterEnabled && player.playing;
    meter.dataset.on = String(meterEnabled);
    if (on) deskEqualizer.start();
    else deskEqualizer.stop();
  };

  player.onChange(syncDeskMeter);
  syncDeskMeter();
}

/* ---------------- Dashboard ---------------- */

let dashboard = null;
let drawerTimer;

/* Which surfaces the pointer is currently over. Tracked rather than inferred
 * from event order: crossing from the bezel into the panel fires a leave and an
 * enter, and whichever lands last would otherwise decide whether the panel
 * survives the trip. */
let overTrigger = false;
let overPanel = false;

/** Closes after a beat, unless the pointer turned up on the other surface. */
function scheduleClose() {
  clearTimeout(drawerTimer);
  drawerTimer = setTimeout(() => {
    if (overTrigger || overPanel) return;
    setDrawer(false);
  }, 160);
}

/** Built on first idle, or on first hover if the pointer beats it there. */
function ensureDashboard() {
  if (dashboard) return dashboard;
  dashboard = createDashboard({
    player,
    onDesktopMeter: (on) => {
      meterEnabled = on;
      syncDeskMeter();
    },
  });
  stage.append(dashboard.el);

  dashboard.el.addEventListener('pointerenter', () => {
    overPanel = true;
    clearTimeout(drawerTimer);
    setDrawer(true);
  });
  dashboard.el.addEventListener('pointerleave', () => {
    overPanel = false;
    scheduleClose();
  });

  // Its closed transform has to be the starting point of the slide, so settle
  // the panel in the document before anything can open it.
  void dashboard.el.offsetHeight;
  return dashboard;
}

// Nothing sits on the frame at rest: the dashboard grows out of the top bezel
// on hover, moving only transform and opacity so the compositor owns it.
function setDrawer(open) {
  clearTimeout(drawerTimer);
  const panel = ensureDashboard();
  panel.el.dataset.open = String(open);
  trigger.setAttribute('aria-expanded', String(open));
  if (open) panel.enter();
}

const isDrawerOpen = () => dashboard?.el.dataset.open === 'true';

// Sweeping the pointer onto the top bezel brings the dashboard down. Opening is
// immediate; closing waits a beat so crossing from the bezel into the panel —
// and moving between its tabs — never flickers.
trigger.addEventListener('pointerenter', () => {
  overTrigger = true;
  clearTimeout(drawerTimer);
  setDrawer(true);
});
trigger.addEventListener('pointerleave', () => {
  overTrigger = false;
  scheduleClose();
});

// A pointer that can hover has already opened the panel by the time a click
// lands, so clicking the bezel would only close what the hover just opened.
// The toggle is kept for touch, which has no hover to open it with.
const canHover = window.matchMedia('(hover: hover)');
trigger.addEventListener('click', () => {
  if (canHover.matches) return;
  setDrawer(!isDrawerOpen());
});

// Keyboard: focusing the handle opens it, and it closes once focus leaves the
// panel entirely — so the tabs can be reached without a pointer at all.
trigger.addEventListener('focus', () => setDrawer(true));

document.addEventListener('focusin', (event) => {
  if (!isDrawerOpen()) return;
  const inside = event.target === trigger || dashboard?.el.contains(event.target);
  if (!inside) setDrawer(false);
});

document.addEventListener('pointerdown', (event) => {
  if (!isDrawerOpen()) return;
  // The handle is no longer inside the stage, so it needs naming separately.
  if (!event.target.closest('.stage') && event.target !== trigger) setDrawer(false);
});

/* ---------------- Launcher + commands ---------------- */

const commands = [
  {
    name: 'wallpaper',
    desc: 'Change the wallpaper — the palette is quantized out of the image',
    icon: 'photo_library',
    run: () => wallpaperMenu.open(),
  },
  { name: 'theme', desc: 'Toggle light and dark', icon: 'dark_mode', run: () => applyMode() },
  {
    name: 'close all',
    desc: 'Close every open window',
    icon: 'close_fullscreen',
    run: () => wm.closeAll(),
  },
  {
    name: 'dashboard',
    desc: 'Open the dashboard',
    icon: 'dashboard',
    run: () => {
      setDrawer(true);
      setTimeout(() => setDrawer(false), 4000);
    },
  },
  {
    name: 'notify',
    desc: 'Send a test notification',
    icon: 'notifications',
    run: () => testNotification(),
  },
  { name: 'reload', desc: 'Restart the shell', icon: 'restart_alt', run: () => location.reload() },
];

// The launcher lives in the stage, beside the dashboard: both grow out of the
// frame, and the stage's clip is what makes them read as unrolling from a bezelle.
const launcher = createLauncher({ apps, wm, commands });
stage.append(launcher.el);

// The wallpaper menu takes over the whole screen, so it lives on the body in
// front of the frame — not in the stage, which clips to a bezelle.
const wallpaperMenu = createWallpaperMenu();
document.body.append(wallpaperMenu.el);

/* ---------------- Sidebar ---------------- */

function applyMode() {
  const dark = toggleMode();
  const glyph = bar?.el.querySelector('[data-act="theme"] .material-symbols-rounded');
  if (glyph) glyph.textContent = dark ? 'light_mode' : 'dark_mode';
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    // Some browsers reject the request without a user gesture or when disabled.
  }
}

// The glyph tracks the actual fullscreen state, so it stays correct even when
// the user leaves via Esc rather than the button.
document.addEventListener('fullscreenchange', () => {
  const glyph = bar?.el.querySelector('[data-act="fullscreen"] .material-symbols-rounded');
  if (glyph) glyph.textContent = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
});

const barItem = (id) => bar?.el.querySelector(`[data-app="${id}"]`) ?? null;

function testNotification() {
  notifications.push({
    title: 'Shell',
    body: `${identity.name} · ${identity.role}. Press Ctrl+K to search; windows tile themselves.`,
    actions: [{ label: 'Open About', run: () => wm.open(apps[0]) }],
  });
}

const bar = createBar({
  apps,
  wm,
  onLauncher: () => (launcher.isOpen() ? launcher.close() : launcher.open()),
  onGallery: () => wallpaperMenu.open(),
  onTheme: applyMode,
  onNotify: testNotification,
  onFullscreen: toggleFullscreen,
});
shell.append(bar.el);

/* ---------------- Wiring ---------------- */

function sync() {
  bar.sync();
}

sync();

// Cycle wallpapers with the arrow keys when nothing else has focus. The
// wallpaper menu owns the arrows while it is open, so the desktop stands down.
document.addEventListener('keydown', (event) => {
  if (event.target.matches('input, textarea')) return;
  if (wallpaperMenu.isOpen()) return;
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
  const index = wallpapers.findIndex((item) => item.id === state.wallpaper);
  const next =
    (index + (event.key === 'ArrowRight' ? 1 : -1) + wallpapers.length) % wallpapers.length;
  setWallpaper(wallpapers[next]);
});

// Contact forms live inside windows, so bind once at the document level.
document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-contact-form]');
  if (!form) return;
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.reset();
  notifications.push({ title: 'Message sent', body: 'Thanks — I will reply within a day.' });
});

// The rest of the shell is assembled once the first frame is on screen. The
// desktop stays empty: nothing opens itself on launch.
whenIdle(() => {
  buildMeter();
  ensureDashboard();
});
