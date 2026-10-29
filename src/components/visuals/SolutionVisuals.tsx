"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { Bolt, Check, Phone } from "@/components/ui/icons";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

/** Dark glass stage shared by the five Solutions visuals. */
function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[340px] flex-col justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1d1c68] to-[#14134a] p-6 shadow-[0_30px_70px_-28px_rgba(47,107,255,0.55)] ring-1 ring-white/20 sm:min-h-[460px] sm:p-10 [&_.font-mono]:text-[12px]",
        className,
      )}
      aria-hidden
    >
      <span className="absolute -right-10 -top-12 -z-10 h-56 w-56 rounded-full bg-[#2f6bff]/30 blur-3xl" />
      <span className="absolute -bottom-16 -left-10 -z-10 h-56 w-56 rounded-full bg-[#d51f2c]/20 blur-3xl" />
      {children}
    </div>
  );
}

function useScene(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step] = useLoopStep(n, ms, inView);
  return { ref, step };
}

const CHIP = {
  D: "bg-[#2f6bff] text-white",
  N: "bg-[#5b59c9] text-white",
  O: "bg-white/10 text-white/45",
} as const;
const CYCLE = ["D", "D", "N", "N", "O", "O"] as const;

/** 1. Shift-based: a rotation built once and rolled across rows; a cursor sweeps the days. */
export function ShiftBasedVisual() {
  const { ref, step } = useScene(12, 380);
  const rows = ["Terminal", "Department", "Batch", "Shift"];
  return (
    <div ref={ref}>
      <Stage>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">D · D · N · N · O · O</span>
          <span className="rounded-full bg-[#34d399] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0d0c2b]">AUTO-REPEAT</span>
        </div>
        <div className="mt-6 space-y-3.5">
          {rows.map((r, ri) => (
            <div key={r} className="flex items-center gap-3">
              <span className="w-[74px] shrink-0 text-[12px] font-semibold text-white/60 sm:w-24">{r}</span>
              <div className="grid flex-1 grid-cols-12 gap-1">
                {Array.from({ length: 12 }, (_, d) => {
                  const c = CYCLE[(d + ri * 2) % 6];
                  const hit = d === step;
                  return (
                    <span
                      key={d}
                      className={cn(
                        "grid aspect-square place-items-center rounded-md font-mono text-[10px] font-bold transition-all duration-300",
                        CHIP[c],
                        hit && "z-10 scale-125 shadow-[0_0_0_2px_#fff,0_8px_20px_-4px_rgba(77,184,255,0.9)]",
                      )}
                    >
                      {c}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          {["Generate once", "Auto-repeat"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors duration-500",
                (step < 6 ? i === 0 : i === 1) ? "bg-white text-[#302e86]" : "bg-white/10 text-white/60",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </Stage>
    </div>
  );
}

/** 2. Multi-site: a realistic manpower dashboard: filters, live KPI cards and every terminal in one table. */
const MS_KPIS = [
  { k: "Active headcount", v: 626, tone: "text-white", dot: "bg-[#4db8ff]" },
  { k: "Present today", v: 548, tone: "text-[#34d399]", dot: "bg-[#34d399]" },
  { k: "On leave", v: 31, tone: "text-[#9cc2ff]", dot: "bg-[#2f6bff]" },
  { k: "Absent", v: 24, tone: "text-[#ff8a98]", dot: "bg-[#ff5468]" },
  { k: "OT today", v: 47, tone: "text-[#fbbf24]", dot: "bg-[#fbbf24]" },
];
const MS_TERMINALS = [
  { n: "T1", a: 120, p: 112 },
  { n: "T2", a: 100, p: 91 },
  { n: "T3", a: 150, p: 129 },
  { n: "T4", a: 92, p: 88 },
  { n: "T5", a: 115, p: 104 },
  { n: "T6", a: 78, p: 69 },
];
const MS_GRID = { gridTemplateColumns: "44px minmax(0,1fr) 96px 76px" };
const MS_FILTERS = [
  { k: "Terminal", v: "T3" },
  { k: "Department", v: "Operations" },
  { k: "Batch", v: "Batch A" },
  { k: "Designation", v: "QC Operator" },
  { k: "Work type", v: "Shift" },
  { k: "Timeframe", v: "Today" },
];

export function MultiSiteVisual() {
  const { ref, step } = useScene(12, 1100);
  const hot = step % MS_TERMINALS.length;
  const filt = Math.floor(step / 2) % MS_FILTERS.length;
  const tick = step % 4;
  return (
    <div ref={ref}>
      <Stage className="!p-4 sm:!p-6">
        <Chrome title="Manpower dashboard · All terminals" />

        {/* shared filter bar */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {MS_FILTERS.map((f, i) => {
            const on = i === filt;
            return (
              <span
                key={f.k}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11.5px] font-semibold transition-all duration-500",
                  on ? "border-[#4db8ff] bg-[#2f6bff]/30 text-white shadow-[0_6px_16px_-8px_rgba(77,184,255,0.9)]" : "border-white/15 bg-white/[0.06] text-white/60",
                )}
              >
                {f.k}
                <span className={cn("rounded bg-white/15 px-1.5 text-[10.5px] font-bold transition-colors", on ? "text-white" : "text-white/50")}>{on ? f.v : "All"}</span>
                <span className="text-[9px] opacity-60">▾</span>
              </span>
            );
          })}
        </div>

        {/* live KPI cards */}
        <div className="mt-3 grid grid-cols-5 gap-2">
          {MS_KPIS.map((s, i) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.06] px-2.5 py-2">
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold leading-tight text-white/55">
                <i className={cn("h-1.5 w-1.5 shrink-0 rounded-full", s.dot)} />
                <span className="truncate">{s.k}</span>
              </div>
              <div className={cn("mt-1 font-display text-[20px] font-extrabold leading-none tabular-nums", s.tone)}>{s.v + (i === 1 ? tick : i === 4 ? tick * 2 : 0)}</div>
            </div>
          ))}
        </div>

        {/* every terminal, one table */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c2b]/60">
          <div style={MS_GRID} className="grid items-center gap-2 border-b border-white/10 px-3 py-2 text-[10.5px] font-bold uppercase tracking-wide text-white/45">
            <span>Site</span>
            <span>Attendance</span>
            <span className="text-right">Present / Assigned</span>
            <span className="text-right">Status</span>
          </div>
          {MS_TERMINALS.map((t, i) => {
            const present = t.p + (i === hot ? Math.min(tick, t.a - t.p) : 0);
            const pct = Math.round((present / t.a) * 100);
            const short = pct < 90;
            return (
              <div
                key={t.n}
                style={MS_GRID}
                className={cn(
                  "grid items-center gap-2 border-b border-white/[0.06] px-3 py-1.5 transition-colors duration-500 last:border-b-0",
                  i === hot && "bg-[#2f6bff]/15",
                )}
              >
                <span className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#34d399]" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                  </span>
                  {t.n}
                </span>
                <span className="h-2 overflow-hidden rounded-full bg-white/10">
                  <span className={cn("block h-full rounded-full transition-all duration-700", short ? "bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]" : "bg-gradient-to-r from-[#2f6bff] to-[#4db8ff]")} style={{ width: `${pct}%` }} />
                </span>
                <span className="text-right font-mono text-[11.5px] font-bold tabular-nums text-white/80">
                  {present} / {t.a}
                </span>
                <span className={cn("justify-self-end rounded-full px-2 py-0.5 text-[10.5px] font-bold", short ? "bg-[#fbbf24]/20 text-[#fbbf24]" : "bg-[#34d399]/20 text-[#34d399]")}>
                  {short ? "Short" : "On track"}
                </span>
              </div>
            );
          })}
        </div>

        {/* designation-wise strength vs requirement */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { n: "QC Operator", h: 84, r: 90 },
            { n: "RTG Operator", h: 112, r: 120 },
            { n: "Gate Operator", h: 56, r: 56 },
          ].map((d) => (
            <div key={d.n} className="rounded-xl bg-white/[0.06] px-2.5 py-2">
              <div className="flex items-center justify-between text-[10.5px] font-semibold text-white/60">
                <span className="truncate">{d.n}</span>
                <span className={cn("font-mono font-bold tabular-nums", d.h < d.r ? "text-[#fbbf24]" : "text-[#34d399]")}>
                  {d.h}/{d.r}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className={cn("block h-full rounded-full", d.h < d.r ? "bg-[#fbbf24]" : "bg-[#34d399]")} style={{ width: `${(d.h / d.r) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Stage>
    </div>
  );
}

/** 3. Scheduling: a realistic AI Roster Planner screen; a gap is flagged and cover is arranged. */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPS = [
  { name: "Amit", role: "QC Operator", risk: 12 },
  { name: "Nehang", role: "RTG Operator", risk: 18 },
  { name: "Tejas Aravind K.", role: "RTG Operator", risk: 78 },
  { name: "Jaykumar", role: "Gate Operator", risk: 9 },
  { name: "Vidhan", role: "QC Operator", risk: 21 },
];
const FLAG_ROW = 2;
const FLAG_COL = 3;
const CANDIDATES = [
  { name: "Ramesh P.", note: "Off day · same designation", match: 92 },
  { name: "Imran S.", note: "Available · 4 h OT", match: 84 },
  { name: "Dinesh R.", note: "Available · nearest to site", match: 71 },
];
const patternFor = (row: number, col: number) => CYCLE[(col + row * 2) % 6];
const GRID = "grid items-center gap-1.5";
const GRID_STYLE = { gridTemplateColumns: "minmax(92px,1.5fr) repeat(7,minmax(0,1fr)) 64px" };

export function SchedulingVisual() {
  const { ref, step } = useScene(9, 1300);
  const scanning = step < 2;
  const flagged = step >= 2;
  const open = step >= 4 && step < 8;
  const covered = step >= 6;
  const scanRow = scanning ? step % OPS.length : -1;
  return (
    <div ref={ref}>
      <Stage className="!p-4 sm:!p-6">
        {/* window chrome */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="font-mono font-bold uppercase tracking-[0.12em] text-white/70">AI Roster Planner · Wk 12</span>
          </div>
          <span className="flex items-center gap-1.5 font-mono font-bold text-[#34d399]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" /> LIVE
          </span>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { k: "Operators scored", v: "626", tone: "text-white" },
            { k: "Gaps flagged", v: flagged ? (covered ? "0 open" : "1 open") : "—", tone: covered ? "text-[#34d399]" : flagged ? "text-[#ff8a98]" : "text-white/60" },
            { k: "Cover arranged", v: covered ? "1 / 1" : "0 / 1", tone: covered ? "text-[#34d399]" : "text-white" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2">
              <div className="text-[11px] font-semibold text-white/55">{s.k}</div>
              <div className={cn("font-display text-[19px] font-extrabold leading-tight tabular-nums transition-colors duration-500", s.tone)}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* roster table */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c2b]/60">
          <div style={GRID_STYLE} className={cn(GRID, "border-b border-white/10 px-3 py-2 text-[10.5px] font-bold uppercase tracking-wide text-white/45")}>
            <span>Operator</span>
            {DAYS.map((d) => (
              <span key={d} className="text-center">
                {d}
              </span>
            ))}
            <span className="text-right">Risk</span>
          </div>
          {OPS.map((o, r) => {
            const isFlag = r === FLAG_ROW;
            const risk = isFlag ? (covered ? 14 : flagged ? o.risk : 31) : o.risk;
            const high = risk >= 70;
            return (
              <div
                key={o.name}
                style={GRID_STYLE}
                className={cn(
                  GRID,
                  "border-b border-white/[0.06] px-3 py-1.5 transition-colors duration-500 last:border-b-0",
                  scanRow === r && "bg-[#2f6bff]/15",
                  isFlag && flagged && !covered && "bg-[#ff5468]/10",
                )}
              >
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[12.5px] font-bold text-white">{o.name}</span>
                  <span className="block truncate text-[10.5px] text-white/50">{o.role}</span>
                </span>
                {DAYS.map((_, c) => {
                  const base = patternFor(r, c);
                  const isCell = isFlag && c === FLAG_COL;
                  const label = isCell && flagged ? (covered ? "D" : "A?") : base;
                  return (
                    <span
                      key={c}
                      className={cn(
                        "relative grid h-7 place-items-center rounded-md font-mono text-[10.5px] font-bold transition-all duration-500",
                        isCell && flagged && !covered
                          ? "z-10 scale-110 bg-[#ff5468] text-white ring-2 ring-white"
                          : isCell && covered
                            ? "bg-[#34d399] text-[#0d0c2b] ring-2 ring-white"
                            : CHIP[base],
                      )}
                    >
                      {isCell && flagged && !covered && <span className="absolute inset-0 animate-pulse-ring rounded-md bg-[#ff5468]/60" />}
                      <span className="relative">{label}</span>
                    </span>
                  );
                })}
                <span className="flex items-center justify-end gap-1.5">
                  <span className={cn("font-mono text-[11px] font-bold tabular-nums transition-colors duration-500", high ? "text-[#ff8a98]" : "text-white/70")}>{risk}%</span>
                  <span className="h-1.5 w-6 overflow-hidden rounded-full bg-white/15">
                    <span
                      className={cn("block h-full rounded-full transition-all duration-700", high ? "bg-[#ff5468]" : risk > 25 ? "bg-[#fbbf24]" : "bg-[#34d399]")}
                      style={{ width: `${risk}%` }}
                    />
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Arrange panel */}
        <div
          className={cn(
            "mt-3 rounded-2xl bg-white p-3.5 text-[#0d0c2b] shadow-float transition-all duration-500",
            open || covered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[12px] font-bold">
              <span className="rounded-md bg-[#2f6bff] px-2 py-0.5 text-white">Arrange</span>
              Tejas Aravind K. · Thu
            </span>
            <span className="text-[11px] font-semibold text-[#5b6075]">ranked cover</span>
          </div>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {CANDIDATES.map((c, i) => {
              const picked = covered && i === 0;
              return (
                <div
                  key={c.name}
                  className={cn(
                    "rounded-xl border px-3 py-2 transition-all duration-500",
                    picked ? "border-[#34d399] bg-[#e7fbf2]" : "border-[#e1e6f5] bg-[#f6f8ff]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-bold">
                      {i + 1}. {c.name}
                    </span>
                    <span className="font-mono text-[11.5px] font-bold tabular-nums text-[#2f6bff]">{c.match}%</span>
                  </div>
                  <div className="mt-0.5 truncate text-[10.5px] text-[#5b6075]">{picked ? "Assigned" : c.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Stage>
    </div>
  );
}

/** Shared window chrome: traffic-light dots, a title and a LIVE tag. */
function Chrome({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="font-mono font-bold uppercase tracking-[0.12em] text-white/70">{title}</span>
      </div>
      <span className="flex items-center gap-1.5 font-mono font-bold text-[#34d399]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" /> LIVE
      </span>
    </div>
  );
}

/** 4. Overtime & backfill: a shift is extended on the slider, then the AI voice call goes out and logs back. */
const HOURS = ["18", "20", "22", "00", "02", "04", "06", "08", "10"];
const CALL = [
  { who: "ai", text: "Can you extend tonight's shift by 3 h 30 m?" },
  { who: "op", text: "Yes, I can stay on." },
] as const;

export function OvertimeVisual() {
  const { ref, step } = useScene(11, 1200);
  const hi = step < 2 ? 56 : step < 4 ? 70 : 82; // slider end, % of the day strip
  const lo = 56; // original shift end
  const calling = step >= 4;
  const connected = step >= 5;
  const lines = step >= 8 ? 2 : step >= 6 ? 1 : 0;
  const logged = step >= 9;
  return (
    <div ref={ref}>
      <Stage className="!p-4 sm:!p-6">
        <Chrome title="Shift Extender · OT" />

        {/* shift card */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0d0c2b]/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-[14px] font-bold text-white">Tejas Aravind K.</div>
              <div className="text-[11.5px] text-white/55">RTG Operator · Thu · Night shift</div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1 font-mono text-[12px] font-bold tabular-nums transition-colors duration-500",
                hi > lo ? "bg-[#2f6bff] text-white" : "bg-white/10 text-white/60",
              )}
            >
              {hi <= lo ? "No OT" : hi < 75 ? "+1 h 30 m OT" : "+3 h 30 m OT"}
            </span>
          </div>

          {/* timeline strip */}
          <div className="relative mt-6 h-3 rounded-full bg-white/10">
            <span className="absolute inset-y-0 rounded-full bg-[#5b59c9]" style={{ left: "12%", width: `${lo - 12}%` }} />
            <span
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff] transition-all duration-1000"
              style={{ left: `${lo}%`, width: `${Math.max(0, hi - lo)}%` }}
            />
            <span className="absolute top-1/2 h-6 w-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/90 shadow-lg" style={{ left: "12%" }} />
            <span
              className="absolute top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_6px_16px_-4px_rgba(0,0,0,0.6)] transition-all duration-1000"
              style={{ left: `${hi}%` }}
            >
              <Bolt width={13} height={13} className="text-[#2f6bff]" />
            </span>
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] font-semibold text-white/45">
            {HOURS.map((h) => (
              <span key={h}>{h}:00</span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[11px] font-semibold text-white/60">
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-full bg-[#5b59c9]" /> Rostered
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-full bg-[#4db8ff]" /> Overtime
            </span>
          </div>
        </div>

        {/* AI voice call */}
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center">
              {calling && !logged && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#34d399]/60" />}
              <span className={cn("relative grid h-11 w-11 place-items-center rounded-full transition-colors duration-500", calling ? "bg-[#34d399] text-[#0d0c2b]" : "bg-white/15 text-white")}>
                <Phone width={20} height={20} />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold text-white">Overtime Request call</div>
              <div className="text-[11.5px] text-white/55">
                {!calling ? "Ready to place" : !connected ? "Calling operator…" : logged ? "Completed" : "Connected · 00:" + String(8 + step).padStart(2, "0")}
              </div>
            </div>
            <div className="flex gap-1">
              {["English", "Hindi", "Gujarati"].map((l, i) => (
                <span key={l} className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", connected && i === 1 ? "bg-white text-[#302e86]" : "bg-white/10 text-white/50")}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 min-h-[74px] space-y-1.5">
            {CALL.slice(0, lines).map((m, i) => (
              <div key={i} className={cn("flex", m.who === "op" ? "justify-end" : "justify-start")}>
                <span
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-1.5 text-[12px] font-medium",
                    m.who === "ai" ? "rounded-bl-sm bg-[#2f6bff] text-white" : "rounded-br-sm bg-white text-[#0d0c2b]",
                  )}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-bold transition-all duration-500",
              logged ? "bg-[#34d399]/20 text-[#34d399]" : "bg-white/[0.05] text-white/40",
            )}
          >
            <span className={cn("grid h-4 w-4 place-items-center rounded-full", logged ? "bg-[#34d399] text-[#0d0c2b]" : "bg-white/15 text-transparent")}>
              <Check width={10} height={10} />
            </span>
            {logged ? "Accepted · verified webhook · logged to the shift record" : "Awaiting outcome"}
          </div>
        </div>
      </Stage>
    </div>
  );
}

/** 5. Attendance & payroll: a live punch feed checked against the geofence, with one audit trail. */
const FEED = [
  { t: "06:02", n: "Ramesh P.", m: "QR scan", w: "Terminal CT2", ok: true },
  { t: "06:04", n: "Imran S.", m: "Mobile check-in", w: "Terminal CT4", ok: true },
  { t: "06:05", n: "Dinesh R.", m: "Kiosk or back-office entry", w: "Gate 1", ok: true },
  { t: "06:11", n: "Amit", m: "Mobile check-in", w: "Outside geofence", ok: false },
  { t: "06:30", n: "Vidhan", m: "Regularisation approval", w: "Missed punch", ok: true },
  { t: "06:45", n: "Nehang", m: "Confirmation approval", w: "Terminal CT2", ok: true },
  { t: "07:00", n: "Solanki Tamanna R.", m: "Automated no-show job", w: "Marked absent", ok: false },
];

export function PayrollVisual() {
  const { ref, step } = useScene(9, 1100);
  const shown = Math.min(step + 1, FEED.length);
  const visible = FEED.slice(0, shown).reverse().slice(0, 5);
  const present = 574 + FEED.slice(0, shown).filter((f) => f.ok).length;
  const absent = 24 + FEED.slice(0, shown).filter((f) => !f.ok).length;
  return (
    <div ref={ref}>
      <Stage className="!p-4 sm:!p-6">
        <Chrome title="Attendance · Today" />

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { k: "Present", v: present, c: "text-[#34d399]" },
            { k: "On duty", v: present - 31, c: "text-[#9cc2ff]" },
            { k: "Late", v: 21, c: "text-[#fbbf24]" },
            { k: "Absent", v: absent, c: "text-[#ff8a98]" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2">
              <div className="text-[11px] font-semibold text-white/55">{s.k}</div>
              <div className={cn("font-display text-[20px] font-extrabold leading-tight tabular-nums", s.c)}>{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-[#0d0c2b]/60 p-2.5">
          <div className="flex items-center justify-between px-2 pb-2 pt-1 text-[10.5px] font-bold uppercase tracking-wide text-white/45">
            <span>Live punch feed</span>
            <span>Geofence check</span>
          </div>
          <ul className="space-y-1.5">
            {visible.map((f) => (
              <li
                key={f.t + f.n}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
                  f.ok ? "bg-white/[0.07]" : "bg-[#ff5468]/15",
                )}
                style={{ animation: "fade-up 0.5s ease both" }}
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-white/55">{f.t}</span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[12.5px] font-bold text-white">{f.n}</span>
                  <span className="block truncate text-[10.5px] text-white/55">{f.m}</span>
                </span>
                <span className={cn("hidden shrink-0 text-[11px] font-semibold sm:block", f.ok ? "text-white/60" : "text-[#ff8a98]")}>{f.w}</span>
                <span
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                    f.ok ? "bg-[#34d399] text-[#0d0c2b]" : "bg-[#ff5468] text-white",
                  )}
                >
                  {f.ok ? <Check width={12} height={12} /> : <span className="text-[13px] font-bold leading-none">×</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#2f6bff]/20 px-3.5 py-2 text-[12px] font-semibold text-[#cfe0ff]">
          <span>Audit trail · punches, approvals and rejection reasons</span>
          <span className="font-mono font-bold tabular-nums text-white">{shown * 4 + 612} entries</span>
        </div>
      </Stage>
    </div>
  );
}

/** 6. Managed rostering: our team sets up and runs the cycles while your roster fills in live. */
export function ManagedRosteringVisual() {
  const { ref, step } = useScene(9, 900);
  const phases = ["Set up cycles", "Manage cycles", "Roster live"];
  const phase = Math.min(2, Math.floor(step / 3));
  const rows = 3;
  const cols = 10;
  const filled = Math.min(rows * cols, (step + 1) * 4);
  return (
    <div ref={ref}>
      <Stage>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
              <Check width={22} height={22} />
            </span>
            <div>
              <div className="font-mono font-bold uppercase tracking-[0.14em] text-white/55">Your operation</div>
              <div className="text-[14px] font-bold text-white">Prefer not to build in-house</div>
            </div>
          </div>
          {/* hand-off packets */}
          <div className="relative hidden h-1 flex-1 overflow-hidden rounded-full bg-white/15 sm:block">
            <span className="absolute inset-y-0 w-10 animate-scan-x rounded-full bg-gradient-to-r from-transparent via-[#4db8ff] to-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-mono font-bold uppercase tracking-[0.14em] text-[#4db8ff]">ShiftEaze team</div>
              <div className="text-[14px] font-bold text-white">Sets up &amp; manages</div>
            </div>
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#2f6bff] text-white shadow-[0_10px_26px_-8px_rgba(47,107,255,0.9)]">
              <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-[#2f6bff]/50" />
              <Bolt width={22} height={22} className="relative" />
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold uppercase tracking-[0.14em] text-white/60">D · D · N · N · O · O</span>
            <span className="rounded-full bg-[#34d399] px-2.5 py-0.5 font-mono font-bold text-[#0d0c2b]">AUTO-REPEAT</span>
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: rows }, (_, r) => (
              <div key={r} className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: cols }, (_, c) => {
                  const i = r * cols + c;
                  const on = i < filled;
                  const k = CYCLE[(c + r * 2) % 6];
                  return (
                    <span
                      key={c}
                      className={cn(
                        "grid aspect-square place-items-center rounded-md font-mono text-[10px] font-bold transition-all duration-300",
                        on ? CHIP[k] : "bg-white/[0.06] text-transparent",
                        on && i === filled - 1 && "scale-110 shadow-[0_0_0_2px_#fff]",
                      )}
                    >
                      {k}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-3 gap-2">
          {phases.map((p, i) => (
            <li
              key={p}
              className={cn(
                "rounded-xl px-3 py-2.5 text-center text-[12.5px] font-bold transition-all duration-500",
                i === phase ? "bg-white text-[#302e86] shadow-float" : i < phase ? "bg-[#2f6bff]/35 text-[#cfe0ff]" : "bg-white/10 text-white/55",
              )}
            >
              <span className="mr-1.5 font-mono text-[11px] opacity-70">{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
      </Stage>
    </div>
  );
}
