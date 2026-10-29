/**
 * Site-wide placeholders/constants called for by the restructure brief
 * (section 6). Kept in one file so nothing is retyped or guessed elsewhere.
 */

/** Label on every "Request a Demo" button, including the header button. */
export const DEMO_CTA_LABEL = "Request a Demo";

/**
 * Gates /solutions/managed-rostering-services everywhere: nav, footer,
 * dropdowns, Solutions landing cards, Home's Solutions teaser, sitemap.xml,
 * and the route's own indexability. Flip to `true` to publish it (see
 * src/app/solutions/managed-rostering-services/page.tsx for the detail).
 */
export const MANAGED_ROSTERING_PUBLISHED = false;

/**
 * True only on a real production deploy (Vercel's `production` env, or
 * `NODE_ENV=production` off Vercel). Gates Managed Rostering Services: the
 * brief allows rendering the hidden section in local dev and preview
 * deployments for review, but never in production, while the flag is off.
 */
export const isTrueProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

/**
 * The Shift Planner's Checklist file. Not yet in the project (checked
 * `public/` — no guide/checklist asset exists). Left empty: the
 * [Download the Guide →] button hides itself wherever it's used, and the
 * guide's title text still appears. No form is built for it. Once the file
 * is added under /public, set this to its path and the button reappears.
 */
export const GUIDE_URL = "";

/**
 * Reused from the project's real configuration (src/lib/mailer.ts /
 * .env.local: SMTP_USER / DEMO_MAIL_TO), not retyped or invented. This is
 * the live inbox the existing demo form already delivers to.
 */
export const CONTACT_EMAIL = "info@shifteaze.io";

/** Company phone number, as supplied by the team (India, +91). */
export const CONTACT_PHONE: string | null = "+91 94260 05911";

/** Company location, as supplied by the team. */
export const CONTACT_LOCATION: string | null = "Gujarat, India";
