/** Window contents. Each app renders from src/data/profile.js. */
import { html, esc, icon } from './shell/dom.js';
import { logoMarkup } from './shell/logos.js';
import { shapePath } from './shell/shapes.js';
import { bootTerminal } from './shell/terminal.js';
import {
  identity,
  skillsIntro,
  skillsPillars,
  skillsStacks,
  experience,
  experienceOutro,
  education,
  aboutCopy,
  aboutPillars,
  aboutCollaborationPhoto,
  projects,
  projectsIntro,
  businesses,
  businessIntro,
  contacts,
  terminalProfile,
} from './data/profile.js';

const tags = (list) =>
  list.map((tag) => `<span class="pill">${esc(tag)}</span>`).join('');

function about() {
  const words = aboutCopy.marqueeWords.map((word) => `<span>${esc(word)}</span>`).join('<i>·</i>');
  return html`
    <article class="about-app about-surface">
      <div class="about-wordstream about-wordstream--back" aria-hidden="true">
        <div class="about-wordstream__track">${words}<b>${words}</b></div>
      </div>
      <div class="about-wordstream about-wordstream--front" aria-hidden="true">
        <div class="about-wordstream__track">${words}<b>${words}</b></div>
      </div>

      <section class="about-max-hero">
        <div class="about-max-hero__copy">
          <p class="about-kicker">${icon('waving_hand')} About me</p>
          <p class="about-hero__status">${esc(identity.status)} <span>·</span> ${esc(identity.location)}</p>
          <h1 class="about-max-hero__title">${esc(aboutCopy.heroTitle)}</h1>
          <p class="about-max-hero__lede">${esc(aboutCopy.heroLead)}</p>
          <a class="btn about-m3-button" href="mailto:${esc(identity.contactEmail)}">
            ${icon('mail')} Open collaboration
          </a>
        </div>

        <div class="about-gallery">
          <figure class="about-gallery__photo about-gallery__photo--single">
            <img src="${esc(identity.photo)}" alt="Ahnaf Faiz in a tailored suit, looking toward the camera" loading="eager" />
          </figure>
          <span class="about-gallery__caption">${esc(identity.role)}<br />Web · mobile · AI</span>
        </div>
      </section>

      <section class="about-manifesto">
        <div>
          <p class="about-section-label">${icon('flare')} The point of view</p>
          <h2>${esc(aboutCopy.manifestoTitle)}</h2>
        </div>
        <p>${esc(aboutCopy.manifesto)}</p>
      </section>

      <section class="about-section about-principles">
        <div class="about-section__heading">
          <p class="about-section-label">How I think</p>
          <h2>Three ways I make the work stronger.</h2>
        </div>
        <div class="about-principles__grid">
          ${aboutPillars
            .map(
              (item, index) => `
                <article class="about-principle about-principle--${index + 1}" style="--about-delay:${index * 90}ms">
                  <span class="about-principle__number">0${index + 1}</span>
                  <span class="about-principle__icon">${icon(item.icon)}</span>
                  <p class="about-principle__label">${esc(item.label)}</p>
                  <h3>${esc(item.title)}</h3>
                  <p class="about-principle__body">${esc(item.body)}</p>
                </article>`,
            )
            .join('')}
        </div>
      </section>

      <section class="about-section about-education-strip">
        <div class="about-section__heading">
          <p class="about-section-label">A little context</p>
          <h2>Rooted in computer science.</h2>
        </div>
        <div class="about-education-strip__list">
          ${education
            .map(
              (item, index) => `
                <article class="about-education-chip" style="--about-delay:${index * 70}ms">
                  <span>${esc(item.period)}</span>
                  <h3>${esc(item.school)}</h3>
                  <p>${esc(item.detail)}</p>
                </article>`,
            )
            .join('')}
        </div>
      </section>

      <section class="about-collaboration">
        <span class="about-collaboration__glow" aria-hidden="true"></span>
        <img
          class="about-collaboration__photo"
          src="${esc(aboutCollaborationPhoto.src)}"
          alt="${esc(aboutCollaborationPhoto.alt)}"
          loading="lazy"
        />
        <div class="about-collaboration__copy">
          <p class="about-section-label">${icon('bolt')} Open for collaboration</p>
          <h2>${esc(aboutCopy.collaborationTitle)}</h2>
          <p>${esc(aboutCopy.collaborationBody)}</p>
        </div>
        <a class="btn about-m3-button about-m3-button--inverse" href="mailto:${esc(identity.contactEmail)}">
          ${icon('arrow_outward')} Let’s talk
        </a>
      </section>
    </article>
  `;
}

/**
 * Skills — two halves. The top is how the work gets decided; the bottom is the
 * stack it gets executed with, filterable, every tool explaining itself on
 * hover. Content comes from `data/profile.js`; the marks from `shell/logos.js`.
 */
/** The tonal well behind the Skills portrait, in px: `shapePath` emits absolute
 * geometry, so the box and the shape have to agree on one size. */
const WELL_SIZE = 400;

/** The Projects card badge, in px — same deal: box and shape share one size. */
const BADGE_SIZE = 52;

/** The Business card seal, in px — the box and the generated shape share one size. */
const SEAL_SIZE = 46;

function skillsApp() {
  const toolCount = skillsStacks.reduce((total, stack) => total + stack.items.length, 0);

  const figures = [
    { value: String(skillsPillars.length), label: 'ways of thinking' },
    { value: String(skillsStacks.length), label: 'stacks' },
    { value: String(toolCount), label: 'tools in hand' },
  ];

  const chips = [{ group: 'All', icon: 'apps' }, ...skillsStacks]
    .map(
      (stack, index) => `
        <button class="skills-chip" type="button" data-filter="${esc(stack.group)}"
          aria-pressed="${index === 0}" style="--skill-delay:${index * 40}ms">
          ${icon(stack.icon)}<span>${esc(stack.group)}</span>
        </button>`,
    )
    .join('');

  const pillars = skillsPillars
    .map(
      (pillar, index) => `
        <article class="skills-pillar" data-shape="${esc(pillar.shape)}"
          style="--skill-delay:${index * 90}ms">
          <span class="skills-pillar__index">0${index + 1}</span>
          <span class="skills-pillar__icon">${icon(pillar.icon)}</span>
          <p class="skills-pillar__label">${esc(pillar.label)}</p>
          <h3>${esc(pillar.title)}</h3>
          <p class="skills-pillar__body">${esc(pillar.body)}</p>
          <div class="skills-pillar__marks">
            ${pillar.marks.map((mark) => `<span class="pill">${esc(mark)}</span>`).join('')}
          </div>
        </article>`,
    )
    .join('');

  const stacks = skillsStacks
    .map(
      (stack, groupIndex) => `
        <section class="skills-group" data-group="${esc(stack.group)}"
          style="--skill-delay:${groupIndex * 70}ms">
          <header class="skills-group__head">
            <span class="skills-group__icon">${icon(stack.icon)}</span>
            <div>
              <h3>${esc(stack.group)}</h3>
              <p>${esc(stack.blurb)}</p>
            </div>
            <span class="skills-group__count">${stack.items.length}</span>
          </header>
          <div class="skills-group__grid">
            ${stack.items
              .map(
                (tool, index) => `
                  <button class="skills-tool" type="button"
                    style="--skill-delay:${groupIndex * 70 + index * 45}ms">
                    <span class="skills-tool__mark">${logoMarkup(tool.logo)}</span>
                    <span class="skills-tool__name">${esc(tool.name)}</span>
                    <span class="skills-tool__note" role="tooltip">
                      <b>${esc(tool.name)}</b>${esc(tool.note)}
                    </span>
                  </button>`,
              )
              .join('')}
          </div>
        </section>`,
    )
    .join('');

  const root = html`
    <article class="skills-app skills-surface" data-state="loading" data-filter="All">
      <div class="skills-loader" role="progressbar" aria-label="Loading skills">
        <span class="skills-loader__track"></span>
        <span class="skills-loader__wave"></span>
      </div>

      <header class="skills-hero">
        <div class="skills-hero__copy">
          <p class="skills-kicker">${icon('bolt')} ${esc(skillsIntro.kicker)}</p>
          <h1 class="skills-hero__title">${esc(skillsIntro.title)}</h1>
          <p class="skills-hero__lede">${esc(skillsIntro.lede)}</p>
          <div class="skills-hero__figures">
            ${figures
              .map(
                (figure, index) => `
                  <span class="skills-figure" style="--skill-delay:${140 + index * 70}ms">
                    <b>${esc(figure.value)}</b>${esc(figure.label)}
                  </span>`,
              )
              .join('')}
          </div>
        </div>

        <figure class="skills-hero__portrait">
          <span class="skills-hero__well" aria-hidden="true"></span>
          <img src="${esc(skillsIntro.portrait)}" alt="${esc(skillsIntro.portraitAlt)}" loading="eager" />
        </figure>
      </header>

      <section class="skills-section skills-core">
        <div class="skills-section__heading">
          <p class="skills-section-label">${icon('psychology')} Foundation</p>
          <h2>What decides the build, before any tool is opened.</h2>
        </div>
        <div class="skills-core__grid">${pillars}</div>
      </section>

      <section class="skills-section skills-stack">
        <div class="skills-section__heading">
          <p class="skills-section-label">${icon('construction')} Execution</p>
          <h2>The stack that gets it shipped.</h2>
        </div>
        <div class="skills-chips" role="group" aria-label="Filter by stack">${chips}</div>
        <div class="skills-stack__list">${stacks}</div>
      </section>
    </article>
  `;

  // The tonal well behind the portrait is an Expressive shape too, so the
  // cutout sits in the same family as the badges below it.
  const well = root.querySelector('.skills-hero__well');
  well.style.clipPath = shapePath('cookie12', WELL_SIZE);

  // Expressive shapes for the pillar icons, generated rather than hand-drawn.
  root.querySelectorAll('.skills-pillar').forEach((card) => {
    const glyph = card.querySelector('.skills-pillar__icon');
    glyph.style.clipPath = shapePath(card.dataset.shape, 48);
  });

  // The loader is theatre with a job: it holds the stagger back until the tile
  // has settled, so the cards animate into a window that is done moving. Once
  // the last card has landed the state moves on again — a finished `both`-filled
  // animation would otherwise pin every opacity and the filter could not dim.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rest = () => root.setAttribute('data-state', 'settled');
  if (reduced) rest();
  else {
    setTimeout(() => {
      root.setAttribute('data-state', 'ready');
      setTimeout(rest, 1700);
    }, 620);
  }

  root.querySelector('.skills-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('.skills-chip');
    if (!chip) return;
    const wanted = chip.dataset.filter;
    root.setAttribute('data-filter', wanted);
    root.querySelectorAll('.skills-chip').forEach((other) => {
      other.setAttribute('aria-pressed', String(other === chip));
    });
    // Attribute selectors cannot compare one element's value against another's,
    // so the match is decided here and the groups only carry the result.
    root.querySelectorAll('.skills-group').forEach((group) => {
      const shown = wanted === 'All' || group.dataset.group === wanted;
      group.toggleAttribute('data-dimmed', !shown);
    });
  });

  return root;
}

/**
 * Experience — a wave rail running past to present, top to bottom. Each stop is
 * a translucent card beside an eight-lobed cookie dot; the rail draws itself,
 * then the cards, dots and copy land behind it. Content is `data/profile.js`.
 */
/** The dot's box, in px: `shapePath` emits absolute geometry, so the element
 * and the shape have to agree on one size. */
const XP_DOT_SIZE = 22;

/** The rail's geometry, in px. One cycle every `XP_WAVE_LENGTH`. */
const XP_WAVE_WIDTH = 24;
const XP_WAVE_LENGTH = 52;
const XP_WAVE_AMPLITUDE = 6;

/**
 * A vertical serpentine drawn to an exact pixel height. The path is generated
 * rather than stretched: an SVG scaled to fit would give a short card a tight
 * ripple and a tall one a single lazy curve, where the rail has to read as one
 * wave of one wavelength down the whole column.
 */
function wavePath(height) {
  const x = XP_WAVE_WIDTH / 2;
  const half = XP_WAVE_LENGTH / 2;
  const parts = [`M ${x} 0`];

  for (let y = 0, side = 1; y < height; side = -side) {
    const next = Math.min(y + half, height);
    const span = next - y;
    const bow = x + side * XP_WAVE_AMPLITUDE;
    parts.push(
      `C ${bow} ${(y + span * 0.36).toFixed(2)} ${bow} ${(next - span * 0.36).toFixed(2)} ` +
        `${x} ${next.toFixed(2)}`,
    );
    y = next;
  }

  return parts.join(' ');
}

/**
 * Redraws every rail against the height it actually has. Called once on mount
 * and again whenever the tile resizes, since a reflow changes how far a card
 * runs and the wave has to run exactly as far.
 */
function syncRails(root) {
  root.querySelectorAll('.xp-node').forEach((node) => {
    const svg = node.querySelector('.xp-wave');
    if (!svg) return;
    const height = Math.max(1, Math.round(svg.getBoundingClientRect().height));
    svg.setAttribute('viewBox', `0 0 ${XP_WAVE_WIDTH} ${height}`);
    svg.querySelector('path').setAttribute('d', wavePath(height));
  });
}

/** The rail markup. The path is filled in by `syncRails` once it has a height. */
const waveRail = () => `
  <svg class="xp-wave" width="${XP_WAVE_WIDTH}" aria-hidden="true">
    <path d="" pathLength="1" />
  </svg>`;

function experienceApp() {
  const stops = experience
    .map(
      (job, index) => `
        <li class="xp-node" style="--xp-index:${index}">
          <span class="xp-rail" aria-hidden="true">
            ${waveRail()}
            <span class="xp-dot"></span>
          </span>
          <article class="xp-card">
            <p class="xp-card__period">${icon('calendar_month')} ${esc(job.period)}</p>
            <h3 class="xp-card__role">${esc(job.role)}</h3>
            <p class="xp-card__org">
              ${esc(job.org)}
              ${
                job.href
                  ? `<a class="xp-card__site" href="${esc(job.href)}" target="_blank" rel="noreferrer">
                      ${esc(job.site ?? job.href)}${icon('arrow_outward')}
                    </a>`
                  : ''
              }
            </p>
            <p class="xp-card__body">${esc(job.body)}</p>
            <div class="xp-card__tags">${tags(job.tags)}</div>
          </article>
        </li>`,
    )
    .join('');

  const outro = `
    <li class="xp-node xp-node--open" style="--xp-index:${experience.length}">
      <span class="xp-rail" aria-hidden="true">
        ${waveRail()}
        <span class="xp-dot"></span>
      </span>
      <article class="xp-card xp-card--open">
        <p class="xp-card__period">${icon('hourglass_top')} ${esc(experienceOutro.label)}</p>
        <h3 class="xp-card__role">${esc(experienceOutro.title)}</h3>
        <p class="xp-card__body">${esc(experienceOutro.body)}</p>
        <div class="xp-card__tags">
          <a class="btn xp-card__cta" href="mailto:${esc(identity.contactEmail)}">
            ${icon('mail')} ${esc(experienceOutro.action)}
          </a>
        </div>
      </article>
    </li>`;

  const root = html`
    <section class="xp-app" data-state="idle">
      <ol class="xp-line">${stops}${outro}</ol>
    </section>
  `;

  // Expressive shape rather than a plain disc, generated so the dot stays in
  // the same family as the badges elsewhere in the shell.
  const dotShape = shapePath('cookie8', XP_DOT_SIZE);
  root.querySelectorAll('.xp-dot').forEach((dot) => {
    dot.style.clipPath = dotShape;
  });

  // The manager appends the node the moment this returns, so the next frame is
  // the earliest point a rail has a height to draw against.
  requestAnimationFrame(() => syncRails(root));
  new ResizeObserver(() => syncRails(root)).observe(root);

  // The entry stagger is held until the tile has finished settling, so the rail
  // draws into a window that has stopped moving. `settled` releases the pinned
  // opacities the `both`-filled animations leave behind, so hover can take over.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) root.setAttribute('data-state', 'settled');
  else {
    // A timer rather than a frame callback: a window opened while the tab is in
    // the background would otherwise sit on `idle` — invisible — until the tab
    // came back and rAF resumed.
    setTimeout(() => {
      root.setAttribute('data-state', 'ready');
      setTimeout(() => root.setAttribute('data-state', 'settled'), 2400);
    }, 240);
  }

  return root;
}

/* Projects. A maximalist shelf: a marquee running behind the type, one card per
 * build, and a stack ticker that only starts running once a card is hovered. */
function projectsApp() {
  const kinds = ['All', ...new Set(projects.map((project) => project.kind))];

  const chips = kinds
    .map(
      (kind, index) => `
        <button class="projects-chip" type="button" data-filter="${esc(kind)}"
          aria-pressed="${index === 0}" style="--pj-delay:${index * 40}ms">
          <span>${esc(kind)}</span>
        </button>`,
    )
    .join('');

  const tickerWords = projectsIntro.ticker
    .map((word) => `<span>${esc(word)}</span>`)
    .join('<i>✦</i>');

  const cards = projects
    .map((project, index) => {
      const runner = [...project.tags, project.name, project.year]
        .map((word) => `<span>${esc(word)}</span>`)
        .join('<i>·</i>');

      const metrics = project.metrics.length
        ? `<div class="projects-card__metrics">
            ${project.metrics
              .map(
                (metric) => `
                  <span class="projects-metric">
                    <b>${esc(metric.value)}</b>${esc(metric.label)}
                  </span>`,
              )
              .join('')}
          </div>`
        : '';

      const link = project.link
        ? `<a class="projects-card__link" href="${esc(project.link.href)}" target="_blank" rel="noreferrer noopener">
            ${icon('north_east')}<span>${esc(project.link.label)}</span>
          </a>`
        : `<span class="projects-card__link projects-card__link--muted">
            ${icon('lock')}<span>Internal system</span>
          </span>`;

      return `
        <article class="projects-card" data-kind="${esc(project.kind)}"
          data-accent="${esc(project.accent)}" data-shape="${esc(project.shape)}"
          ${project.invite ? 'data-invite' : ''}
          style="--pj-delay:${index * 90}ms" tabindex="0">
          <span class="projects-card__runline" aria-hidden="true"></span>

          <header class="projects-card__head">
            <span class="projects-card__badge">${icon(project.icon)}</span>
            <div class="projects-card__title">
              <p class="projects-card__kind">${esc(project.kind)}</p>
              <h3>${esc(project.name)}</h3>
            </div>
            <span class="projects-card__index">${String(index + 1).padStart(2, '0')}</span>
          </header>

          <p class="projects-card__meta">
            <span>${esc(project.year)}</span><i>·</i><span>${esc(project.role)}</span>
            <em class="projects-card__status">${esc(project.status)}</em>
          </p>

          <p class="projects-card__body">${esc(project.body)}</p>

          <ul class="projects-card__points">
            ${project.highlights
              .map((point) => `<li>${icon('check_small')}<span>${esc(point)}</span></li>`)
              .join('')}
          </ul>

          ${metrics}

          <footer class="projects-card__foot">
            <div class="row row--wrap">${tags(project.tags)}</div>
            ${link}
          </footer>

          <div class="projects-card__runner" aria-hidden="true">
            <div class="projects-card__runner-track">${runner}<b>${runner}</b></div>
          </div>
        </article>`;
    })
    .join('');

  const root = html`
    <article class="projects-app projects-surface" data-state="loading" data-filter="All">
      <div class="projects-loader" role="progressbar" aria-label="Loading projects">
        <span class="projects-loader__track"></span>
        <span class="projects-loader__wave"></span>
      </div>

      <div class="projects-wordstream" aria-hidden="true">
        <div class="projects-wordstream__track">${tickerWords}<b>${tickerWords}</b></div>
      </div>

      <header class="projects-hero">
        <p class="projects-kicker">${icon('grid_view')} ${esc(projectsIntro.kicker)}</p>
        <h1 class="projects-hero__title">${esc(projectsIntro.title)}</h1>
        <p class="projects-hero__lede">${esc(projectsIntro.lede)}</p>
      </header>

      <div class="projects-chips" role="group" aria-label="Filter by kind">${chips}</div>

      <div class="projects-grid">${cards}</div>
    </article>
  `;

  // Expressive shapes for the card badges, generated rather than hand-drawn —
  // same family the skills pillars and about avatars pull from.
  root.querySelectorAll('.projects-card').forEach((card) => {
    const badge = card.querySelector('.projects-card__badge');
    badge.style.clipPath = shapePath(card.dataset.shape, BADGE_SIZE);
  });

  // The loader holds the stagger back until the window has finished settling,
  // then hands over: a finished `both`-filled entry animation would pin every
  // opacity and the filter below could no longer dim a card.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rest = () => root.setAttribute('data-state', 'settled');
  if (reduced) rest();
  else {
    setTimeout(() => {
      root.setAttribute('data-state', 'ready');
      setTimeout(rest, 1600);
    }, 560);
  }

  root.querySelector('.projects-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('.projects-chip');
    if (!chip) return;
    const wanted = chip.dataset.filter;
    root.setAttribute('data-filter', wanted);
    root.querySelectorAll('.projects-chip').forEach((other) => {
      other.setAttribute('aria-pressed', String(other === chip));
    });
    // A selector cannot compare one element's value against another's, so the
    // match is decided here and the cards only carry the result.
    root.querySelectorAll('.projects-card').forEach((card) => {
      const shown = wanted === 'All' || card.dataset.kind === wanted;
      card.toggleAttribute('data-dimmed', !shown);
    });
  });

  return root;
}

/**
 * Business — the two products that have customers. Maximalist by intent: an
 * oversized wordstream behind everything, a full-bleed card per business with
 * its own logo plate, and every accent taken from the Material palette.
 */
function businessApp() {
  const tickerWords = businessIntro.ticker
    .map((word) => `<span>${esc(word)}</span>`)
    .join('<i>✦</i>');

  const figures = [
    { value: String(businesses.length), label: 'businesses running' },
    { value: businesses[0].since, label: 'first one shipped' },
    { value: 'Live', label: 'both, with paying users' },
  ];

  const cards = businesses
    .map((business, index) => {
      const runner = [...business.tags, business.name, business.kind]
        .map((word) => `<span>${esc(word)}</span>`)
        .join('<i>·</i>');

      return `
        <article class="biz-card" data-accent="${esc(business.accent)}"
          data-shape="${esc(business.shape)}" data-biz="${esc(business.id)}"
          style="--biz-delay:${index * 140}ms" tabindex="0">
          <span class="biz-card__runline" aria-hidden="true"></span>
          <span class="biz-card__bloom" aria-hidden="true"></span>
          <span class="biz-card__ordinal" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>

          <header class="biz-card__head">
            <figure class="biz-card__logo">
              <img class="biz-card__mark biz-card__mark--light"
                src="${esc(business.logo.light)}" alt="${esc(business.logo.alt)} logo" loading="lazy" />
              <img class="biz-card__mark biz-card__mark--dark"
                src="${esc(business.logo.dark)}" alt="" aria-hidden="true" loading="lazy" />
            </figure>

            <div class="biz-card__ident">
              <p class="biz-card__kind">
                <span class="biz-card__seal">${icon(business.icon)}</span>
                <span>${esc(business.kind)}</span><i>·</i><span>since ${esc(business.since)}</span>
              </p>
              <h2 class="biz-card__name">${esc(business.name)}</h2>
              <p class="biz-card__tagline">${esc(business.tagline)}</p>
            </div>
          </header>

          <div class="biz-card__copy">
            <p>${esc(business.body)}</p>
            <p>${esc(business.body2)}</p>
          </div>

          <ul class="biz-card__points">
            ${business.highlights
              .map(
                (point, pointIndex) => `
                  <li style="--biz-row:${pointIndex}">
                    ${icon('check_small')}<span>${esc(point)}</span>
                  </li>`,
              )
              .join('')}
          </ul>

          <div class="biz-card__metrics">
            ${business.metrics
              .map(
                (metric, metricIndex) => `
                  <span class="biz-metric" style="--biz-row:${metricIndex}">
                    <b>${esc(metric.value)}</b>${esc(metric.label)}
                  </span>`,
              )
              .join('')}
          </div>

          <footer class="biz-card__foot">
            <div class="row row--wrap">${tags(business.tags)}</div>
            <a class="biz-learn" href="${esc(business.link.href)}"
              target="_blank" rel="noreferrer noopener">
              <span class="biz-learn__fill" aria-hidden="true"></span>
              <span class="biz-learn__label">Learn more</span>
              <span class="biz-learn__host">${esc(business.link.label)}</span>
              <span class="biz-learn__icon">${icon('arrow_outward')}</span>
            </a>
          </footer>

          <div class="biz-card__runner" aria-hidden="true">
            <div class="biz-card__runner-track">${runner}<b>${runner}</b></div>
          </div>
        </article>`;
    })
    .join('');

  const root = html`
    <article class="biz-app biz-surface" data-state="loading">
      <div class="biz-loader" role="progressbar" aria-label="Loading businesses">
        <span class="biz-loader__track"></span>
        <span class="biz-loader__wave"></span>
      </div>

      <div class="biz-wordstream" aria-hidden="true">
        <div class="biz-wordstream__track">${tickerWords}<b>${tickerWords}</b></div>
      </div>

      <header class="biz-hero">
        <p class="biz-kicker">${icon('storefront')} ${esc(businessIntro.kicker)}</p>
        <h1 class="biz-hero__title">${esc(businessIntro.title)}</h1>
        <p class="biz-hero__lede">${esc(businessIntro.lede)}</p>
        <div class="biz-hero__figures">
          ${figures
            .map(
              (figure, index) => `
                <span class="biz-figure" style="--biz-delay:${140 + index * 70}ms">
                  <b>${esc(figure.value)}</b>${esc(figure.label)}
                </span>`,
            )
            .join('')}
        </div>
      </header>

      <div class="biz-deck">${cards}</div>
    </article>
  `;

  // The seal behind each business icon is generated, not drawn — same
  // expressive family the projects badges and skills pillars pull from.
  root.querySelectorAll('.biz-card').forEach((card) => {
    const seal = card.querySelector('.biz-card__seal');
    seal.style.clipPath = shapePath(card.dataset.shape, SEAL_SIZE);
  });

  // Same handover as Projects: the loader holds the stagger back until the
  // window has settled, then the entry animations release their fill.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rest = () => root.setAttribute('data-state', 'settled');
  if (reduced) rest();
  else {
    setTimeout(() => {
      root.setAttribute('data-state', 'ready');
      setTimeout(rest, 1600);
    }, 560);
  }

  return root;
}

/** The shaped well behind each contact mark, in px: `shapePath` emits absolute
 * geometry, so the element has to keep this exact box at every breakpoint. */
const CONTACT_GLYPH_SIZE = 64;

/* Rest/hover pairs from the Expressive set. Both halves of a pair are sampled
 * at the same point count, so `clip-path` morphs between them on hover rather
 * than snapping. */
const CONTACT_SHAPES = [
  ['cookie8', 'sunny'],
  ['circle12', 'cookie12'],
  ['cookie4', 'circle'],
  ['sunny', 'cookie8'],
  ['cookie12', 'circle12'],
];

function contactApp() {
  const cards = contacts
    .map((item, index) => {
      const external = item.href.startsWith('mailto:') ? '' : ' target="_blank" rel="noreferrer noopener"';
      const [rest, hover] = CONTACT_SHAPES[index % CONTACT_SHAPES.length];

      return `
        <a class="contact-card" href="${esc(item.href)}"${external}
          data-ripple style="--contact-delay:${index * 75}ms"
          data-shape="${rest}" data-shape-hover="${hover}"
          aria-label="${esc(item.label)} ${esc(item.value)}">
          <span class="contact-card__glyph">
            <span class="contact-card__well" aria-hidden="true"></span>
            <span class="contact-card__mark">${logoMarkup(item.logo)}</span>
          </span>
          <span class="contact-card__copy">
            <span class="contact-card__label">${esc(item.label)}</span>
            <span class="contact-card__value">${esc(item.value)}</span>
          </span>
          <span class="contact-card__arrow" aria-hidden="true">${icon('arrow_outward')}</span>
        </a>`;
    })
    .join('');

  const root = html`
    <article class="contact-app contact-surface" data-state="loading">
      <div class="contact-shape-group" aria-hidden="true">
        <span class="contact-shape contact-shape--circle"></span>
        <span class="contact-shape contact-shape--pill"></span>
        <span class="contact-shape contact-shape--diamond"></span>
      </div>
      <div class="contact-layout">
        <header class="contact-intro">
          <span class="contact-icon--large">${icon('contact_page')}</span>
          <div>
            <p class="contact-kicker">Contact</p>
            <h1>Let's connect</h1>
          </div>
        </header>
        <nav class="contact-list" aria-label="Contact links">${cards}</nav>
      </div>
    </article>
  `;

  // Both halves of the pair are handed to CSS as clip-paths, so the hover rule
  // only has to swap which variable the well reads.
  root.querySelectorAll('.contact-card').forEach((card) => {
    const well = card.querySelector('.contact-card__well');
    well.style.setProperty('--contact-shape', shapePath(card.dataset.shape, CONTACT_GLYPH_SIZE));
    well.style.setProperty(
      '--contact-shape-hover',
      shapePath(card.dataset.shapeHover, CONTACT_GLYPH_SIZE),
    );
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) root.setAttribute('data-state', 'settled');
  else {
    setTimeout(() => {
      root.setAttribute('data-state', 'ready');
      setTimeout(() => root.setAttribute('data-state', 'settled'), 1200);
    }, 220);
  }

  return root;
}

/** Years between `iso` and today, rounded down on the birthday. */
function ageFrom(iso) {
  const born = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - born.getFullYear();
  const monthDelta = now.getMonth() - born.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < born.getDate())) years -= 1;
  return years;
}

const dateLong = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * The Terminal window. Three seconds of matrix rain as a loader, then the
 * portrait as characters beside the identity fields, then the collaboration
 * prompt. `shell/terminal.js` drives the sequence once the node is in the DOM.
 */
function terminalApp() {
  const {
    host,
    machine,
    birthDate,
    address,
    interests,
    asciiPhoto,
    asciiRamp,
    asciiColumns,
    asciiCrop,
    bootLines,
    collaboration,
  } = terminalProfile;

  const age = ageFrom(birthDate);
  const fields = [
    { key: 'name', text: identity.name },
    { key: 'age', text: `${age} years · born ${dateLong(birthDate)}` },
    { key: 'address', text: address },
  ];

  const boot = bootLines
    .map(
      (line) => `
        <p class="term-boot__line" data-text="${esc(line)}">
          <span class="term-boot__caret" aria-hidden="true">&gt;</span>
          <span class="term-boot__text"></span>
        </p>`,
    )
    .join('');

  const rows = fields
    .map(
      (field) => `
        <div class="term-field" data-text="${esc(field.text)}">
          <span class="term-field__key">${esc(field.key)}</span>
          <span class="term-field__value"></span>
        </div>`,
    )
    .join('');

  const tags = interests
    .map((item, index) => `<li style="--tag:${index}">${esc(item)}</li>`)
    .join('');

  // The whole readout is announced up front: the acts below are decoration,
  // so everything animated is hidden from the accessibility tree.
  const spoken = [
    identity.name,
    `${age} years old`,
    address,
    `Interests: ${interests.join(', ')}`,
  ].join('. ');

  const root = html`
    <article class="term-app" role="group" aria-label="${esc(spoken)}">
      <div class="term-boot" aria-hidden="true">
        <canvas class="term-rain"></canvas>
        <div class="term-boot__log">${boot}</div>
      </div>

      <div class="term-shell" aria-hidden="true">
        <p class="term-prompt">
          <span class="term-prompt__user">${esc(host)}@${esc(machine)}</span>
          <span class="term-prompt__path">~</span>
          <span class="term-prompt__cmd">./whoami --full</span>
        </p>

        <div class="term-columns">
          <pre class="term-ascii"></pre>

          <div class="term-readout">
            ${rows}
            <div class="term-field term-field--list" data-text="${esc(interests.length + ' loaded')}">
              <span class="term-field__key">interest</span>
              <span class="term-field__value"></span>
            </div>
            <ul class="term-interests">${tags}</ul>
          </div>
        </div>

        <a class="term-cta" href="mailto:${esc(identity.contactEmail)}">
          <span class="term-cta__sigil" aria-hidden="true">$</span>
          <span class="term-cta__cmd">${esc(collaboration.command)}</span>
          <span class="term-cta__label">${esc(collaboration.label)}</span>
          <span class="term-cta__caret" aria-hidden="true"></span>
        </a>
      </div>
    </article>
  `;

  // The manager appends the node the moment this returns, so the next frame is
  // the earliest point the canvas has a size to measure.
  requestAnimationFrame(() => {
    bootTerminal(root, {
      photo: asciiPhoto,
      ramp: asciiRamp,
      columns: asciiColumns,
      crop: asciiCrop,
    });
  });

  return root;
}

export const apps = [
  { id: 'about', title: 'About', icon: 'person', render: about, width: 560, height: 520 },
  { id: 'skills', title: 'Skills', icon: 'bolt', render: skillsApp, width: 880, height: 640 },
  { id: 'projects', title: 'Projects', icon: 'grid_view', render: projectsApp, width: 980, height: 700 },
  { id: 'business', title: 'Business', icon: 'storefront', render: businessApp, width: 880, height: 640 },
  { id: 'experience', title: 'Experience', icon: 'work', render: experienceApp, width: 700, height: 580 },
  { id: 'contact', title: 'Contact', icon: 'mail', render: contactApp, width: 600, height: 520 },
  { id: 'terminal', title: 'Terminal', icon: 'terminal', render: terminalApp, width: 900, height: 600 },
];

export const appById = (id) => apps.find((app) => app.id === id);
