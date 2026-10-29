import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // AVIF first (smallest), WebP fallback. The source avatars are 1024px PNGs.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  // Tree-shake barrel-style imports from these packages.
  experimental: {
    optimizePackageImports: ["framer-motion", "radix-ui"],
  },
};

export default nextConfig;
