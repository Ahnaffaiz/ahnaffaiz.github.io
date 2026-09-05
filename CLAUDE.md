# Profile shell — conventions

## Naming the frame

The shell is a bezel around a screen. Always refer to its parts by these names:

| Name | What it is | Selector |
| --- | --- | --- |
| **topbar** | the thin bezelle along the top edge | `.bezel` top strip of `.frame` |
| **sidebar** (also **leftbar**) | the wide left edge; carries the dock | `.bar` |
| **bottombar** | the thin bezelle along the bottom edge | bottom strip of `.frame` |
| **rightbar** | the thin bezelle along the right edge | right strip of `.frame` |
| **screen** | the wallpaper area the bezel frames | `.screen` |
| **dashboard** | the panel that comes down out of the topbar | `.drawer` |

The four bars are one element (`.frame`), so "topbar" names a region of it, not a
separate node.

## Design rules

- **Material 3.** Colours only ever come from `--md-sys-color-*`; shape, spacing
  and motion only from `--cae-*`. Never a raw hex, px radius, or duration.
- **Motion is bouncy.** Use the expressive spatial curves
  (`--cae-ease-fast-spatial`, `--cae-ease-default-spatial`) for anything that
  moves or grows; the standard curves are for fades and colour only.
- **Animate on entry.** Cards, gauges, lists and loaders animate in when their
  tab becomes visible, staggered — never all at once.
- **Glass.** Every bezel surface is translucent over a blur. Panels that sit on
  the screen may carry their own tint, but must stay translucent.
- **Expressive shapes.** `src/shell/shapes.js` generates the Material 3
  Expressive shape set (clover, cookie, sunny, flower, arch, …). Prefer one of
  those over a plain rectangle for avatars, badges and accents.
- **Compositor only.** Animate `transform`, `opacity` and `clip-path` on small
  elements. Never animate a filter or a clip on anything holding the wallpaper.

## Content

All copy and data lives in `src/data/profile.js`. Never hardcode personal
details, tool lists or figures into markup or logic.
