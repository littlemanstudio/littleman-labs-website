@AGENTS.md

# Littleman Labs website

Deployed to littlemanlabs.com from this repo (littlemanstudio/littleman-labs-website) via Vercel.

Since 2026-09-20 this is the "glass" build: Next.js 16 App Router, plain CSS in `src/app/globals.css`,
GSAP + ScrollTrigger + Lenis, and a Three.js crystal statue (`src/components/BabyGlass.tsx`).

- Spanish at `/`, English at `/en/*` (route groups `(es)` and `(en)`, each with its own root layout).
- All copy lives in `src/lib/i18n.ts` (Spanish uses "usted"). SEO in `src/lib/seo.ts`, contact details in `src/lib/site.ts`.
- `SITE.gbp` in `src/lib/site.ts` is empty until the Google Business Profile link exists.
- Update `LASTMOD` in `src/lib/seo.ts` by hand when page content changes.
- The old `/blog` placeholder redirects to `/` (see `next.config.ts`).
- Working copy for design iteration was `littleman-glass/`; this repo is now the source of truth.
