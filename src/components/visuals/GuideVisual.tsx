"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Chart, Check } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const SHEETS = ["Checklist", "Roster cycle", "Absence risk"] as const;
const CYCLE = ["D", "D", "N", "N", "O", "O"] as const;
const CHIP = { D: "bg-[#2f6bff] text-white", N: "bg-[#5b59c9] text-white", O: "bg-[#e8ecf8] text-[#8b93b3]" } as const;

// Illustrative roster-cycle checks, each one a capability described elsewhere on the site.
const ITEMS = [
  "Rotation pattern set (e.g. DDNNOO)",
  "Shift types and legends configured",
  "Headcount checked against requirement",
  "Approved leave applied to the roster",
  "Absence risk reviewed for the cycle",
  "Backfill candidates ranked",
  "Overtime windows planned",
  "Geofence boundaries confirmed",
  "Reminder calls scheduled",
  "Missed punches regularised",
];
const TOTAL = ITEMS.length;

// Where a sheet sits in the stack: rank 0 is the front; the others fan out to its sides.
const POSE = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 170, y: 14, rotate: 5, scale: 0.92 },
  { x: -170, y: 14, rotate: -5, scale: 0.92 },
];

function Header({ page, title, sub, right }: { page: number; title: string; sub?: string; right?: React.ReactNode }) {
  const Icon = page === 0 ? Check : page === 1 ? Calendar : Chart;
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#2f6bff] to-[#302e86] text-white">
          <Icon width={15} height={15} />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="truncate font-display text-[13.5px] font-extrabold text-[#12153d]">{title}</div>
          {sub && <div className="truncate text-[10.5px] font-semibold text-[#6b7392]">{sub}</div>}
        </div>
      </div>
      {right ?? <span className="shrink-0 rounded-full bg-[#eaf0ff] px-2 py-0.5 font-mono text-[10px] font-bold text-[#2f6bff]">{page + 1} / 3</span>}
    </div>
  );
}

/** Page 1: the ten checks, each tickable, with a progress ring. */
function ChecklistPage({ done, toggle }: { done: boolean[]; toggle: (i: number) => void }) {
  const n = done.filter(Boolean).length;
  const R = 15;
  const C = 2 * Math.PI * R;
  return (
    <>
      <Header
        page={0}
        title="The Shift Planner's Checklist"
        sub="Before your next roster cycle"
        right={
          <span className="relative grid h-10 w-10 shrink-0 place-items-center">
            <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
              <circle cx="20" cy="20" r={R} fill="none" stroke="#e3e9f8" strokeWidth="4" />
              <circle cx="20" cy="20" r={R} fill="none" stroke="#2f6bff" strokeWidth="4" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - n / TOTAL)} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
            </svg>
            <span className="font-mono text-[10px] font-extrabold tabular-nums text-[#12153d]">
              {n}/{TOTAL}
            </span>
          </span>
        }
      />
      <ul className="mt-2.5 flex flex-1 flex-col justify-between">
        {ITEMS.map((label, i) => {
          const on = done[i];
          return (
            <li key={label}>
              <button
                type="button"
                aria-pressed={on}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(i);
                }}
                className="group flex w-full items-center gap-2 rounded-md px-1 py-[3px] text-left transition-colors hover:bg-[#f1f5ff]"
              >
                <span className={cn("grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[4px] border-2 transition-all duration-200", on ? "border-[#2f6bff] bg-[#2f6bff] text-white" : "border-[#c9d1ea] bg-white text-transparent group-hover:border-[#2f6bff]")}>
                  <Check width={9} height={9} />
                </span>
                <span className={cn("truncate text-[11px] font-semibold leading-none transition-colors duration-200", on ? "text-[#9aa3bd] line-through" : "text-[#1b1f4b]")}>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const OPS = ["Amit", "Nehang", "Jaykumar", "Vidhan"];

/** Page 2: a week of the roster for four operators, with a working schedule switch. */
function RosterPage() {
  const [mode, setMode] = useState<"once" | "repeat">("repeat");
  const counts = { D: 52, N: 48, O: 41 };
  return (
    <>
      <Header page={1} title="Roster cycle" sub="Week 12 · Terminal T2" />
      <div className="mt-2.5 inline-flex self-start rounded-full bg-[#eef1fa] p-0.5 text-[10.5px] font-bold">
        {(["once", "repeat"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode(m);
            }}
            className={cn("rounded-full px-3 py-1 transition-all duration-300", mode === m ? "bg-[#302e86] text-white shadow-sm" : "text-[#6b7392] hover:text-[#302e86]")}
          >
            {m === "once" ? "Generate once" : "Auto-repeat"}
          </button>
        ))}
      </div>
      <div className="mt-2.5 grid items-center gap-x-1 gap-y-1.5" style={{ gridTemplateColumns: "58px repeat(7, minmax(0, 1fr))" }}>
        <span />
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-center font-mono text-[9px] font-bold text-[#8b93b3]">
            {d}
          </span>
        ))}
        {OPS.map((name, r) => (
          <div key={name} className="contents">
            <span className="truncate text-[10.5px] font-bold text-[#1b1f4b]">{name}</span>
            {Array.from({ length: 7 }, (_, c) => {
              const k = CYCLE[(c + r * 2) % 6];
              const repeated = mode === "repeat" && c >= 5;
              return (
                <span
                  key={c}
                  className={cn("grid h-[22px] place-items-center rounded-md font-mono text-[10px] font-bold transition-all duration-300", CHIP[k], repeated && "ring-1 ring-[#4db8ff] ring-offset-1")}
                >
                  {k}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-[#e6ebf7] pt-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#302e86]">D · D · N · N · O · O</span>
        <span className="flex gap-1.5 text-[10px] font-bold">
          <span className="rounded bg-[#2f6bff] px-1.5 py-0.5 text-white">D {counts.D}</span>
          <span className="rounded bg-[#5b59c9] px-1.5 py-0.5 text-white">N {counts.N}</span>
          <span className="rounded bg-[#e8ecf8] px-1.5 py-0.5 text-[#6b7392]">O {counts.O}</span>
        </span>
      </div>
    </>
  );
}

const RISK = [
  { n: "Tejas Aravind K.", r: "RTG Operator", p: 78, line: [30, 38, 34, 46, 52, 64, 78] },
  { n: "Solanki Tamanna R.", r: "Gate Operator", p: 52, line: [40, 36, 44, 42, 50, 46, 52] },
  { n: "Jaykumar", r: "QC Operator", p: 31, line: [28, 34, 30, 33, 29, 32, 31] },
  { n: "Vidhan", r: "QC Operator", p: 14, line: [20, 18, 16, 17, 15, 14, 14] },
];

function Spark({ v, color }: { v: number[]; color: string }) {
  const pts = v.map((y, i) => `${(i / (v.length - 1)) * 52},${20 - (y / 100) * 18}`).join(" ");
  return (
    <svg viewBox="0 0 52 20" className="h-5 w-[52px] shrink-0" fill="none" aria-hidden>
      <polyline points={pts} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Page 3: operators ranked by absence risk, with an Arrange action that clears the top one. */
function RiskPage() {
  const [arranged, setArranged] = useState(false);
  const gaps = arranged ? 0 : 1;
  return (
    <>
      <Header
        page={2}
        title="Absence risk"
        sub="AI Roster Planner · next shift"
        right={
          <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300", gaps ? "bg-[#ffe1e5] text-[#c0152a]" : "bg-[#d9f7ea] text-[#047857]")}>
            {gaps ? "1 gap flagged" : "0 gaps"}
          </span>
        }
      />
      <ul className="mt-2.5 flex flex-1 flex-col justify-between gap-1.5">
        {RISK.map((o, i) => {
          const clear = arranged && i === 0;
          const p = clear ? 12 : o.p;
          const tone = p >= 70 ? "#d51f2c" : p >= 40 ? "#d97706" : "#059669";
          return (
            <li key={o.n} className={cn("flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-colors duration-500", p >= 70 ? "border-[#ffd1d7] bg-[#fff5f6]" : "border-[#e6ebf7] bg-white")}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2f6bff] to-[#5b59c9] text-[10px] font-extrabold text-white">
                {o.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[11px] font-bold text-[#12153d]">{o.n}</span>
                <span className="block truncate text-[9.5px] font-semibold text-[#8b93b3]">{o.r}</span>
              </span>
              <Spark v={clear ? [30, 24, 20, 16, 14, 13, 12] : o.line} color={tone} />
              {i === 0 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setArranged((a) => !a);
                  }}
                  className={cn("w-[62px] shrink-0 rounded-md px-1.5 py-1 text-center text-[10px] font-bold transition-all duration-300", clear ? "bg-[#d9f7ea] text-[#047857]" : "bg-[#302e86] text-white hover:bg-[#2f6bff]")}
                >
                  {clear ? "Arranged ✓" : "Arrange"}
                </button>
              ) : (
                <span className="w-[62px] shrink-0" />
              )}
              <span className="w-8 shrink-0 text-right font-mono text-[11px] font-extrabold tabular-nums" style={{ color: tone }}>
                {p}%
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/**
 * A deck of guide pages that behave like small apps. Click the front page and it
 * flies to the back while the next one slides forward; it also turns by itself
 * every 2 seconds unless you hover it. Inside, the checklist boxes tick, the
 * roster has a working schedule switch and the top absence risk can be arranged.
 */
export function GuideVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [order, setOrder] = useState([0, 1, 2]); // sheet index at each rank, front first
  const [leaving, setLeaving] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [done, setDone] = useState<boolean[]>(() => Array.from({ length: TOTAL }, (_, i) => i < 3));
  const busy = useRef(false);

  const flip = () => {
    if (busy.current) return;
    busy.current = true;
    const front = order[0];
    setLeaving(front);
    setTimeout(
      () => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setLeaving(null);
        busy.current = false;
      },
      reduced ? 0 : 380,
    );
  };

  useEffect(() => {
    if (reduced || !inView || hovered) return;
    const id = setInterval(flip, 2000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, inView, hovered, order]);

  return (
    <div ref={ref} className="relative mx-auto h-[290px] w-full max-w-[680px] select-none" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <div className="absolute inset-x-0 top-0 h-[340px] origin-top scale-[0.84]">
        <span className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6bff]/20 blur-3xl" aria-hidden />

        {SHEETS.map((title, sheet) => {
          const rank = order.indexOf(sheet);
          const p = POSE[rank];
          const flying = leaving === sheet;
          return (
            <motion.div
              key={title}
              role="button"
              tabIndex={0}
              aria-label={rank === 0 ? `${title}, page ${sheet + 1} of 3. Press to flip to the next page` : `Show ${title}`}
              onClick={rank === 0 ? flip : () => setOrder((o) => { const r = o.indexOf(sheet); return [...o.slice(r), ...o.slice(0, r)]; })}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
                e.preventDefault();
                e.currentTarget.click();
              }}
              animate={flying ? { x: 220, y: -14, rotate: 14, scale: 1 } : p}
              transition={flying ? { duration: 0.38, ease: [0.4, 0, 0.9, 0.5] } : { type: "spring", stiffness: 210, damping: 24 }}
              style={{ zIndex: flying ? 5 : 3 - rank }}
              className={cn(
                "absolute left-1/2 top-3 -ml-[190px] flex h-[300px] w-[380px] flex-col rounded-2xl border border-white/60 bg-white p-4 text-left shadow-[0_28px_56px_-24px_rgba(10,12,60,0.75)]",
                "cursor-pointer",
                rank > 0 && "hover:-translate-y-1",
              )}
            >
              {sheet === 0 ? <ChecklistPage done={done} toggle={(i) => setDone((d) => d.map((v, k) => (k === i ? !v : v)))} /> : sheet === 1 ? <RosterPage /> : <RiskPage />}
              {rank === 0 && (
                <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#302e86] px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-white shadow-float">
                  Click to flip →
                </span>
              )}
            </motion.div>
          );
        })}

        <span
          className="absolute right-0 top-[2%] grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ff5468] to-[#d51f2c] font-display text-[20px] font-extrabold text-white shadow-float"
          style={{ animation: "frame-float 6s ease-in-out -2s infinite", zIndex: 6 }}
          aria-hidden
        >
          {TOTAL}
        </span>

        {/* page dots */}
        <div className="absolute left-1/2 flex -translate-x-1/2 gap-1.5" style={{ top: 322 }} aria-hidden>
          {SHEETS.map((_, i) => (
            <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", order[0] === i ? "w-6 bg-white" : "w-1.5 bg-white/40")} />
          ))}
        </div>
      </div>
    </div>
  );
}
