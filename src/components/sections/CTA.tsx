"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "@/components/ui/icons";
import { site } from "@/content/site";

const steps = [
  { n: "1", t: "Tell us your terminals", s: "Share how many sites, roles and shifts you run." },
  { n: "2", t: "See it on your data", s: "We stand up a scoped pilot on a representative terminal." },
  { n: "3", t: "Go live, one terminal at a time", s: "Roll out predictions and ShiftEaze Voice calling per site." },
];

export function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setErr(true);
      return;
    }
    setErr(false);
    setSent(true);
  };

  return (
    <section id="demo" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-white p-8 shadow-float sm:p-14">
          <div
            className="pointer-events-none absolute -inset-x-20 -top-40 h-[420px] bg-hero-glow"
            aria-hidden
          />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-teal-400/70" aria-hidden />
                Book a demo
              </span>
              <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-tighter text-fg">
                Get the platform that knows{" "}
                <span className="text-gradient">who&apos;ll show up.</span>
              </h2>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-fg-muted">
                See {site.name} run on a terminal like yours. We&apos;ll walk
                through auto-rostering, the prediction pipeline and {site.module}{" "}
                calling on real shift patterns.
              </p>

              <form onSubmit={submit} className="mt-8 max-w-md" noValidate>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-4"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-400 text-white">
                        <Check width={16} height={16} />
                      </span>
                      <div>
                        <div className="text-[15px] font-medium text-fg">
                          Request received.
                        </div>
                        <div className="text-[13px] text-fg-muted">
                          We&apos;ll reach out to {email} within one business day.
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="form" exit={{ opacity: 0 }}>
                      <div className="flex flex-col gap-2.5 sm:flex-row">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErr(false);
                          }}
                          placeholder="you@terminal.com"
                          aria-label="Work email"
                          aria-invalid={err}
                          className="h-[52px] flex-1 rounded-full border border-line-strong bg-ink-850 px-5 text-[15px] text-fg placeholder:text-fg-faint focus:border-teal-400/60 focus:bg-white focus:outline-none"
                        />
                        <Button size="lg" type="submit">
                          Book a demo
                          <ArrowRight width={16} height={16} />
                        </Button>
                      </div>
                      {err && (
                        <p className="mt-2 pl-2 text-[13px] text-risk-high">
                          Please enter a valid work email.
                        </p>
                      )}
                      <p className="mt-3 pl-2 text-[12.5px] text-fg-faint">
                        No spam. A workforce specialist, not a sales sequence.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            <div className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="glass flex items-start gap-4 rounded-xl p-5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-400/15 font-mono text-[13px] font-semibold text-teal-300">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-[15px] font-medium text-fg">
                      {s.t}
                    </div>
                    <div className="mt-0.5 text-[13.5px] leading-snug text-fg-muted">
                      {s.s}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
