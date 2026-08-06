# CLAUDE.md — Littleman Labs ("The Atelier" build)

This file governs how this project is built and edited. Base standards are inherited from the
shared Littleman Labs design-standards doc (hard bans on purple/gradients/meaningless
stats/glassmorphism/"Why Choose Us" sections still apply here in full). This file adds the
brand-specific decisions for THIS site — the agency's own, currently deployed to
littlemanlabs.com.

## What this is

Littleman Labs' own site — not a client build. Four pages (index, services, about, contact),
static HTML/CSS/JS, no build step, no framework. Bilingual ES/EN, **Spanish primary** (default
on first visit, unconditionally — not browser-detected — per the user 2026-08-06). English is
available via the header `.lang-toggle`, persisted to `localStorage`.

## Design concept: "The Atelier"

A gallery/exhibition system — the crawling-baby mascot as museum bronze, services framed as an
exhibition case. Structural devices (`No. 001`, `Fig. 02`, placards, specimen-tag frames) are
real wayfinding, not decoration — every section genuinely is an numbered item in a sequence.

## Typography — verified 2026-08-06, consistent across all 4 pages

Three fonts, loaded identically via the same Google Fonts `<link>` on every page:

```
Libre Caslon Display | IBM Plex Mono:wght@400;500 | Inter Tight:wght@400;500;600
```

Roles (`css/style.css` `:root`):

- `--font-display: "Libre Caslon Display", "Iowan Old Style", "Times New Roman", serif` —
  headlines, hero title, section H2/H3, pricing card titles. Never used for body copy or UI
  chrome.
- `--font-body: "Inter Tight", -apple-system, BlinkMacSystemFont, sans-serif` — paragraph copy,
  nav links, buttons, form labels.
- `--font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace` — placards
  (`No. 001`), figure captions (`Fig. 02`), the clock, footer labels, lang-toggle, ticket-style
  numbering. This is the "data/label" voice — never used for prose.

Type scale (fluid, `clamp()`-based, defined once in `:root`, reused everywhere — do not
hardcode a one-off `font-size` for a heading):

- `--fs-h1: clamp(2.6rem, 1.7rem + 4.2vw, 6rem)`
- `--fs-h2: clamp(2.6rem, 1.6rem + 4.6vw, 6rem)`
- `--fs-h3: clamp(1.7rem, 1.35rem + 1.6vw, 2.6rem)`
- `--fs-lead: clamp(1.05rem, 1rem + 0.3vw, 1.2rem)`

**Rule confirmed clean on audit (2026-08-06):** no inline `style="font-family:…"` overrides
exist anywhere in the 4 HTML files — every font reference goes through the three CSS variables
above. Keep it that way; a one-off inline font-family is the first sign of drift.

**Heading hierarchy:** exactly one `<h1>` per page (the hero/page-hero title). `<h2>` is used
for section titles AND the 3-step "How We Work" row items on the homepage (promoted from `<h3>`
to `<h2>` on 2026-08-06 specifically to fix a heading-hierarchy SEO violation — there was no H2
before those items on the page, which is a real skip, not a style choice. If you add a new
section, check what heading level precedes it on that page before choosing H2 vs H3).

## Color

```
--graphite:      #1c1a17   (canvas)
--graphite-deep: #121110   (deepest panels, e.g. mobile nav)
--bone:          #f1ede4   (primary text)
--bone-dim:      rgba(241,237,228,0.62)   (secondary text)
--bone-faint:    rgba(241,237,228,0.34)   (tertiary/labels)
--bronze:        #b8874a
--bronze-bright: #d8a869   (the one accent — CTAs, active states, hover, lang-toggle active)
--patina:        #5c8a75   (form-success only — do not use elsewhere)
```

One accent (`--bronze-bright`), used sparingly — CTA buttons, hover states, the active
lang-toggle pill, placard bullet, row-item hover. Never a second competing color. `--patina`
(green) exists solely for form success state and should not spread into general UI.

## i18n system

`js/i18n-dict.js` (data) + `js/i18n.js` (engine) — loaded on every page, in that order, before
`main.js`. Every translatable string is `data-i18n="key"` on the element; the dictionary has
matching `es`/`en` objects with **identical key sets** (verify with `node -e` diffing
`Object.keys()` after any dictionary edit — a mismatch means a silent no-op on one language).
The Spanish text baked into the raw HTML is the canonical source string for `es` — if you edit
copy, edit both the HTML and the `es` dictionary entry to match, or a language-toggle-back will
revert to stale text.

`main.js`'s `initContactForm()` reads the current language from
`document.documentElement.lang` **at submit time** (not cached at page load) for the
success/error message — don't cache i18n strings in a JS variable at init if the user might
toggle language after the page renders.

## Motion

- Preload count-up animation: gated to once per browser session via
  `sessionStorage.getItem("llPreloaderSeen")` (added 2026-08-06) — it must never replay on
  every internal navigation, only the first page of a session.
- `data-reveal` + GSAP ScrollTrigger batch fade-up, IntersectionObserver fallback.
- Ambient background: `js/scroll-thread.js` draws slow bronze contour wave-lines on
  `#bg-canvas` (canvas2d), clock persisted across page navigations via `sessionStorage` so it
  reads as one continuous background, not a per-page restart. `js/shader-background.js` is a
  WebGL alternative (ported from a React/21st.dev shader component to vanilla JS since this
  project has no framework) — **not wired into any page as of 2026-08-06**, sitting as a trial
  the user asked to preview before deciding whether it replaces scroll-thread.js. Only one of
  the two should ever be active on `#bg-canvas` at a time (a canvas can't hold both a 2d and a
  webgl context).
- Services slider (`services.html`): native CSS scroll-snap, not GSAP ScrollTrigger pin/scrub —
  deliberately replaced a pinned-carousel version on 2026-08-06 that collided with page content
  on short viewports. Don't reintroduce a scroll-pinned carousel for card sequences.

## Contact numbers — do not merge into one

- WhatsApp: `+1 939-233-5269`
- Direct `tel:` links / "Call" labels: `+1 787-901-9020` (avoids a forwarding fee on the 939
  number — confirmed by the user 2026-08-06). These are intentionally different numbers for
  different channels.

## Deployment

Live at littlemanlabs.com via Vercel (auto-deploys from the `main` branch of
`littlemanstudio/littleman-labs-website` on GitHub — zero-config static site, no
`vercel.json`). This `littleman-atelier/` directory is the **source** project; deploying means
copying its `index.html` / `services.html` / `about.html` / `contact.html` / `css/` / `js/` /
`assets/img/` / `assets/3d/` into that repo (top-level `css/`/`js/` paths, no collision with the
repo's legacy `assets/css/`/`assets/js/` used by `privacy.html`/`terms.html`/`blog.html`, which
are intentionally left on the old design — not part of this rebuild's scope), then commit and
push to `main`.
