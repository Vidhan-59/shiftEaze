import { fileURLToPath } from "url";
import path from "path";
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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