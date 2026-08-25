import type { NextConfig } from "next";

// Governed by NPP Master Design Specification v3.0, Section 23 (Responsive Website Specification)
// and Section 20 (Image & Diagram Handling Rules) — images are never resized in a way that distorts them.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Next.js's dev-mode floating route/build indicator (fixed, bottom-left)
  // was getting captured into PDF exports from /print/portfolio — it's
  // dev-tooling chrome, not page content, and has no effect on production
  // builds or the live site's appearance either way.
  devIndicators: false,
};

export default nextConfig;
