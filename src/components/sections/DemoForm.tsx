"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "@/components/ui/icons";
import {
  HONEYPOT,
  demoFields,
  validateDemo,
  type DemoPayload,
} from "@/content/demo-form";
import { cn } from "@/lib/utils";

const FIELD_BASE =
  "w-full rounded-xl border bg-ink-850 px-4 text-[14.5px] text-fg placeholder:text-fg-faint transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/25";

export function DemoForm() {
  const [data, setData] = useState<DemoPayload>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const set = (name: string, value: string) => {
    setData((d) => ({ ...d, [name]: value }));
    // Clear this field's error as soon as the user starts fixing it.
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateDemo(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFormError(null);
      // Move focus to the first problem so keyboard users aren't stranded.
      document.getElementById(`demo-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setFormError(
          json.error ?? "Something went wrong. Please try again."
        );
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError(
        "Couldn't reach the server. Check your connection and try again."
      );
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4 rounded-2xl border border-teal-500/30 bg-teal-500/[0.08] px-5 py-6"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-400 text-white">
          <Check width={17} height={17} />
        </span>
        <div>
          <div className="text-[16px] font-semibold text-fg">
            Request received.
          </div>
          <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-fg-muted">
            Thanks {data.name?.split(" ")[0] || ""} — a workforce specialist
            will reach out to{" "}
            <span className="font-medium text-fg">{data.email}</span> within one
            business day.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {demoFields.map((f) => {
          const id = `demo-${f.name}`;
          const err = errors[f.name];
          const invalid = Boolean(err);
          return (
            <div
              key={f.name}
              className={cn("flex flex-col gap-1.5", !f.half && "sm:col-span-2")}
            >
              <label
                htmlFor={id}
                className="pl-0.5 text-[12.5px] font-medium text-fg-muted"
              >
                {f.label}
                {f.required && (
                  <span className="ml-0.5 text-accent-500" aria-hidden>
                    *
                  </span>
                )}
              </label>

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
                    FIELD_BASE,
                    "resize-y py-3 leading-relaxed",
                    invalid
                      ? "border-risk-high/60"
                      : "border-line-strong focus:border-teal-400/60"
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
                    FIELD_BASE,
                    "h-[46px] appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
                    (data[f.name] ?? "") === "" && "text-fg-faint",
                    invalid
                      ? "border-risk-high/60"
                      : "border-line-strong focus:border-teal-400/60"
                  )}
                  style={{
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
                    FIELD_BASE,
                    "h-[46px]",
                    invalid
                      ? "border-risk-high/60"
                      : "border-line-strong focus:border-teal-400/60"
                  )}
                />
              )}

              {err && (
                <p id={`${id}-err`} className="pl-0.5 text-[12.5px] text-risk-high">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. Not `display:none`,
          which some bots skip; pushed out of the viewport instead. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`demo-${HONEYPOT}`}>Company website</label>
        <input
          id={`demo-${HONEYPOT}`}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data[HONEYPOT] ?? ""}
          onChange={(e) => set(HONEYPOT, e.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button size="lg" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Book a demo"}
          {status !== "sending" && <ArrowRight width={16} height={16} />}
        </Button>
        <p className="text-[12.5px] text-fg-faint">
          No spam. A workforce specialist, not a sales sequence.
        </p>
      </div>

      <AnimatePresence>
        {formError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-3 rounded-lg border border-risk-high/30 bg-risk-high/[0.06] px-3 py-2 text-[13px] text-risk-high"
          >
            {formError}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
