/**
 * Home page copy, verbatim from the restructure brief (section 8, "Home").
 * Kept out of components so copy can be checked against the brief directly.
 */

import { MANAGED_ROSTERING_PUBLISHED } from "./config";

/** Positioning statement supplied by the SEO team; used in the hero and the FAQ. */
export const positioning =
  "ShiftEaze is an AI workforce operations platform that connects the field to the back office. It brings rostering, attendance, leave management and workforce performance together in one workforce management platform, with one app for operators and one portal for managers.";

export const hero = {
  h1: "AI based Shift Management Software Built for Large Frontline Teams",
  headline: "Know who will show up, before the shift starts.",
  text: positioning,
  trustStrip: [
    "6000+ operators",
    "12+ terminals and divisions",
    "3 languages: English, Hindi, Gujarati",
    "Powering workforce operations at Mundra Port",
  ],
  intro:
    "Large shift-based teams still run on spreadsheets, phone calls and paper leave registers. ShiftEaze replaces that with AI based Employee Scheduling Software that predicts absences, suggests backfills and records every punch where it happens. Planners get a calmer shift start, and workers get a record that belongs to them.",
};

export const metaHome = {
  title: "ShiftEaze | AI Shift Management & Rostering Software",
  description:
    "ShiftEaze is AI based Employee Scheduling Software for shift teams. Predict absences, automate rosters, track geofenced attendance and see every site live.",
  keywords: [
    "ShiftEaze",
    "AI shift management software",
    "rostering software",
    "AI based employee scheduling software",
    "employee scheduling software",
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

/** Home page FAQ (SEO team, section 14); also emitted as FAQPage structured data. */
export const homeFaqHeading = "Frequently Asked Questions About ShiftEaze";

export const homeFaqs = [
  {
    q: "What is ShiftEaze?",
    a: "ShiftEaze is an AI-powered workforce management platform that helps businesses manage shift scheduling, employee attendance, leave requests, and workforce performance through one connected system.",
  },
  {
    q: "How does ShiftEaze help businesses manage employee shifts?",
    a: "ShiftEaze simplifies shift planning with AI-assisted scheduling, helping managers organize employee rosters, identify staffing gaps, and manage shift coverage more efficiently.",
  },
  {
    q: "Can employees track their shifts and attendance using ShiftEaze?",
    a: "Yes. Employees can use the ShiftEaze mobile app to view assigned shifts, record attendance, check schedules, and submit leave requests. Managers can monitor updates through the portal.",
  },
  {
    q: "What makes ShiftEaze different from other staff scheduling solutions?",
    a: "Unlike traditional scheduling tools, ShiftEaze connects rostering with attendance tracking, absence prediction, leave management, and workforce analytics. It is designed for businesses searching for the best staff scheduling software to manage large frontline teams.",
  },
  {
    q: "Can ShiftEaze help businesses manage unexpected employee absences?",
    a: "Yes. ShiftEaze uses AI-powered absence prediction to help managers identify potential staffing gaps and find suitable backfill options before a shift begins.",
  },
  {
    q: "Which industries can benefit from ShiftEaze?",
    a: "ShiftEaze supports shift-based industries such as ports and terminals, manufacturing, logistics, warehousing, and staffing agencies. Its AI workforce operations platform helps managers coordinate frontline teams and daily operations.",
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
    "ShiftEaze brings everything together in one place, making it one of the best staff scheduling software solutions for large frontline teams. From shift planning and attendance tracking to leave management, every update is reflected in real time, keeping operators and managers connected through a single source of truth.",
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
    ...(MANAGED_ROSTERING_PUBLISHED ? ["managed-rostering-services"] : []),
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
