import type { MetadataRoute } from "next";
import { SITE, toEn } from "@/lib/site";
import { PATH, LASTMOD, type PageKey } from "@/lib/seo";
import { GUIDES, GUIDES_LASTMOD } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePaths = ["/reddit", ...GUIDES.map((g) => `/reddit/${g.slug}`)];
  const guides = guidePaths.flatMap((p) => {
    const base = {
      lastModified: GUIDES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: { es: `${SITE.url}${p}`, en: `${SITE.url}${toEn(p)}` } },
    };
    return [{ url: `${SITE.url}${p}`, ...base }, { url: `${SITE.url}${toEn(p)}`, ...base }];
  });
  const pages = (Object.keys(PATH) as PageKey[]).flatMap((key) => {
    const p = PATH[key];
    const es = `${SITE.url}${p === "/" ? "" : p}`;
    const en = `${SITE.url}${toEn(p)}`;
    const base = {
      lastModified: LASTMOD[key],
      changeFrequency: p === "/" ? ("monthly" as const) : ("yearly" as const),
      priority: p === "/" ? 1 : 0.7,
      alternates: { languages: { es, en } },
    };
    return [{ url: es, ...base }, { url: en, ...base }];
  });
  return [...pages, ...guides];
}
