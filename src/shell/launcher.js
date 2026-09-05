/** Launcher: one fuzzy search over apps and commands alike. */
import { html, esc, icon } from './dom.js';

const fuzzy = (needle, haystack) => {
  const target = haystack.toLowerCase();
  let index = 0;
  for (const ch of needle.toLowerCase()) {
    index = target.indexOf(ch, index);
    if (index === -1) return false;
    index += 1;
  }
  return true;
};

/** A name that starts with what was typed is what the user meant; it sorts first. */
const rank = (name, term) => {
  const lower = name.toLowerCase();
  if (!term) return 2;
  if (lower.startsWith(term)) return 0;
  if (lower.includes(term)) return 1;
  return 2;
};

export function createLauncher({ apps, wm, commands }) {
  const el = html`
    <div class="launcher" role="dialog" aria-label="Launcher">
      <div class="launcher__panel">
        <div class="launcher__list" role="listbox"></div>
        <div class="launcher__search">
          ${icon('search')}
          <input type="text" placeholder="Search apps and commands" aria-label="Search" />
          <button class="launcher__clear" data-clear aria-label="Clear search">
            ${icon('close')}
          </button>
        </div>
      </div>
    </div>
  `;

  const list = el.querySelector('.launcher__list');
  const search = el.querySelector('.launcher__search');
  const input = el.querySelector('input');
  let active = 0;
  let entries = [];

  // A leading `>` is no longer the way in — it is only tolerated so an old
  // muscle-memory keystroke does not swallow the first letter of the query.
  const normalize = (value) => value.replace(/^>+\s*/, '').trim();

  const entriesFor = (term) => {
    const appEntries = apps
      .filter((app) => !term || fuzzy(term, `${app.title} ${app.id}`))
      .map((app) => ({
        name: app.title,
        desc: `Open the ${app.title.toLowerCase()} window`,
        icon: app.icon,
        score: rank(app.title, term),
        run: () => wm.open(app),
      }));

    const commandEntries = commands
      .filter((command) => !term || fuzzy(term, command.name))
      .map((command) => ({ ...command, score: rank(command.name, term) + 0.5 }));

    return [...appEntries, ...commandEntries].sort((a, b) => a.score - b.score);
  };

  function render(animate = false) {
    const term = normalize(input.value).toLowerCase();
    search.dataset.filled = String(input.value.length > 0);
    el.dataset.animate = String(animate);

    entries = entriesFor(term);
    active = 0;

    list.innerHTML = entries.length
      ? entries
          .map(
            (entry, index) => `
              <button class="launcher__item" role="option" data-index="${index}"
                style="--i:${index}"
                data-active="${index === 0}" aria-selected="${index === 0}">
                <span class="launcher__glyph">${icon(entry.icon)}</span>
                <span class="launcher__text">
                  <span class="launcher__name">${esc(entry.name)}</span>
                  <span class="launcher__desc">${esc(entry.desc)}</span>
                </span>
              </button>`,
          )
          .join('')
      : '<p class="muted" style="padding:18px">No results.</p>';
  }

  function move(delta) {
    if (!entries.length) return;
    active = (active + delta + entries.length) % entries.length;
    for (const item of list.querySelectorAll('.launcher__item')) {
      const on = Number(item.dataset.index) === active;
      item.dataset.active = String(on);
      item.setAttribute('aria-selected', String(on));
      if (on) item.scrollIntoView({ block: 'nearest' });
    }
  }

  function run(index = active) {
    const entry = entries[index];
    if (!entry) return;
    close();
    entry.run();
  }

  function open(prefill = '') {
    el.dataset.open = 'true';
    input.value = prefill;
    // Only the open stages the rows in; every later render is a plain swap.
    render(true);
    // The panel's skirt hangs past the stage's edge; a plain focus would scroll
    // the stage to reveal it and drag the panel off the bezelle with it.
    input.focus({ preventScroll: true });
  }

  function close() {
    el.dataset.open = 'false';
    input.blur();
  }

  const isOpen = () => el.dataset.open === 'true';

  input.addEventListener('input', () => render());
  el.querySelector('[data-clear]').addEventListener('click', () => {
    input.value = '';
    render();
    input.focus({ preventScroll: true });
  });

  list.addEventListener('click', (event) => {
    const item = event.target.closest('.launcher__item');
    if (item) run(Number(item.dataset.index));
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') (event.preventDefault(), move(1));
    else if (event.key === 'ArrowUp') (event.preventDefault(), move(-1));
    else if (event.key === 'Enter') (event.preventDefault(), run());
    else if (event.key === 'Escape') close();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      isOpen() ? close() : open();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (isOpen() && !el.contains(event.target) && !event.target.closest('.bar__logo')) close();
  });

  render();

  return { el, open, close, isOpen };
}
