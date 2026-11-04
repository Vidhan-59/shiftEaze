/**
 * Home page copy, verbatim from the restructure brief (section 8, "Home").
 * Kept out of components so copy can be checked against the brief directly.
 */

export const hero = {
  h1: "AI Shift Planning Built for Large Frontline Teams",
  headline: "Know who will show up, before the shift starts.",
  text: "ShiftEaze is an AI workforce operations platform that connects the field to the back office. Rostering, attendance, leave and performance run on one platform, with one app for operators and one portal for managers.",
  trustStrip: [
    "6000+ operators",
    "12+ terminals and divisions",
    "3 languages: English, Hindi, Gujarati",
    "Powering workforce operations at Mundra Port",
  ],
  intro:
    "Large shift-based teams still run on spreadsheets, phone calls and paper leave registers. ShiftEaze replaces that with AI scheduling that predicts absences, suggests backfills and records every punch where it happens. Planners get a calmer shift start, and workers get a record that belongs to them.",
};

/** Full positioning statement supplied by the SEO team for the home page. */
export const positioning =
  "ShiftEaze is an AI workforce operations platform that connects the field to the back office. It brings rostering, attendance, leave management and workforce performance together in one workforce management platform, with one app for operators and one portal for managers.";

export const metaHome = {
  title: "ShiftEaze | AI Workforce Operations Platform for Shift Teams",
  // Shortened from `positioning` to fit Google's ~160-character snippet.
  description:
    "ShiftEaze is an AI workforce operations platform for rostering, attendance, leave and performance, with one app for operators and one portal for managers.",
  keywords: [
    "ShiftEaze",
    "AI workforce operations platform",
    "workforce management platform",
    "workforce management software",
    "AI rostering software",
    "shift rostering",
    "attendance management software",
    "leave management software",
    "workforce performance management",
    "operator app",
    "manager portal",
    "field to back office",
    "shift workforce management",
  ],
} as const;

/** Home page FAQ; also emitted as FAQPage structured data. */
export const homeFaqs = [
  {
    q: "What is ShiftEaze?",
    a: positioning,
  },
  {
    q: "What is the difference between the operator app and the manager portal?",
    a: "Operators use the app to see their roster, confirm shifts, punch in and out with a QR code, apply for leave and raise helpdesk tickets. Managers use the portal to plan rosters with AI, watch live attendance, approve leave and resolve tickets. Both work from the same data, updated in real time.",
  },
  {
    q: "How does ShiftEaze use AI for rostering?",
    a: "ShiftEaze builds rosters automatically, predicts which shifts are at risk of absences before they start, and suggests backfills in advance. ShiftEaze AI Voice Calling can then call workers to confirm shifts and fill gaps.",
  },
  {
    q: "How does attendance tracking work?",
    a: "Operators punch in and out by scanning a QR code at the site, and each punch is geofenced so it is recorded where it happens. Managers see who is actually on site, live. ShiftEaze also integrates with biometric attendance systems.",
  },
  {
    q: "How is leave managed in ShiftEaze?",
    a: "Operators apply for leave in the app and managers approve it in the portal. Every request and decision is recorded, replacing paper registers and phone calls.",
  },
  {
    q: "How does ShiftEaze track workforce performance?",
    a: "Each worker builds a verified performance record covering output, attendance and punctuality. Managers can see who is reliable, and workers get a track record that belongs to them.",
  },
  {
    q: "Which industries is ShiftEaze built for?",
    a: "Any operation that runs in shifts, including ports and terminals, manufacturing, logistics and warehousing, and staffing and manpower agencies.",
  },
  {
    q: "Which languages does ShiftEaze support?",
    a: "English, Hindi and Gujarati, so planners and operators can work in the language they are most comfortable with.",
  },
  {
    q: "How do we get started?",
    a: "Request a demo and we will walk your team through the platform. Most operations start at one site and expand site by site.",
  },
] as const;

export const problem = {
  heading: "Two sides of the same broken process",
  intro:
    "Shift planning in large frontline operations still depends on spreadsheets, calls and paper. The cost lands on both the operations team and the worker.",
  forOperations: [
    { lead: "Manual rostering:", text: "spreadsheets every cycle, at every terminal." },
    { lead: "No live attendance:", text: "no view of who is actually on site." },
    { lead: "Unpredictable absences:", text: "gaps only surface at shift start." },
    { lead: "Informal leave:", text: "managed on calls and paper, with no record." },
    { lead: "A performance blind spot:", text: "output, conduct and discipline go untracked." },
  ],
  forWorker: [
    { lead: "History resets:", text: "nothing carries over to the next employer." },
    { lead: "An invisible track record:", text: "punctuality and discipline go unseen." },
    { lead: "Lost performance data:", text: "it stays with the previous employer." },
    { lead: "Evaluated from zero:", text: "every new job starts from scratch, and top performers look the same as absentees." },
  ],
};

export const platformTeaser = {
  heading: "One platform, two faces: an operator app and a manager portal",
  intro:
    "ShiftEaze is a single source of truth, updated in real time. Whatever an operator taps in the app, the planner sees on the portal instantly.",
  cards: [
    "ai-rostering-shift-scheduling-software",
    "ai-absence-prediction-overtime-backfill",
    "geofenced-employee-attendance-software",
    "workforce-analytics-real-time-dashboards",
    "ai-voice-calling-workforce-management",
    "workforce-performance-worker-passbook",
    "employee-leave-management-software",
  ],
};

export const solutionsTeaser = {
  heading: "Solutions for every stage of workforce operations",
  cards: [
    "shift-based-workforce-management",
    "multi-site-workforce-management",
    "workforce-scheduling-optimization",
    "overtime-backfill-management",
    "workforce-attendance-payroll-accuracy",
  ],
};

export const industriesTeaser = {
  heading: "Built for operations that never stop",
  cards: [
    "port-terminal-workforce-management",
    "manufacturing-workforce-management",
    "logistics-warehousing-workforce-management",
    "staffing-manpower-agency-workforce-management",
  ],
};

export const caseStudyTeaser = {
  heading: "Mundra Port Workforce Management Case Study",
  summary:
    "Mundra shows what ShiftEaze looks like at scale on a working port. ShiftEaze supports 6000+ operators across 12+ terminals and divisions, with six terminals rostered live. Planners work in three languages, and AI voice calling runs five scenarios in production.",
};

export const howItWorks = {
  app: ["See roster", "Confirm shift", "QR punch-in", "Punch-out", "Leave & helpdesk"],
  portal: ["Plan roster with AI", "Live attendance", "Approve leave", "Track moves", "Resolve tickets"],
  closing: "Same data, end to end.",
};

export const impact = {
  forOperations: [
    "Hours saved on rostering every cycle",
    "Fewer attendance and payroll disputes",
    "Absences handled proactively, with no shift-start panic",
    "Productivity that is visible and improvable",
    "Rosters, attendance and leave on one paperless source of truth",
  ],
  forWorkers: [
    "A portable, verified track record",
    "Transparency on shifts, attendance and leave",
    "Recognition that rewards reliability",
    "A fair record that travels to the next employer",
  ],
};

export const resourcesTeaser = {
  guide: "The Shift Planner's Checklist: 10 things to fix before your next roster cycle.",
};

export const finalCta = {
  heading: "Plan cover calmly, days in advance, not in a panic at shift start.",
  text: "Join the teams running rostering, attendance, leave and performance on one platform.",
};
