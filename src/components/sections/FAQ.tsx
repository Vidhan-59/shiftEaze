"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FillButton } from "@/components/ui/FillButton";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LogoIcon } from "@/components/layout/Logo";
import { pricingFaqs } from "@/content/pricing";
import { cn } from "@/lib/utils";

function PlusToggle({ open }: { open: boolean }) {
  return (
    <span className={cn("relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300", open ? "bg-[#2f6bff]" : "bg-[#eaf0ff]")}>
      <span className={cn("absolute h-0.5 w-3.5 rounded-full transition-colors", open ? "bg-white" : "bg-[#2f6bff]")} />
      <span className={cn("absolute h-3.5 w-0.5 rounded-full transition-all duration-300", open ? "rotate-90 bg-white" : "bg-[#2f6bff]")} />
    </span>
  );
}

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-[#fde68a] px-0.5 text-fg">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/** The answer shows at once as a chat reply: no typing delay, just a quick fade-in. */
function ChatAnswer({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="space-y-3 px-5 pb-6 sm:px-6">
      <div className="flex justify-end" style={{ animation: "fade-up 0.22s ease both" }}>
        <span className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#2f6bff] to-[#302e86] px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(47,107,255,0.8)]">
          {question}
        </span>
      </div>
      <div className="flex items-end gap-2.5" style={{ animation: "fade-up 0.28s ease 0.05s both" }}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-card ring-1 ring-line-strong">
          <LogoIcon className="h-5" />
        </span>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-line-strong bg-white px-4 py-3 text-[15px] font-medium leading-relaxed text-[#1f2340] shadow-card">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" jumps to the search box, like most docs sites
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key === "/" && t && !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const needle = q.trim().toLowerCase();
  const items = pricingFaqs
    .map((f, i) => ({ ...f, i }))
    .filter((f) => !needle || f.q.toLowerCase().includes(needle) || f.a.toLowerCase().includes(needle));

  return (
    <section id="faq" className="relative isolate scroll-mt-20 overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-0 h-80 w-80 animate-aurora rounded-full bg-[#2f6bff]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 animate-aurora rounded-full bg-accent-500/10 blur-3xl [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(48,46,134,0.1)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(60%_70%_at_30%_40%,#000,transparent)]" />
      </div>
      <Container className="max-w-[1280px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(47,107,255,0.45)] ring-1 ring-[#2f6bff]/15 backdrop-blur-xl sm:p-8">
              <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-aurora rounded-full bg-[#2f6bff]/20 blur-3xl" />
              <span className="absolute inset-x-0 top-0 h-1 animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto]" />

              <span className="relative inline-flex items-center gap-2 rounded-full bg-[#eaf0ff] px-3 py-1 font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#2f6bff]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2f6bff]" />
                  <span className="relative h-2 w-2 rounded-full bg-[#2f6bff]" />
                </span>
                FAQ
              </span>
              <SectionTitle
                title="Questions, answered."
                lead="Everything ops and procurement usually ask before a pilot. Still unsure? Book a demo and we'll walk your terminals through it."
                align="left"
                className="relative mt-3 max-w-none"
              />

              {/* search, with a real icon and a "/" shortcut */}
              <label className="relative mt-7 block">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#2f6bff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setOpenIndex(null);
                  }}
                  placeholder="Search the questions"
                  aria-label="Search the questions"
                  className="w-full rounded-full border border-line-strong bg-white py-3.5 pl-11 pr-14 text-[14.5px] font-medium text-fg shadow-card outline-none transition-shadow placeholder:text-fg-faint focus:border-[#2f6bff] focus:shadow-[0_0_0_4px_rgba(47,107,255,0.15)]"
                />
                {q ? (
                  <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#eef3ff] text-[13px] font-bold text-[#2f6bff] hover:bg-[#dbe6ff]">
                    ×
                  </button>
                ) : (
                  <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-line-strong bg-[#f4f7ff] px-2 py-0.5 font-mono text-[11px] font-bold text-fg-faint">/</kbd>
                )}
              </label>

              {/* jump stepper: one tile per question; click to open it */}
              <div className="relative mt-5">
                <div className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-faint">
                  <span>
                    <span className="text-[#2f6bff]">{items.length}</span> of {pricingFaqs.length} questions
                  </span>
                  <span className="flex gap-3">
                    <button onClick={() => setOpenIndex(items[0]?.i ?? null)} className="text-[#2f6bff] hover:text-teal-400">
                      Open first
                    </button>
                    <button onClick={() => setOpenIndex(null)} className="text-[#2f6bff] hover:text-teal-400">
                      Close all
                    </button>
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pricingFaqs.map((_, i) => {
                    const shown = items.some((it) => it.i === i);
                    const on = openIndex === i;
                    return (
                      <button
                        key={i}
                        disabled={!shown}
                        onClick={() => {
                          setOpenIndex(i);
                          document.getElementById("faq-trigger-" + i)?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        aria-label={"Open question " + (i + 1)}
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl font-mono text-[12.5px] font-bold transition-all duration-300",
                          on
                            ? "-translate-y-0.5 bg-gradient-to-br from-[#2f6bff] to-[#302e86] text-white shadow-[0_10px_22px_-8px_rgba(47,107,255,0.9)]"
                            : shown
                              ? "border border-line-strong bg-white text-[#302e86] hover:-translate-y-0.5 hover:border-[#2f6bff]/60 hover:text-[#2f6bff]"
                              : "border border-dashed border-line bg-transparent text-fg-faint/40",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* still-unsure card */}
              <div className="relative mt-7 overflow-hidden rounded-2xl bg-gradient-to-br from-[#302e86] to-[#15144d] p-5 text-white">
                <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#2f6bff]/40 blur-2xl" />
                <span className="pointer-events-none absolute right-4 top-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 font-display text-[30px] font-extrabold ring-1 ring-white/20" style={{ animation: "frame-float 6s ease-in-out infinite" }} aria-hidden>
                  ?
                </span>
                <div className="relative max-w-[70%] font-display text-[17px] font-extrabold leading-snug">Still unsure?</div>
                <div className="relative mt-1 max-w-[70%] text-[13px] font-medium text-white/75">We will walk your terminals through it.</div>
                <div className="relative mt-4">
                  <FillButton href="/request-demo" tone="blue" className="origin-left scale-90 shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-white/70">
                    Book a demo
                  </FillButton>
                </div>
              </div>
            </div>
          </div>

          <div>
            <RevealGroup className="space-y-3.5" gap={0.07}>
              {items.map((item) => {
                const open = openIndex === item.i;
                return (
                  <RevealItem key={item.q}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-3xl border transition-all duration-300",
                        open
                          ? "border-[#2f6bff]/40 bg-gradient-to-br from-white to-[#eef3ff] shadow-float"
                          : "border-line-strong bg-white shadow-card hover:-translate-y-0.5 hover:border-[#2f6bff]/30 hover:shadow-card-hover",
                      )}
                    >
                      {/* Wrapped in a heading so the FAQ is navigable by heading —
                          a bare list of buttons gives screen readers no structure. */}
                      <h3>
                        <button
                          onClick={() => setOpenIndex(open ? null : item.i)}
                          aria-expanded={open}
                          aria-controls={`faq-panel-${item.i}`}
                          id={`faq-trigger-${item.i}`}
                          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                        >
                          <span className={cn("font-mono text-[13px] font-bold transition-colors", open ? "text-[#2f6bff]" : "text-fg-faint")}>
                            {String(item.i + 1).padStart(2, "0")}
                          </span>
                          <span className={cn("flex-1 text-[16.5px] font-bold leading-snug transition-colors", open ? "text-fg" : "text-[#1f2340]")}>
                            <Highlight text={item.q} q={q.trim()} />
                          </span>
                          <PlusToggle open={open} />
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`faq-panel-${item.i}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${item.i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <ChatAnswer question={item.q} answer={item.a} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {items.length === 0 && (
              <div className="rounded-3xl border border-dashed border-line-strong bg-white p-8 text-center shadow-card">
                <div className="font-display text-[20px] font-extrabold text-fg">No question matches that.</div>
                <button onClick={() => setQ("")} className="mt-4 rounded-full bg-[#2f6bff] px-5 py-2 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(47,107,255,0.8)] hover:bg-[#1f55d9]">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
