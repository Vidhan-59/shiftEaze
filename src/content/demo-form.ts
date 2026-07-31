/**
 * Single definition of the demo-request form, imported by both the form
 * component and the API route, so client and server validation can't drift
 * apart and the email body always matches what was actually asked.
 */

export type DemoField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** Half-width on desktop. */
  half?: boolean;
  autoComplete?: string;
};

export const demoFields: DemoField[] = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    required: true,
    placeholder: "Priya Sharma",
    half: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    placeholder: "priya@company.com",
    half: true,
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    required: true,
    placeholder: "Terminal or logistics operator",
    half: true,
    autoComplete: "organization",
  },
  {
    name: "role",
    label: "Job title",
    type: "text",
    placeholder: "Head of Operations",
    half: true,
    autoComplete: "organization-title",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+91 98765 43210",
    half: true,
    autoComplete: "tel",
  },
  {
    name: "country",
    label: "Country / region",
    type: "text",
    placeholder: "India",
    half: true,
    autoComplete: "country-name",
  },
  {
    name: "terminals",
    label: "Terminals or sites",
    type: "select",
    half: true,
    options: ["1", "2–5", "6–15", "16–50", "50+"],
  },
  {
    name: "operators",
    label: "Operators to manage",
    type: "select",
    half: true,
    options: ["Under 100", "100–500", "500–1,000", "1,000–5,000", "5,000+"],
  },
  {
    name: "timeline",
    label: "Timeline",
    type: "select",
    half: true,
    options: [
      "Just exploring",
      "Evaluating now",
      "Budgeted, this quarter",
      "Urgent — active problem",
    ],
  },
  {
    name: "interest",
    label: "Most interested in",
    type: "select",
    half: true,
    options: [
      "Auto-rostering",
      "Absence prediction",
      "ShiftEaze Voice (AI calling)",
      "Dashboards & analytics",
      "The whole platform",
    ],
  },
  {
    name: "message",
    label: "What would you like to see?",
    type: "textarea",
    placeholder:
      "Tell us about your shift patterns, current tooling, or the problem you're trying to solve.",
  },
];

/** Hidden field; real people never fill it, bots usually do. */
export const HONEYPOT = "company_website";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type DemoPayload = Record<string, string>;

/** Shared validation. Returns a map of field name → error message. */
export function validateDemo(data: DemoPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of demoFields) {
    const v = (data[f.name] ?? "").trim();
    if (f.required && !v) {
      errors[f.name] = `${f.label} is required.`;
      continue;
    }
    if (f.type === "email" && v && !EMAIL_RE.test(v)) {
      errors[f.name] = "Enter a valid email address.";
    }
    if (v.length > 2000) {
      errors[f.name] = "That's longer than we can accept.";
    }
  }
  return errors;
}
