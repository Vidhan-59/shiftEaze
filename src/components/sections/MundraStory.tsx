"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Calendar, Check, Layers, Shield, Target } from "@/components/ui/icons";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Figures taken from the summary sentence itself. */
const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6000, suffix: "+", label: "operators" },
  { value: 12, suffix: "+", label: "terminals and divisions" },
  { value: 6, suffix: "", label: "terminals rostered live" },
  { value: 3, suffix: "", label: "languages for planners" },
  { value: 5, suffix: "", label: "AI voice calling scenarios in production" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const STEP_MS = 4200;

/** A small illustrative scene for each "after" point (drawn for this page, not product screenshots). */
function AfterScene({ i }: { i: number }) {
  if (i === 0) {
    const pattern = ["D", "D", "N", "N", "O", "O", "D", "D", "N", "N", "O", "O", "D", "D", "N", "N", "O", "O", "D", "D", "N"];
    return (
      <div className="w-full max-w-[420px]">
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
          <span>Build once</span>
          <span>Reuse everywhere</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {pattern.map((p, k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: k * 0.04, duration: 0.35 }}
              className={cn(
                "grid h-9 place-items-center rounded-lg font-mono text-[12px] font-bold",
                p === "D" ? "bg-[#34d399] text-[#0d0c2b]" : p === "N" ? "bg-[#12113a] text-white ring-1 ring-white/30" : "bg-white/25 text-white",
              )}
            >
              {p}
            </motion.span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Terminal 1", "Terminal 2", "Terminal 3"].map((t, k) => (
            <motion.span key={t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + k * 0.2 }} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] font-bold text-[#302e86]">
              <Check width={11} height={11} /> {t}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="relative grid w-full max-w-[420px] grid-cols-[auto_1fr] items-center gap-6">
        <div className="relative grid h-36 w-36 place-items-center">
          {[0, 1, 2].map((k) => (
            <motion.span key={k} className="absolute inset-0 rounded-full border border-[#7cc4ff]" initial={{ scale: 0.4, opacity: 0.8 }} animate={{ scale: 1.15, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, delay: k * 0.8, ease: "easeOut" }} />
          ))}
          <span className="grid h-[88px] w-[88px] grid-cols-5 gap-[3px] rounded-xl bg-white p-2">
            {Array.from({ length: 25 }, (_, k) => (
              <span key={k} className={cn("rounded-[2px]", [0, 1, 3, 4, 5, 9, 10, 12, 14, 15, 19, 20, 21, 23, 24, 7, 17].includes(k) ? "bg-[#12153d]" : "bg-[#e3e8f5]")} />
            ))}
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" /> Live dashboard
          </div>
          {["Inside the geofence", "Scan to punch in", "Counted instantly"].map((t, k) => (
            <motion.div key={t} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.3 }} className="flex items-center gap-2 text-[14px] font-bold text-white">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[#302e86]">
                <Check width={11} height={11} />
              </span>
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  if (i === 2) {
    const rows = [
      { n: "Operator A", r: 22, c: "#34d399" },
      { n: "Operator B", r: 58, c: "#fbbf24" },
      { n: "Operator C", r: 86, c: "#fb7185" },
    ];
    return (
      <div className="w-full max-w-[420px] space-y-3">
        {rows.map((r, k) => (
          <div key={r.n} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[12.5px] font-bold text-white/85">{r.n}</span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/15">
              <motion.span className="block h-full rounded-full" style={{ background: r.c }} initial={{ width: 0 }} animate={{ width: `${r.r}%` }} transition={{ duration: 0.9, delay: 0.2 + k * 0.25, ease: easeExpo }} />
            </span>
          </div>
        ))}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[13.5px] font-bold text-[#302e86]">
          <Target width={16} height={16} /> Overtime backfill suggested days ahead
        </motion.div>
      </div>
    );
  }
  if (i === 3) {
    const items = [
      { t: "Leave request", s: "Approved", c: "bg-[#34d399] text-[#0d0c2b]" },
      { t: "Leave request", s: "Rejected", c: "bg-[#fb7185] text-white" },
      { t: "Leave request", s: "Pending", c: "bg-white/80 text-[#302e86]" },
    ];
    return (
      <div className="w-full max-w-[420px] space-y-2.5">
        {items.map((it, k) => (
          <motion.div key={k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.25 }} className="flex items-center justify-between rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/20">
            <span className="flex items-center gap-2.5 text-[14px] font-bold text-white">
              <Calendar width={16} height={16} /> {it.t}
            </span>
            <span className={cn("rounded-full px-3 py-1 text-[11.5px] font-extrabold", it.c)}>{it.s}</span>
          </motion.div>
        ))}
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">Every outcome tracked</div>
      </div>
    );
  }
  return (
    <div className="relative grid w-full max-w-[420px] grid-cols-[auto_1fr] items-center gap-5">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="w-[150px] rounded-2xl bg-white p-4 text-[#12153d] shadow-[0_24px_46px_-18px_rgba(0,0,0,0.7)]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#eaf0ff] text-[#302e86]">
          <Shield width={22} height={22} />
        </span>
        <div className="mt-3 font-display text-[15px] font-extrabold">One worker ID</div>
        <div className="mt-1 text-[11.5px] font-semibold text-[#6b7392]">goes with the worker</div>
      </motion.div>
      <div className="space-y-3">
        {["Crane moves", "Attendance"].map((t, k) => (
          <motion.div key={t} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.3 }} className="relative flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2.5 text-[13.5px] font-bold text-white ring-1 ring-white/25">
            <span className="absolute -left-5 top-1/2 h-px w-5 bg-[#7cc4ff]" />
            <Layers width={15} height={15} /> {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * The Mundra case study: key figures, a photo-backed summary, then a Before
 * card beside an interactive "After" panel that walks through each point.
 */
export function MundraStory({
  id,
  heading,
  summary,
  before,
  after,
}: {
  id: string;
  heading: string;
  summary: string;
  before: string;
  after: string[];
}) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % after.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, paused, after.length]);

  return (
    <section id={id} className="relative scroll-mt-[120px] overflow-hidden bg-gradient-to-b from-white to-[#f4f7ff] py-14 sm:py-16 lg:py-20">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <SectionTitle title={heading} align="left" className="max-w-4xl" />

        {/* key figures */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className={cn(i === STATS.length - 1 && "col-span-2 lg:col-span-1")}>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-5 shadow-[0_18px_40px_-26px_rgba(48,46,134,0.5)] ring-1 ring-[#302e86]/10 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#2f6bff]/10 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative font-display text-[clamp(2rem,3.2vw,2.8rem)] font-extrabold leading-none tracking-tight text-[#302e86]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="relative mt-2 text-[14px] font-semibold leading-snug text-fg-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* summary */}
        <Reveal className="mt-6">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-[#0d0c2b] p-7 text-white shadow-float sm:p-10">
            <div aria-hidden className="absolute inset-0 -z-10">
              <Photo name="terminal-aerial" alt="" ratio="fill" sizes="100vw" className="h-full" imgClassName="object-cover opacity-45" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c2b] via-[#0d0c2b]/80 to-[#302e86]/40" />
            </div>
            <p className="max-w-5xl text-[18px] leading-relaxed text-white/95 sm:text-[20px]">
              <strong className="mr-1 font-display font-extrabold text-[#7cc4ff]">Summary:</strong>
              {summary}
            </p>
          </div>
        </Reveal>

        {/* before -> after */}
        <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[0.8fr_auto_1.6fr] lg:gap-5">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[30px] bg-white p-7 shadow-[0_18px_40px_-26px_rgba(48,46,134,0.5)] ring-1 ring-[#302e86]/10 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e9ebf3] px-3.5 py-1.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#4a5072]">
                <span className="h-2 w-2 rounded-full bg-[#9aa0b4]" /> Before
              </span>
              <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">
                <strong className="font-bold text-fg">Before: </strong>
                {before}
              </p>
              {/* a patchy spreadsheet */}
              <div className="mt-6 grid grid-cols-6 gap-1" aria-hidden>
                {Array.from({ length: 30 }, (_, i) => {
                  const gap = (i * 7) % 5 === 0;
                  const unsure = !gap && (i * 3) % 4 === 0;
                  return (
                    <span key={i} className={cn("grid h-8 place-items-center rounded-md border font-mono text-[11px] font-bold", gap ? "border-[#cfd3e2] bg-[#eef0f6] text-[#9aa0b4]" : unsure ? "border-dashed border-[#cfd3e2] bg-white text-[#9aa0b4]" : "border-[#e3e6f0] bg-[#f6f7fb] text-[#c3c8d8]")}>
                      {gap ? "A" : unsure ? "?" : ""}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* connector */}
          <div className="hidden items-center lg:flex" aria-hidden>
            <motion.span
              className="grid h-12 w-12 place-items-center rounded-full bg-[#302e86] text-white shadow-[0_14px_28px_-10px_rgba(48,46,134,0.8)]"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>

          <Reveal delay={0.1}>
            <div
              className="relative h-full overflow-hidden rounded-[30px] bg-gradient-to-br from-[#3b3fd0] via-[#2b2aa0] to-[#1a1870] p-5 text-white shadow-[0_30px_60px_-28px_rgba(38,34,97,0.8)] ring-1 ring-white/20 sm:p-7"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              <span aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 animate-aurora rounded-full bg-[#4d7cff]/45 blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#302e86]">
                <span className="h-2 w-2 rounded-full bg-[#34d399]" /> After
              </span>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <ul className="space-y-2" role="tablist">
                  {after.map((a, i) => {
                    const on = i === step;
                    return (
                      <li key={a}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={on}
                          onClick={() => setStep(i)}
                          className={cn("relative flex w-full items-start gap-3 overflow-hidden rounded-2xl px-3.5 py-3 text-left transition-all duration-300", on ? "bg-white text-[#12153d] shadow-[0_16px_30px_-16px_rgba(0,0,0,0.6)]" : "bg-white/10 text-white hover:bg-white/15")}
                        >
                          <span className={cn("mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold", on ? "bg-[#302e86] text-white" : "bg-white/20 text-white")}>{i + 1}</span>
                          <span className="text-[15px] font-semibold leading-snug">{a}</span>
                          {on && (
                            <motion.span
                              key={`${step}-${paused}`}
                              className="absolute bottom-0 left-0 h-[3px] bg-[#2f6bff]"
                              initial={{ width: paused ? "100%" : "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: paused ? 0 : STEP_MS / 1000, ease: "linear" }}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="relative grid min-h-[260px] place-items-center overflow-hidden rounded-2xl bg-black/20 p-5 ring-1 ring-white/20 backdrop-blur-sm">
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1.2px,transparent_1.2px)] bg-[size:22px_22px] [mask-image:radial-gradient(70%_80%_at_50%_50%,#000,transparent)]" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={step} className="relative w-full" style={{ display: "grid", placeItems: "center" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                      <AfterScene i={step} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
