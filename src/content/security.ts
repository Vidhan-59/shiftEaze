/**
 * Security page copy, from "ShiftEaze Security Page New Draft" (Oct 29, 2026),
 * Part 1 only. Left out until confirmed (draft Part 2): the Hosting and
 * infrastructure section, and the FAQs on data location, AI training and
 * worker exit. Part 3 is internal and never published.
 */

export const hero = {
  h1: "Security built for the shop floor, trusted at port scale.",
  subline:
    "ShiftEaze manages rosters, attendance and workforce data for 6,000+ operators across 12+ terminals at Mundra Port. Every role, record and integration is designed so people see only the data their job requires.",
};

/** Request Security Overview goes to the Contact form, like the site's other "talk to us" buttons. */
export const securityOverviewHref = "/company?topic=sales-and-demos#contact";

/** Highlight tiles; `target` is the section id each tile jumps to. */
export const highlights = [
  { lead: "Role-based access", text: "Users see only what their role requires.", target: "role-based-access" },
  { lead: "Data protection", text: "Workforce data is handled under strict access controls.", target: "data-protection-privacy" },
  { lead: "Secure integrations", text: "Biometric, mobile and API connections are authenticated and verified.", target: "secure-integrations" },
  { lead: "Proven at scale", text: "Live at Mundra Port (APSEZ).", target: "round-the-clock-operations" },
];

export const roleBasedAccess = {
  intro: "Workforce data is sensitive. ShiftEaze limits what each person can see and do based on their role.",
  bullets: [
    { lead: "Employees", text: "see and act on their own records: attendance, shifts and leave." },
    { lead: "Managers", text: "see their own team, terminal or department, not the whole organisation." },
    { lead: "Planners and admins", text: "get the rostering and configuration tools their role needs." },
    { lead: "Hierarchy-based access", text: "follows Terminal → Department → Batch, so a supervisor in one terminal does not see another terminal's data." },
    { lead: "Server-side enforcement:", text: "access rules are applied on the server, not just hidden in the interface." },
  ],
};

export const dataProtection = {
  intro: "We collect and use workforce data only to run rostering, attendance and workforce operations.",
  bullets: [
    { lead: "Purpose-limited use:", text: "personal data supports rostering, attendance and workforce operations." },
    { lead: "Portable worker identity (RGID):", text: "each worker has a single identifier, so records stay consistent without copying personal details across systems." },
    { lead: "Controlled access:", text: "access to sensitive records is limited by role and logged." },
    { lead: "Built to support the DPDP Act, 2023:", text: "our design supports your obligations under India's Digital Personal Data Protection Act." },
  ],
};

export const integrations = {
  intro: "ShiftEaze connects to the systems you already run, without opening gaps.",
  bullets: [
    { lead: "Biometric attendance:", text: "punches from systems such as Kronos flow in through a dedicated integration." },
    { lead: "Mobile app:", text: "users sign in through an authenticated, secured mobile API." },
    { lead: "Webhooks and APIs:", text: "incoming calls are verified with HMAC signature checks, so only trusted systems can write data." },
    { lead: "AI calling:", text: "voice and notification workflows run on controlled infrastructure." },
  ],
};

export const auditTrail = {
  bullets: [
    "Key actions are recorded, including roster changes, attendance corrections, approvals and overtime requests.",
    "Changes can be traced to the person who made them and when.",
    "Approval workflows for leave, overtime and shift changes keep an official record of every decision.",
  ],
};

export const responsibleAi = {
  intro: "ShiftEaze uses AI for absence prediction, rostering recommendations and automated confirmation calls.",
  bullets: [
    { lead: "People decide.", text: "AI supports planners; people make the final roster decisions." },
    { lead: "Operational data only.", text: "Predictions use operational data such as attendance and leave patterns." },
    { lead: "Restricted access.", text: "Call recordings and transcripts are available only to authorised roles." },
  ],
};

export const roundTheClock = {
  intro: "Ports don't stop at night, and neither should your workforce system.",
  bullets: [
    "Built for multi-shift, multi-terminal operations.",
    "Running live across 6,000+ operators and 12+ terminals.",
  ],
};

export const documentation = {
  text: "Security questionnaires and supporting documentation are available on request. Your IT or compliance team is welcome to walk through our practices with us.",
};

export const faqs = [
  {
    q: "Who can see my employees' data?",
    a: "Only users with the right role in your hierarchy. Employees see their own records, managers see their own teams, and admins are configured by you.",
  },
  {
    q: "Can we use our existing biometric devices?",
    a: "Yes. ShiftEaze integrates with biometric attendance systems such as Kronos.",
  },
  {
    q: "Can you complete our security questionnaire?",
    a: "Yes. Use Request Security Overview below and our team will get in touch.",
  },
  {
    q: "Who owns our data?",
    a: "You do. ShiftEaze processes workforce data on your behalf to deliver the service.",
  },
];

export const closing = {
  heading: "Questions from your IT or compliance team?",
  text: "We're happy to walk them through how ShiftEaze handles security.",
};
