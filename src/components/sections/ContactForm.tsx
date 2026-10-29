"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "@/components/ui/icons";
import {
  HONEYPOT,
  contactFields,
  validateContact,
  type ContactPayload,
} from "@/content/contact-form";
import { cn } from "@/lib/utils";

const FIELD_BASE =
  "w-full rounded-xl border bg-ink-850 px-4 text-[14.5px] text-fg placeholder:text-fg-faint transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/25";

const DARK_FIELD =
  "w-full rounded-2xl border border-white/40 bg-white/5 bg-gradient-to-br from-white/[0.22] to-white/[0.06] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_24px_-14px_rgba(0,0,10,0.6)] backdrop-blur-md text-[14.5px] text-white placeholder:text-white/55 transition-colors focus:border-white focus:from-white/30 focus:outline-none focus:ring-2 focus:ring-white/30";

const ico = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const FIELD_ICONS: Record<string, () => React.ReactElement> = {
  name: () => (
    <svg {...ico} aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  ),
  email: () => (
    <svg {...ico} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  company: () => (
    <svg {...ico} aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
    </svg>
  ),
  topic: () => (
    <svg {...ico} aria-hidden>
      <path d="M3 12V4h8l9.5 9.5a2 2 0 0 1 0 2.8l-4.7 4.7a2 2 0 0 1-2.8 0L3 12Z" />
      <circle cx="7.5" cy="8.5" r="1.2" />
    </svg>
  ),
  message: () => (
    <svg {...ico} aria-hidden>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  ),
};

export function ContactForm({ initialTopic, tone = "light" }: { initialTopic?: string; tone?: "light" | "navy" }) {
  const dark = tone === "navy";
  const base = dark ? DARK_FIELD : FIELD_BASE;
  const edge = (invalid: boolean) =>
    dark ? (invalid ? "!border-[#ffb3ba]" : "") : invalid ? "border-risk-high/60" : "border-line-strong focus:border-teal-400/60";
  const [data, setData] = useState<ContactPayload>(
    initialTopic ? { topic: initialTopic } : {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const set = (name: string, value: string) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateContact(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFormError(null);
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setFormError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex items-start gap-4 rounded-2xl border px-5 py-6", dark ? "border-white/30 bg-white/10" : "border-teal-500/30 bg-teal-500/[0.08]")}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-400 text-white">
          <Check width={17} height={17} />
        </span>
        <div>
          <div className={cn("text-[16px] font-semibold", dark ? "text-white" : "text-fg")}>Message received.</div>
          <p className={cn("mt-1 max-w-sm text-[14px] leading-relaxed", dark ? "text-white/80" : "text-fg-muted")}>
            We'll get back to you at{" "}
            <span className={cn("font-medium", dark ? "text-white" : "text-fg")}>{data.email}</span> shortly.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className={dark ? "" : "mt-8"} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {contactFields.map((f) => {
          const id = `contact-${f.name}`;
          const err = errors[f.name];
          const invalid = Boolean(err);
          const FieldIcon = dark ? FIELD_ICONS[f.name] : undefined;
          return (
            <div
              key={f.name}
              className={cn("flex flex-col gap-1.5", !f.half && "sm:col-span-2")}
            >
              <label htmlFor={id} className={cn("pl-0.5 text-[12.5px] font-medium", dark ? "text-white/85" : "text-fg-muted")}>
                {f.label}
                {f.required && (
                  <span className={cn("ml-0.5", dark ? "text-[#ffb3ba]" : "text-accent-500")} aria-hidden>
                    *
                  </span>
                )}
              </label>

              <div className="relative">
              {FieldIcon && (
                <span className={cn("pointer-events-none absolute left-4 z-10 -translate-y-1/2 text-white/80", f.type === "textarea" ? "top-[24px]" : "top-[23px]")}>
                  <FieldIcon />
                </span>
              )}
              {f.type === "textarea" ? (
                <textarea
                  id={id}
                  name={f.name}
                  rows={4}
                  value={data[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  aria-invalid={invalid}
                  aria-describedby={err ? `${id}-err` : undefined}
                  className={cn(
                    base,
                    dark && "pl-12",
                    "resize-y py-3 leading-relaxed",
                    edge(invalid)
                  )}
                />
              ) : f.type === "select" ? (
                <select
                  id={id}
                  name={f.name}
                  value={data[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  aria-invalid={invalid}
                  aria-describedby={err ? `${id}-err` : undefined}
                  className={cn(
                    base,
                    dark && "pl-12",
                    "h-[46px] appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
                    (data[f.name] ?? "") === "" && (dark ? "text-white/55" : "text-fg-faint"),
                    edge(invalid)
                  )}
                  style={{
                    ...(dark ? { backgroundColor: "rgba(255,255,255,0.1)" } : null),
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23868cac' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o} className="text-fg">
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={f.name}
                  type={f.type}
                  value={data[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  aria-invalid={invalid}
                  aria-describedby={err ? `${id}-err` : undefined}
                  className={cn(
                    base,
                    dark && "pl-12",
                    "h-[46px]",
                    edge(invalid)
                  )}
                />
              )}
              </div>

              {err && (
                <p id={`${id}-err`} className={cn("pl-0.5 text-[12.5px]", dark ? "text-[#ffb3ba]" : "text-risk-high")}>
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`contact-${HONEYPOT}`}>Company website</label>
        <input
          id={`contact-${HONEYPOT}`}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data[HONEYPOT] ?? ""}
          onChange={(e) => set(HONEYPOT, e.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {dark ? (
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex h-[56px] items-center gap-3 rounded-full bg-white p-[5px] pr-7 text-[15.5px] font-bold text-[#302e86] shadow-[0_16px_34px_-14px_rgba(0,0,0,0.6)] transition-colors hover:bg-[#eaf0ff] disabled:opacity-70"
          >
            <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-[#302e86] text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight width={17} height={17} />
            </span>
            {status === "sending" ? "Sending…" : "Contact Us"}
          </button>
        ) : (
          <Button size="lg" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Contact Us"}
            {status !== "sending" && <ArrowRight width={16} height={16} />}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {formError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className={cn("mt-3 rounded-lg border px-3 py-2 text-[13px]", dark ? "border-white/30 bg-white/10 text-[#ffd0d4]" : "border-risk-high/30 bg-risk-high/[0.06] text-risk-high")}
          >
            {formError}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
