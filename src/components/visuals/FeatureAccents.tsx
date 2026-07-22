"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { Check } from "@/components/ui/icons";

const ROSTER_TARGET = 128;
const ROSTER_ENTRIES = [
  "A. J. Gohil → Day · CT2",
  "Abhay Verma → Night · CT3",
  "A. Kumar → Off · Gate",
  "A. Baraiya → Day · CT4",
  "R. Solanki → Night · T2",
  "K. Meena → Day · SPRH",
  "Imran S. → Night · CT2",
  "Dinesh R. → Day · Gate",
];

/** Auto-rostering: a live feed of shifts being auto-resolved, with a running progress count. */
export function RosterAccent() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [resolved, setResolved] = useState(0);
  const [feed, setFeed] = useState<{ id: number; label: string }[]>([]);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setResolved(ROSTER_TARGET);
      setFeed(ROSTER_ENTRIES.slice(0, 4).map((label, id) => ({ id, label })));
      return;
    }
    let n = 0;
    const push = () => {
      setFeed((f) =>
        [{ id: Date.now() + n, label: ROSTER_ENTRIES[n % ROSTER_ENTRIES.length] }, ...f].slice(0, 4)
      );
      setResolved((r) => Math.min(ROSTER_TARGET, r + Math.ceil(Math.random() * 7)));
      n++;
    };
    push();
    const t = setInterval(push, 850);
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
          Auto-resolved this cycle
        </span>
        <span className="font-mono text-sm font-bold tabular-nums text-teal-400">
          {resolved}
          <span className="text-fg-faint">/{ROSTER_TARGET}</span>
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500"
          animate={{ width: `${(resolved / ROSTER_TARGET) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-3 space-y-1.5">
        <AnimatePresence initial={false}>
          {feed.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 rounded-lg border border-line bg-ink-800/50 px-2.5 py-1.5 text-[11.5px]"
            >
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal-400/15 text-teal-300">
                <Check width={9} height={9} />
              </span>
              <span className="truncate text-fg-muted">{f.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Attendance prediction: a risk gauge sweeping to a probability, with the recall-tuned threshold marked. */
export function PredictionAccent() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = 91;
  const threshold = 55; // deliberately low → over-catch risk
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const ARC = Math.PI * 58; // length of the semicircular gauge path
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox="0 0 140 78" className="w-44">
        <path
          d="M12 70 A58 58 0 0 1 128 70"
          fill="none"
          stroke="rgba(148,163,196,0.14)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M12 70 A58 58 0 0 1 128 70"
          fill="none"
          stroke="url(#riskgrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={ARC}
          strokeDashoffset={ARC * (1 - val / 100)}
          style={{ transition: reduced ? "none" : "stroke-dashoffset 0.1s linear" }}
        />
        {/* threshold tick */}
        <g
          transform={`rotate(${-90 + (threshold / 100) * 180} 70 70)`}
          style={{ transformOrigin: "70px 70px" }}
        >
          <line x1="70" y1="18" x2="70" y2="26" stroke="#d51f2c" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <defs>
          <linearGradient id="riskgrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2fbf71" />
            <stop offset="0.55" stopColor="#f0a52a" />
            <stop offset="1" stopColor="#f2564b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="-mt-4 text-center">
        <div className="text-2xl font-semibold tabular-nums text-fg">
          {val}
          <span className="text-base text-fg-muted">%</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-risk-high">
          Absence risk · flag
        </div>
      </div>
      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-signal">
        <span className="h-2 w-px bg-signal" /> recall-tuned threshold
      </div>
    </div>
  );
}

/** Workforce analytics: paired confirmation vs. punch-in bars growing in. */
export function AnalyticsAccent() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const rows: [string, number, number][] = [
    ["RTG", 88, 60],
    ["Gate", 74, 52],
    ["QC", 66, 48],
    ["RST", 58, 40],
  ];
  return (
    <div ref={ref} className="w-full space-y-2.5">
      {rows.map(([label, conf, punch], i) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-9 shrink-0 font-mono text-[10px] uppercase text-fg-faint">
            {label}
          </span>
          <div className="flex-1 space-y-1">
            <Bar pct={conf} color="bg-teal-400" show={inView || reduced} delay={i * 0.08} />
            <Bar pct={punch} color="bg-indigo-500/70" show={inView || reduced} delay={i * 0.08 + 0.05} />
          </div>
        </div>
      ))}
      <div className="flex gap-4 pt-1 font-mono text-[9.5px] text-fg-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-teal-400" /> Confirmation %
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-indigo-500/70" /> Punch-in %
        </span>
      </div>
    </div>
  );
}

function Bar({
  pct,
  color,
  show,
  delay,
}: {
  pct: number;
  color: string;
  show: boolean;
  delay: number;
}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: show ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn("h-full rounded-full", color)}
      />
    </div>
  );
}
