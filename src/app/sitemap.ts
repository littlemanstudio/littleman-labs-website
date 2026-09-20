import type { MetadataRoute } from "next";
import { SITE, toEn } from "@/lib/site";
import { PATH, LASTMOD, type PageKey } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PATH) as PageKey[]).flatMap((key) => {
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
}
