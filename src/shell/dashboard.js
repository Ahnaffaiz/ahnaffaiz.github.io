/** The dashboard that comes down out of the topbar, and its four tabs. */
import { html, esc, icon } from './dom.js';
import { createOverview } from '../dashboard/overview.js';
import { createMedia } from '../dashboard/media.js';
import { createStats } from '../dashboard/stats.js';
import { createWorkspace } from '../dashboard/workspace.js';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'media', label: 'Media', icon: 'graphic_eq' },
  { id: 'stats', label: 'Stats', icon: 'monitoring' },
  { id: 'workspace', label: 'Workspace', icon: 'route' },
];

export function createDashboard({ player, onDesktopMeter }) {
  const panels = {
    dashboard: createOverview({ player }),
    media: createMedia({ player, onDesktopMeter }),
    stats: createStats(),
    workspace: createWorkspace(),
  };

  const el = html`
    <section class="drawer" aria-label="Dashboard">
      <div class="drawer__tabs" role="tablist">
        ${TABS.map(
          (tab, index) => `
            <button class="drawer__tab" role="tab" data-tab="${esc(tab.id)}"
              aria-selected="${index === 0}">${icon(tab.icon)}<span>${esc(tab.label)}</span></button>`,
        ).join('')}
      </div>
      <div class="drawer__viewport">
        <div class="drawer__track"></div>
      </div>
    </section>
  `;

  el.dataset.tab = TABS[0].id;

  const track = el.querySelector('.drawer__track');
  for (const tab of TABS) {
    const panel = html`<div class="drawer__panel" data-panel="${esc(tab.id)}"></div>`;
    panel.append(panels[tab.id].el);
    track.append(panel);
  }

  const buttons = [...el.querySelectorAll('.drawer__tab')];
  let current = TABS[0].id;

  function select(id) {
    const index = TABS.findIndex((tab) => tab.id === id);
    if (index < 0) return;
    current = id;
    // Each tab carries its own footprint: the dashboard is the widest of them,
    // media the most compact. `dashboard.css` holds the sizes per tab.
    el.dataset.tab = id;
    track.style.transform = `translateX(-${index * 100}%)`;
    for (const button of buttons) {
      button.setAttribute('aria-selected', String(button.dataset.tab === id));
    }
    panels[id].enter?.();
  }

  /**
   * The panels are a transform carousel inside a clipped viewport, so the
   * viewport must never scroll itself: focusing anything inside a panel — the
   * seek slider, a button — makes the browser scroll it into view, which slides
   * the whole strip sideways and leaves two tabs showing at once. Pin it back.
   * Only the horizontal axis: narrow screens do scroll this box vertically.
   */
  const viewport = el.querySelector('.drawer__viewport');
  viewport.addEventListener('scroll', () => {
    if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
  });

  el.querySelector('.drawer__tabs').addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (tab) select(tab.dataset.tab);
  });

  return {
    el,
    select,
    /** Replays the visible tab's entry animation each time the drawer opens. */
    enter() {
      panels[current].enter?.();
    },
  };
}
