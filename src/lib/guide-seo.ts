import type { Metadata } from "next";
import { GUIDES, UI, getGuide } from "./guides";
import { SITE, localize, toEn, type LangCode } from "./site";

/* Same shape as pageMeta() in seo.ts: full openGraph per page, hreflang pair, canonical to itself. */
function build(path: string, lang: LangCode, title: string, description: string): Metadata {
  const self = localize(lang, path);
  const img = `/og/${lang === "en" ? "en-" : ""}home.jpg`;
  return {
    title,
    description,
    alternates: { canonical: self, languages: { es: path, en: toEn(path), "x-default": path } },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      locale: lang === "en" ? "en_US" : "es_PR",
      alternateLocale: lang === "en" ? "es_PR" : "en_US",
      title,
      description,
      url: self,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export const guideHubMeta = (lang: LangCode): Metadata => build("/reddit", lang, UI[lang].hubTitleMeta, UI[lang].hubDescription);

export function guideMeta(slug: string, lang: LangCode): Metadata {
  const g = getGuide(slug);
  return g ? build(`/reddit/${slug}`, lang, g[lang].title, g[lang].description) : {};
}

export const guideSlugs = () => GUIDES.map((g) => ({ slug: g.slug }));
