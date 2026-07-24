export const site = {
  name: "ShiftEaze",
  module: "ShiftEaze Voice",
  tagline: "Shift-based workforce management for port & terminal operations",
  domain: "shifteaze.com",
  description:
    "ShiftEaze auto-builds rosters across every terminal, predicts no-shows before they cost you a berth, and turns workforce data into decisions — then places the calls automatically with ShiftEaze Voice.",
  liveAt: "Deployed across major Indian port & terminal operations",
} as const;

export const nav = [
  { label: "Platform", href: "#platform" },
  { label: "How the AI works", href: "#how-it-works" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "AI Calling", href: "#voice" },
  { label: "Pricing", href: "#pricing" },
  { label: "Results", href: "#results" },
] as const;

export const cta = {
  primary: { label: "Book a demo", href: "#demo" },
  secondary: { label: "See how the AI works", href: "#how-it-works" },
} as const;

export const footerNav = [
  {
    title: "Platform",
    links: [
      { label: "Auto-rostering", href: "#platform" },
      { label: "Attendance prediction", href: "#how-it-works" },
      { label: "Workforce analytics", href: "#dashboards" },
      { label: "ShiftEaze Voice", href: "#voice" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Results", href: "#results" },
      { label: "Book a demo", href: "#demo" },
      { label: "Contact", href: "#demo" },
    ],
  },
  {
    title: "Deployment",
    links: [
      { label: "Multi-terminal", href: "#dashboards" },
      { label: "Nightly ingestion", href: "#how-it-works" },
      { label: "Weekly retraining", href: "#how-it-works" },
      { label: "iOS · Android · Web", href: "#platform" },
    ],
  },
] as const;
