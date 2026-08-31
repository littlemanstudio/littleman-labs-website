# CLAUDE.md, Littleman Labs (Next.js rebuild)

This file governs how this project is built and edited. Base standards are inherited from the
shared Littleman Labs design-standards doc (hard bans on purple/gradients/meaningless
stats/glassmorphism/"Why Choose Us" sections still apply here in full).

## What this is

Littleman Labs' own site, deployed to littlemanlabs.com. **As of 2026-08-31 this is a Next.js
16 App Router project**, replacing the previous static HTML/CSS/JS build. Four real pages
(`/`, `/services`, `/about`, `/contact`) plus `/terms` and `/privacy`, all client components.
Bilingual ES/EN via `lib/i18n.ts` + `components/LangProvider.tsx` (Spanish primary, no
browser-detection). `/blog` is a legacy static page from the pre-Atelier design, kept as-is via
`public/blog.html` + a rewrite in `next.config.ts` (`/blog` → `/blog.html`), out of scope for
any rebuild work.

**Canonical source note:** the actual development source for this project now lives in
`littleman-nextjs-preview/` (a sibling directory). This `littleman-v2/` repo is the git clone
tracking `littlemanstudio/littleman-labs-website` on GitHub (what Vercel deploys from) — treat
it as deploy plumbing. Make changes in `littleman-nextjs-preview/` first, verify with
`npm run dev`, then copy the changed `app/`/`components/`/`lib/`/`public/` files here, commit,
and push.

## Banned copy, never reintroduce

The "Littleman isn't different / isn't special, he's just the one who does it / keeps
crawling / endless search for more" mascot-mythology copy is **permanently banned**, in ES or
EN, anywhere on this site or in any other site/design for this user, headlines, body copy,
meta descriptions, alt text, everything.

## Design system

- **Fonts**: Outfit (display/headlines, weight 700 base, 800 for hero/CTA), Plus Jakarta Sans
  (body), IBM Plex Mono (labels/mono UI), loaded via `next/font/google` in `app/layout.tsx`.
  Never Inter/Inter Tight/Roboto/Open Sans, those read as default AI-site-builder faces.
- **Color** (`app/globals.css` `:root`): `--graphite:#1c1a17`, `--graphite-deep:#121110`,
  `--bone:#f1ede4`, `--bone-dim:rgba(241,237,228,0.85)`, `--bone-faint:rgba(241,237,228,0.58)`,
  `--line:rgba(241,237,228,0.14)`, `--line-strong:rgba(241,237,228,0.28)`, `--bronze:#b8874a`,
  `--bronze-bright:#d8a869` (the one accent), `--patina:#5c8a75` (form-success only). Note
  `--bone-dim`/`--bone-faint` were deliberately raised above the original site's 0.62/0.34
  values (2026-08-31) after repeated legibility complaints against the ambient photo
  background; don't lower them back without checking that background contrast still holds.
- **No colored-word headline emphasis.** `.accent` and any `<em>` inside a heading render
  plain (`color: inherit`), this was explicitly removed as an "AI-template tic." Don't
  reintroduce bronze-colored emphasis words in headlines.
- **Base CSS must live inside `@layer base` in `globals.css`.** Unlayered plain CSS beats
  Tailwind's layered utilities regardless of specificity/class order, silently overriding
  things like `font-extrabold` on a specific heading. This was a real, shipped bug, keep base
  rules layered.
- **`PhotoFrame` component** (`components/PhotoFrame.tsx`): the site's one recurring visual
  signature, hairline border + two bronze corner ticks. Use it for every photo, never a plain
  rounded/bordered `<img>`.

## Ambient background & room transitions

- `components/AmbientBackground.tsx`: fixed full-page layer behind all content (not scoped to
  hero sections), one photo per "zone" (`entry`/`workshop`/`studio`/`comms`, mapped to
  `/`/`/services`/`/about`/`/contact`), 88% opacity, pointer-parallax + idle drift, a centered
  radial vignette (`58% 52% at 50% 46%`) for legibility. Do not add a flat full-screen dark wash
  on top of this, it was tried and reverted (2026-08-31), the fix for illegible text is raising
  `--bone-dim`/`--bone-faint` or giving a specific element (like a form) its own solid
  background, not dulling the whole image.
- `components/RoomTransition.tsx`: client-side port of the room-to-room video transition. On
  navigation it plays the correct clip(s) from `public/video/` (same 8 files as the old site,
  `RING`/`clipSequence()` logic in `lib/rooms.ts`), while the destination route mounts behind
  the cover. The current zone is tracked in React state and updated the instant navigation
  starts, so `AmbientBackground` already shows the right room before the cover lifts.
- Internal links must use `components/NavLink.tsx` (which calls `useRoomNavigate()`), not
  Next's `<Link>` or a plain `<a>`, or the transition won't fire.

## Contact numbers, do not merge into one

- WhatsApp: `+1 939-233-5269`
- Direct `tel:` links / "Call" labels: `+1 787-901-9020` (avoids a forwarding fee on the 939
  number). These are intentionally different numbers for different channels.

## SEO / tracking

Meta Pixel (`1085932210756511`), JSON-LD `ProfessionalService` schema, and per-page
`FAQPage` schema (contact) all live in `app/layout.tsx` / `app/contact/layout.tsx`. Per-page
`<title>`/description/canonical live in each route's `layout.tsx` (a client `page.tsx` can't
export `metadata` directly, that's why every route has a thin server `layout.tsx` wrapper).
`app/sitemap.ts` and `app/robots.ts` are the Next.js file-convention equivalents of the old
static `sitemap.xml`/`robots.txt`, edit those, not raw XML/txt files.

## Deployment

Live at littlemanlabs.com via Vercel, auto-deploys from the `main` branch of
`littlemanstudio/littleman-labs-website` on GitHub. Zero-config Next.js detection, no
`vercel.json` needed (the old one was for static-site `cleanUrls`, removed). To ship a change:
edit in `littleman-nextjs-preview/`, verify with `npm run dev` and a `npm run build`, copy the
changed files into this repo, commit, push. Pushing to a non-`main` branch gives a Vercel
Preview Deployment (a real testable URL) without touching the live domain; merge to `main` when
ready to go live.
