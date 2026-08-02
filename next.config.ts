import type { NextConfig } from "next";

// Governed by NPP Master Design Specification v3.0, Section 23 (Responsive Website Specification)
// and Section 20 (Image & Diagram Handling Rules) — images are never resized in a way that distorts them.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
