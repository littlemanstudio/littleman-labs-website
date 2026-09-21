import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  /* The live site's /blog was a "coming soon" placeholder (old CRM offer, English text, dead widget).
     It is not carried over: send anyone (and Google) to the homepage with a permanent redirect. */
  /* The statue's model and photo never change between deploys of the same version: let browsers and the CDN keep them for a week,
     and refresh quietly in the background afterwards, so repeat visits show the statue instantly. */
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];
    return [
      { source: "/models/:path*", headers: cache },
      { source: "/brand/:path*", headers: cache },
      { source: "/work/:path*", headers: cache },
    ];
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
