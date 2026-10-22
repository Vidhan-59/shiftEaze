// Permanent redirects from routes that moved or disappeared (brief §5.3).
// Plain JS (not .ts) so next.config.mjs can import it directly.
//
// The old live menu's "How the AI works", "Dashboards", "AI Calling",
// "Results" and "Platform" labels were never real Next.js routes in this
// project — they were same-page #hash anchors on "/", so no redirect
// applies to them (the brief's own table is conditional: "if these routes
// exist"). The three that WERE real routes and are now gone are /voice-ai
// (an earlier pass renamed the AI-calling page to live under /platform),
// /about and /contact (both folded into /company's two sections).
export const REDIRECTS = [
  {
    source: "/voice-ai",
    destination: "/platform#ai-voice-calling-workforce-management",
    permanent: true,
  },
  {
    source: "/about",
    destination: "/company#about-shiftease",
    permanent: true,
  },
  {
    source: "/contact",
    destination: "/company#contact",
    permanent: true,
  },
];
