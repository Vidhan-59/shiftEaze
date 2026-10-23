import { fileURLToPath } from "url";
import path from "path";
import { REDIRECTS } from "./src/content/redirects.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return REDIRECTS;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 95 is used for the sharp dashboard screenshots on the Platform page.
    qualities: [75, 95],
    // Dashboard screenshots live locally in /public/assets/reference.
    // Add remote hosts here if you later serve them from a CDN.
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Pin the project root explicitly so Turbopack doesn't get confused by a
  // stray lockfile in a parent folder (e.g. C:\Users\<you>\package-lock.json).
  turbopack: {
    root: __dirname,
  },
};
 
export default nextConfig;