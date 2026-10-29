"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { Check } from "@/components/ui/icons";
import { easeExpo } from "@/lib/motion";

type Shift = "D" | "N" | "O" | "A";

const SHIFT_STYLE: Record<Shift, string> = {
  D: "bg-teal-500 text-white",
  N: "bg-indigo-500 text-white",
  O: "bg-ink-700 text-fg-faint",
  A: "bg-risk-high text-white",
};
const SHIFT_NAME: Record<Shift, string> = { D: "Day", N: "Night", O: "Off", A: "Absent" };
// Clicking a shift cycles it; a predicted absence is simply covered with a day shift.
const NEXT: Record<Shift, Shift> = { D: "N", N: "O", O: "D", A: "D" };

const DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

const ROWS: { op: string; role: string; risk?: boolean; pat: Shift[] }[] = [
  { op: "Amit", role: "QC Operator", pat: ["D", "D", "N", "N", "O", "O"] },
  { op: "Nehang", role: "RTG Operator", pat: ["N", "N", "O", "O", "D", "D"] },
  { op: "Jaykumar", role: "Gate Operator", pat: ["O", "D", "D", "N", "N", "O"] },
  { op: "Vidhan", role: "QC Operator", pat: ["D", "O", "O", "D", "N", "N"] },
  { op: "Tejas Aravind K.", role: "RTG Operator", risk: true, pat: ["D", "D", "A", "D", "O", "O"] },
  { op: "Solanki Tamanna R.", role: "Gate Operator", risk: true, pat: ["O", "N", "N", "A", "D", "D"] },
];

const FEED_NAMES = ["Ramesh P.", "Suresh K.", "Imran S.", "Dinesh R.", "Kiran M.", "Jadeja V."];
const TERMS = ["CT2", "CT3", "CT4", "T2", "SPRH"];

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  // Live timers only run while the board is actually on screen.
  const inView = useInView(wrapRef, { amount: 0.15 });

  const [grid, setGrid] = useState<Shift[][]>(() => ROWS.map((r) => r.pat));
  const [confirmed, setConfirmed] = useState(113);
  const [risk, setRisk] = useState([0, 0]);
  const [feed, setFeed] = useState<{ id: number; name: string; term: string }[]>([]);
  const [flip, setFlip] = useState<string | null>(null);
  // Must outlive the effect below: it re-runs on every scroll back into view, and a
  // counter declared inside it would restart and hand out ids still present in `feed`.
  const feedId = useRef(3);

  const cycle = (ri: number, ci: number) =>
    setGrid((g) => g.map((row, r) => (r === ri ? row.map((s, c) => (c === ci ? NEXT[s] : s)) : row)));

  // Reveal the risk bars once the board is first seen.
  const seen = useRef(false);
  useEffect(() => {
    if (!inView || seen.current) return;
    seen.current = true;
    const t = setTimeout(() => setRisk([98, 93]), 500);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (reduced) {
      setFeed([
        { id: 1, name: "Ramesh P.", term: "CT2" },
        { id: 2, name: "Imran S.", term: "CT3" },
        { id: 3, name: "Kiran M.", term: "T2" },
      ]);
      return;
    }
    if (!inView) return;

    const pushFeed = () => {
      setFeed((f) =>
        [
          {
            id: feedId.current++,
            name: FEED_NAMES[Math.floor(Math.random() * FEED_NAMES.length)],
            term: TERMS[Math.floor(Math.random() * TERMS.length)],
          },
          ...f,
        ].slice(0, 4)
      );
    };
    pushFeed();
    pushFeed();
    const a = setInterval(pushFeed, 2400);
    const b = setInterval(() => {
      setConfirmed((c) => {
        const next = c + Math.floor(Math.random() * 3);
        return next > 128 ? 113 : next;
      });
    }, 2600);
    let resetFlip: ReturnType<typeof setTimeout> | undefined;
    const c = setInterval(() => {
      setFlip(`${Math.floor(Math.random() * ROWS.length)}-${Math.floor(Math.random() * DAYS.length)}`);
      clearTimeout(resetFlip);
      resetFlip = setTimeout(() => setFlip(null), 620);
    }, 2000);
    return () => {
      clearInterval(a);
      clearInterval(b);
      clearInterval(c);
      clearTimeout(resetFlip);
    };
  }, [reduced, inView]);

  return (
    // Flat 2D layout on purpose: no perspective/tilt, so every label stays pin-sharp.
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: easeExpo }}
      className="relative mx-auto w-full max-w-5xl rounded-[30px] border border-white/40 bg-white/15 p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl sm:p-3"
    >
      <div className="overflow-hidden rounded-[22px] bg-white/90 text-left backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#1f1c52] via-[#262261] to-[#302e86] px-4 py-3.5 sm:px-5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-white/40" />
            <span className="h-3 w-3 rounded-full bg-white/40" />
            <span className="h-3 w-3 rounded-full bg-white/40" />
          </div>
          <span className="ml-2 font-mono text-[13px] tracking-wide text-white/90">
            Scheduler · CT2 · Jul 2026
          </span>
          <span className="ml-auto flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-white">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#ff5468]" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5468]" />
            </span>
            Live
          </span>
        </div>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Roster */}
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi label="Planned" value="626" />
              <Kpi label="Confirmed" value={String(confirmed)} tone="ok" />
              <Kpi label="At-risk" value="57" tone="risk" />
              <Kpi label="Backfilled" value="48" tone="fill" />
            </div>

            <div className="mt-5 grid grid-cols-[minmax(104px,150px)_repeat(6,minmax(0,1fr))] sm:grid-cols-[170px_repeat(6,minmax(0,1fr))] items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                Operator
              </span>
              {DAYS.map((d) => (
                <span
                  key={d}
                  className="text-center font-mono text-[11px] uppercase tracking-wider text-fg-faint"
                >
                  {d}
                </span>
              ))}

              {ROWS.map((r, ri) => (
                <Row
                  key={r.op}
                  row={r}
                  shifts={grid[ri]}
                  flipCol={flip && flip.startsWith(`${ri}-`) ? Number(flip.split("-")[1]) : -1}
                  onCycle={(ci) => cycle(ri, ci)}
                />
              ))}
            </div>
          </div>

          {/* Side panel: AI risk + live punch-in */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-line bg-ink-850 p-4">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-400 text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 3-3 3 3 0 0 0 0-6 3 3 0 0 0-3-3V5a3 3 0 0 0-3-3Z" />
                  </svg>
                </span>
                <span className="text-[14px] font-bold text-fg">AI absence risk</span>
              </div>
              {[
                { n: "Tejas Aravind K.", v: risk[0] },
                { n: "Solanki Tamanna R.", v: risk[1] },
              ].map((row) => (
                <div key={row.n} className="mb-3 last:mb-0">
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <span className="font-medium text-fg-muted">{row.n}</span>
                    <span className="font-mono font-bold tabular-nums text-risk-high">{row.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-risk-med to-risk-high transition-[width] duration-1000 ease-out"
                      style={{ width: `${row.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-2xl border border-line bg-ink-850 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[14px] font-bold text-fg">Live punch-in</span>
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 font-mono text-[12px] font-bold text-teal-400">
                  133
                </span>
              </div>
              {/* Reserved height: the feed starts empty and fills in, which would otherwise resize the card. */}
              <div className="min-h-[7rem] space-y-2">
                {feed.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-[13px]"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-risk-low/15 text-risk-low">
                      <Check width={11} height={11} />
                    </span>
                    <span className="truncate font-medium text-fg">{f.name}</span>
                    <span className="ml-auto font-mono text-[11px] text-fg-faint">{f.term}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Legend + hint */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-ink-850 px-4 py-3 font-mono text-[11.5px] text-fg-muted sm:px-6">
          {(Object.keys(SHIFT_STYLE) as Shift[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-2">
              <span className={cn("h-3 w-3 rounded", SHIFT_STYLE[s].split(" ")[0])} />
              {s} · {SHIFT_NAME[s]}
            </span>
          ))}
          <span className="ml-auto text-fg-faint">Tap a shift to change it</span>
        </div>
      </div>
    </motion.div>
  );
}

function Row({
  row,
  shifts,
  flipCol,
  onCycle,
}: {
  row: (typeof ROWS)[number];
  shifts: Shift[];
  flipCol: number;
  onCycle: (ci: number) => void;
}) {
  return (
    <>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 truncate text-[13.5px] font-semibold text-fg">
          <span className="truncate">{row.op}</span>
          {row.risk && <span className="h-2 w-2 shrink-0 rounded-full bg-risk-high" aria-label="At risk" />}
        </div>
        <div className="truncate text-[11.5px] text-fg-faint">{row.role}</div>
      </div>
      {shifts.map((s, ci) => (
        <button
          key={ci}
          type="button"
          onClick={() => onCycle(ci)}
          aria-label={`${row.op}, ${DAYS[ci]}: ${SHIFT_NAME[s]}. Click to change.`}
          className={cn(
            "mx-auto grid h-9 w-full max-w-[46px] select-none place-items-center rounded-lg font-mono text-[13px] font-bold transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300",
            SHIFT_STYLE[s]
          )}
          style={flipCol === ci ? { transform: "rotateY(90deg) scale(1.1)" } : undefined}
        >
          {s}
        </button>
      ))}
    </>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok" | "risk" | "fill";
}) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 px-3.5 py-3">
      <div className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{label}</div>
      <div
        className={cn(
          "mt-1 font-display text-[26px] font-extrabold leading-none tracking-tight tabular-nums",
          tone === "ok" && "text-teal-400",
          tone === "risk" && "text-risk-high",
          tone === "fill" && "text-risk-low",
          !tone && "text-fg"
        )}
      >
        {value}
      </div>
    </div>
  );
}
