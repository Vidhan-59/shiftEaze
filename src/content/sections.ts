/**
 * Structured copy for every content section. Kept out of components so copy can
 * be edited without touching layout/motion code.
 */

export const problems = [
  {
    stat: "1,000+/hr",
    label: "Idle asset cost",
    text: "A crane or berth standing idle for a shift burns thousands per hour. A single unfilled slot cascades into the whole vessel plan.",
  },
  {
    stat: "At shift-start",
    label: "When gaps surface",
    text: "With manual rostering, you learn a worker didn't show up the moment the shift begins — too late to arrange cover without scrambling.",
  },
  {
    stat: "Spreadsheets",
    label: "How rosters get built",
    text: "Cycle after cycle, terminal by terminal, planners rebuild DDNNOO rotations by hand — slow to produce and impossible to re-optimize live.",
  },
] as const;

export type Pillar = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
  differentiator: { label: string; text: string };
  screenshot: { src: string; alt: string; caption: string };
  visual: "roster" | "prediction" | "analytics";
};

export const pillars: Pillar[] = [
  {
    id: "auto-rostering",
    index: "01",
    eyebrow: "Auto-rostering",
    title: "Rosters that build — and rebuild — themselves.",
    lead: "AI generates cycle-based rosters across every terminal, batch and designation, then continuously re-optimizes as availability, leave and predictions change.",
    points: [
      "Cycle-aware scheduling (DDNNOO and custom rotations) per terminal and batch",
      "Continuous re-optimization — not a one-time generate you then patch by hand",
      "Respects leave, notice periods, grade quality and role requirements automatically",
    ],
    differentiator: {
      label: "What's different",
      text: "Most tools generate a roster once. ShiftEaze treats the roster as live — when a prediction or a leave request lands, it re-solves the affected shifts and surfaces the delta, not a fresh blank grid.",
    },
    screenshot: {
      src: "/assets/reference/roster.png",
      alt: "ShiftEaze scheduler dashboard showing a month-long roster grid across operators",
      caption: "Scheduler Dashboard · month-long rotation across every operator",
    },
    visual: "roster",
  },
  {
    id: "attendance-prediction",
    index: "02",
    eyebrow: "Attendance prediction",
    title: "See the no-show days before it happens.",
    lead: "A two-stage model scores every operator's likelihood of not showing up ahead of the shift, so planners arrange cover early instead of discovering a gap at the gate.",
    points: [
      "A calibrated risk score per operator, surfaced right on the roster",
      "Deliberately tuned to over-catch risk — an idle berth costs far more than a standby call",
      "One-click backfill: line up the best replacement from the same terminal and grade",
    ],
    differentiator: {
      label: "What's different",
      text: "The score isn't a black box percentage. It combines deterministic hard rules with a trained scorecard, and it's recall-weighted on purpose — the cost of a missed no-show at a port is asymmetric, so the model errs toward flagging.",
    },
    screenshot: {
      src: "/assets/reference/shift-manager.png",
      alt: "ShiftEaze shift manager showing per-operator prediction scores and status",
      caption: "Shift Manager · per-operator prediction, confirmation and final status",
    },
    visual: "prediction",
  },
  {
    id: "workforce-analytics",
    index: "03",
    eyebrow: "Workforce analytics",
    title: "Live staffing truth, terminal by terminal.",
    lead: "Dashboards show active vs. ideal staffing by designation, absenteeism trends over time, and a fill-rate breakdown for every terminal — updating as the day runs.",
    points: [
      "Designation-wise strength vs. requirement, with over/under-staffing at a glance",
      "Absenteeism and on-time trends across months, per terminal and role",
      "Grade-quality distribution so headcount and capability are read together",
    ],
    differentiator: {
      label: "What's different",
      text: "Analytics aren't a separate reporting tool bolted on afterwards — they read from the same live roster and attendance stream the predictions run on, so what you plan and what you measure never drift apart.",
    },
    screenshot: {
      src: "/assets/reference/manpower.png",
      alt: "ShiftEaze manpower summary dashboard with strength-vs-requirement and status breakdown",
      caption: "Manpower Summary · strength vs. requirement, live status breakdown",
    },
    visual: "analytics",
  },
];

export const pipeline = [
  {
    step: "01",
    kicker: "Ingest",
    title: "Nightly data ingestion",
    text: "Every night, ShiftEaze pulls each terminal's attendance history, shift patterns, approved leave and local calendars — festivals and regional events included — into a per-terminal feature set.",
    tag: "attendance · patterns · leave · calendars",
  },
  {
    step: "02",
    kicker: "Stage one",
    title: "Deterministic hard rules",
    text: "Before any statistics, rule-based overrides run first. Approved leave, notice-period status and known constraints short-circuit the pipeline — these are facts, not probabilities, so they're never left to the model.",
    tag: "rule overrides → certain outcomes",
  },
  {
    step: "03",
    kicker: "Stage two",
    title: "Logistic scorecard model",
    text: "Everything the rules don't decide flows into a trained logistic scorecard that outputs a calibrated risk probability per operator — recall-weighted on purpose, because a missed no-show is far more expensive than a false alarm.",
    tag: "calibrated probability · recall-weighted",
  },
  {
    step: "04",
    kicker: "Adapt",
    title: "Weekly retraining",
    text: "The scorecard retrains weekly on each terminal's most recent data, so it tracks drift — new crews, seasonal patterns, shifting behaviour — instead of decaying against a stale snapshot.",
    tag: "per-terminal · drift-aware",
  },
  {
    step: "05",
    kicker: "Act",
    title: "Flags & automated action",
    text: "Risk flags surface directly on the roster where planners already work — and trigger ShiftEaze Voice to place priority calls to at-risk operators, all without a dispatcher manually chasing anyone.",
    tag: "roster flags → ShiftEaze Voice calls",
  },
] as const;

export const dashboards = [
  {
    id: "manpower",
    tab: "Manpower",
    src: "/assets/reference/manpower.png",
    alt: "Manpower summary dashboard",
    title: "Manpower Summary",
    blurb:
      "Active vs. ideal strength per designation, live status breakdown and grade-quality distribution across every terminal.",
  },
  {
    id: "shift",
    tab: "Shift attendance",
    src: "/assets/reference/shift-attendance.png",
    alt: "Shift attendance summary dashboard",
    title: "Shift Attendance",
    blurb:
      "Planned vs. confirmed vs. punched-in, the full confirmation flow, and today's shortfall by terminal and shift.",
  },
  {
    id: "attendance",
    tab: "Attendance trend",
    src: "/assets/reference/attendance.png",
    alt: "Attendance summary dashboard",
    title: "Attendance Summary",
    blurb:
      "Absenteeism trend across months, day-wise attendance, and a designation-level confirmation vs. punch-in split.",
  },
  {
    id: "leave",
    tab: "Leave",
    src: "/assets/reference/leave.png",
    alt: "Leave summary dashboard",
    title: "Leave Summary",
    blurb:
      "Applied, approved, pending and rejected leave, rejection follow-up, and balance burn-rate by leave type.",
  },
] as const;

export const callTypes = [
  {
    id: "confirm",
    trigger: "Roster published",
    title: "Shift confirmation",
    text: "As soon as a roster is published, operators get a call to confirm the shifts assigned to them — turning silent uncertainty into a confirmed vs. planned number.",
  },
  {
    id: "reminder",
    trigger: "Shift boundary",
    title: "Punch-in / punch-out reminders",
    text: "Timed calls remind operators to punch in at the gate and punch out at close, so attendance data reflects who's actually on the floor.",
  },
  {
    id: "priority",
    trigger: "High risk flagged",
    title: "Absence-priority calls",
    text: "The moment the model flags an operator as likely absent, ShiftEaze places a priority call — the gap gets worked before the shift, not after it opens.",
  },
  {
    id: "overtime",
    trigger: "Shortfall detected",
    title: "Overtime requests",
    text: "When a shift is short, ShiftEaze calls candidate operators for overtime automatically, backfilling from the right terminal and grade without a dispatcher dialling around.",
  },
] as const;

/**
 * Every entry carries `animate`, so all four run through the same number
 * formatter. Previously two were plain strings that bypassed it, and the row
 * rendered "1000+" next to "6,000+" — two thousands conventions side by side.
 * The last one also concatenated straight onto its suffix as "1000+hrs".
 */
export const metrics = [
  {
    value: "1000",
    suffix: "+",
    label: "Fewer unplanned no-shows",
    note: "vs. manual confirmation",
    animate: 1000,
  },
  {
    value: "6000",
    suffix: "+",
    label: "Operators managed live",
    note: "on one platform",
    animate: 6000,
  },
  {
    value: "12",
    suffix: "+",
    label: "Terminals & divisions",
    note: "unified in production",
    animate: 12,
  },
  {
    value: "1000",
    suffix: "+ hrs",
    label: "Planning saved / cycle",
    note: "vs. spreadsheet rostering",
    animate: 1000,
  },
] as const;

export type PricingFeature = { label: string; addon?: boolean; badge?: string };

/**
 * INR-only pricing. `amount`/`perUnit` carry both annual and monthly values so
 * the billing toggle switches real figures. NOTE: the numbers below are
 * indicative placeholders — replace with final ShiftEaze pricing before launch.
 */
export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  price: {
    amount: { annual: string; monthly: string };
    period: string;
    caption?: string;
    perUnit?: { annual: string; monthly: string };
  };
  meta: { label: string; value: string }[];
  featuresIntro?: string;
  features: PricingFeature[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Single-site pilots, small ops teams",
    price: {
      amount: { annual: "₹0", monthly: "₹0" },
      period: "/mo",
      caption: "Up to 50 operators · free forever",
    },
    meta: [
      { label: "Operators", value: "Up to 50" },
      { label: "Terminals / sites", value: "1" },
      { label: "Support", value: "Community / email" },
    ],
    features: [
      { label: "Geofenced attendance — mobile check-in + QR scan" },
      { label: "Basic DDNNOO shift scheduling (Shift Manager calendar)" },
      { label: "Leave Module — apply, approve, basic leave summary" },
      { label: "Basic Helpdesk ticketing" },
      { label: "Manpower Summary dashboard — view-only, limited charts" },
      { label: "Single-role access (no granular RBAC)" },
      { label: "Standard email support" },
    ],
    cta: { label: "Start for free", href: "#demo" },
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Multi-terminal, growing operations",
    price: {
      amount: { annual: "₹2,499", monthly: "₹2,999" },
      period: "/mo",
      caption: "For the first 30 operators",
      perUnit: {
        annual: "₹69 / mo per additional operator",
        monthly: "₹83 / mo per additional operator",
      },
    },
    meta: [
      { label: "Operators", value: "Up to 500" },
      { label: "Terminals / sites", value: "Up to 5" },
      { label: "Support", value: "Priority email + chat" },
    ],
    featuresIntro: "Everything in Starter, plus:",
    features: [
      { label: "Full RBAC — Level Master → Designation → Terminal-scoped access" },
      { label: "Shift Extender — OT timing, dual-handle range slider, conflict prevention" },
      { label: "Auto Roster + Roster Manager" },
      { label: "Regularisation workflows — punch corrections, approval chains" },
      { label: "Full Attendance + Shift Attendance dashboards (Chart.js visual summaries)" },
      { label: "Worker Performance Passbook — basic RGID profile" },
      { label: "Multi-shift dynamic legends — custom Shift Master configs" },
      {
        label: "AI Calling — punch-in / punch-out IVR reminders only",
        addon: true,
      },
    ],
    cta: { label: "Book a demo", href: "#demo" },
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Large-scale port / industrial deployments",
    price: {
      amount: { annual: "Custom", monthly: "Custom" },
      period: "",
      caption: "Volume pricing · 500+ operators",
    },
    meta: [
      { label: "Operators", value: "Unlimited" },
      { label: "Terminals / sites", value: "Unlimited" },
      { label: "Support", value: "Dedicated AM + SLA" },
    ],
    featuresIntro: "Everything in Professional, plus:",
    features: [
      {
        label: "AI Rostering Prediction Engine — proactive OT backfill planning for Roster Planners",
        badge: "~0.87 AUC",
      },
      { label: "AI Calling (Superdash-powered) — full 5-scenario suite" },
      { label: "RGID portable worker identity — full cross-site history" },
      { label: "Crane / terminal performance tracking (GCR — Gross Crane Rate)" },
      {
        label:
          "Custom Site Dashboard — Manpower, Shift Attendance, Attendance, Leave + Helpdesk split view",
      },
      { label: "API access + custom integrations" },
      { label: "Dedicated onboarding, account manager, and uptime SLA" },
    ],
    cta: { label: "Talk to sales", href: "#demo" },
  },
];

/** Full feature comparison — a value per tier, in Starter/Professional/Enterprise order. */
export type CompareValue = boolean | string;
export type CompareRow = {
  feature: string;
  note?: string;
  values: [CompareValue, CompareValue, CompareValue];
};
export type CompareGroup = { group: string; rows: CompareRow[] };

export const pricingCompareTiers = [
  "Starter",
  "Professional",
  "Enterprise",
] as const;

export const pricingComparison: CompareGroup[] = [
  {
    group: "Scheduling & rostering",
    rows: [
      { feature: "DDNNOO shift scheduling", note: "Continuous rotation patterns", values: ["Basic", true, true] },
      { feature: "Auto Roster + Roster Manager", values: [false, true, true] },
      { feature: "Shift Extender", note: "OT timing, conflict prevention", values: [false, true, true] },
      { feature: "Multi-shift dynamic legends", values: [false, true, true] },
      { feature: "AI Rostering Prediction Engine", note: "Proactive absence + OT backfill", values: [false, false, "~0.87 AUC"] },
    ],
  },
  {
    group: "Attendance & geofencing",
    rows: [
      { feature: "Geofenced attendance", note: "Mobile check-in + QR scan", values: [true, true, true] },
      { feature: "Punch regularisation workflows", values: [false, true, true] },
      { feature: "Shift attendance dashboard", values: [false, true, true] },
    ],
  },
  {
    group: "Leave & overtime",
    rows: [
      { feature: "Leave module — apply / approve", values: [true, true, true] },
      { feature: "Leave summary & balance tracking", values: ["Basic", true, true] },
      { feature: "Overtime requests", values: [false, true, true] },
    ],
  },
  {
    group: "AI Calling — ShiftEaze Voice",
    rows: [
      { feature: "Punch-in / punch-out IVR reminders", values: [false, "Add-on", true] },
      { feature: "Full 5-scenario voice suite", values: [false, false, true] },
      { feature: "Multilingual — EN / HI / GU", values: [false, "Add-on", true] },
    ],
  },
  {
    group: "Worker identity & performance",
    rows: [
      { feature: "Worker Performance Passbook", values: [false, "Basic", "Full"] },
      { feature: "RGID portable worker identity", values: [false, "Basic", "Cross-site"] },
      { feature: "Crane / terminal performance (GCR)", values: [false, false, true] },
    ],
  },
  {
    group: "Analytics & dashboards",
    rows: [
      { feature: "Manpower Summary dashboard", values: ["View-only", true, true] },
      { feature: "Attendance + trend dashboards", values: [false, true, true] },
      { feature: "Custom site dashboard", values: [false, false, true] },
      { feature: "Helpdesk ticketing", values: ["Basic", true, true] },
    ],
  },
  {
    group: "Access, admin & security",
    rows: [
      { feature: "Operators included", values: ["Up to 50", "Up to 500", "Unlimited"] },
      { feature: "Terminals / sites", values: ["1", "Up to 5", "Unlimited"] },
      { feature: "Role-based access control (RBAC)", values: ["Single role", "Full", "Full"] },
      { feature: "API access + custom integrations", values: [false, false, true] },
      { feature: "Support", values: ["Email", "Priority + chat", "Dedicated AM + SLA"] },
    ],
  },
];

export const pricingFaqs = [
  {
    q: "What counts as an “operator”?",
    a: "Any worker with an active ShiftEaze profile who is rostered or tracked in a given billing month. Planners and admins who only manage the platform aren’t billed as operators.",
  },
  {
    q: "Can we start with a single terminal?",
    a: "Yes. Most deployments go live on one representative terminal first, then roll out site by site once planners are comfortable — you don’t have to move your whole operation at once.",
  },
  {
    q: "How is the Professional plan priced?",
    a: "Per active operator, per month, scaling with your operator count — with volume pricing at 500+ and 1,000+ operators. Talk to us for an exact quote sized to your terminals.",
  },
  {
    q: "Is onboarding and implementation included?",
    a: "Professional includes guided setup. Enterprise adds dedicated onboarding, a named account manager, and an uptime SLA so large multi-terminal rollouts have hands-on support.",
  },
  {
    q: "Is the AI absence prediction a black box?",
    a: "No. It combines deterministic hard rules with a trained, recall-weighted scorecard (~0.87 AUC absence prediction), and every flag traces back to the inputs behind it — planners see why, not just a number.",
  },
  {
    q: "Where is our data hosted?",
    a: "Data can be hosted in India to meet residency requirements. Specific hosting, retention and access controls are covered during Enterprise onboarding.",
  },
  {
    q: "Can we add AI Calling later?",
    a: "Yes. ShiftEaze Voice is available as an add-on on Professional (punch-in / punch-out reminders) and is bundled in full on Enterprise — you can enable it whenever you’re ready.",
  },
  {
    q: "What’s the contract length?",
    a: "Both monthly and annual billing are available, and annual includes a discount. There’s no long lock-in required to get started on a pilot.",
  },
] as const;

export const trustLogos = [
  "Terminal Operator",
  "Container Terminal",
  "Port Authority",
  "Logistics Group",
  "Bulk Handling",
  "Warehousing",
] as const;
