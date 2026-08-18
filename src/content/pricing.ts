/**
 * Pricing page content.
 *
 * Pricing is per active operator, per month, billed annually in advance.
 * Monthly billing carries a ~20% uplift, so annual ≈ ten months of the monthly
 * rate — that identity is what the "2 months free" badge refers to; if you edit
 * a rate, keep `monthly × 10 ≈ annual × 12` or the badge stops being true.
 *
 * CONFIDENTIALITY: per the project's standing guardrail, nothing here names a
 * client or carries an exact internal model metric. The reference deployment is
 * described by its shape ("a 6,000-operator container port"), never by name,
 * and model quality is quoted as "~0.87 AUC" rather than the precise figure.
 */

export type Billing = "annual" | "monthly";

export type TierId = "starter" | "professional" | "enterprise";

export type PricingTier = {
  id: TierId;
  name: string;
  tagline: string;
  bestFor: string;
  /** Per-operator rate. `null` on a scoped tier that quotes "Custom". */
  rate: { annual: string; monthly: string } | null;
  unit: string;
  /** Commitment context under the headline rate. */
  subLabels: string[];
  meta: { label: string; value: string }[];
  featuresIntro?: string;
  features: { label: string; addon?: boolean; badge?: string }[];
  cta: { label: string; href: string; variant: "primary" | "secondary"; note?: string };
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get one site live on ShiftEaze.",
    bestFor: "Single-site pilots, small ops teams",
    rate: { annual: "₹89", monthly: "₹106" },
    unit: "/operator/mo",
    subLabels: [
      "Free forever up to 50 operators",
      "Minimum 50 operators once paid",
    ],
    meta: [
      { label: "Operators", value: "Up to 50 free" },
      { label: "Terminals / sites", value: "1" },
      { label: "Support", value: "Community + email" },
    ],
    featuresIntro: "Core rostering, on one site",
    features: [
      { label: "DDNNOO shift cycles — manual, one pattern" },
      { label: "Mobile punch attendance with geofencing" },
      { label: "Leave management — two leave types" },
      { label: "Manpower Summary dashboard" },
      { label: "Operator mobile app — English" },
      { label: "CSV export" },
    ],
    cta: {
      label: "Start for free",
      href: "#demo",
      variant: "secondary",
      note: "No credit card required",
    },
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Run every terminal from one control tower.",
    bestFor: "Multi-terminal operations · 2–5 sites · 150–750 operators",
    rate: { annual: "₹199", monthly: "₹238" },
    unit: "/operator/mo",
    subLabels: [
      "For a minimum of 150 operators",
      "Same rate per additional operator beyond the minimum",
    ],
    meta: [
      { label: "Operators", value: "Up to 500" },
      { label: "Terminals / sites", value: "Up to 5" },
      { label: "Support", value: "Priority · 8-hour response" },
    ],
    featuresIntro: "Everything in Starter, plus",
    features: [
      { label: "Auto-rostering across sites, with Shift Extender" },
      { label: "QR gate-pass, kiosk punch and regularisation" },
      { label: "All four leave types with approval chains" },
      { label: "All four live dashboards" },
      { label: "Three-layer RBAC — level, designation, override" },
      { label: "Payroll export and webhooks" },
      { label: "Operator mobile app — English + Hindi" },
      { label: "AI Rostering Prediction Engine", addon: true },
      { label: "ShiftEaze Voice — punch reminders", addon: true },
      { label: "RGID Worker Passbook — basic", addon: true },
      { label: "GCR & Equipment Analytics", addon: true },
    ],
    cta: { label: "Book a demo", href: "#demo", variant: "primary" },
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "AI-autonomous workforce operations, group-wide.",
    bestFor: "Ports, port groups and large industrial multi-site deployments",
    rate: null,
    unit: "",
    subLabels: ["Volume pricing from 750 operators", "Scoped to your deployment"],
    meta: [
      { label: "Operators", value: "Unlimited" },
      { label: "Terminals / sites", value: "Unlimited" },
      { label: "Support", value: "Dedicated AM · 99.5% SLA" },
    ],
    featuresIntro: "Everything in Professional, plus all four AI modules",
    features: [
      { label: "AI Rostering Prediction Engine", badge: "~0.87 AUC" },
      { label: "ShiftEaze Voice — all five scenarios, EN / HI / GU" },
      { label: "RGID — full portable identity, cross-employer history" },
      { label: "Gross Crane Rate, MOVES and operator scorecards" },
      { label: "Bulk Extender and policy governance" },
      { label: "Biometric integration with tamper audit" },
      { label: "Cross-site roll-up and scheduled reports" },
      { label: "SSO / SAML, IP allow-list, India data residency" },
      { label: "Full REST API with ERP / HRMS connectors" },
    ],
    cta: { label: "Talk to sales", href: "#demo", variant: "secondary" },
  },
];

/** Enterprise volume bands, shown expandable on the Enterprise card. */
export const volumeBands = [
  { range: "750 – 1,999", rate: "₹250", saving: null },
  { range: "2,000 – 4,999", rate: "₹220", saving: "12% off" },
  { range: "5,000 – 9,999", rate: "₹190", saving: "24% off" },
  { range: "10,000 – 24,999", rate: "₹160", saving: "36% off" },
  { range: "25,000+", rate: "₹130", saving: "48% off" },
] as const;

/* ── Feature comparison ──────────────────────────────────────────────────── */

export type CompareLevel = "full" | "partial" | "addon" | "none" | "text";
export type CompareValue = { level: CompareLevel; text?: string };

export type CompareRow = { feature: string; values: [CompareValue, CompareValue, CompareValue] };
export type CompareGroup = { group: string; rows: CompareRow[] };

export const pricingCompareTiers = ["Starter", "Professional", "Enterprise"] as const;

const full = (text?: string): CompareValue => ({ level: "full", text });
const partial = (text?: string): CompareValue => ({ level: "partial", text });
const addon = (text?: string): CompareValue => ({ level: "addon", text });
const none = (): CompareValue => ({ level: "none" });
const text = (t: string): CompareValue => ({ level: "text", text: t });

export const pricingComparison: CompareGroup[] = [
  {
    group: "Core operations",
    rows: [
      {
        feature: "Operators under management",
        values: [text("Up to 50 free"), text("Up to 500"), text("Unlimited")],
      },
      {
        feature: "Terminals / sites",
        values: [text("1"), text("Up to 5"), text("Unlimited")],
      },
      {
        feature: "Shift & roster (DDNNOO)",
        values: [
          partial("Manual, one pattern"),
          full("Auto-rostering, Shift Extender"),
          full("Bulk Extender, policy governance"),
        ],
      },
      {
        feature: "Attendance & geofencing",
        values: [
          partial("Mobile punch"),
          full("QR gate-pass, kiosk, regularisation"),
          full("Biometric integration, tamper audit"),
        ],
      },
      {
        feature: "Leave management",
        values: [
          partial("Two leave types"),
          full("All four types, approval chains"),
          full("Custom policies, OT ledger, statutory registers"),
        ],
      },
      {
        feature: "Helpdesk & grievance",
        values: [
          partial("Basic tickets"),
          full("Full SLA tracking"),
          full("Escalation matrix, CSAT, multi-site routing"),
        ],
      },
    ],
  },
  {
    group: "Dashboards & reporting",
    rows: [
      {
        feature: "Live dashboards",
        values: [
          partial("Manpower Summary only"),
          full("All four dashboards"),
          full("Cross-site roll-up, scheduled reports"),
        ],
      },
      {
        feature: "Operator mobile app",
        values: [full("English"), full("English + Hindi"), full("EN / HI / GU + Passbook")],
      },
      {
        feature: "RBAC & access control",
        values: [
          partial("Single admin"),
          full("Three-layer RBAC"),
          full("SSO / SAML, IP allow-list, India residency"),
        ],
      },
    ],
  },
  {
    group: "AI & advanced",
    rows: [
      {
        feature: "AI Rostering Prediction Engine",
        values: [none(), addon("₹59/op/mo"), full("~0.87 AUC, OT backfill planning")],
      },
      {
        feature: "ShiftEaze Voice — AI calling",
        values: [
          none(),
          addon("Punch reminders only"),
          full("All five scenarios, EN / HI / GU, HMAC-verified"),
        ],
      },
      {
        feature: "RGID Worker Passbook",
        values: [
          none(),
          addon("₹32/op/mo — basic"),
          full("Portable identity, cross-employer history"),
        ],
      },
      {
        feature: "GCR & equipment analytics",
        values: [
          none(),
          addon("₹40/op/mo"),
          full("Gross Crane Rate, MOVES, operator scorecards"),
        ],
      },
    ],
  },
  {
    group: "Integration & security",
    rows: [
      {
        feature: "API & integrations",
        values: [
          partial("CSV export"),
          full("Payroll export, webhooks"),
          full("Full REST API, ERP / HRMS connectors"),
        ],
      },
      {
        feature: "Data & compliance",
        values: [
          text("Standard"),
          text("Standard + DPA"),
          text("India residency, DPA, annual VAPT report"),
        ],
      },
      {
        feature: "Support",
        values: [
          text("Email, next business day"),
          text("Priority email + WhatsApp, 8-hour response"),
          text("Dedicated AM, 99.5% SLA, 4-hour P1"),
        ],
      },
    ],
  },
];

/* ── AI bundle economics ─────────────────────────────────────────────────── */

export const aiBundle = {
  headline: "All four AI modules come bundled in Enterprise.",
  body: "Add every AI module to Professional and you reach ₹381 per operator per month — 34% more than Enterprise at ₹250. If you need the AI, Enterprise is the cheaper way to buy it.",
  lines: [
    { label: "Professional base", value: "₹199" },
    { label: "AI Rostering Prediction Engine", value: "₹59" },
    { label: "ShiftEaze Voice — AI calling", value: "₹51" },
    { label: "RGID Worker Passbook", value: "₹32" },
    { label: "GCR & Equipment Analytics", value: "₹40" },
  ],
  total: { label: "Unbundled total", value: "₹381" },
  compare: { label: "Enterprise, from", value: "₹250" },
  saving: "Save ₹131 /operator/mo",
} as const;

/* ── ROI proof ───────────────────────────────────────────────────────────── */

// export const roi = {
//   title: "What a 6,000-operator port gets back.",
//   sub: "Modelled on a reference container-terminal deployment of comparable scale.",
//   stats: [
//     { value: "₹7.54", unit: "Cr", label: "Annual value identified" },
//     { value: "5.51", unit: "×", label: "Return on spend, year 2+" },
//     { value: "2.9", unit: "months", label: "Payback period" },
//     { value: "0.5", unit: "%", label: "Cost as share of total payroll" },
//   ],
//   finePrint:
//     "Modelled at the Enterprise 5,000–9,999 band (₹190/operator/mo). Value comprises absence-premium avoidance ₹4.85 Cr, output recovery ₹1.35 Cr, payroll leakage ₹0.91 Cr, planner productivity ₹0.29 Cr and compliance ₹0.15 Cr. Inputs are editable — ask us to model your site.",
// } as const;

/* ── Implementation ──────────────────────────────────────────────────────── */

export const implementation = {
  note: "Implementation is charged separately and credited against the Year 1 contract.",
  rows: [
    { tier: "Starter", fee: "₹75,000", scope: "One-time, remote and guided" },
    { tier: "Professional", fee: "₹3,00,000", scope: "Per site" },
    { tier: "Enterprise", fee: "₹8,00,000+", scope: "Per site, custom scope of work" },
  ],
} as const;

export const pricingDisclaimer =
  "All prices in INR (₹), per active operator, per month. Volume pricing available from 750 operators. Enterprise is scoped to your deployment and billed annually in advance. Implementation fees are charged separately. Figures shown are indicative — replace with final agreed pricing before launch.";

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

export const pricingFaqs = [
  {
    q: "How is an “operator” defined for billing?",
    a: "An active operator is any frontline worker with a live roster assignment in the billing period. Inactive or archived workers are not billed.",
  },
  {
    q: "Can we start with one terminal and expand?",
    a: "Yes — the land-and-expand model is designed for exactly this. Most operations start at one terminal, complete a 90-day paid pilot (₹2,50,000, credited in full against the annual contract), then expand site by site.",
  },
  {
    q: "We already have an HRMS. Does ShiftEaze replace it?",
    a: "No. ShiftEaze owns the shift — rostering, gate attendance, prediction and backfill — and exports to your HRMS rather than replacing it. The question worth asking is what your HRMS tells you three days before a night shift.",
  },
  {
    q: "What about operators who don’t use smartphones?",
    a: "That is precisely why ShiftEaze Voice exists. Five autonomous calling scenarios in English, Hindi and Gujarati reach any operator by phone, and every outcome is HMAC-verified and logged.",
  },
  {
    q: "Is Aadhaar data stored?",
    a: "No. RGID is derived from a limited digit set combined with date of birth — an internal identifier, not a copy of any Aadhaar data. All data is India-resident and covered by a DPA, with an annual VAPT report on Enterprise.",
  },
  {
    q: "What does the 90-day paid pilot involve?",
    a: "One terminal, 300–800 operators, full production use rather than a sandbox. The ₹2,50,000 pilot fee is credited in full against the first annual contract, and written success criteria are agreed before day one.",
  },
] as const;
