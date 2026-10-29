"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Brain, Calendar, Chart, Check, Close, Phone, Refresh, Shield, Target } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One animated product scene per platform module, drawn for the dark stage in
 * PlatformTeaser. Every scene is a small state machine (a looping step counter)
 * rather than loose keyframes, so what happens on screen reads as a real
 * workflow: detect → act → confirm. Each remounts when its module is selected.
 */

const BLUE = "#2f6bff";
const SKY = "#4db8ff";
const RED = "#ff5468";
const GREEN = "#34d399";
const AMBER = "#fbbf24";
const INDIGO = "#5b59c9";

const mono = "font-mono text-[10px] font-bold uppercase tracking-[0.16em]";

/* ── shared helpers ───────────────────────────────────────────────────────── */

/** Raw ticking counter; frozen at 0 under reduced motion. */
function useTick(ms: number) {
  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setT((x) => x + 1), ms);
    return () => clearInterval(id);
  }, [reduced, ms]);
  return { t, reduced };
}

/** Looping step 0..n-1. Under reduced motion it rests on `rest` (the "finished" frame). */
function useStep(n: number, ms: number, rest = n - 1) {
  const { t, reduced } = useTick(ms);
  return reduced ? rest : t % n;
}

function useCountUp(to: number, delay = 0.4, dur = 1.4) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, { delay, duration: dur, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, delay, dur]);
  return v;
}

/** A number that nudges in whenever its value changes. */
function Num({ v, className }: { v: number | string; className?: string }) {
  return (
    <motion.span
      key={v}
      className={cn("inline-block tabular-nums", className)}
      initial={{ opacity: 0.3, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {v}
    </motion.span>
  );
}

function LiveTag({ label = "Live" }: { label?: string }) {
  return (
    <span className={cn(mono, "flex items-center gap-1.5 text-[#34d399]")}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#34d399]" />
        <span className="relative h-2 w-2 rounded-full bg-[#34d399]" />
      </span>
      {label}
    </span>
  );
}

function Panel({
  icon: Icon,
  title,
  right,
  children,
  className,
}: {
  icon: typeof Check;
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeExpo }}
      className={cn(
        "w-full max-w-[580px] overflow-hidden rounded-2xl border border-white/15 bg-[#15144d]/85 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className={cn(mono, "flex items-center gap-2 text-white/75")}>
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#2f6bff]/25 text-[#8cc8ff]">
            <Icon width={13} height={13} />
          </span>
          {title}
        </span>
        {right}
      </div>
      {children}
    </motion.div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full items-center justify-center px-3 sm:px-8">{children}</div>;
}

/* ── 01 · AI rostering: open shifts get scanned, matched and filled ───────── */

const R_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const R_WORKERS = ["A. Singh", "R. Kumar", "S. Patel", "M. Khan", "P. Nair"];
const R_GRID = ["DDN-DDN", "ND-D-DN", "DNDDN-D", "-D-NDDN", "DDNN-DD"];
/** Open shifts: the AI moves each into a worker row once `from` is reached. */
const R_OPEN = [
  { r: 3, c: 2, s: "D", scan: 1, from: 2 },
  { r: 1, c: 4, s: "N", scan: 3, from: 4 },
];
const R_MSG = [
  "2 open shifts detected · Wed, Fri",
  "AI scanning 48 workers · skills, rest hours, overtime",
  "Wed · Day filled with M. Khan · all rules met",
  "AI scanning 48 workers · skills, rest hours, overtime",
  "Fri · Night filled with R. Kumar · all rules met",
  "Roster published to every operator's app",
];
const R_COV = [86, 86, 93, 93, 100, 100];
const R_ROWS = "grid grid-cols-[62px_repeat(7,minmax(0,1fr))] items-center gap-1 sm:grid-cols-[84px_repeat(7,minmax(0,1fr))] sm:gap-1.5";

export function RosterVisual() {
  const step = useStep(6, 1300);
  const scanning = R_OPEN.some((o) => o.scan === step);
  const bg = (ch: string) => (ch === "D" ? BLUE : ch === "N" ? INDIGO : "rgba(255,255,255,0.06)");

  return (
    <Frame>
      <Panel
        icon={Calendar}
        title="Roster · CT2 · Week 12"
        right={
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-2.5 py-1 text-[10.5px] font-bold text-white"
            animate={{ boxShadow: ["0 0 0 0 rgba(213,31,44,0.6)", "0 0 0 9px rgba(213,31,44,0)"] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <Brain width={11} height={11} /> AI
          </motion.span>
        }
      >
        <div className="space-y-1.5 px-3 pb-3 pt-3 sm:px-4">
          <div className={R_ROWS}>
            <span />
            {R_DAYS.map((d) => (
              <span key={d} className="text-center font-mono text-[9.5px] uppercase text-white/50">
                {d}
              </span>
            ))}
          </div>

          <div className="relative space-y-1.5">
            {R_WORKERS.map((w, r) => (
              <div key={w} className={R_ROWS}>
                <span className="flex items-center gap-1.5 truncate text-[11px] font-semibold text-white/85">
                  <i className="hidden h-4 w-4 shrink-0 place-items-center rounded-full bg-white/15 text-[8px] not-italic sm:grid">
                    {w[0]}
                  </i>
                  <span className="truncate">{w}</span>
                </span>
                {R_GRID[r].split("").map((ch, c) => {
                  const fill = R_OPEN.find((o) => o.r === r && o.c === c);
                  const filled = !!fill && step >= fill.from;
                  const shown = filled ? fill!.s : ch;
                  return (
                    <motion.span
                      key={c}
                      className="relative grid h-7 place-items-center rounded-md font-mono text-[10px] font-bold text-white"
                      initial={{ opacity: 0, scale: 0.6, backgroundColor: bg(ch) }}
                      animate={{ opacity: 1, scale: 1, backgroundColor: bg(shown) }}
                      transition={{
                        opacity: { delay: 0.1 + r * 0.07 + c * 0.03 },
                        scale: { delay: 0.1 + r * 0.07 + c * 0.03, type: "spring", stiffness: 260, damping: 18 },
                        backgroundColor: { duration: 0.35 },
                      }}
                    >
                      {shown === "-" ? "" : shown}
                      {filled && (
                        <motion.i
                          className="pointer-events-none absolute inset-0 rounded-md border-2 border-white"
                          initial={{ opacity: 0.95, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.7 }}
                          transition={{ duration: 0.9 }}
                        />
                      )}
                    </motion.span>
                  );
                })}
              </div>
            ))}
            {scanning && (
              <motion.span
                key={step}
                className="pointer-events-none absolute inset-x-0 top-0 h-7 rounded-md bg-gradient-to-r from-transparent via-[#4db8ff]/40 to-transparent ring-1 ring-[#4db8ff]/60"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 34 * 4, opacity: [1, 1, 0] }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* The unassigned row — gaps live here until the AI places them */}
          <div className={cn(R_ROWS, "border-t border-dashed border-white/15 pt-1.5")}>
            <span className="text-[11px] font-bold text-[#ff8a98]">Open</span>
            {R_DAYS.map((_, c) => {
              const o = R_OPEN.find((x) => x.c === c);
              if (!o) return <span key={c} className="h-7 rounded-md border border-dashed border-white/10" />;
              const filled = step >= o.from;
              const hot = step === o.scan;
              return (
                <motion.span
                  key={c}
                  className={cn(
                    "grid h-7 place-items-center rounded-md font-mono text-[9px] font-bold uppercase text-white",
                    filled && "border border-dashed border-[#34d399]/60 text-[#34d399]"
                  )}
                  animate={{
                    backgroundColor: filled ? "rgba(52,211,153,0.08)" : RED,
                    opacity: hot ? [1, 0.45, 1] : 1,
                  }}
                  transition={{ duration: hot ? 0.7 : 0.35, repeat: hot ? Infinity : 0 }}
                >
                  {filled ? <Check width={11} height={11} /> : "Gap"}
                </motion.span>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-[11.5px] font-semibold text-white">
            <span className="flex min-w-0 items-center gap-2">
              <motion.span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500"
                animate={scanning ? { rotate: [0, 12, -12, 0] } : { rotate: 0 }}
                transition={{ duration: 0.8, repeat: scanning ? Infinity : 0 }}
              >
                <Brain width={11} height={11} />
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  className="truncate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  {R_MSG[step]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="shrink-0 font-mono text-[11px] text-[#8cc8ff]">
              <Num v={R_COV[step]} />% covered
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#ff5468] via-[#2f6bff] to-[#34d399]"
              animate={{ width: `${R_COV[step]}%` }}
              transition={{ duration: 0.7, ease: easeExpo }}
            />
          </div>
        </div>
      </Panel>
    </Frame>
  );
}

/* ── 02 · AI absence prediction: risk is flagged, a backfill call goes out, it's covered ── */

const A_ROWS = [
  { n: "R. Kumar", role: "Crane operator · Night", risk: 82, call: 1, done: 2, by: "A. Singh" },
  { n: "I. Shaikh", role: "Yard hand · Day", risk: 71, call: 3, done: 4, by: "P. Nair" },
  { n: "K. Mehta", role: "Gate marshal · Night", risk: 64, call: 5, done: 6, by: "S. Patel" },
  { n: "T. Das", role: "Rigger · Day", risk: 22, call: 99, done: 99, by: "" },
];

export function AbsenceVisual() {
  const step = useStep(9, 1100);
  const done = A_ROWS.filter((r) => step >= r.done).length;
  const tiles = [
    { k: "At risk", v: 9 - done, c: "text-[#ff8a98]" },
    { k: "Backfilled", v: 45 + done, c: "text-[#34d399]" },
    { k: "Overtime avoided", v: `${12 + done * 8}h`, c: "text-[#8cc8ff]" },
  ];

  return (
    <Frame>
      <Panel icon={Brain} title="Absence forecast · Tomorrow" right={<LiveTag label="Predicting" />}>
        <div className="space-y-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((t, i) => (
              <motion.div
                key={t.k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease: easeExpo }}
                className="rounded-xl border border-white/12 bg-white/[0.07] px-3 py-2"
              >
                <div className="truncate font-mono text-[9px] uppercase tracking-wider text-white/55">{t.k}</div>
                <div className={cn("font-display text-[22px] font-extrabold leading-tight", t.c)}>
                  <Num v={t.v} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            {A_ROWS.map((r, i) => {
              const state = step >= r.done ? "done" : step >= r.call ? "calling" : r.risk < 40 ? "low" : "risk";
              const color = state === "done" ? GREEN : state === "calling" ? AMBER : state === "low" ? SKY : RED;
              const pct = state === "done" ? 10 : r.risk;
              return (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: easeExpo }}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/12 bg-white/[0.07] px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[12.5px] font-bold text-white">{r.n}</span>
                      <span className="hidden truncate text-[10.5px] text-white/50 sm:block">{r.role}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%`, backgroundColor: color }}
                          transition={{ duration: 0.8, ease: easeExpo }}
                        />
                      </div>
                      <span className="w-8 text-right font-mono text-[10px] font-bold text-white/70">
                        <Num v={`${pct}%`} />
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[104px] justify-end sm:w-[118px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={state}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold"
                        style={{ color, backgroundColor: `${color}26` }}
                      >
                        {state === "calling" && (
                          <motion.span animate={{ rotate: [-12, 12, -12] }} transition={{ duration: 0.5, repeat: Infinity }}>
                            <Phone width={10} height={10} />
                          </motion.span>
                        )}
                        {state === "done" && <Check width={10} height={10} />}
                        {state === "risk" && "High risk"}
                        {state === "calling" && "AI calling"}
                        {state === "done" && r.by}
                        {state === "low" && "Stable"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Panel>
    </Frame>
  );
}

/* ── 03 · Geofenced attendance: workers reach the site and check in; one is blocked ── */

const G_WORKERS = [
  { n: "R. Kumar", out: [56, 42], to: [248, 100], at: 1, blocked: false },
  { n: "S. Patel", out: [508, 60], to: [328, 92], at: 2, blocked: false },
  { n: "A. Singh", out: [70, 214], to: [240, 162], at: 4, blocked: false },
  { n: "M. Khan", out: [500, 214], to: [394, 178], at: 5, blocked: true },
];
const G_FEED = [
  null,
  { ok: true, t: "R. Kumar checked in · Gate 2 · 06:58" },
  { ok: true, t: "S. Patel checked in · Yard A · 06:59" },
  { ok: true, t: "S. Patel checked in · Yard A · 06:59" },
  { ok: true, t: "A. Singh checked in · Gate 1 · 07:02" },
  { ok: false, t: "M. Khan outside the zone · check-in blocked" },
  { ok: true, t: "Attendance synced to the manager portal" },
  { ok: true, t: "Attendance synced to the manager portal" },
];

export function GeofenceVisual() {
  const step = useStep(8, 1200);
  const onSite = G_WORKERS.filter((w) => !w.blocked && step >= w.at).length;
  const feed = G_FEED[step];

  return (
    <Frame>
      <Panel icon={Target} title="Site geofence · CT2 Yard" right={<LiveTag />}>
        <div className="relative">
          <svg viewBox="0 0 560 250" className="block w-full" aria-hidden>
            <defs>
              <radialGradient id="geo-zone" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor={SKY} stopOpacity="0.1" />
                <stop offset="1" stopColor={SKY} stopOpacity="0.26" />
              </radialGradient>
              <linearGradient id="geo-sweep" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0" stopColor={SKY} stopOpacity="0.55" />
                <stop offset="1" stopColor={SKY} stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="560" height="250" fill="#101045" />
            {[18, 466].map((x) => (
              <rect key={x} x={x} y="70" width="76" height="112" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
            ))}
            {[128, 300].map((x) => (
              <g key={x}>
                <rect x={x} y="8" width={x === 128 ? 150 : 132} height="32" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
                <rect x={x} y="216" width={x === 128 ? 150 : 132} height="28" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
              </g>
            ))}
            <path d="M0 52H560M0 200H560M110 0V250M450 0V250" stroke="#22256f" strokeWidth="16" />
            <path d="M0 52H560M0 200H560M110 0V250M450 0V250" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="8 9" />

            <rect x="222" y="88" width="116" height="74" rx="8" fill="rgba(77,184,255,0.07)" stroke="rgba(77,184,255,0.35)" />
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                x={230 + (i % 4) * 27}
                y={96 + Math.floor(i / 4) * 21}
                width="23"
                height="16"
                rx="2"
                fill={[RED, BLUE, AMBER, GREEN][(i * 5) % 4]}
                opacity="0.6"
              />
            ))}

            <circle cx="280" cy="125" r="92" fill="url(#geo-zone)" />
            <g style={{ transformOrigin: "280px 125px", animation: "orbit-spin 5s linear infinite" }}>
              <path d="M280 125 L372 125 A92 92 0 0 0 345 60 Z" fill="url(#geo-sweep)" />
            </g>
            <g style={{ transformOrigin: "280px 125px", animation: "orbit-spin 28s linear infinite" }}>
              <circle cx="280" cy="125" r="92" fill="none" stroke={SKY} strokeWidth="2" strokeDasharray="7 8" />
            </g>
            {[0, 1].map((k) => (
              <motion.circle
                key={k}
                cx="280"
                cy="125"
                fill="none"
                stroke={SKY}
                strokeWidth="1.5"
                initial={{ r: 10, opacity: 0.6 }}
                animate={{ r: 120, opacity: 0 }}
                transition={{ duration: 3.2, repeat: Infinity, delay: k * 1.6, ease: "easeOut" }}
              />
            ))}
            <text x="280" y="26" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.55)" letterSpacing="2">
              GEOFENCE · 200 M
            </text>

            {G_WORKERS.map((w, i) => {
              const arrived = step >= w.at;
              const pos = arrived ? w.to : w.out;
              const color = arrived ? (w.blocked ? RED : GREEN) : AMBER;
              return (
                <motion.g
                  key={w.n}
                  initial={{ x: w.out[0], y: w.out[1] }}
                  animate={{ x: pos[0], y: pos[1] }}
                  transition={{ duration: arrived ? 1.5 : 0.9, ease: easeExpo, delay: arrived ? 0 : i * 0.06 }}
                >
                  {arrived && (
                    <motion.circle
                      key={`ping-${step >= w.at}`}
                      r="9"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      initial={{ r: 9, opacity: 0.9 }}
                      animate={{ r: 28, opacity: 0 }}
                      transition={{ duration: 1.1, delay: 1.1 }}
                    />
                  )}
                  <motion.circle r="9" stroke="white" strokeWidth="2.5" initial={{ fill: AMBER }} animate={{ fill: color }} transition={{ duration: 0.4, delay: arrived ? 1.1 : 0 }} />
                  <rect x="-27" y="-30" width="54" height="15" rx="7.5" fill="rgba(8,8,40,0.85)" stroke="rgba(255,255,255,0.25)" />
                  <text y="-19.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" fontFamily="sans-serif">
                    {w.n}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        <div className="flex h-11 items-center justify-between gap-3 border-t border-white/10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={feed ? feed.t : "wait"}
              className="flex min-w-0 items-center gap-2.5 text-[12px] font-semibold text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[#0d0c2b]"
                style={{ background: feed ? (feed.ok ? GREEN : RED) : AMBER }}
              >
                {feed && !feed.ok ? <Close width={10} height={10} /> : <Check width={10} height={10} />}
              </span>
              <span className="truncate">{feed ? feed.t : "Waiting for the first check-in…"}</span>
            </motion.div>
          </AnimatePresence>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            On site <Num v={onSite} className="text-[#34d399]" />/4
          </span>
        </div>
      </Panel>
    </Frame>
  );
}

/* ── 04 · Analytics: a live attendance stream, KPI tiles and per-site bars ── */

const N_PTS = 48;
const series = (i: number, ph: number) => 56 + 15 * Math.sin((i + ph) * 0.34) + 8 * Math.sin((i + ph) * 0.13 + 1.3);
const series2 = (i: number, ph: number) => 18 + 6 * Math.sin((i + ph) * 0.27 + 0.6) + 3 * Math.sin((i + ph) * 0.51);

function buildPath(f: (i: number, ph: number) => number, ph: number, area: boolean) {
  let d = "";
  for (let i = 0; i < N_PTS; i++) {
    const x = (i / (N_PTS - 1)) * 100;
    const y = 58 - f(i, ph) * 0.62;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return area ? `${d}L100 60 L0 60 Z` : d;
}

const SITES = ["CT1", "CT2", "CT3", "CT4"];

export function AnalyticsVisual() {
  const { t, reduced } = useTick(1000);
  const p = useMotionValue(0);
  useAnimationFrame((ms) => {
    if (!reduced) p.set((ms / 1000) * 2.4);
  });
  const line = useTransform(p, (ph) => buildPath(series, ph, false));
  const area = useTransform(p, (ph) => buildPath(series, ph, true));
  const risk = useTransform(p, (ph) => buildPath(series2, ph, false));
  const dotTop = useTransform(p, (ph) => `${((58 - series(N_PTS - 1, ph) * 0.62) / 60) * 100}%`);

  const kpis = [
    { k: "On site", v: 618 + ((t * 7) % 13), c: "text-white" },
    { k: "At risk", v: 6 + ((t * 5) % 4), c: "text-[#ff8a98]" },
    { k: "Backfilled", v: 44 + (t % 9), c: "text-[#34d399]" },
  ];

  return (
    <Frame>
      <Panel icon={Chart} title="Workforce live · All sites" right={<LiveTag />}>
        <div className="space-y-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((k, i) => (
              <motion.div
                key={k.k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease: easeExpo }}
                className="rounded-xl border border-white/12 bg-white/[0.07] px-3 py-2"
              >
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/55">{k.k}</div>
                <div className={cn("font-display text-[22px] font-extrabold leading-tight", k.c)}>
                  <Num v={k.v} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-2.5 sm:grid-cols-[1fr_150px]">
            <div className="relative h-[150px] overflow-hidden rounded-xl border border-white/12 bg-white/[0.05] p-3">
              <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-white/55">
                <span>Attendance</span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1"><i className="h-1.5 w-3 rounded-full" style={{ background: SKY }} /> Present</span>
                  <span className="flex items-center gap-1"><i className="h-1.5 w-3 rounded-full" style={{ background: RED }} /> Risk</span>
                </span>
              </div>
              <div className="relative h-[calc(100%-18px)]">
                {[25, 50, 75].map((g) => (
                  <span key={g} className="absolute inset-x-0 border-t border-dashed border-white/10" style={{ top: `${g}%` }} />
                ))}
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <linearGradient id="an-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor={SKY} stopOpacity="0.4" />
                      <stop offset="1" stopColor={SKY} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path d={area} fill="url(#an-area)" />
                  <motion.path d={line} fill="none" stroke={SKY} strokeWidth="2.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <motion.path d={risk} fill="none" stroke={RED} strokeWidth="1.8" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
                </svg>
                <motion.span className="absolute -right-0.5 h-2.5 w-2.5 -translate-y-1/2" style={{ top: dotTop }}>
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#4db8ff]" />
                  <span className="absolute inset-0 rounded-full border-2 border-white bg-[#4db8ff]" />
                </motion.span>
              </div>
            </div>

            <div className="hidden space-y-2.5 rounded-xl border border-white/12 bg-white/[0.05] p-3 sm:block">
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/55">By site</div>
              {SITES.map((s, i) => {
                const pct = Math.round(66 + 30 * Math.abs(Math.sin(t * 0.6 + i * 1.4)));
                return (
                  <div key={s} className="flex items-center gap-2">
                    <span className="w-7 font-mono text-[10px] font-bold text-white/70">{s}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff]"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, ease: easeExpo }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[10px] font-bold text-white">
                      <Num v={`${pct}%`} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Panel>
    </Frame>
  );
}

/* ── 05 · AI voice calling: an orbit of languages and scenarios around a live call ── */

const ORBITS = [
  { size: 120, dur: 18, reverse: false, a: { t: "EN" }, b: { i: Check } },
  { size: 180, dur: 28, reverse: true, a: { t: "हि" }, b: { i: Calendar } },
  { size: 240, dur: 40, reverse: false, a: { t: "ગુ" }, b: { i: Refresh } },
] as const;

const V_CHAT = [
  { at: 1, who: "ai", text: "Namaste Ravi, can you cover tonight's 10 PM shift at Gate 2?" },
  { at: 3, who: "worker", text: "Haan ji, main aa sakta hoon." },
  { at: 5, who: "ai", text: "Great. Confirmed and added to tonight's roster." },
] as const;

function OrbitChip({ item, dur, reverse, className }: { item: { t?: string; i?: typeof Check }; dur: number; reverse: boolean; className: string }) {
  const Icon = item.i;
  return (
    <span className={cn("absolute left-1/2 -translate-x-1/2", className)}>
      <span
        className="grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-[#1b1a55] text-[12px] font-bold text-white shadow-[0_0_16px_rgba(77,184,255,0.5)]"
        style={{ animation: `orbit-counter ${dur}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {Icon ? <Icon width={14} height={14} /> : item.t}
      </span>
    </span>
  );
}

export function VoiceVisual() {
  const step = useStep(8, 1300);
  const wave = [0.5, 0.9, 0.6, 1, 0.7, 0.45, 0.85];
  const next = V_CHAT.find((m) => m.at - 1 === step);
  const shown = V_CHAT.filter((m) => step >= m.at);
  const speaking = step >= 1 && step <= 5;

  return (
    <Frame>
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
        {/* Orbit */}
        <div className="grid h-[190px] w-[190px] shrink-0 place-items-center sm:h-[276px] sm:w-[276px]">
          <div className="relative h-[276px] w-[276px] origin-center scale-[0.69] sm:scale-100">
            {ORBITS.map((o) => (
              <div key={o.size} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: o.size, height: o.size }}>
                <div
                  className="relative h-full w-full rounded-full border border-dashed border-white/25"
                  style={{ animation: `orbit-spin ${o.dur}s linear infinite`, animationDirection: o.reverse ? "reverse" : "normal" }}
                >
                  <OrbitChip item={o.a} dur={o.dur} reverse={o.reverse} className="top-0 -translate-y-1/2" />
                  <OrbitChip item={o.b} dur={o.dur} reverse={o.reverse} className="bottom-0 translate-y-1/2" />
                </div>
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {[0, 1].map((k) => (
                <motion.span
                  key={k}
                  className="absolute inset-0 rounded-full border-2 border-[#ff5468]"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 2.3, opacity: 0 }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: k * 1.2, ease: "easeOut" }}
                />
              ))}
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#ff5468] to-[#d51f2c] text-white shadow-[0_0_34px_rgba(255,84,104,0.6)]">
                <Phone width={24} height={24} />
              </span>
            </div>
          </div>
        </div>

        {/* Live call */}
        <motion.div
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: easeExpo }}
          className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/15 bg-[#15144d]/85 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:w-[290px]"
        >
          <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#302e86] to-[#2f6bff] text-[11px] font-extrabold text-white">
              RK
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-bold text-white">Ravi Kumar</div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#34d399]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" /> AI call · Hindi
              </div>
            </div>
            <span className="font-mono text-[11px] font-bold tabular-nums text-white/70">00:{String(4 + step * 3).padStart(2, "0")}</span>
          </div>

          <div className="flex h-6 items-center justify-center gap-[3px] bg-white/[0.04]">
            {wave.map((h, i) => (
              <motion.i
                key={i}
                className="block h-4 w-[3px] rounded-full"
                style={{ background: SKY }}
                animate={speaking ? { scaleY: [0.25, h, 0.3, h * 0.8, 0.25] } : { scaleY: 0.2 }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="flex h-[158px] flex-col justify-end gap-2 overflow-hidden p-3">
            <AnimatePresence initial={false}>
              {shown.map((m) => (
                <motion.div
                  key={m.at}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: easeExpo }}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3 py-2 text-[11.5px] font-medium leading-snug",
                    m.who === "ai" ? "self-start rounded-bl-sm bg-white/12 text-white" : "self-end rounded-br-sm bg-[#2f6bff] text-white"
                  )}
                >
                  {m.text}
                </motion.div>
              ))}
              {next && (
                <motion.div
                  key={`typing-${next.at}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "flex w-14 gap-1 rounded-2xl px-3 py-2.5",
                    next.who === "ai" ? "self-start rounded-bl-sm bg-white/12" : "self-end rounded-br-sm bg-[#2f6bff]/70"
                  )}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.i
                      key={d}
                      className="block h-1.5 w-1.5 rounded-full bg-white"
                      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.12 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-9 items-center justify-center border-t border-white/10 px-3">
            <AnimatePresence mode="wait">
              {step >= 6 ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#34d399]/15 px-3 py-1 text-[11px] font-bold text-[#34d399]"
                >
                  <Check width={11} height={11} /> Shift confirmed · roster updated
                </motion.span>
              ) : (
                <motion.span key="live" exit={{ opacity: 0 }} className={cn(mono, "text-white/45")}>
                  Calling · EN · हि · ગુ
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ── 06 · Worker passbook: a verified record that keeps earning entries ──── */

const PB_STATS = [
  { k: "Punctuality", w: 94 },
  { k: "Conduct", w: 82 },
  { k: "Discipline", w: 88 },
];
const PB_EVENTS = [
  "Shift completed on time · Crane 4",
  "Safety refresher passed",
  "Zero incidents · 90 days",
  "Peer rating 4.8 from 12 shifts",
  "Covered a backfill call · Night",
  "Training module completed",
];
const PB_BADGES = [
  { i: Shield, t: "Safety certified" },
  { i: Check, t: "On-time 98%" },
  { i: Target, t: "0 incidents" },
];

export function PassbookVisual() {
  const score = useCountUp(88);
  const { t, reduced } = useTick(2200);
  const head = reduced ? 0 : t % PB_EVENTS.length;
  const visible = [0, 1, 2].map((k) => (head - k + PB_EVENTS.length) % PB_EVENTS.length);

  return (
    <Frame>
      <motion.div
        className="relative w-full max-w-[400px]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {[
          { r: -5, y: 14, bg: "bg-[#4b49ab]", d: 0.15 },
          { r: 4, y: 8, bg: "bg-[#2f6bff]", d: 0.25 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className={cn("absolute inset-0 rounded-2xl border border-white/20 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.7)]", c.bg)}
            initial={{ rotate: 0, y: 0, opacity: 0 }}
            animate={{ rotate: c.r, y: c.y, opacity: 0.85 }}
            transition={{ delay: c.d, duration: 0.8, ease: easeExpo }}
          />
        ))}
        <Panel
          icon={Shield}
          title="Worker passbook"
          className="relative max-w-none"
          right={
            <span className="inline-flex items-center gap-1 rounded-full bg-[#34d399]/15 px-2 py-0.5 text-[10px] font-bold text-[#34d399]">
              <Check width={10} height={10} /> Verified
            </span>
          }
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{ animation: "frame-sweep 4.2s ease-in-out infinite" }}
            aria-hidden
          />
          <div className="space-y-3 p-3.5 sm:p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#302e86] to-[#2f6bff] font-display text-[14px] font-extrabold text-white ring-2 ring-white/30">
                RK
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-extrabold text-white">Ravi Kumar</div>
                <div className="truncate text-[11px] text-white/55">Crane operator · CT2 · WP-2041</div>
              </div>
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90" aria-hidden>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4.5" />
                  <motion.circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke={SKY}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.88 }}
                    transition={{ delay: 0.4, duration: 1.4, ease: easeExpo }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center font-display text-[15px] font-extrabold tabular-nums text-white">{score}</span>
              </div>
            </div>

            <div className="space-y-2">
              {PB_STATS.map((s, i) => (
                <div key={s.k} className="flex items-center gap-3">
                  <span className="w-[76px] text-[11px] font-semibold text-white/70">{s.k}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff]"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.w}%` }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 1, ease: easeExpo }}
                    />
                  </div>
                  <span className="w-7 text-right font-mono text-[10px] font-bold text-white/70">{s.w}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PB_BADGES.map((b, i) => (
                <motion.span
                  key={b.t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.12 }}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-white"
                >
                  <b.i width={10} height={10} /> {b.t}
                </motion.span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-2.5">
              <div className={cn(mono, "mb-1.5 text-white/45")}>Recent entries</div>
              <ul className="relative h-[84px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {visible.map((idx, k) => (
                    <motion.li
                      key={idx}
                      layout
                      initial={{ opacity: 0, y: -22 }}
                      animate={{ opacity: 1 - k * 0.3, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeExpo }}
                      className="flex items-center gap-2 py-1 text-[11.5px] font-medium text-white"
                    >
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#34d399]/20 text-[#34d399]">
                        <Check width={9} height={9} />
                      </span>
                      <span className="truncate">{PB_EVENTS[idx]}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </Panel>
      </motion.div>
    </Frame>
  );
}

/* ── 07 · Leave management: pick dates → request → coverage check → approved ── */

const L_PICK = [10, 11, 12];

export function LeaveVisual() {
  const step = useStep(9, 1100);
  const approved = step >= 7;
  const accent = approved ? GREEN : BLUE;
  const status = step < 5 ? { t: "Pending", c: AMBER } : step < 7 ? { t: "Checking coverage", c: SKY } : { t: "Approved", c: GREEN };

  return (
    <Frame>
      <Panel icon={Calendar} title="Leave · March" right={<LiveTag label="Synced" />}>
        <div className="grid gap-3 p-3 sm:grid-cols-[1fr_212px] sm:p-4">
          <div className="rounded-xl border border-white/12 bg-white/[0.05] p-2.5">
            <div className="grid grid-cols-7 gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-center font-mono text-[9.5px] text-white/45">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }, (_, i) => {
                const day = i + 1;
                const idx = L_PICK.indexOf(day);
                const on = idx >= 0 && step >= idx + 1;
                const weekend = i % 7 > 4;
                return (
                  <motion.span
                    key={day}
                    className={cn(
                      "relative grid h-7 place-items-center rounded-md text-[11.5px] font-semibold sm:h-8",
                      on ? "text-white" : weekend ? "text-white/35" : "text-white/80"
                    )}
                    initial={{ opacity: 0, scale: 0.7, backgroundColor: "rgba(255,255,255,0.05)" }}
                    animate={{ opacity: 1, scale: on ? [1.2, 1] : 1, backgroundColor: on ? accent : "rgba(255,255,255,0.05)" }}
                    transition={{ opacity: { delay: i * 0.015 }, backgroundColor: { duration: 0.35 }, scale: { duration: 0.35 } }}
                  >
                    {day}
                    {on && idx >= 0 && (
                      <motion.i
                        key={`r-${step >= idx + 1}`}
                        className="pointer-events-none absolute inset-0 rounded-md border-2 border-white/70"
                        initial={{ opacity: 0.9, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        transition={{ duration: 0.7 }}
                      />
                    )}
                  </motion.span>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[178px]">
            <AnimatePresence mode="wait">
              {step < 4 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid h-full min-h-[178px] place-items-center rounded-xl border border-dashed border-white/20 px-4 text-center"
                >
                  <div>
                    <motion.span
                      className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      <Calendar width={16} height={16} />
                    </motion.span>
                    <div className="text-[11.5px] font-semibold text-white/60">Operator selecting dates in the app…</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeExpo }}
                  className="space-y-2.5 rounded-xl border border-white/15 bg-white/[0.08] p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#302e86] to-[#2f6bff] text-[11px] font-extrabold text-white">
                      PS
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12.5px] font-bold text-white">Priya S.</div>
                      <div className="truncate text-[10.5px] text-white/55">Casual leave · 10–12 Mar</div>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={status.t}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold"
                      style={{ color: status.c, backgroundColor: `${status.c}26` }}
                    >
                      {approved ? <Check width={10} height={10} /> : <Refresh width={10} height={10} />}
                      {status.t}
                    </motion.span>
                  </AnimatePresence>

                  <div>
                    <div className="mb-1 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-wider text-white/55">
                      <span>Coverage</span>
                      <span className="text-white">{step >= 5 ? "94%" : "—"}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#34d399]"
                        initial={{ width: 0 }}
                        animate={{ width: step >= 5 ? "94%" : "0%" }}
                        transition={{ duration: 0.9, ease: easeExpo }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="flex-1 rounded-lg border border-white/20 py-1.5 text-center text-[11px] font-bold text-white/60">Reject</span>
                    <motion.span
                      className="flex-1 rounded-lg py-1.5 text-center text-[11px] font-bold text-white"
                      animate={{ backgroundColor: approved ? GREEN : BLUE, scale: step === 6 ? [1, 0.9, 1] : 1, color: approved ? "#0d0c2b" : "#ffffff" }}
                      transition={{ duration: 0.4 }}
                    >
                      {approved ? "Approved" : "Approve"}
                    </motion.span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10.5px] text-white/60">
                    <span>Leave balance</span>
                    <span className="font-mono font-bold text-white">
                      <Num v={approved ? "6 days" : "9 days"} />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </Frame>
  );
}

export const PLATFORM_VISUALS = [
  RosterVisual,
  AbsenceVisual,
  GeofenceVisual,
  AnalyticsVisual,
  VoiceVisual,
  PassbookVisual,
  LeaveVisual,
];
