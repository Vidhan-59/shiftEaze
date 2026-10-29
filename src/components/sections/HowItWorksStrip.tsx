"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { howItWorks } from "@/content/home";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEP_MS = 3500;
const APP_DOT = "#4db8ff";
const PORTAL_DOT = "#ff5468";

/** True once `ms` have passed since mount — screens remount per step, so this replays each time. */
function useAfter(ms: number) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setDone(true), ms);
    return () => clearTimeout(id);
  }, [ms]);
  return done;
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: easeExpo, delay: 0.08 + i * 0.09 },
});

/* ───────────────────────── Phone screens (operator app) ───────────────────────── */

const SHIFT_CHIP: Record<string, string> = {
  D: "bg-teal-500 text-white",
  N: "bg-indigo-500 text-white",
  O: "bg-ink-700 text-fg-faint",
};

function PhoneScreen({ step }: { step: number }) {
  const done = useAfter(1300);

  if (step === 0) {
    const days: [string, string, string][] = [
      ["Wed", "D", "06:00 – 14:00"],
      ["Thu", "D", "06:00 – 14:00"],
      ["Fri", "N", "22:00 – 06:00"],
      ["Sat", "N", "22:00 – 06:00"],
      ["Sun", "O", "Off"],
    ];
    return (
      <div className="space-y-2">
        {days.map(([d, s, t], i) => (
          <motion.div
            key={d}
            {...rise(i)}
            className="flex items-center gap-3 rounded-xl border border-line bg-ink-850 px-3 py-2.5"
          >
            <span className="w-8 font-mono text-[11px] font-bold uppercase text-fg-faint">{d}</span>
            <span className={cn("grid h-8 w-8 place-items-center rounded-lg font-mono text-[13px] font-bold", SHIFT_CHIP[s])}>
              {s}
            </span>
            <span className="text-[12.5px] font-medium text-fg-muted">{t}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="space-y-4">
        <motion.div {...rise(0)} className="rounded-2xl border border-line bg-ink-850 p-4">
          <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-fg-faint">Thu · Day shift</div>
          <div className="mt-1 font-display text-[22px] font-extrabold tracking-tight text-fg">06:00 – 14:00</div>
          <div className="mt-0.5 text-[12.5px] text-fg-muted">Terminal CT2</div>
        </motion.div>
        <motion.div
          {...rise(1)}
          animate={{ opacity: 1, y: 0, scale: done ? [1, 0.95, 1] : 1 }}
          className={cn(
            "flex h-12 items-center justify-center gap-2 rounded-xl text-[14px] font-bold transition-colors duration-500",
            done ? "bg-risk-low text-white" : "bg-teal-400 text-white"
          )}
        >
          {done ? (
            <>
              <Check width={16} height={16} /> Confirmed
            </>
          ) : (
            "Confirm"
          )}
        </motion.div>
      </div>
    );
  }

  if (step === 2) {
    // Deterministic pseudo-QR
    const cells = Array.from({ length: 81 }, (_, i) => {
      const r = Math.floor(i / 9);
      const c = i % 9;
      const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
      return finder || (r * 7 + c * 13 + r * c) % 3 === 0;
    });
    return (
      <div className="flex flex-col items-center">
        <motion.div {...rise(0)} className="relative rounded-2xl border border-line bg-white p-4 shadow-card">
          <div className="grid grid-cols-9 gap-[3px]">
            {cells.map((on, i) => (
              <span key={i} className={cn("h-[14px] w-[14px] rounded-[2px]", on ? "bg-teal-500" : "bg-transparent")} />
            ))}
          </div>
          {!done && (
            <motion.span
              className="absolute inset-x-3 h-[3px] rounded-full bg-accent-500 shadow-[0_0_12px_2px_rgba(213,31,44,0.6)]"
              initial={{ top: 14 }}
              animate={{ top: [14, 146, 14] }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          )}
        </motion.div>
        <div
          className={cn(
            "mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors duration-500",
            done ? "bg-risk-low/15 text-risk-low" : "bg-teal-50 text-teal-400"
          )}
        >
          {done ? (
            <>
              <Check width={14} height={14} /> Punched in
            </>
          ) : (
            "Scanning…"
          )}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center pt-3 text-center">
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="grid h-24 w-24 place-items-center rounded-full bg-risk-low/15 text-risk-low"
        >
          <Check width={44} height={44} />
        </motion.span>
        <motion.div {...rise(2)} className="mt-5 font-display text-[40px] font-extrabold leading-none tracking-tight text-fg">
          14:02
        </motion.div>
        <motion.div {...rise(3)} className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fg-faint">
          Punch-out
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[
        { t: "Leave", chip: done ? "Approved" : "Pending", ok: done },
        { t: "Helpdesk", chip: done ? "Resolved" : "Open", ok: done },
      ].map((r, i) => (
        <motion.div key={r.t} {...rise(i)} className="flex items-center gap-3 rounded-2xl border border-line bg-ink-850 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 text-white">
            {i === 0 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" />
              </svg>
            )}
          </span>
          <span className="flex-1 text-[14px] font-bold text-fg">{r.t}</span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition-colors duration-500",
              r.ok ? "bg-risk-low/15 text-risk-low" : "bg-risk-med/15 text-risk-med"
            )}
          >
            {r.chip}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** A light beam that sweeps across a screen whenever its step changes (remount via key). */
function Sweep({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        animation: "frame-sweep 1.2s ease-out forwards",
      }}
    />
  );
}

function PhoneFrame({ step, label }: { step: number; label: string }) {
  return (
    <div className="relative mx-auto w-[268px] rounded-[40px] border border-white/30 bg-[#0d0c2b] p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)]">
      <div className="relative h-[480px] overflow-hidden rounded-[32px] bg-white">
        <Sweep key={step} color="rgba(77,184,255,0.35)" />
        <span className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0d0c2b]" aria-hidden />
        <div className="flex items-center justify-between px-5 pb-2 pt-[34px]">
          <span className="font-display text-[15px] font-extrabold tracking-tight text-teal-400">
            Shift<span className="text-accent-500">Eaze</span>
          </span>
          <span className="h-2 w-2 rounded-full bg-risk-low" aria-hidden />
        </div>
        <div className="px-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-400 font-display text-[12px] font-extrabold text-white">
              {step + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="text-[15px] font-bold text-fg"
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: easeExpo }}
            >
              <PhoneScreen step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Browser screens (management portal) ───────────────────────── */

const NAMES = ["Amit", "Nehang", "Jaykumar", "Vidhan", "Tejas A."];

function PortalScreen({ step }: { step: number }) {
  const done = useAfter(1500);

  if (step === 0) {
    const cols = 14;
    const rows = 6;
    return (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-fg-faint">Roster · CT2</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-[11.5px] font-bold text-white">
            <span aria-hidden>✦</span> AI
          </span>
        </div>
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">
          {Array.from({ length: cols * rows }, (_, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const v = (r * 5 + c * 3) % 7;
            const cls = v === 0 ? "bg-ink-700" : v === 3 ? "bg-indigo-500" : "bg-teal-500";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (c + r) * 0.035 }}
                className={cn("aspect-square rounded-md", cls)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ["On site", "624", "text-fg"],
            ["At risk", "9", "text-risk-high"],
            ["Backfilled", "48", "text-risk-low"],
          ].map(([k, v, c], i) => (
            <motion.div key={k} {...rise(i)} className="rounded-xl border border-line bg-ink-850 px-3 py-2.5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-fg-faint">{k}</div>
              <div className={cn("mt-0.5 font-display text-[24px] font-extrabold leading-none tabular-nums", c)}>{v}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {["Ramesh P.", "Imran S.", "Kiran M.", "Dinesh R."].map((n, i) => (
            <motion.div
              key={n}
              {...rise(i + 3)}
              className="flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-[13px]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-risk-low/15 text-risk-low">
                <Check width={11} height={11} />
              </span>
              <span className="font-medium text-fg">{n}</span>
              <span className="ml-auto font-mono text-[11px] text-fg-faint">06:0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-2.5">
        {NAMES.slice(0, 4).map((n, i) => {
          const approved = done && i < 2;
          return (
            <motion.div
              key={n}
              {...rise(i)}
              className="flex items-center gap-3 rounded-xl border border-line bg-ink-850 px-3.5 py-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-400 font-display text-[13px] font-extrabold text-white">
                {n[0]}
              </span>
              <span className="text-[13.5px] font-semibold text-fg">{n}</span>
              <span
                className={cn(
                  "ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-bold transition-colors duration-500",
                  approved ? "bg-risk-low/15 text-risk-low" : "bg-teal-400 text-white"
                )}
              >
                {approved ? (
                  <>
                    <Check width={12} height={12} /> Approved
                  </>
                ) : (
                  "Approve"
                )}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (step === 3) {
    const bars = [38, 52, 46, 68, 74, 61, 83, 90, 77, 96];
    return (
      <div>
        <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-fg-faint">Moves per hour</div>
        <div className="flex h-[210px] items-end gap-2.5 rounded-xl border border-line bg-ink-850 p-4">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-teal-500 to-[#4b49ab]"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.7, ease: easeExpo, delay: i * 0.06 }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {["Shift swap", "Missed punch", "Leave balance", "Roster query"].map((t, i) => {
        const resolved = done && i < 3;
        return (
          <motion.div
            key={t}
            {...rise(i)}
            className="flex items-center gap-3 rounded-xl border border-line bg-ink-850 px-3.5 py-3"
          >
            <span className="font-mono text-[11px] font-bold text-fg-faint">#{210 + i}</span>
            <span className="text-[13.5px] font-semibold text-fg">{t}</span>
            <span
              className={cn(
                "ml-auto rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors duration-500",
                resolved ? "bg-risk-low/15 text-risk-low" : "bg-risk-med/15 text-risk-med"
              )}
            >
              {resolved ? "Resolved" : "Open"}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function BrowserFrame({ step, label }: { step: number; label: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/30 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-ink-800 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="mx-auto flex h-6 w-full max-w-[300px] items-center justify-center rounded-md bg-white font-mono text-[11px] font-medium text-fg-muted">
          Manager Portal
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>

      <div className="relative flex h-[462px] overflow-hidden">
        <Sweep key={step} color="rgba(255,84,104,0.3)" />
        {/* Sidebar */}
        <div className="hidden w-[52px] shrink-0 flex-col items-center gap-3 bg-gradient-to-b from-teal-600 to-teal-400 py-4 sm:flex" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                "h-8 w-8 rounded-lg transition-colors duration-500",
                i === step ? "bg-accent-500" : "bg-white/15"
              )}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1 p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-500 font-display text-[13px] font-extrabold text-white">
              {step + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="font-display text-[18px] font-extrabold tracking-tight text-fg"
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: easeExpo }}
            >
              <PortalScreen step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

/** Each frame runs its own endless loop; `lag` delays the first tick so the portal trails the app. */
function useStepper(count: number, enabled: boolean, lag = 0) {
  const [step, setStep] = useState(0);
  const first = useRef(true);
  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(
      () => {
        first.current = false;
        setStep((s) => (s + 1) % count);
      },
      STEP_MS + (first.current ? lag : 0)
    );
    return () => clearTimeout(id);
  }, [enabled, step, count, lag]);
  return [step, setStep] as const;
}

/** Vertical workflow beside a frame: the active step lights up in step with the screen. */
function StepList({
  items,
  active,
  onSelect,
  dot,
  running,
  label,
  side,
}: {
  items: readonly string[];
  active: number;
  onSelect: (i: number) => void;
  dot: string;
  running: boolean;
  label: string;
  /** Which side of its frame the list sits on; the rail always faces the frame. */
  side: "left" | "right";
}) {
  const n = items.length;
  const flip = side === "left";
  return (
    <ol aria-label={label} className="relative flex w-full flex-col lg:w-[196px] lg:shrink-0">
      {/* Rail: a track with a fill that climbs to the active step */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute w-[2px] rounded-full bg-white/15", flip ? "right-[7px]" : "left-[7px]")}
        style={{ top: `${50 / n}%`, bottom: `${50 / n}%` }}
      >
        <span
          className="absolute left-0 top-0 w-full rounded-full"
          style={{
            height: `${(active / (n - 1)) * 100}%`,
            background: dot,
            boxShadow: `0 0 12px ${dot}`,
            transition: "height 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      {items.map((text, i) => {
        const on = i === active;
        return (
          <li key={text} className="min-h-[68px] flex-1">
            <button
              type="button"
              onClick={() => onSelect(i)}
              onPointerEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              aria-current={on}
              className={cn("group flex h-full w-full items-center gap-4 text-left", flip && "flex-row-reverse text-right")}
            >
              <span className="relative grid h-4 w-4 shrink-0 place-items-center">
                {on && (
                  <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: dot, opacity: 0.6 }} />
                )}
                <span
                  className={cn(
                    "relative h-4 w-4 rounded-full border-2 transition-all duration-500",
                    i <= active ? "scale-110 border-white" : "border-white/40 bg-[#0d0c2b] group-hover:border-white/80"
                  )}
                  style={i <= active ? { background: dot } : undefined}
                />
              </span>
              <span
                className={cn(
                  "block min-w-0 flex-1 transition-transform duration-500",
                  on && (flip ? "-translate-x-1.5" : "translate-x-1.5")
                )}
              >
                <span
                  className="block font-mono text-[11px] font-bold tracking-[0.2em] transition-colors duration-500"
                  style={{ color: on ? dot : "rgba(255,255,255,0.35)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block font-display text-[16px] font-bold leading-snug tracking-tight transition-colors duration-500",
                    on ? "text-white" : "text-white/50 group-hover:text-white/80"
                  )}
                >
                  {text}
                </span>
                {on && running && (
                  <span className={cn("mt-2 block h-[2px] w-12 overflow-hidden rounded-full bg-white/15", flip && "ml-auto")} aria-hidden>
                    <span
                      key={`t-${active}`}
                      className="block h-full w-full origin-left"
                      style={{ background: dot, animation: `solution-timer ${STEP_MS}ms linear forwards` }}
                    />
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function HowItWorksStrip() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.35 });
  usePauseOffscreen(sectionRef);
  const [appPaused, setAppPaused] = useState(false);
  const [portalPaused, setPortalPaused] = useState(false);
  const appRun = !reduced && inView && !appPaused;
  const portalRun = !reduced && inView && !portalPaused;
  const [appStep, setAppStep] = useStepper(howItWorks.app.length, appRun);
  const [portalStep, setPortalStep] = useStepper(howItWorks.portal.length, portalRun, 1200);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1760px] lg:!px-4 xl:!px-6">
        <Reveal>
          <div
            ref={stageRef}
            className="relative isolate overflow-hidden rounded-[32px] bg-[#0d0c2b] px-5 py-10 text-white shadow-float sm:px-8 lg:px-10 lg:py-14 xl:px-14"
          >
            {/* Backdrop: brand glows, a fading grid */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-[10%] -top-[30%] h-[90%] w-[50%] rounded-full bg-[#302e86] opacity-80 blur-[100px]" />
              <div className="absolute -right-[8%] -bottom-[30%] h-[90%] w-[46%] rounded-full bg-[#d51f2c] opacity-35 blur-[110px]" />
              <div className="absolute left-[35%] top-[10%] h-[60%] w-[30%] rounded-full bg-[#2f6bff] opacity-30 blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(80%_80%_at_50%_50%,#000,transparent)]" />
            </div>

            <div className="mx-auto grid max-w-[1560px] gap-12 lg:grid-cols-[auto_minmax(64px,120px)_minmax(0,1fr)] lg:items-start lg:gap-3">
              {/* Mobile app: its own workflow beside the phone */}
              <div
                className="relative"
                onPointerEnter={() => setAppPaused(true)}
                onPointerLeave={() => setAppPaused(false)}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6bff] opacity-40 blur-[90px] lg:left-[62%]"
                  style={{ animation: "blob-b 16s ease-in-out infinite" }}
                />
                <div className="mb-4 flex items-center justify-center gap-2.5 font-mono text-[12.5px] font-bold uppercase tracking-[0.16em] text-white/90">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: APP_DOT }} />
                  On the app (operator):
                </div>
                <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-stretch lg:gap-4">
                  <StepList
                    items={howItWorks.app}
                    active={appStep}
                    onSelect={setAppStep}
                    dot={APP_DOT}
                    running={appRun}
                    label="App workflow"
                    side="left"
                  />
                  <div style={{ animation: "frame-float 7s ease-in-out infinite" }}>
                    <PhoneFrame step={appStep} label={howItWorks.app[appStep]} />
                  </div>
                </div>
              </div>

              {/* Data link: packets stream between the frames, the badge syncs them */}
              <div className="relative hidden items-center justify-center self-stretch pt-9 lg:flex" aria-hidden>
                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-[#4db8ff]/60 to-[#ff5468]/60">
                  <span
                    key={`a-${appStep}`}
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#4db8ff] shadow-[0_0_14px_4px_rgba(77,184,255,0.7)]"
                    style={{ animation: "packet-x 1.8s ease-in-out infinite" }}
                  />
                  <span
                    key={`b-${portalStep}`}
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ff5468] shadow-[0_0_14px_4px_rgba(255,84,104,0.7)]"
                    style={{ animation: "packet-x 1.8s ease-in-out -0.9s infinite reverse" }}
                  />
                </div>
                <span className="absolute left-1/2 top-1/2 z-10 mt-[18px] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#1a1850]/85 text-white shadow-[0_0_24px_rgba(77,184,255,0.35)] backdrop-blur-md">
                  <motion.svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, ease: "linear", repeat: Infinity }}
                  >
                    <path d="M21 12a9 9 0 0 0-15.5-6.2L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 15.5 6.2L21 16" />
                    <path d="M16 16h5v5" />
                  </motion.svg>
                </span>
              </div>

              {/* Web portal: its own workflow beside the browser */}
              <div
                className="relative"
                onPointerEnter={() => setPortalPaused(true)}
                onPointerLeave={() => setPortalPaused(false)}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[42%] top-1/2 -z-10 h-[380px] w-[480px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d51f2c] opacity-35 blur-[100px]"
                  style={{ animation: "blob-c 18s ease-in-out infinite" }}
                />
                <div className="mb-4 flex items-center justify-center gap-2.5 font-mono text-[12.5px] font-bold uppercase tracking-[0.16em] text-white/90">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: PORTAL_DOT }} />
                  On the portal (management):
                </div>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4">
                  <div
                    className="min-w-0 flex-1"
                    style={{ animation: "frame-float 7s ease-in-out -3.5s infinite" }}
                  >
                    <BrowserFrame step={portalStep} label={howItWorks.portal[portalStep]} />
                  </div>
                  <StepList
                    items={howItWorks.portal}
                    active={portalStep}
                    onSelect={setPortalStep}
                    dot={PORTAL_DOT}
                    running={portalRun}
                    label="Portal workflow"
                    side="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center font-display text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-tight tracking-tight text-fg">
            <span className="inline-block animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto] bg-clip-text text-transparent">
              {howItWorks.closing}
            </span>
          </p>
          <span className="mx-auto mt-5 block h-[6px] w-28 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500" aria-hidden />
        </Reveal>
      </Container>
    </section>
  );
}
