/** Dashboard tab: who, status, clock, calendar, weather, toolkit, and the player. */
import { html, esc, icon } from '../shell/dom.js';
import { shapePath } from '../shell/shapes.js';
import { logoMarkup } from '../shell/logos.js';
import { identity, tools, music, weatherFallback } from '../data/profile.js';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Open-Meteo's WMO codes, collapsed to the handful the sky can draw. */
const WEATHER = {
  0: ['Clear', 'sun'],
  1: ['Mainly clear', 'sun'],
  2: ['Partly cloudy', 'cloud'],
  3: ['Overcast', 'cloud'],
  45: ['Fog', 'cloud'],
  48: ['Fog', 'cloud'],
  51: ['Drizzle', 'rain'],
  61: ['Rain', 'rain'],
  63: ['Rain', 'rain'],
  65: ['Heavy rain', 'rain'],
  71: ['Snow', 'rain'],
  80: ['Showers', 'rain'],
  95: ['Thunderstorm', 'rain'],
};

const describe = (code) => WEATHER[code] ?? WEATHER[0];

/** Monday-first grid of the given month, padded to whole weeks. */
function monthGrid(year, month) {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < lead; i += 1) cells.push(null);
  for (let day = 1; day <= days; day += 1) cells.push(day);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function createOverview({ player }) {
  const today = new Date();
  let cursor = new Date(today.getFullYear(), today.getMonth(), 1);

  const el = html`
    <div class="dash">
      <div class="dash__main card-group">
        <section class="dash-card dash-card--me" data-card>
          <span class="dash-card__label">Who</span>
          <p class="dash-name">${esc(identity.name)}</p>
          <ul class="role-list">
            ${identity.roles
              .map((role) => `<li class="role-list__item">${icon('bolt')}${esc(role)}</li>`)
              .join('')}
          </ul>
        </section>

        <section class="dash-card dash-card--status" data-card>
          <span class="dash-card__label">Status</span>
          <p class="dash-name">${esc(identity.status)}</p>
          <p class="dash-muted">${esc(identity.location)}</p>
          <span class="status-dot" aria-hidden="true"></span>
        </section>

        <section class="dash-card dash-card--clock" data-card>
          <span class="dash-card__label">Clock</span>
          <p class="clock__time">
            <span class="clock__unit" data-clock-hours>--</span>
            <span class="clock__unit" data-clock-minutes>--</span>
          </p>
          <p class="dash-muted clock__date" data-clock-date>—</p>
        </section>

        <section class="dash-card dash-card--calendar" data-card>
          <header class="cal__nav">
            <button class="icon-btn" data-cal="-1" aria-label="Previous month">
              ${icon('chevron_left')}
            </button>
            <span class="cal__month" data-cal-title>—</span>
            <button class="icon-btn" data-cal="1" aria-label="Next month">
              ${icon('chevron_right')}
            </button>
          </header>
          <div class="cal__grid cal__grid--head">
            ${WEEKDAYS.map((d) => `<span class="cal__weekday">${d}</span>`).join('')}
          </div>
          <div class="cal__grid" data-cal-grid></div>
        </section>

        <section class="dash-card dash-card--weather" data-card>
          <span class="dash-card__label">Weather</span>
          <div class="sky" data-sky="sun" aria-hidden="true">
            <span class="sky__sun"></span>
            <span class="sky__cloud sky__cloud--a"></span>
            <span class="sky__cloud sky__cloud--b"></span>
            <span class="sky__rain"></span>
          </div>
          <p class="weather__temp"><span data-weather-temp>--</span><i>°C</i></p>
          <p class="dash-muted" data-weather-label>Loading…</p>
          <p class="dash-muted weather__place" data-weather-place>${esc(weatherFallback.place)}</p>
        </section>

        <section class="dash-card dash-card--tools" data-card>
          <span class="dash-card__label">Tool kits</span>
          <ul class="tool-list">
            ${tools
              .map(
                (tool, index) => `
                  <li class="tool" style="--i:${index}">
                    <span class="tool__logo">${logoMarkup(tool.logo)}</span>
                    <span class="tool__name">${esc(tool.name)}</span>
                  </li>`,
              )
              .join('')}
          </ul>
        </section>
      </div>

      <section class="dash-card dash-card--player" data-card>
        <span class="dash-card__label">Player</span>
        <div class="cat" data-cat></div>
        <p class="dash-strong">${esc(music.title)}</p>
        <p class="dash-muted">${esc(music.album)}</p>
        <button class="pill-btn" data-mini-play>
          ${icon('play_arrow')}<span data-mini-label>Play</span>
        </button>
      </section>
    </div>
  `;

  /* ---------------- Clock ---------------- */

  const clockHours = el.querySelector('[data-clock-hours]');
  const clockMinutes = el.querySelector('[data-clock-minutes]');
  const clockDate = el.querySelector('[data-clock-date]');

  const pad = (value) => String(value).padStart(2, '0');

  /** Hours over minutes, so each half can be set as large as the card allows,
   * with the date written out underneath: `Tuesday, 3 January 2026`. */
  function tickClock() {
    const now = new Date();
    clockHours.textContent = pad(now.getHours());
    clockMinutes.textContent = pad(now.getMinutes());

    const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
    const date = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    clockDate.textContent = `${weekday}, ${date}`;
  }

  tickClock();
  setInterval(tickClock, 10_000);

  /* ---------------- Calendar ---------------- */

  const grid = el.querySelector('[data-cal-grid]');
  const title = el.querySelector('[data-cal-title]');

  function renderCalendar() {
    title.textContent = cursor.toLocaleDateString([], { month: 'long', year: 'numeric' });
    const cells = monthGrid(cursor.getFullYear(), cursor.getMonth());
    const isThisMonth =
      cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

    grid.innerHTML = cells
      .map((day, index) => {
        if (!day) return '<span class="cal__day cal__day--empty"></span>';
        const now = isThisMonth && day === today.getDate();
        return `<span class="cal__day${now ? ' cal__day--today' : ''}" style="--i:${index}">${
          now ? '<span class="cal__today-shape" aria-hidden="true"></span>' : ''
        }<span class="cal__num">${day}</span></span>`;
      })
      .join('');

    sizeTodayShape();
  }

  /** Today wears a four-lobed cookie rather than a plain circle. The path is
   * generated against the marker's layout box, so no lobe is clipped by the
   * cell — which means it has to be redone once the card is actually laid out.
   * `offsetWidth` rather than a client rect, because the marker turns while the
   * card is hovered and a rect would measure the turned box. */
  function sizeTodayShape() {
    const shape = grid.querySelector('.cal__today-shape');
    if (!shape) return;
    const size = shape.offsetWidth || 24;
    shape.style.clipPath = shapePath('cookie4', size);
  }

  el.querySelector('.cal__nav').addEventListener('click', (event) => {
    const step = Number(event.target.closest('[data-cal]')?.dataset.cal);
    if (!step) return;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + step, 1);
    renderCalendar();
    grid.animate(
      [
        { opacity: 0, transform: `translateX(${step * 16}px)` },
        { opacity: 1, transform: 'translateX(0)' },
      ],
      { duration: 340, easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
    );
  });

  renderCalendar();

  /* ---------------- Weather ---------------- */

  const sky = el.querySelector('[data-sky]');

  async function loadWeather() {
    const apply = ({ temperature, code, place }) => {
      const [text, mood] = describe(code);
      el.querySelector('[data-weather-temp]').textContent = Math.round(temperature);
      el.querySelector('[data-weather-label]').textContent = text;
      sky.dataset.sky = mood;
      if (place) el.querySelector('[data-weather-place]').textContent = place;
    };

    apply(weatherFallback);

    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-6.21&longitude=106.85&current=temperature_2m,weather_code',
      );
      if (!response.ok) return;
      const { current } = await response.json();
      apply({ temperature: current.temperature_2m, code: current.weather_code, place: 'Jakarta' });
    } catch {
      // Offline, or the service is down: the fallback already reads correctly.
    }
  }

  loadWeather();

  /* ---------------- Cat + mini transport ---------------- */

  const catHost = el.querySelector('[data-cat]');
  let animation = null;

  /** The cat is company, not a playback indicator: it loops regardless. */
  async function mountCat() {
    if (animation) return;
    const [{ default: lottie }, { default: data }] = await Promise.all([
      import('lottie-web'),
      import('../../lottie/cute_cat.json'),
    ]);
    animation = lottie.loadAnimation({
      container: catHost,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
    });
  }

  const miniButton = el.querySelector('[data-mini-play]');
  const miniLabel = el.querySelector('[data-mini-label]');

  miniButton.addEventListener('click', () => {
    miniButton.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.84)' }, { transform: 'scale(1)' }],
      { duration: 380, easing: 'cubic-bezier(0.42, 1.67, 0.21, 0.9)' },
    );
    player.toggle();
  });

  player.onChange((playing) => {
    miniLabel.textContent = playing ? 'Pause' : 'Play';
    miniButton.querySelector('.material-symbols-rounded').textContent = playing
      ? 'pause'
      : 'play_arrow';
    catHost.dataset.playing = String(playing);
  });

  return {
    el,
    enter() {
      mountCat();
      tickClock();
      // The marker is measured, so it has to be re-cut now the card has a box.
      sizeTodayShape();
    },
  };
}
