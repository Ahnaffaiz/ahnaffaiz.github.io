/** Right-edge OSD sliders. Drag vertically; they tune the wallpaper. */
import { html, icon } from './dom.js';

export function createOsd() {
  const el = html`
    <div class="osd" aria-label="Display controls">
      <div class="osd__slider" data-kind="brightness" role="slider" tabindex="0"
        aria-label="Wallpaper brightness" aria-valuemin="20" aria-valuemax="120" aria-valuenow="100"
        style="--value:80">
        <span class="osd__fill"></span>
        <span class="osd__glyph">${icon('brightness_6')}</span>
      </div>
      <div class="osd__slider" data-kind="bezel" role="slider" tabindex="0"
        aria-label="Bezel blur" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60"
        style="--value:60">
        <span class="osd__fill"></span>
        <span class="osd__glyph">${icon('blur_on')}</span>
      </div>
    </div>
  `;

  const values = { brightness: 80, bezel: 60 };

  /** The wallpaper is never blurred — only the bezel blurs what is behind it. */
  function apply() {
    const brightness = 0.6 + (values.brightness / 100) * 0.6;
    for (const layer of document.querySelectorAll('.wallpaper')) {
      layer.style.filter = `brightness(${brightness})`;
    }
    document.documentElement.style.setProperty(
      '--cae-bezel-blur',
      `${Math.round(20 + (values.bezel / 100) * 84)}px`,
    );
  }

  function set(slider, percent) {
    const kind = slider.dataset.kind;
    values[kind] = Math.min(100, Math.max(0, percent));
    slider.style.setProperty('--value', String(values[kind]));
    slider.setAttribute('aria-valuenow', String(Math.round(values[kind])));
    apply();
  }

  for (const slider of el.querySelectorAll('.osd__slider')) {
    const fromEvent = (event) => {
      const rect = slider.getBoundingClientRect();
      return ((rect.bottom - event.clientY) / rect.height) * 100;
    };

    let dragging = false;
    slider.addEventListener('pointerdown', (event) => {
      dragging = true;
      slider.setPointerCapture(event.pointerId);
      set(slider, fromEvent(event));
    });
    slider.addEventListener('pointermove', (event) => {
      if (dragging) set(slider, fromEvent(event));
    });
    slider.addEventListener('pointerup', () => {
      dragging = false;
    });
    slider.addEventListener('keydown', (event) => {
      const step = event.key === 'ArrowUp' ? 5 : event.key === 'ArrowDown' ? -5 : 0;
      if (!step) return;
      event.preventDefault();
      set(slider, values[slider.dataset.kind] + step);
    });
  }

  apply();
  return { el };
}
