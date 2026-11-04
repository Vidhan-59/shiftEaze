/**
 * Privacy Policy copy, from the policy text supplied on 4 Nov 2026.
 *
 * Bracketed gaps in that text are left out rather than published as
 * placeholders: legal entity name and address, phone, grievance officer name,
 * hosting provider and region, retention periods, call-audio and biometric
 * statements, certifications, the "does not train models" claim, and the
 * Cookie Policy pointer (there is no such page yet). Add them here once known.
 *
 * Inline links use [label](href) and are rendered by PolicyDocument.
 */

export const lastUpdated = "4 November 2026";

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "contact"; rows: { label: string; value: string }[] };

export type PolicySection = {
  id: string;
  /** Short label for the "On this page" list. */
  nav: string;
  title: string;
  blocks: PolicyBlock[];
};

export const sections: PolicySection[] = [
  {
    id: "who-we-are",
    nav: "Who we are",
    title: "Who we are and which role we play",
    blocks: [
      {
        type: "p",
        text: "ShiftEaze is an AI-based shift management platform for frontline teams. It covers rostering, geofenced attendance, leave, workforce analytics and AI voice calling. This policy covers [www.shifteaze.io](https://www.shifteaze.io), the ShiftEaze operator app and the ShiftEaze manager portal (together, the “Services”). “ShiftEaze”, “we”, “us” and “our” refer to the company that operates the Services.",
      },
      { type: "h", text: "Our role" },
      {
        type: "table",
        head: ["Our role", "When it applies"],
        rows: [
          [
            "Data Fiduciary (controller)",
            "Website visitors, demo requests, contact forms, newsletter sign-ups, job applicants and customer account contacts.",
          ],
          [
            "Data Processor",
            "Workforce data entered or generated in the platform by your employer: rosters, attendance punches, leave, performance records and operator profiles. Your employer is the Data Fiduciary.",
          ],
        ],
      },
      {
        type: "p",
        text: "Where we act as a processor, please send requests about your work data to your employer. If you contact us directly, we will forward your request to them without undue delay.",
      },
    ],
  },
  {
    id: "data-we-collect",
    nav: "Data we collect",
    title: "Personal data we collect",
    blocks: [
      { type: "h", text: "Website and enquiries" },
      {
        type: "ul",
        items: [
          "Name, work email, phone number, company, job title, industry and the message you send through the demo, contact and newsletter forms.",
          "Technical data such as IP address, browser, device, operating system, referring page and pages viewed, collected through server logs and cookies.",
          "CV and application details if you apply for a role with us.",
        ],
      },
      { type: "h", text: "Operator app and manager portal (processed for your employer)" },
      {
        type: "ul",
        items: [
          "Profile details such as name, employee or operator ID, designation, site or terminal, phone number and preferred language.",
          "Shift and roster data, shift confirmations, leave requests and helpdesk tickets.",
          "Attendance records: QR punch-in and punch-out times, and device location at the moment of the punch to check it falls inside the site geofence. We do not track location outside a punch.",
          "Performance, conduct and punctuality records that your employer chooses to maintain, including the worker passbook.",
          "Call records from AI voice calling, such as the number called, time, outcome and the worker’s response (for example, shift confirmed).",
        ],
      },
      { type: "h", text: "What we do not collect" },
      {
        type: "p",
        text: "We do not intentionally collect payment card details through the website, and we do not use the Services to collect sensitive categories such as religion, political opinion or health data, except where a customer configures such fields (for example, a medical leave reason).",
      },
    ],
  },
  {
    id: "how-we-use-data",
    nav: "How we use data",
    title: "How and why we use personal data",
    blocks: [
      {
        type: "table",
        head: ["Purpose", "Examples", "Basis"],
        rows: [
          ["Respond to enquiries", "Demo requests, sales and support replies", "Consent, or legitimate use to serve your request"],
          ["Provide the Services", "Rostering, attendance, leave, dashboards, notifications", "Customer contract and employer instructions"],
          ["Improve and secure the Services", "Troubleshooting, analytics, fraud and abuse prevention", "Legitimate use"],
          ["Send updates and newsletters", "Product news, guides, events", "Consent. Unsubscribe at any time."],
          ["Recruitment", "Assessing job applications", "Your request to be considered"],
          ["Legal compliance", "Tax, audits, lawful requests from authorities", "Legal obligation"],
        ],
      },
      {
        type: "p",
        text: "Under India’s Digital Personal Data Protection Act, 2023 (“DPDP Act”), we rely on your consent or on the legitimate uses the Act permits. Where we cannot rely on another basis, we ask for your consent and you can withdraw it at any time.",
      },
    ],
  },
  {
    id: "ai-features",
    nav: "AI features",
    title: "AI features and automated decisions",
    blocks: [
      {
        type: "ul",
        items: [
          "AI absence prediction estimates the likelihood of a shift gap from attendance and roster patterns. It is a planning aid for managers, not a disciplinary decision.",
          "Smart rostering and backfill suggests schedules and ranked replacement candidates. A person at your employer approves the roster.",
          "AI voice calling places reminder and confirmation calls on your employer’s behalf.",
        ],
      },
      {
        type: "p",
        text: "We do not make decisions with legal or similarly significant effect about any individual solely by automated means. We do not sell workforce data.",
      },
    ],
  },
  {
    id: "sharing-and-recipients",
    nav: "Sharing and recipients",
    title: "Who we share data with",
    blocks: [
      {
        type: "p",
        text: "We do not sell or rent personal data, and we do not share it with third parties for their own marketing. We share it only with:",
      },
      {
        type: "ul",
        items: [
          "Your employer or the customer that provisioned your account.",
          "Service providers acting on our instructions, such as cloud hosting, email, telephony and voice calling, analytics and customer support tools. They are bound by contract to confidentiality, security and lawful use.",
          "Our affiliates and professional advisers, where necessary.",
          "Government or law enforcement bodies where the law requires it.",
          "A successor, in the event of a merger or sale of our business, subject to this policy.",
        ],
      },
    ],
  },
  {
    id: "data-location",
    nav: "Data location",
    title: "Where data is stored",
    blocks: [
      {
        type: "p",
        text: "Platform data is hosted with our cloud hosting provider. If we transfer personal data outside India, we do so only to countries and recipients permitted under the DPDP Act and with contractual safeguards. For users in the European Economic Area or UK, we use standard contractual clauses where required.",
      },
    ],
  },
  {
    id: "cookies",
    nav: "Cookies",
    title: "Cookies and similar technologies",
    blocks: [
      {
        type: "p",
        text: "We use essential cookies to run the site and log in, and analytics cookies to understand which pages are useful. We use marketing cookies only with your consent.",
      },
      {
        type: "ul",
        items: [
          "Essential: security, session and language preference.",
          "Analytics: aggregated visit and performance data.",
          "Marketing: measuring campaigns, only if you accept.",
        ],
      },
      {
        type: "p",
        text: "You can change your choice through the cookie banner, or delete and block cookies in your browser settings. Blocking essential cookies may stop parts of the site from working. Embedded social buttons and third-party tools are governed by those providers’ own policies.",
      },
    ],
  },
  {
    id: "retention",
    nav: "Retention",
    title: "How long we keep data",
    blocks: [
      {
        type: "ul",
        items: [
          "Website enquiries and demo requests: for as long as needed to respond and follow up, then deleted or anonymised.",
          "Newsletter subscriptions: until you unsubscribe.",
          "Job applications: for a limited period after the role closes.",
          "Platform workforce data: for the term of your employer’s contract, then deleted or returned within a reasonable period after termination, unless the law requires longer. Backups are overwritten on a fixed rotation.",
        ],
      },
    ],
  },
  {
    id: "security",
    nav: "Security",
    title: "How we protect data",
    blocks: [
      {
        type: "p",
        text: "We use encryption in transit and at rest, role-based access control, audit logs, network and application security monitoring, and staff confidentiality obligations. Geofenced attendance accepts punches only inside the configured site boundary. No system is perfectly secure. If a personal data breach affects you, we will notify the affected parties and the Data Protection Board of India as the law requires. See our [security overview](/security).",
      },
    ],
  },
  {
    id: "your-rights",
    nav: "Your rights",
    title: "Your rights",
    blocks: [
      { type: "p", text: "Under the DPDP Act, you may:" },
      {
        type: "ul",
        items: [
          "Ask for a summary of the personal data we process and who we share it with.",
          "Ask us to correct, complete or update inaccurate data.",
          "Ask us to erase data that is no longer needed or withdraw your consent.",
          "Use our grievance process, and nominate another person to exercise your rights if you die or become incapacitated.",
        ],
      },
      {
        type: "p",
        text: "If the GDPR applies to you, you also have the rights to restrict or object to processing and to data portability, and to complain to your supervisory authority.",
      },
      {
        type: "p",
        text: "Email [privacy@shifteaze.io](mailto:privacy@shifteaze.io). We may ask you to verify your identity. We aim to respond within 30 days. If you are not satisfied, you may complain to the Data Protection Board of India after first using our grievance process.",
      },
    ],
  },
  {
    id: "children",
    nav: "Children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "Our website and Services are for businesses and their workers and are not directed at anyone under 18. We do not knowingly collect children’s personal data. If you believe we have, contact us and we will delete it.",
      },
    ],
  },
  {
    id: "policy-changes",
    nav: "Policy changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We update this policy as our Services or the law change. We will revise the “last updated” date above and, for material changes, notify account holders by email or in the product.",
      },
    ],
  },
  {
    id: "contact-and-grievances",
    nav: "Contact and grievances",
    title: "Contact and grievance officer",
    blocks: [
      {
        type: "contact",
        rows: [
          { label: "Email", value: "[privacy@shifteaze.io](mailto:privacy@shifteaze.io)" },
          {
            label: "Grievance Officer / Data Protection contact",
            value: "[grievance@shifteaze.io](mailto:grievance@shifteaze.io)",
          },
        ],
      },
      {
        type: "p",
        text: "We acknowledge grievances within 48 hours and resolve them within 30 days.",
      },
      { type: "p", text: "You can also reach us through our [contact page](/company#contact)." },
    ],
  },
];
