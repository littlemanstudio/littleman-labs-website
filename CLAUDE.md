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

**Canonical source note (2026-08-07):** the user has stated `littleman-atelier/` is the
Littleman website project going forward. This `littleman-v2/` repo exists only because it's the
actual git clone tracking `littlemanstudio/littleman-labs-website` on GitHub (what Vercel
deploys from) — treat it as deploy plumbing, not the place to originate new design/copy work.

## Banned copy — never reintroduce

The "Littleman isn't different / isn't special — he's just the one who does it / keeps
crawling / endless search for more" mascot-mythology copy is **permanently banned**, in ES or
EN, anywhere on this site or in any other site/design for this user — headlines, body copy,
meta descriptions, alt text, everything. Removed 2026-08-07 from `index.html` (`home.why.*`),
`about.html` (`about.h1`/`about.story`), `js/i18n-dict.js` (both language blocks), that same
`about.html`'s meta/OG/Twitter descriptions (which referenced "Por qué el nombre Littleman"
without repeating the lines verbatim — that still counted), and the dead legacy `about.*` keys
in `assets/js/i18n.js` (unused by any live page but deleted anyway per the user's "not one line
anywhere in the whole project" instruction). Replaced with concrete "one system, not three
vendors" positioning (see `svcpage.piece.body` in `services.html` as the model). If writing new
About/brand-story copy for this user, lead with the mechanism (what's built, how fast, what it
replaces) — never a mascot/metaphor angle.

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
- Ambient background: one continuous building, a different room per page — AI-rendered stills
  (`assets/img/lab/{entry,workshop,studio,comms}.jpg`, generated to match the site's own
  graphite/bone/bronze palette, no neon) painted onto `.bg-scene` via a per-zone CSS rule keyed
  on `body[data-lab-zone]` — `index`="entry" (reception/lobby, the bronze piece on its plinth),
  `services`="workshop" (the lab — server racks + workbench), `about`="studio" (founder's desk,
  lamp, pinboard), `contact`="comms" (a more futuristic reception console + wall clock).
  `js/lab-background.js` is deliberately small: it only adds pointer-parallax + slow idle drift
  on `.bg-scene` (translate3d, plain rAF loop, no WebGL) for a 3D-ish depth cue;
  `prefers-reduced-motion` skips it entirely (static frame). The room-to-room feel on navigation
  comes from the native cross-document View Transition declared in `css/style.css`
  (`@view-transition { navigation: auto; }` + `::view-transition-old/new(root)` keyframes) —
  Chromium supports this today, other browsers just ignore the at-rule and hard-cut, so it's
  progressive enhancement, not a dependency. `.bg-field::after`'s radial-gradient vignette keeps
  the text column legible while the room reads at the framing edges — adjust that gradient (not
  `.bg-scene` opacity alone) if legibility regresses after swapping an image. To regenerate a
  room image, keep the prompt anchored to "graphite/bone/bronze, no neon/purple/blue" or it will
  drift off-brand. `js/scroll-thread.js` (bronze contour wave-lines, canvas2d) and
  `js/shader-background.js` (WebGL "silk" shader) are earlier ambient systems this replaced —
  kept in the repo as reference, not wired into any page. `js/three-hero.js` is unrelated and
  still active — it's the separate small Three.js scene inside `.hero-canvas-wrap` on the
  homepage only (the bronze mascot sculpture on its plinth), not part of the full-page ambient
  background.
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
