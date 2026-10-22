import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteMap } from "@/content/siteMap";

// Regenerated from the site map data file (brief §5.5) — lists the 9 public
// pages. Section anchors aren't separate sitemap entries.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;

  return siteMap.map((p) => ({
    url: `${base}${p.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p.href === "/" ? 1 : 0.8,
  }));
}
