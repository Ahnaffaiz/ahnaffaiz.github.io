/** Media tab: the record, its spectrum crown, the wave timeline, and transport. */
import { html, esc, icon } from '../shell/dom.js';
import { createEqualizer } from '../shell/equalizer.js';
import { createWaveBar } from '../shell/wavebar.js';
import { shapePath } from '../shell/shapes.js';
import { music } from '../data/profile.js';

/** How far the skip buttons jump, in seconds. */
const SKIP = 30;

/** The switch thumb's face, off and on. Both are sampled at the same 32
 * points, so `clip-path` interpolates between them. */
const EQ_SHAPE = 24;

export function createMedia({ player, onDesktopMeter }) {
  const el = html`
    <div class="media">
      <div class="media__stage">
        <canvas class="media__ring" data-ring aria-hidden="true"></canvas>
        <div class="disc" data-disc>
          <img class="disc__art" src="${esc(music.cover)}" alt="" />
          <span class="disc__sheen" aria-hidden="true"></span>
          <span class="disc__hole" aria-hidden="true"></span>
        </div>
      </div>

      <div class="media__side">
        <span class="dash-card__label">Now playing</span>
        <p class="media__title">${esc(music.title)}</p>
        <p class="dash-muted">${esc(music.artist)}</p>
        <p class="dash-muted media__album">${esc(music.album)}</p>

        <div class="wave" data-wave-host>
          <div
            class="wave__bar"
            data-wave-bar
            role="slider"
            tabindex="0"
            aria-label="Seek"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="0"
          ></div>
          <div class="wave__times">
            <span data-elapsed>0:00</span>
            <span data-total>--:--</span>
          </div>
        </div>

        <div class="media__transport" data-transport>
          <button class="fab-btn" data-act="prev" aria-label="Back ${SKIP} seconds">
            ${icon('fast_rewind')}
          </button>
          <button class="fab-btn fab-btn--primary" data-act="toggle" aria-label="Play">
            ${icon('play_arrow')}
          </button>
          <button class="fab-btn" data-act="next" aria-label="Forward ${SKIP} seconds">
            ${icon('fast_forward')}
          </button>
          <button class="fab-btn" data-act="reset" aria-label="Back to the start">
            ${icon('replay')}
          </button>
        </div>

        <button class="eq-btn" data-eq type="button" role="switch" aria-checked="false">
          <span class="eq-btn__track" aria-hidden="true">
            <span class="eq-btn__mark">
              <span class="eq-btn__shape" data-eq-shape></span>
              <span class="eq-btn__bars"><i></i><i></i><i></i></span>
            </span>
          </span>
          <span class="eq-btn__label">Equalizer on desktop</span>
        </button>
      </div>
    </div>
  `;

  /* ---------------- Record and crown ---------------- */

  const ring = createEqualizer({
    canvas: el.querySelector('[data-ring]'),
    analyser: () => player.analyser,
    variant: 'ring',
    bars: 72,
  });

  const disc = el.querySelector('[data-disc]');

  /* The record keeps its twelve-lobed silhouette whether or not it is playing —
   * it is the cover's own shape, not a playback state. The disc is sized as a
   * percentage of the stage, so the path is re-cut whenever the stage resizes.
   *
   * `offsetWidth`, not a client rect: the record spins, and a rect measures the
   * rotated bounding box — up to 1.41x the real width — which cuts an oversized,
   * off-centre path and leaves the twelve lobes reading as a lopsided blob. */
  function cutDisc() {
    const size = disc.offsetWidth;
    if (!size) return;
    disc.style.clipPath = shapePath('cookie12', size);
  }

  new ResizeObserver(cutDisc).observe(disc);

  /* ---------------- Timeline ---------------- */

  const wave = createWaveBar({
    host: el.querySelector('[data-wave-bar]'),
    onSeek: (ratio) => {
      const { duration } = player.position();
      if (duration) player.seek(ratio * duration);
    },
  });

  const elapsed = el.querySelector('[data-elapsed]');
  const total = el.querySelector('[data-total]');

  const clock = (seconds) => {
    if (!Number.isFinite(seconds)) return '--:--';
    const whole = Math.max(0, Math.floor(seconds));
    return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
  };

  player.onTime(({ time, duration }) => {
    const ratio = duration ? time / duration : 0;
    wave.set(ratio);
    elapsed.textContent = clock(time);
    total.textContent = clock(duration || NaN);
    wave.host.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
  });

  /* ---------------- Transport ---------------- */

  const transport = el.querySelector('[data-transport]');
  const keys = [...transport.querySelectorAll('[data-act]')];
  const toggle = transport.querySelector('[data-act="toggle"]');

  /**
   * The press ripples outward: the button that was hit swings right then left,
   * and its neighbours follow one beat behind, further out first.
   */
  function bounce(from) {
    const origin = keys.indexOf(from);
    for (const [index, key] of keys.entries()) {
      const distance = Math.abs(index - origin);
      const swing = 10 / (1 + distance * 0.6);
      // `translate` rather than `transform`, so the hover scale still composes
      // with the swing instead of being overridden by it.
      key.animate(
        [
          { translate: '0px' },
          { translate: `${swing}px` },
          { translate: `${-swing * 0.7}px` },
          { translate: '0px' },
        ],
        {
          duration: 520,
          delay: distance * 60,
          easing: 'cubic-bezier(0.38, 1.21, 0.22, 1)',
        },
      );
    }
  }

  transport.addEventListener('click', (event) => {
    const button = event.target.closest('[data-act]');
    if (!button) return;
    bounce(button);

    const act = button.dataset.act;
    if (act === 'toggle') player.toggle();
    if (act === 'prev') player.nudge(-SKIP);
    if (act === 'next') player.nudge(SKIP);
    if (act === 'reset') player.reset();
  });

  /* ---------------- Equalizer button ---------------- */

  // A circle and a four-lobed cookie, sampled identically so the clip morphs.
  const eqButton = el.querySelector('[data-eq]');
  const eqShape = el.querySelector('[data-eq-shape]');
  const OFF = shapePath('circle', EQ_SHAPE);
  const ON = shapePath('cookie4', EQ_SHAPE);
  eqShape.style.clipPath = OFF;

  let meterOn = false;

  eqButton.addEventListener('click', () => {
    meterOn = !meterOn;
    // The thumb rides to the far end of the track and turns as it goes; the
    // travel, the turn and the track's colour all hang off this one attribute.
    eqButton.setAttribute('aria-checked', String(meterOn));
    eqShape.style.clipPath = meterOn ? ON : OFF;
    onDesktopMeter(meterOn);
  });

  /* ---------------- Playback state ---------------- */

  player.onChange((playing) => {
    disc.dataset.playing = String(playing);
    wave.setPlaying(playing);
    toggle.querySelector('.material-symbols-rounded').textContent = playing
      ? 'pause'
      : 'play_arrow';
    toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    // The crown keeps drawing after a stop so the bars fall rather than vanish.
    if (playing) ring.start();
    else ring.stop();
  });

  return {
    el,
    enter() {
      // Loading metadata here means the timeline shows a real length before the
      // first press, without opening an AudioContext ahead of the gesture.
      player.prime();
      wave.measure();
      cutDisc();
      if (player.playing) ring.start();
    },
  };
}
