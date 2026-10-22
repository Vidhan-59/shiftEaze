/**
 * The Contact page's single form (restructure brief, section 7.2). Mirrors
 * demo-form.ts's shape so the API route and component can reuse the same
 * patterns.
 */

export type ContactField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  half?: boolean;
  autoComplete?: string;
};

export const TOPICS = ["Sales and demos", "Customer support", "Partnerships and media"] as const;

export function topicSlug(topic: string): string {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function topicFromSlug(slug: string): string | undefined {
  return TOPICS.find((t) => topicSlug(t) === slug);
}

export const contactFields: ContactField[] = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "Priya Sharma", half: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "priya@company.com", half: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", placeholder: "Your company", half: true, autoComplete: "organization" },
  { name: "topic", label: "Topic", type: "select", required: true, half: true, options: [...TOPICS] },
  { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?" },
];

export const HONEYPOT = "company_website";
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export type ContactPayload = Record<string, string>;

export function validateContact(data: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of contactFields) {
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
