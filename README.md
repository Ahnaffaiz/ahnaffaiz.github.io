# Profile — a desktop shell for the web

A personal profile for a software developer / AI enthusiast, built as a **desktop shell**
rather than a scrolling page: a dock on the left, a wallpaper, a dashboard drawer that hangs
from the top edge, and windows you open, drag, resize and close.

The design is ported from [caelestia-dots/shell](https://github.com/caelestia-dots/shell)
(Quickshell + Hyprland), on top of Material Design 3 tokens.

```bash
npm install
npm run dev
```

## What came from caelestia

Values are taken from the shell's own config, not eyeballed —
`plugin/src/Caelestia/Config/{tokens,appearanceconfig}.hpp`. They live in
[shell-tokens.css](src/styles/shell-tokens.css).

| Token group | Values |
| --- | --- |
| Rounding | 4 · 8 · 12 · 16 · 20 · 28 · 32 · 48 · full |
| Spacing / padding | same scale as rounding |
| Durations | small 200 · normal 400 · large 600 · extraLarge 1000 |
| Expressive spatial | fast 350 · default 500 · slow 650 |
| Expressive effects | fast 150 · default 200 · slow 300 |
| Bar width | 40dp inner |
| Notifications / sidebar | 430dp |
| Launcher item | 600 × 57dp |

The bounce is not decoration — it is the shell's own curve. `expressiveFastSpatial` is
`cubic-bezier(0.42, 1.67, 0.21, 0.9)`; the control point above `1` is the overshoot.
`emphasized` is a two-segment spline in QML, reproduced here with CSS `linear()`.

Typography follows the shell: Rubik for clock and display, Material Symbols **Rounded** for
icons. Google Sans Flex is not distributed as a web font, so Roboto Flex stands in for body text.

## The frame

The shell is a bezel around a recessed desktop, the way a laptop screen sits in its lid:

- **Frame** — a single translucent slab, one element with one blur and one
  shadow, running to the viewport edge on all four sides. There are no separate
  top/side/bottom pieces, so there is nothing to seam.
- **Screen** — a plain rounded rectangle inside the frame. Nothing about it is
  computed or animated, and nothing shades it: an inset "recess" shadow used to
  live here, but it tinted every translucent surface laid over it, which is what
  stopped the notch and the dock's flyout from matching the frame. The dock draws
  no surface of its own; it sits on the frame.

Everything that *is* the bezel — the frame, the notch, the dashboard, the dock's
label flyout — shares one rule: same tint, same blur, same shadow. A piece that
leaves the frame still reads as the frame, and each is a single layer over the
wallpaper, never one translucent surface stacked on another.
### The dashboard's four tabs

| Tab | What is in it |
| --- | --- |
| **Dashboard** | who / status across the top, then clock · calendar · weather, the toolkit along the bottom, and the player down the right |
| **Media** | the record with a spectrum ring around it, play/pause/reset, and a switch that puts the meter on the desktop |
| **Performance** | three animated rings — business owner, developer, AI — over the headline numbers |
| **Workspace** | the five steps a piece of work goes through |

Cards, calendar days, tool chips, rings and steps all animate in, staggered,
each time their tab is shown.

The relaxation track is **generated in the browser** (`src/shell/audio.js`): a
pentatonic pad over a filtered drone. That keeps it genuinely offline and free
of any licence to carry. Set `music.src` in `src/data/profile.js` to an audio
file and the same player plays that instead. Either way the spectrum comes from
a real `AnalyserNode`, so the ring and the desktop meter show the actual signal.

Weather comes from Open-Meteo (no key) and falls back to a static reading when
it cannot be reached.

The dashboard's six cards form a Material 3 **card group**: one surface family
sharing a shape scale, where the group's outer corners stay large and the
corners meeting inside it tighten, so the whole reads as one object. Today's
date wears a four-lobed cookie that turns when the calendar card is hovered.

Tool marks are drawn as geometry in `src/shell/logos.js` — simplified
silhouettes authored here rather than shipped brand files, so nothing is copied
and the set stays consistent at 22px.

`src/shell/shapes.js` generates the Material 3 Expressive shape set — clover,
cookie, sunny, flower, burst, arch, pentagon, gem, diamond — as `clip-path`
strings. The lobed family is one polar function, so they stay a family. The dock
and the toolkit chips both draw from it.

- **Dashboard** — nothing sits on the frame at rest. Hovering the strip at the top
  centre brings a pane of the same bezel surface down out of the top bezelle,
  joined to it by a concave fillet on each side so the two read as one piece. It
  names the
  It unrolls: the stage clips at the screen's top edge and the panel simply
  slides down from behind it, so only `transform` moves and the compositor owns
  the whole thing. An earlier version morphed the screen's `clip-path` instead
  and janked, because that repaints a layer holding the wallpaper and every open
  window on every frame.

Two surfaces that merely abut still show a seam: `backdrop-filter` clamps at its
own edge, so each side blurs different content and a faint line appears between
them. The dashboard and the dock's flyout therefore tuck two pixels *under* the
frame, with the stage's clip (or the flyout's own) hiding that edge — the seam
is drawn where nobody can see it.

No bezel surface carries a shadow at all, in or out — it is flat glass, and the
wallpaper reads through it. Depth comes from the blur alone.

That blur is deliberately wide. `backdrop-filter` clamps at an element's own
edge, so a small pane blurs only its own patch of wallpaper and drifts to a
different tone than the viewport-sized frame beside it. A wide radius averages
each patch flat, which brings the panes closer together.

The wallpaper itself is never filtered beyond brightness: only the bezel blurs,
and what it blurs is the wallpaper behind it. The second OSD slider tunes that
bezel blur rather than touching the image.

The frame blurs the wallpaper behind it, so the wallpaper is rendered twice: a
full-bleed copy for the frame to blur, and a sharp copy inside the screen,
offset back under the frame to stay aligned with the viewport. Both crossfade
together on a wallpaper change.

## What it does

- **Dock** — one icon per section. Bare at rest: no background, no shadow. Hover paints an
  rounded square behind the icon, in the notch's shape language, and the bezel *reaches out*
  with the label — a flyout of the same surface, joined to the dock by a concave fillet above
  and below, that glides between icons (clip-path wipe, expressive spatial curve) rather than
  fading in and out. Activating an icon
  spins that square once to the right and hands over to an M3 Expressive **four-leaf clover**,
  which it holds while the window is open. The background is the whole indicator — there is no
  line beside it. The clover is the union of four circles set into the corners of the icon
  (`dock.js`), traced as real arcs, and the two shapes cross-fade behind the spin rather than
  deforming into one another.
- **Sidebar** — Arch mark on top (it opens the launcher), apps below it, `Ahnaffaiz` set
  vertically through the middle, and a tray at the bottom: notifications, gallery, light/dark,
  clock.
- **Windows** — the desktop starts empty; a window scales out of the icon that launched it,
  drags by the title bar, resizes from the corner, double-click to maximize, `Esc` closes the
  top one, click to raise.
- **Dashboard drawer** — hover (or tap) the top edge. Four tabs slide horizontally.
- **Launcher** — `Ctrl`/`Cmd`+`K`. Fuzzy search across sections; `>` switches to commands
  (`>wallpaper`, `>theme`, `>close all`, `>notify`).
- **Wallpapers** — real images in `images/`. Picking one quantizes the image in the browser
  (`sourceColorFromImage`) and regenerates the entire Material 3 palette from the result,
  exactly as caelestia derives its scheme from the current wallpaper. `←`/`→` cycles them;
  the gallery button and `>wallpaper` both open the picker. Wallpaper 1 is the default.
- **Notifications** — slide in from the right, flick right or click to dismiss.
- **OSD** — right-edge sliders for wallpaper brightness and bezel blur; they slide out on hover.
- **Small screens** — the dock becomes a bottom navigation bar and windows become full-bleed
  sheets. Dragging a window on a 375px screen is pointless, so it is disabled there.

## Layout

| Path | Purpose |
| --- | --- |
| `src/main.js` | Mounts the shell and wires the pieces together |
| `src/theme.js` | Runtime dynamic color — wallpaper → seed → every `--md-sys-color-*` role |
| `src/apps.js` | Window contents |
| `src/data/profile.js` | **All content lives here** — identity, skills, work, projects, wallpapers |
| `src/shell/windows.js` | Window manager: open, focus, drag, resize, maximize, close |
| `src/shell/dock.js` | The bar, tooltips, clock, running indicators |
| `src/shell/dashboard.js` | The dashboard the notch opens into |
| `src/shell/launcher.js` | Search, commands, wallpaper grid |
| `src/shell/notifications.js` · `osd.js` · `ripple.js` | Toasts, edge sliders, state layer |
| `src/styles/shell-tokens.css` | Caelestia tokens plus the bezel, shadow and arch-shape tokens |
| `src/styles/tokens.css` | **Generated** MD3 color roles — the pre-JS fallback |
| `scripts/gen-tokens.mjs` | Seed color → static `tokens.css` |

## Wallpapers

Drop a full-size image in `images/`, then make a web-sized copy and add it to
`wallpapers` in `src/data/profile.js`:

```bash
sips -s format jpeg -s formatOptions 80 -Z 2560 images/wallpaper-4.png --out images/web/wallpaper-4.jpg
```

The `seed` in that entry is only the pre-quantization fallback — the real palette comes out
of the image. `dark` picks the mode the wallpaper is shipped with.

## Re-theming

To change the static fallback baked into the CSS:

```bash
npm run tokens -- '#4c6ef5' 0
```

Second argument is contrast (`-1` … `1`). All 49 color roles are generated from the official
`SchemeTonalSpot` dynamic-color spec, for light and dark.

## Conventions

- No hardcoded colors, radii, durations or curves — only `var(--md-sys-*)` / `var(--cae-*)`.
- Elevation is tonal surface color first; shadows only where a window needs separation.
- Exit animations run through the Web Animations API, not CSS: swapping `animation-name` on an
  element whose entry animation already finished does not restart it, so `animationend` would
  never fire. Each exit also reaps its node on a timer, because a backgrounded tab freezes the
  animation timeline entirely.
- `prefers-reduced-motion` collapses every transition and animation.
# ahnaffaiz
