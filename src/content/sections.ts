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
 * formatter — two used to be plain strings that bypassed it, rendering "1000+"
 * beside "6,000+".
 *
 * `suffix` is only ever the short accent glyph ("+"). A unit like "hrs" goes in
 * `unit` and is typeset smaller: folding it into the suffix made that figure
 * far wider than the other three, so it wrapped onto a second line and knocked
 * its labels out of alignment with the rest of the row.
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
    suffix: "+",
    unit: "hrs",
    label: "Planning saved / cycle",
    note: "vs. spreadsheet rostering",
    animate: 1000,
  },
] as const;

/*
 * Pricing content now lives in ./pricing.ts — it outgrew this file once the
 * tier matrix, volume bands, AI-bundle maths and ROI model were added.
 */

export const trustLogos = [
  "Terminal Operator",
  "Container Terminal",
  "Port Authority",
  "Logistics Group",
  "Bulk Handling",
  "Warehousing",
] as const;
