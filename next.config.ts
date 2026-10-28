import type { NextConfig } from "next";

/* Enforced Content-Security-Policy. Next inlines small bootstrap scripts and the JSON-LD blocks, so script-src keeps
   'unsafe-inline' (a nonce would make every page dynamic and break the static CDN caching); 'wasm-unsafe-eval' is for the
   statue's Meshopt decoder. Everything else is locked down to this site plus what the consent-gated Meta Pixel and the
   FormSubmit contact form genuinely call. */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com https://*.facebook.com",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' blob: data: https://formsubmit.co https://www.facebook.com https://*.facebook.com https://connect.facebook.net",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: { globalNotFound: true },
  /* The live site's /blog was a "coming soon" placeholder (old CRM offer, English text, dead widget).
     It is not carried over: send anyone (and Google) to the homepage with a permanent redirect. */
  /* The statue's model and photo never change between deploys of the same version: let browsers and the CDN keep them for a week,
     and refresh quietly in the background afterwards, so repeat visits show the statue instantly. */
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/og/:path*", headers: cache },
      { source: "/video/:path*", headers: cache },
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
