"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/*
 * Note: there was a third accent here (`RosterAccent`) — a live "auto-resolved
 * this cycle" feed on an 850ms interval. It was removed because it shifted
 * layout forever; see the comment on ACCENTS in sections/Features.tsx.
 *
 * The two below are safe by construction: each is gated on `useInView({ once:
 * true })`, animates to a fixed end state, and then stops. Neither holds a
 * repeating timer, so neither can move the page after it has settled.
 */

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
