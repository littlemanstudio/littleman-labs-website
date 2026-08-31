import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.littlemanlabs.com";
  return [
    { url: `${base}/`, lastModified: "2026-08-08", changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services`, lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.3 },
  ];
}
