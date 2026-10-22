import { DEMO_CTA_LABEL } from "./config";

export const site = {
  name: "ShiftEaze",
  module: "ShiftEaze AI Voice Calling",
  tagline: "Shift-based manpower management, for any industry that runs in shifts",
  domain: "shifteaze.com",
  description:
    "ShiftEaze auto-builds rosters, predicts no-shows before they cost you a shift, and turns workforce data into decisions. Then it places the calls automatically with ShiftEaze AI Voice Calling. Built for any manpower operation that runs in shifts.",
  liveAt: "Deployed across major Indian port & terminal operations",
  /** Customer-facing app login. */
  loginUrl: "https://shifteaze.riddhicorporate.net/web/login",
} as const;

/**
 * Top-level header menu (brief §4). `dropdownOf` names the siteMap page key
 * whose `sections` populate that item's dropdown, as `href#id`.
 */
export const nav = [
  { label: "Platform", href: "/platform", dropdownOf: "platform" },
  { label: "Solutions", href: "/solutions", dropdownOf: "solutions" },
  { label: "Industries", href: "/industries", dropdownOf: "industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company", dropdownOf: "company" },
] as const;

export const cta = {
  primary: { label: DEMO_CTA_LABEL, href: "/request-demo" },
} as const;

/**
 * Footer link groups (brief §4 "Footer"): page/section names as labels
 * only. Three columns, matching the project's existing 3-column footer
 * layout.
 */
export const footerNav = [
  {
    title: "Platform",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Security", href: "/platform#security" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/resources" },
      { label: "About ShiftEaze", href: "/company#about-shiftease" },
      { label: "Contact", href: "/company#contact" },
    ],
  },
] as const;
