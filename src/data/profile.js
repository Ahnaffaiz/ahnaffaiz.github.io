// Web-sized copies of images/wallpaper-*.  Regenerate after adding a wallpaper:
//   sips -s format jpeg -s formatOptions 80 -Z 2560 images/wallpaper-N.png --out images/web/wallpaper-N.jpg
import wallpaper0 from '../../images/web/wallpaper-0.jpg';
import wallpaper1 from '../../images/web/wallpaper-1.jpg';
import wallpaper2 from '../../images/web/wallpaper-2.jpg';
import wallpaper3 from '../../images/web/wallpaper-3.jpg';
import wallpaper5 from '../../images/web/wallpaper-5.jpg';
import wallpaper6 from '../../images/web/wallpaper-6.jpg';
import wallpaper7 from '../../images/web/wallpaper-7.jpg';
import wallpaper8 from '../../images/web/wallpaper-8.jpg';
import wallpaper9 from '../../images/web/wallpaper-9.jpg';
import profilePhoto from '../../images/profile/profile_2.png';
import skillsPortrait from '../../images/profile/profile_4.png';
import profilePhoto3 from '../../images/profile/profile_3.png';
import quranCover from '../../images/quran.png';
import juaraSilatLogoLight from '../../images/business/juarasilat-light.svg';
import juaraSilatLogoDark from '../../images/business/juarasilat-dark.svg';
import finoLogoLight from '../../images/business/fino-light.png';
import finoLogoDark from '../../images/business/fino-dark.png';

/** Everything the shell renders. Edit here, not in the markup. */

export const identity = {
  name: 'Ahnaf Faiz',
  fullName: 'Faiz Ahnaf Eka Putra',
  handle: '@ahnaffaiz',
  role: 'Software Developer · AI Builder',
  roles: ['Software Developer', 'Vibe Coder', 'AI Enthusiast'],
  photo: profilePhoto,
  distro: 'Arch Linux',
  wm: 'Hyprland',
  summary:
    'I turn rough ideas into dependable software across the web, Flutter, and Swift for iOS. With '
    + '6+ years building products, I use a hands-on mix of software craft, vibe coding, and AI '
    + 'automation to move useful work from first sketch to shipped product.',
  location: 'Indonesia · UTC+7',
  status: 'Open to work',
  contactEmail: 'ahnafsite@gmail.com',
};

/**
 * The Terminal window: the boot readout after the matrix loader.
 * `birthDate` drives the age, so the figure never goes stale.
 */
export const terminalProfile = {
  host: 'ahnaf',
  machine: 'profile',
  birthDate: '2000-03-26',
  address: 'Sragen, Central Java · Indonesia',
  interests: ['Business', 'AI', 'Software'],
  /** The portrait the ASCII renderer samples. */
  asciiPhoto: profilePhoto3,
  /**
   * The part of that portrait to sample, as fractions of its width and height.
   * Cropped to the head and the top of the shoulders: at this character size a
   * full-length figure spends most of its rows on an empty suit.
   */
  asciiCrop: { x: 0.24, y: 0, width: 0.52, height: 0.4 },
  /** Light to dark; index 0 is the brightest pixel. */
  asciiRamp: ' .:-=+*#%@',
  asciiColumns: 64,
  bootLines: [
    'initialising kernel modules ......... ok',
    'mounting /dev/identity ............. ok',
    'decrypting portrait stream ......... ok',
    'loading personality profile ........ ok',
  ],
  collaboration: {
    label: 'open collaboration',
    command: './open-collaboration.sh',
  },
};

/** A secondary portrait used only as the frameless collaboration cutout. */
export const aboutCollaborationPhoto = {
  src: profilePhoto3,
  alt: 'Ahnaf Faiz in a tailored suit, ready to collaborate',
};

export const aboutCopy = {
  heroTitle: 'Software for the real world.',
  heroLead:
    'I build products where business clarity, engineering discipline, and AI leverage meet — from the first useful idea to the app people can rely on.',
  manifestoTitle: 'Not a fantasy app. A useful one.',
  manifesto:
    'My favourite work starts with a real operation: a team that needs to move faster, a business that needs better tools, or a repetitive task that should disappear. I stay close to that reality while turning the requirements into software that works.',
  marqueeWords: [
    'AHNAF',
    'FAIZ',
    'VIBE CODING',
    'ARTIFICIAL INTELLIGENCE',
    'DEVELOPER',
    'BUSINESS FIRST',
    'SHIP USEFUL',
  ],
  collaborationTitle: 'Bring me the messy idea.',
  collaborationBody:
    'Tell me what is slow, unclear, or still living in a spreadsheet. We can shape it into a product with a job to do.',
};

export const aboutPillars = [
  {
    title: 'Business owner',
    label: 'I build from the inside',
    icon: 'storefront',
    body:
      'I understand that software has to earn its place in a business. Every app should support a real workflow, a real customer, or a real decision — not just look impressive in a demo.',
  },
  {
    title: 'Software engineer',
    label: 'I make requirements executable',
    icon: 'engineering',
    body:
      'An engineering background helps me translate business requirements into systems that are clear, maintainable, and ready to grow across web, Flutter, and native iOS.',
  },
  {
    title: 'AI enthusiast',
    label: 'I multiply the work',
    icon: 'neurology',
    body:
      'I use powerful AI across the work — for exploration, automation, and delivery — to move faster, stay focused, and make more room for the decisions that matter.',
  },
];

export const aboutCapabilities = [
  {
    title: 'Web & full-stack',
    detail: 'From Laravel and PHP backends to focused, useful interfaces that are ready for real users.',
    icon: 'language',
  },
  {
    title: 'Flutter apps',
    detail: 'Cross-platform mobile products with a consistent experience from the first tap onward.',
    icon: 'devices',
  },
  {
    title: 'Swift for iOS',
    detail: 'Native Apple experiences when the platform deserves a closer fit and a more refined touch.',
    icon: 'phone_iphone',
  },
  {
    title: 'AI automation',
    detail: 'Practical AI workflows and vibe-coded prototypes that turn repetitive work into momentum.',
    icon: 'auto_awesome',
  },
];

/** The Skills window: how I think, then what I execute with. */
export const skillsIntro = {
  kicker: 'Skills',
  portrait: skillsPortrait,
  portraitAlt: 'Ahnaf Faiz, arms folded, in a black suit',
  title: 'Business sense, engineering discipline, AI leverage.',
  lede:
    'Four ways of working that decide what gets built — and the stack I use to '
    + 'get it live. Hover any tool to see what it actually does for the work.',
};

/** The part that is not a logo: how the work is decided before it is typed. */
export const skillsPillars = [
  {
    title: 'Business background',
    label: 'Where the work starts',
    icon: 'storefront',
    shape: 'clover',
    body:
      'I read the operation before the codebase — margin, workflow, and who '
      + 'actually clicks the button. Software should earn its cost, not decorate '
      + 'the roadmap.',
    marks: ['Requirement discovery', 'Process mapping', 'Cost vs. impact'],
  },
  {
    title: 'Problem-solving thinking',
    label: 'How I get unstuck',
    icon: 'lightbulb',
    shape: 'cookie12',
    body:
      'Cut the mess into pieces small enough to be wrong about. Find the real '
      + 'constraint first, then make the cheapest change that moves it — no '
      + 'heroic rewrite for a two-line cause.',
    marks: ['Root cause first', 'Smallest viable fix', 'Trade-offs stated'],
  },
  {
    title: 'System planner & designer',
    label: 'Before the first commit',
    icon: 'architecture',
    shape: 'flower',
    body:
      'Data model, design system, interface and logic planned as one piece. '
      + 'Names, states and edge cases settled on paper, so the build is assembly '
      + 'instead of improvisation.',
    marks: ['Database', 'Design system', 'UI/UX', 'Business logic'],
  },
  {
    title: 'AI as leverage',
    label: 'How I move fast',
    icon: 'neurology',
    shape: 'sunny',
    body:
      'AI is a crew, not a toy: scoped prompts, MCP tooling, custom skills. It '
      + 'drafts, I direct — and every line still gets reviewed, so speed never '
      + 'costs correctness.',
    marks: ['Scoped prompts', 'MCP tooling', 'Custom skills', 'Human review'],
  },
];

/**
 * The execution stack. `logo` names a mark in `shell/logos.js`; `note` is the
 * one-line hover explanation of what the tool does for the work.
 */
export const skillsStacks = [
  {
    group: 'AI',
    icon: 'auto_awesome',
    blurb: 'The crew that drafts, researches and automates alongside me.',
    items: [
      { name: 'Claude', logo: 'claude', note: 'Daily driver for building — long-context reasoning, code and custom skills.' },
      { name: 'ChatGPT', logo: 'chatgpt', note: 'Fast second opinion for research, drafting and quick specs.' },
      { name: 'Gemini', logo: 'gemini', note: 'Long documents and image understanding when the input outgrows plain text.' },
      { name: 'MCP', logo: 'mcp', note: 'Model Context Protocol — wires the model straight into real tools and data.' },
      { name: 'OCR', logo: 'ocr', note: 'Pulls structured data out of scans, invoices and photographed documents.' },
      { name: 'Prompt engineering', logo: 'prompt', note: 'Turns a vague request into a spec the model can repeat reliably.' },
    ],
  },
  {
    group: 'Languages',
    icon: 'code',
    blurb: 'What the logic is actually written in, front to back.',
    items: [
      { name: 'Python', logo: 'python', note: 'Automation, data work and the glue around AI services.' },
      { name: 'JavaScript', logo: 'javascript', note: 'The language every browser layer and Node service runs on.' },
      { name: 'PHP', logo: 'php', note: 'Backend workhorse behind Laravel services and long-lived systems.' },
      { name: 'Dart', logo: 'dart', note: 'Powers Flutter — one codebase for Android and iOS.' },
      { name: 'Swift', logo: 'swift', note: 'Native iOS when the platform deserves a closer fit.' },
    ],
  },
  {
    group: 'Frontend',
    icon: 'web',
    blurb: 'The surface people touch — structured, themed and responsive.',
    items: [
      { name: 'HTML', logo: 'html', note: 'Semantic structure first — accessible markup before any framework.' },
      { name: 'Tailwind', logo: 'tailwind', note: 'Utility-first CSS — consistent spacing and colour without stylesheet drift.' },
      { name: 'Material 3', logo: 'material3', note: 'Google’s system: colour tokens, shape scale and expressive motion.' },
      { name: 'Human Interface', logo: 'apple', note: 'Apple’s guidelines — native feel, gestures and restraint on iOS.' },
      { name: 'Flutter', logo: 'flutter', note: 'Cross-platform apps with one UI codebase down to the widget.' },
      { name: 'Vue JS', logo: 'vue', note: 'Reactive interfaces with a template syntax a whole team can read.' },
      { name: 'React JS', logo: 'react', note: 'Component architecture for larger, state-heavy product UIs.' },
      { name: 'Vite', logo: 'vite', note: 'Instant dev server and lean production builds.' },
    ],
  },
  {
    group: 'Backend',
    icon: 'dns',
    blurb: 'Where the rules live and the contracts are kept.',
    items: [
      { name: 'Laravel', logo: 'laravel', note: 'Full PHP framework — auth, queues and migrations out of the box.' },
      { name: 'Node JS', logo: 'node', note: 'JavaScript on the server for realtime work and service glue.' },
      { name: 'REST API', logo: 'restapi', note: 'Versioned contracts that keep clients and services decoupled.' },
      { name: 'Next JS', logo: 'nextjs', note: 'React with routing, SSR and API routes in one deployable.' },
    ],
  },
  {
    group: 'Infrastructure',
    icon: 'cloud',
    blurb: 'Getting it live, and keeping it alive after launch.',
    items: [
      { name: 'VPS deployment', logo: 'server', note: 'Provision, ship and maintain the box the product runs on.' },
      { name: 'Nginx', logo: 'nginx', note: 'Reverse proxy, TLS and static serving in front of the app.' },
      { name: 'Docker', logo: 'docker', note: 'Same environment on my machine and in production.' },
      { name: 'GitHub Actions', logo: 'actions', note: 'Tests and deploys that run themselves on every push.' },
    ],
  },
  {
    group: 'Database & storage',
    icon: 'database',
    blurb: 'The part that has to still be correct in three years.',
    items: [
      { name: 'MySQL', logo: 'mysql', note: 'Relational default — schemas, indexes and queries that stay fast.' },
      { name: 'MariaDB', logo: 'mariadb', note: 'Drop-in MySQL alternative for self-hosted deployments.' },
      { name: 'PostgreSQL', logo: 'postgres', note: 'Where the data model gets serious — JSONB, constraints, real types.' },
      { name: 'Firebase', logo: 'firebase', note: 'Realtime sync, auth and push for apps that ship fast.' },
      { name: 'AWS', logo: 'aws', note: 'Compute, storage and managed services when scale demands it.' },
      { name: 'Cloudflare R2', logo: 'cloudflare', note: 'Object storage with no egress fees for media-heavy apps.' },
      { name: 'Redis', logo: 'redis', note: 'Cache, queues and sessions — the pressure valve in front of the database.' },
    ],
  },
  {
    group: 'Design',
    icon: 'brush',
    blurb: 'Deciding how it looks and behaves before it is built.',
    items: [
      { name: 'Figma', logo: 'figma', note: 'Design system, components and handoff the build can actually follow.' },
      { name: 'Claude Design', logo: 'claude', note: 'AI-assisted layouts — idea to reviewable screens in minutes.' },
    ],
  },
  {
    group: 'Workbench',
    icon: 'handyman',
    blurb: 'Where the hours are spent and the history is kept.',
    items: [
      { name: 'Zed Editor', logo: 'zed', note: 'Fast, collaborative editor with AI in the loop.' },
      { name: 'GitHub', logo: 'github', note: 'Version control, reviews and CI as the spine of the project.' },
    ],
  },
];

/** Flat group names, for anything that just needs the headings. */
export const skills = skillsStacks.map((stack) => ({
  group: stack.group,
  items: stack.items.map((item) => item.name),
}));

export const experience = [
  {
    period: '2019 — 2021',
    role: 'Intern Fullstack Software Developer',
    org: 'UPT Teknologi Informasi dan Komunikasi UNS',
    body: 'Built experience across full-stack development in the technology and information services unit at UNS.',
    tags: ['Full-stack', 'UNS'],
  },
  {
    period: 'Mar — Apr 2022',
    role: 'Assistant Mentor · Junior Web Programmer',
    org: 'PT Tiga Serangkai Pustaka Mandiri',
    body: 'Supported certification and internship programmes while contributing to web programming work.',
    tags: ['Web programming', 'Mentoring'],
  },
  {
    period: '2022 — Present',
    role: 'Founder & Developer',
    org: 'Juara Silat · PT JSI Teknologi Utama',
    body: 'Created and developed a digital platform for pencak silat, including competition workflows and scoring experiences.',
    tags: ['Product', 'Laravel', 'Digital scoring'],
  },
  {
    period: '2023 — 2024',
    role: 'Freelance Backend Developer',
    org: 'PT Tebar Digital Kreasi',
    body: 'Built and supported backend services for digital products, with an emphasis on clear data and reliable delivery.',
    tags: ['Laravel', 'PHP', 'PostgreSQL'],
  },
  {
    period: '2024 — 2025',
    role: 'Mentor',
    org: 'LPK An-Nur Education Center',
    body: 'Guided learners through practical software development and helped them build confidence by shipping real work.',
    tags: ['Mentoring', 'Web development'],
  },
  {
    period: '2025 — Present',
    role: 'Head of the Data and Information Technical Implementation Unit',
    org: 'STAI Bina Muwahhidin Boyolali',
    site: 'staibinamuwahhidin.ac.id',
    href: 'https://staibinamuwahhidin.ac.id',
    body: 'Lead the campus data and information unit — academic systems, reporting, and the infrastructure the institution runs on.',
    tags: ['Leadership', 'Academic systems', 'Data'],
  },
];

/** Closes the Experience timeline: the node that is still open. */
export const experienceOutro = {
  label: 'Next chapter',
  title: 'Ready for new experience',
  body:
    'The timeline has room at the bottom. If you are building something that needs '
    + 'business clarity, engineering discipline, and AI leverage in one person, that '
    + 'next entry could be yours.',
  action: 'Start a conversation',
};

export const education = [
  { period: '2006 — 2012', school: 'SD N Saren 2', detail: 'Primary education' },
  { period: '2012 — 2015', school: 'SMP N 1 Gemolong', detail: 'Junior secondary education' },
  { period: '2015 — 2018', school: 'SMA N 1 Gemolong', detail: 'Senior secondary education' },
  { period: '2018 — 2022', school: 'Sebelas Maret University', detail: 'Computer Science Education' },
];

export const projectsIntro = {
  kicker: 'Selected work',
  title: 'Systems people run their day on.',
  lede:
    'Campus registrars, championship juries, cashiers on a Saturday rush, small business owners typing into WhatsApp. Every build below went into real hands and stayed there.',
  ticker: [
    'Point of sale',
    'Digital scoring',
    'WhatsApp bookkeeping',
    'Academic journal',
    'Campus registry',
    'Service desk',
    'Scholarship intake',
  ],
};

/* Newest first. One shelf, no tiers: an older build is only older, so nothing
 * here is filed away separately. The collaboration invite closes the grid. */
export const projects = [
  {
    name: 'Ventedaily POS',
    kind: 'Point of sale',
    year: '2025',
    role: 'Fullstack developer',
    status: 'In production',
    shape: 'clover',
    icon: 'point_of_sale',
    accent: 'primary',
    body:
      'A point of sale built for the way a fashion store actually sells: one product, a matrix of sizes and colours, and stock that has to stay honest across outlets. The cashier screen is keyboard-first for a queue, the back office is where margin, restock and shift cash get settled.',
    highlights: [
      'Size and colour variant matrix with per-outlet stock',
      'Cashier shift, cash drawer reconciliation and thermal receipts',
      'Daily sales, best-seller and dead-stock reporting',
    ],
    metrics: [
      { value: 'Multi', label: 'outlet stock' },
      { value: 'Offline', label: 'tolerant cashier' },
    ],
    tags: ['Laravel', 'Livewire', 'Filament', 'MySQL', 'Tailwind CSS'],
    link: null,
  },
  {
    name: 'Juara Silat',
    kind: 'Championship platform',
    year: '2022 — now',
    role: 'Founder and developer',
    status: 'Live',
    shape: 'burst',
    icon: 'sports_martial_arts',
    accent: 'tertiary',
    body:
      'The championship stack for pencak silat, from registration to the scoreboard the crowd watches. Contingents enter athletes online, the draw builds its own brackets, and jury tablets feed a scoring engine that settles a bout the moment the last judge presses. Carried an international championship without a paper scoresheet.',
    highlights: [
      'Digital jury scoring with live tabulation and instant verdicts',
      'Automatic draw, brackets and match scheduling per arena',
      'Public live scoreboard, medal tally and contingent standings',
    ],
    metrics: [
      { value: 'Intl.', label: 'championship run' },
      { value: 'Realtime', label: 'jury sync' },
    ],
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'WebSocket', 'MySQL'],
    link: { label: 'juarasilat.com', href: 'https://juarasilat.com' },
  },
  {
    name: 'Fino App',
    kind: 'Fintech',
    year: '2024',
    role: 'Backend and integration',
    status: 'Live',
    shape: 'cookie12',
    icon: 'chat',
    accent: 'secondary',
    body:
      'Bookkeeping with no app to open. Type "beli kopi 25rb" into WhatsApp and the parser turns it into a categorised entry, then answers back with the running balance. Built for owners who will never keep a spreadsheet but always answer a chat.',
    highlights: [
      'Natural-language message parsed into a categorised transaction',
      'WhatsApp Cloud API webhooks with idempotent message handling',
      'Daily, weekly and monthly recaps pushed back into the thread',
    ],
    metrics: [
      { value: '0', label: 'apps to install' },
      { value: 'Chat', label: 'first ledger' },
    ],
    tags: ['Laravel', 'WhatsApp API', 'Queue workers', 'PostgreSQL'],
    link: { label: 'finoapp.id', href: 'https://finoapp.id' },
  },
  {
    name: 'Journal STAI Bina Muwahhidin',
    kind: 'Academic publishing',
    year: '2024',
    role: 'Fullstack developer',
    status: 'Live',
    shape: 'arch',
    icon: 'menu_book',
    accent: 'primary',
    body:
      'The open journal system for the campus: authors submit, editors assign reviewers, and a blind review runs its rounds until an issue is ready to publish. Every article ships with citation metadata and a permanent URL, so the work is findable long after the issue closes.',
    highlights: [
      'Submission, blind peer review and editorial decision workflow',
      'Issue and volume publishing with citation-ready metadata',
      'Indexable article pages with PDF delivery and download counts',
    ],
    metrics: [
      { value: 'Peer', label: 'review rounds' },
      { value: 'Open', label: 'access issues' },
    ],
    tags: ['Laravel', 'Bootstrap', 'MySQL', 'SEO metadata'],
    link: { label: 'ejournal.staibinamuwahhidin.ac.id', href: 'https://ejournal.staibinamuwahhidin.ac.id' },
  },
  {
    name: 'Siakad STAI Bina Muwahhidin',
    kind: 'Campus system',
    year: '2023',
    role: 'Fullstack developer',
    status: 'In production',
    shape: 'flower',
    icon: 'school',
    accent: 'tertiary',
    body:
      'The academic information system the campus runs a semester on. Students file a KRS and read their KHS, lecturers grade their own classes, and the registrar closes the term knowing the numbers reported to PDDikti already match what the database says.',
    highlights: [
      'KRS, KHS and transcript flow across student, lecturer and registrar roles',
      'Class, schedule and lecturer allocation per semester',
      'Reporting shaped to PDDikti Feeder so a sync does not need repair',
    ],
    metrics: [
      { value: '3', label: 'role portals' },
      { value: 'PDDikti', label: 'ready reporting' },
    ],
    tags: ['Laravel', 'Livewire', 'MySQL', 'Bootstrap'],
    link: { label: 'siakad.staibinamuwahhidin.ac.id', href: 'https://siakad.staibinamuwahhidin.ac.id' },
  },
  {
    name: 'Service Management — Dharma Trikarya',
    kind: 'Service platform',
    year: '2023',
    role: 'Backend developer',
    status: 'Delivered',
    shape: 'gem',
    icon: 'engineering',
    accent: 'secondary',
    body:
      'The backend behind customer and service handling at PT Dharma Trikarya, built during the Tebar Digital engagement. A request comes in, gets an owner and a status, and stays traceable from first contact to the closing note — no ticket living only in someone\u2019s inbox.',
    highlights: [
      'Customer records tied to their full service history',
      'Work order lifecycle with assignment and status tracking',
      'Operational reporting for load and turnaround time',
    ],
    metrics: [
      { value: 'One', label: 'trail per request' },
      { value: 'Ops', label: 'ready reporting' },
    ],
    tags: ['Laravel', 'jQuery', 'Ajax', 'MySQL'],
    link: null,
  },
  {
    name: 'SIBEA — Sistem Informasi Beasiswa UNS',
    kind: 'Campus system',
    year: '2021',
    role: 'Fullstack developer',
    status: 'Delivered',
    shape: 'pentagon',
    icon: 'workspace_premium',
    accent: 'primary',
    body:
      'Scholarship management for Sebelas Maret University, moved off paper and into one online flow. Students apply and upload once, verifiers work a queue instead of a stack of folders, and the awarding decision lands with the record that justified it still attached.',
    highlights: [
      'Online intake with document upload and eligibility checks',
      'Verification queue across faculty and university reviewers',
      'Awarding, recipient records and per-scheme recap reporting',
    ],
    metrics: [
      { value: 'Campus', label: 'wide intake' },
      { value: 'Paperless', label: 'verification' },
    ],
    tags: ['Laravel', 'Bootstrap', 'jQuery', 'Ajax'],
    link: null,
  },
  {
    name: 'Your app here',
    kind: 'Open slot',
    year: 'Next',
    role: 'Let us build it',
    status: 'Open for work',
    shape: 'sunny',
    icon: 'add',
    accent: 'invite',
    invite: true,
    body:
      'A stubborn internal process, a product that needs a first version, or a system that has outgrown its spreadsheet. Bring the messy version — scoping it is part of the job.',
    highlights: [
      'Discovery and scoping before a line is written',
      'Shipped in slices, reviewable from the first week',
    ],
    metrics: [],
    tags: ['Laravel', 'Livewire', 'Filament', 'Flutter', 'AI integration'],
    link: null,
  },
];

/* ---------------- Business ---------------- */

export const businessIntro = {
  kicker: 'What I run',
  title: 'Two products with customers, not slide decks.',
  lede:
    'Both started as a problem somebody kept paying people to do by hand \u2014 scoring a championship on paper, or keeping a household ledger nobody ever opens. They ship, they bill, and they answer to real users every week.',
  ticker: ['BUILT', 'SHIPPED', 'RUNNING', 'IN PRODUCTION'],
};

export const businesses = [
  {
    id: 'juarasilat',
    name: 'Juara Silat',
    kind: 'Championship platform',
    tagline: 'Digital scoring for pencak silat.',
    since: '2022',
    accent: 'primary',
    shape: 'burst',
    icon: 'sports_martial_arts',
    logo: { light: juaraSilatLogoLight, dark: juaraSilatLogoDark, alt: 'Juara Silat' },
    body:
      'The championship stack Indonesian pencak silat actually runs on. A committee publishes an event, contingents register their athletes online, and categories, documents, payment, schedule and brackets settle in one workflow instead of a folder of spreadsheets.',
    body2:
      'On match day the arena tablets feed a scoring engine that reads out a verdict the moment the last judge presses \u2014 faster, transparent, and with a recap the committee can hand over before the mat is swept. No paper scoresheet, no recount.',
    highlights: [
      'Championship management: publication, contingent registration, categories, documents, payment',
      'Digital scoring for arena operators, with live tabulation and instant verdicts',
      'Automatic draw, brackets and per-arena scheduling',
    ],
    metrics: [
      { value: '60+', label: 'institutions trusting it' },
      { value: '3 yrs', label: 'running since 2022' },
      { value: 'Intl.', label: 'local to international events' },
    ],
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'WebSocket', 'MySQL'],
    link: { label: 'juarasilat.com', href: 'https://juarasilat.com' },
  },
  {
    id: 'fino',
    name: 'Fino App',
    kind: 'Personal finance',
    tagline: 'Free money tracking, inside WhatsApp.',
    since: '2024',
    accent: 'tertiary',
    shape: 'clover',
    icon: 'account_balance_wallet',
    logo: { light: finoLogoLight, dark: finoLogoDark, alt: 'Fino \u2014 Financial Note' },
    body:
      'Fino turns the chat a family is already having into a clean set of books. Send a sentence, a photo of a receipt, or a PDF, and Fino reads the amount, merchant, date and line items back out into the right wallet and category.',
    body2:
      'Budgets signal before the limit rather than after it, a shared ledger keeps the household working from the same numbers, and the dashboard reads daily patterns back in plain language. Nobody has to install a new app to start \u2014 the habit stays where it already lives.',
    highlights: [
      'Record from WhatsApp in text, photo or PDF \u2014 no new app to download',
      'Receipts parsed automatically: amount, merchant, date and items',
      'Shared family ledger, budget alerts, and a dashboard of wallets and categories',
    ],
    metrics: [
      { value: 'Free', label: 'to start, no card' },
      { value: 'Rp25k', label: 'personal, per month' },
      { value: 'Rp35k', label: 'family, per month' },
    ],
    tags: ['WhatsApp API', 'OCR', 'Laravel', 'AI parsing', 'PostgreSQL'],
    link: { label: 'finoapp.id', href: 'https://finoapp.id' },
  },
];

export const contacts = [
  { label: 'Email', value: 'ahnafsite@gmail.com', icon: 'mail', logo: 'email', href: 'mailto:ahnafsite@gmail.com' },
  { label: 'Threads', value: 'www.threads.com/@ahnaf.faize', icon: 'alternate_email', logo: 'threads', href: 'https://www.threads.com/@ahnaf.faize' },
  { label: 'Instagram', value: 'www.instagram.com/ahnaf.faize/', icon: 'photo_camera', logo: 'instagram', href: 'https://www.instagram.com/ahnaf.faize/' },
  { label: 'GitHub', value: 'github.com/ahnaffaiz', icon: 'code', logo: 'github', href: 'https://github.com/ahnaffaiz' },
  { label: 'WhatsApp', value: '62 8587 7159 577', icon: 'chat', logo: 'whatsapp', href: 'https://wa.me/6285877159577' },
];

/**
 * The track the shell plays. The file lives in `public/audio/` so it is served
 * as-is and plays entirely offline — no network, no embed, no third party.
 *
 * `src` is optional: set it to `null` and `shell/audio.js` falls back to the
 * pentatonic pad it generates in the browser.
 */
export const music = {
  src: '/audio/al-kahf.mp3',
  cover: quranCover,
  title: 'Surah Al-Kahf',
  artist: 'Mishary Rashid Alafasy',
  album: 'The Cave · 110 verses',
};

/** Recap of what I build with. Marks are drawn in `shell/logos.js`. */
export const tools = [
  { name: 'Claude Code', logo: 'claude' },
  { name: 'Codex', logo: 'chatgpt' },
  { name: 'Python', logo: 'python' },
  { name: 'Vue JS', logo: 'vue' },
  { name: 'React JS', logo: 'react' },
  { name: 'Node JS', logo: 'node' },
  { name: 'Laravel', logo: 'laravel' },
  { name: 'Flutter', logo: 'flutter' },
  { name: 'Swift', logo: 'swift' },
];

/** What the Stats tab measures — me, not the machine. (`stats` above is the
 * headline figures the About window shows; these are the dials and cards.) */
export const statistics = {
  meters: [
    { label: 'Business Owner', value: 78, icon: 'storefront' },
    { label: 'Software Developer', value: 94, icon: 'code' },
    { label: 'AI Enthusiast', value: 88, icon: 'neurology' },
  ],
  facts: [
    { value: '2', label: 'Running businesses', icon: 'storefront' },
    { value: '100+', label: 'Successful projects', icon: 'task_alt' },
    { value: '2', label: 'Languages', detail: 'Indonesian · English', icon: 'translate' },
  ],
};

/** How the work actually goes, start to finish. */
export const workflow = {
  title: 'How I work',
  steps: [
    {
      name: 'Business analytics',
      detail: 'Understand the business before a line of code exists.',
      icon: 'insights',
    },
    { name: 'System planning', detail: 'Scope, milestones, and what not to build.', icon: 'route' },
    {
      name: 'Feature solution',
      detail: 'Turn each requirement into something buildable.',
      icon: 'extension',
    },
    {
      name: 'System designing',
      detail: 'Data model, architecture, and the interface around it.',
      icon: 'architecture',
    },
    { name: 'Start coding', detail: 'Build it, then keep it healthy.', icon: 'code' },
    {
      name: 'Deploy',
      detail: 'Ship it, watch it, and fix what the users actually hit.',
      icon: 'rocket_launch',
    },
  ],
};

/** Shown until the live forecast answers, and whenever it does not. */
export const weatherFallback = { temperature: 28, label: 'Clear', code: 0, place: 'Indonesia' };

/** Wallpapers ship with the app. The seed is a fallback only — at runtime the
 * palette is quantized out of the image itself, the way caelestia derives its
 * scheme from the current wallpaper. */
export const wallpapers = [
  // First in the list is the shell's default on a first launch. `tag` is the
  // flavour line the game-select wallpaper menu shows under each name.
  { id: 'spidey', name: 'Spidey', tag: 'Friendly Neighbour', src: wallpaper0, seed: '#5b9bd5', dark: false },
  { id: 'village', name: 'Village', tag: 'Pixel Realm', src: wallpaper1, seed: '#4a7fbf', dark: false },
  { id: 'samurai', name: 'Samurai', tag: 'Bushidō', src: wallpaper2, seed: '#b93a2f', dark: false },
  { id: 'fuji', name: 'Fuji', tag: 'Autumn Lake', src: wallpaper3, seed: '#c2456b', dark: true },
  { id: 'dawn', name: 'Dawn', tag: 'Twilight Ridge', src: wallpaper5, seed: '#8b7fd0', dark: false },
  { id: 'alpine', name: 'Alpine', tag: 'Mirror Lake', src: wallpaper6, seed: '#2f8fd0', dark: false },
  { id: 'naruto', name: 'Naruto', tag: 'Shinobi', src: wallpaper7, seed: '#e8912e', dark: false },
  { id: 'revuelto', name: 'Revuelto', tag: 'Hypercar', src: wallpaper8, seed: '#a4d000', dark: true },
  { id: 'summit', name: 'Summit', tag: 'Highland Vista', src: wallpaper9, seed: '#3f7d8c', dark: true },
];
