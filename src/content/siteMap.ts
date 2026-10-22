import { MANAGED_ROSTERING_PUBLISHED } from "./config";

/**
 * The single source of truth for every page and section (restructure brief
 * v3, section 3: "put every page, URL, section id and heading in a single
 * file"). The header dropdowns, the footer, the breadcrumbs and
 * sitemap.xml all read from this file.
 */
export type Section = { id: string; name: string };

export type SitePage = {
  key: string;
  /** Nav/breadcrumb label. */
  name: string;
  href: string;
  /** In page order. Drives, by default, the header dropdown. */
  sections?: Section[];
  /**
   * Overrides `sections` for the header dropdown only. Solutions' dropdown
   * shows just its first 5 sections — not Managed Rostering Services, not
   * the Use Cases table (brief §4).
   */
  dropdownSections?: Section[];
};

const platformSections: Section[] = [
  { id: "ai-workforce-operations-platform", name: "AI Workforce Operations Platform" },
  { id: "ai-rostering-shift-scheduling-software", name: "AI Rostering & Shift Scheduling Software" },
  { id: "ai-absence-prediction-overtime-backfill", name: "AI Absence Prediction & Overtime Backfill" },
  { id: "geofenced-employee-attendance-software", name: "Geofenced Employee Attendance Software" },
  { id: "workforce-analytics-real-time-dashboards", name: "Workforce Analytics & Real-Time Dashboards" },
  { id: "ai-voice-calling-workforce-management", name: "AI Voice Calling for Workforce Management" },
  { id: "workforce-performance-worker-passbook", name: "Workforce Performance & Worker Passbook" },
  { id: "employee-leave-management-software", name: "Employee Leave Management Software" },
  { id: "security", name: "Security" },
];

// The 5 fixed Solutions sections — also the full header dropdown list
// (brief §4: "the first 5 sections... Not Managed Rostering Services").
const solutionsCoreSections: Section[] = [
  { id: "shift-based-workforce-management", name: "Shift-Based Workforce Management" },
  { id: "multi-site-workforce-management", name: "Multi-Site Workforce Management" },
  { id: "workforce-scheduling-optimization", name: "Workforce Scheduling Optimization" },
  { id: "overtime-backfill-management", name: "Overtime & Backfill Management" },
  { id: "workforce-attendance-payroll-accuracy", name: "Workforce Attendance & Payroll Accuracy" },
];

const solutionsSections: Section[] = [
  ...solutionsCoreSections,
  // Managed Rostering Services is deliberately absent here while the flag is
  // false (brief §5.4: not in the dropdown, jump links, footer, or cards).
  ...(MANAGED_ROSTERING_PUBLISHED
    ? [{ id: "managed-rostering-services", name: "Managed Rostering Services" }]
    : []),
  { id: "use-cases", name: "What teams use ShiftEaze for" },
];

const industriesSections: Section[] = [
  { id: "port-terminal-workforce-management", name: "Port & Terminal Workforce Management" },
  { id: "manufacturing-workforce-management", name: "Manufacturing Workforce Management" },
  { id: "logistics-warehousing-workforce-management", name: "Logistics & Warehousing Workforce Management" },
  { id: "staffing-manpower-agency-workforce-management", name: "Staffing & Manpower Agency Workforce Management" },
];

const resourcesSections: Section[] = [
  { id: "learn-from-the-field", name: "Learn from the field: guides for modern workforce operations" },
  { id: "workforce-management", name: "Workforce Management" },
  { id: "shift-scheduling-rostering", name: "Shift Scheduling & Rostering" },
  { id: "ai-workforce-management", name: "AI Workforce Management" },
  { id: "employee-attendance", name: "Employee Attendance" },
  { id: "workforce-analytics", name: "Workforce Analytics" },
  { id: "port-workforce-management", name: "Port Workforce Management" },
  { id: "featured-guide", name: "Featured guide" },
];

export const siteMap: SitePage[] = [
  { key: "home", name: "Home", href: "/" },
  { key: "platform", name: "Platform", href: "/platform", sections: platformSections },
  {
    key: "solutions",
    name: "Solutions",
    href: "/solutions",
    sections: solutionsSections,
    dropdownSections: solutionsCoreSections,
  },
  { key: "industries", name: "Industries", href: "/industries", sections: industriesSections },
  { key: "pricing", name: "Pricing", href: "/pricing" },
  {
    key: "case-studies",
    name: "Case Studies",
    href: "/case-studies",
    sections: [
      { id: "customer-stories", name: "Customer Stories" },
      { id: "mundra-port-workforce-management-case-study", name: "Mundra Port Workforce Management Case Study" },
    ],
  },
  { key: "resources", name: "Resources", href: "/resources", sections: resourcesSections },
  {
    key: "company",
    name: "Company",
    href: "/company",
    sections: [
      { id: "about-shiftease", name: "About ShiftEaze" },
      { id: "contact", name: "Contact" },
    ],
  },
  { key: "request-demo", name: "Request a Demo", href: "/request-demo" },
];

export function page(key: string): SitePage {
  const p = siteMap.find((s) => s.key === key);
  if (!p) throw new Error(`siteMap: unknown page key "${key}"`);
  return p;
}

/** A page's section by anchor id, e.g. for a teaser card or button target. */
export function section(pageKey: string, sectionId: string): Section {
  const s = (page(pageKey).sections ?? []).find((sec) => sec.id === sectionId);
  if (!s) throw new Error(`siteMap: unknown section "${sectionId}" on page "${pageKey}"`);
  return s;
}

