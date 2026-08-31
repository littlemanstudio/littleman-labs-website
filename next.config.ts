import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /blog is a legacy static page (old pre-Atelier design, out of scope for
     this rebuild), preserved as-is so the indexed URL doesn't 404. */
  async rewrites() {
    return [{ source: "/blog", destination: "/blog.html" }];
  },
};

export default nextConfig;
