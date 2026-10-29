"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Brain, Check, Refresh, Target } from "@/components/ui/icons";
import { howItWorks } from "@/content/home";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Hero artwork for ShiftEaze's one idea: a single source of truth with two faces.
 * A manager portal (roster, live numbers) and an operator app (punch-in) sit side by side
 * and step through the real workflow together: plan, flag a gap, backfill, punch in.
 * Drawn on a fixed 620x540 canvas and scaled to fit its column.
 */

const W = 620;
const H = 540;
const ROWS = 6;
const COLS = 14;
const STEPS = 5;
const TICK_MS = 2800;

const ON_SITE = [598, 611, 624, 631, 631];
const AT_RISK = [12, 57, 9, 9, 9];
const BACKFILLED = [0, 0, 48, 48, 48];

type Cell = "off" | "shift" | "risk" | "fill";

function cellAt(r: number, c: number, step: number): Cell {
  const base = (r * 5 + c * 3) % 7;
  if (base < 2) return "off";
  const risky = (r * 3 + c * 7) % 11 === 0;
  if (risky && step === 1) return "risk";
  if (risky && step >= 2) return "fill";
  return "shift";
}

const CELL_CLASS: Record<Cell, string> = {
  off: "bg-teal-100",
  shift: "bg-teal-400",
  risk: "bg-accent-500",
  fill: "bg-emerald-400",
};

const QR = [
  "1110111",
  "1010101",
  "1110110",
  "0001011",
  "1101101",
  "0101110",
  "1110101",
];

function Num({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PhoneScreen({ step }: { step: number }) {
  const label = howItWorks.app[step];
  return (
    <div className="flex h-full flex-col bg-ink-850 px-3.5 pb-4 pt-9">
      <div className="flex items-center justify-between">
        <span className="font-display text-[13px] font-extrabold text-teal-400">
          Shift<span className="text-accent-500">Eaze</span>
        </span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      </div>

      <div className="mt-3 rounded-full bg-teal-400 px-3 py-1.5 text-center text-[11px] font-bold text-white">
        {label}
      </div>

      <div className="mt-3 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            {step === 0 && (
              <div className="space-y-2">
                {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                  <div
                    key={d}
                    className="flex items-center justify-between rounded-xl border border-line-strong bg-white px-3 py-2.5"
                  >
                    <span className="text-[13.5px] font-bold text-fg">{d}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-mono text-[11.5px] font-bold",
                        i === 3 ? "bg-teal-100 text-teal-500" : "bg-teal-400 text-white"
                      )}
                    >
                      {i === 3 ? "OFF" : "06:00"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="rounded-2xl border border-line-strong bg-white p-3.5">
                <div className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-fg-faint">Shift A</div>
                <div className="mt-1 whitespace-nowrap font-display text-[18px] font-extrabold text-fg">06:00 – 14:00</div>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 0.94, 1] }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 py-2.5 text-[13.5px] font-bold text-white"
                >
                  <Check width={13} height={13} /> {howItWorks.app[1]}
                </motion.div>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col items-center rounded-2xl border border-line-strong bg-white p-3.5">
                <div className="relative grid grid-cols-7 gap-[3px] overflow-hidden rounded-lg bg-white p-1.5">
                  {QR.flatMap((row, r) =>
                    row.split("").map((v, c) => (
                      <span
                        key={`${r}-${c}`}
                        className={cn("h-[14px] w-[14px] rounded-[2px]", v === "1" ? "bg-teal-600" : "bg-teal-50")}
                      />
                    ))
                  )}
                  <motion.span
                    className="absolute inset-x-0 h-[3px] bg-accent-500"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "96%", "0%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-teal-500">
                  <Target width={13} height={13} /> Geofence matched
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="rounded-2xl border border-line-strong bg-white p-3.5 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400 text-white"
                >
                  <Check width={26} height={26} />
                </motion.div>
                <div className="mt-3 font-display text-[20px] font-extrabold text-fg">14:02</div>
                <div className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-fg-faint">{label}</div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-2">
                {["Apply for leave", "Raise a ticket"].map((t) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-xl border border-line-strong bg-white px-3 py-3"
                  >
                    <span className="text-[13.5px] font-bold text-fg">{t}</span>
                    <span className="text-accent-500">→</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HeroArtwork() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });
  const [scale, setScale] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.25, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS), TICK_MS);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const s = scale ?? 0.8;

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full antialiased [text-rendering:optimizeLegibility]"
      style={{
        height: H * s,
        opacity: scale === null ? 0 : 1,
        // On wide screens, never let the picture grow taller than the first screen allows.
        maxWidth: "min(780px, max(380px, calc((100svh - 190px) * 1.148)))",
      }}
      role="img"
      aria-label="ShiftEaze manager portal and operator app showing the same roster in sync"
    >
      <div className="relative origin-top-left" style={{ width: W, height: H, transform: `scale(${s})` }}>
        {/* Manager portal */}
        <div className="absolute left-0 top-[34px] h-[438px] w-[484px] overflow-hidden rounded-[22px] border border-white/30 bg-white shadow-float">
          <div className="flex items-center gap-2 bg-teal-600 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="ml-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Manager portal
            </span>
          </div>

          <div className="py-4 pl-4 pr-[84px]">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "On site", vals: ON_SITE, tone: "text-teal-400" },
                { label: "At risk", vals: AT_RISK, tone: "text-accent-500" },
                { label: "Backfilled", vals: BACKFILLED, tone: "text-emerald-500" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-line-strong bg-ink-850 px-3 py-2.5">
                  <div className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-fg-faint">{k.label}</div>
                  <Num value={k.vals[step]} className={cn("font-display text-[24px] font-extrabold leading-tight", k.tone)} />
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {Array.from({ length: ROWS * COLS }, (_, i) => {
                const r = Math.floor(i / COLS);
                const c = i % COLS;
                const st = cellAt(r, c, step);
                return (
                  <motion.span
                    key={`${i}-${st}-${step === 0 ? "s" : "x"}`}
                    initial={{ scale: 0.4, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: step === 0 ? (r + c) * 0.025 : st === "risk" || st === "fill" ? 0.1 : 0 }}
                    className={cn("aspect-square rounded-[5px]", CELL_CLASS[st])}
                  />
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {howItWorks.portal.map((p, i) => (
                <span
                  key={p}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[12px] font-bold transition-all duration-500",
                    i === step ? "scale-105 bg-[#2f6bff] text-white shadow-[0_6px_16px_-6px_rgba(47,107,255,0.7)]" : "bg-[#e4edff] text-[#1f4fd1]"
                  )}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Operator phone */}
        <div className="absolute right-0 top-[72px] h-[424px] w-[204px] rounded-[36px] border-[7px] border-teal-700 bg-teal-700 shadow-float">
          <div className="relative h-full overflow-hidden rounded-[28px]">
            <span className="absolute left-1/2 top-2 z-10 h-[14px] w-[64px] -translate-x-1/2 rounded-full bg-teal-700" />
            <PhoneScreen step={step} />
          </div>
        </div>

        {/* Sync badge where the two faces meet */}
        <span className="absolute left-[408px] top-[262px] z-10 grid h-11 w-11 place-items-center rounded-full bg-accent-500 text-white shadow-float ring-4 ring-teal-400">
          <Refresh width={20} height={20} className="animate-spin [animation-duration:5s]" />
        </span>

        {/* Floating call-outs */}
        <div className="absolute left-[318px] top-[16px] z-10 animate-float-y">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-float">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-500 text-white">
              <Brain width={15} height={15} />
            </span>
            <span className="text-[13.5px] font-bold text-fg">AI absence prediction</span>
          </div>
        </div>
        <div className="absolute left-[10px] top-[486px] z-10 animate-float-y [animation-delay:-2.5s]">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-float">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-lg bg-emerald-400/60" />
              <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-emerald-400 text-white">
                <Target width={15} height={15} />
              </span>
            </span>
            <span className="text-[13.5px] font-bold text-fg">Geofenced attendance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
