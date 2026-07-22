"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { Check } from "@/components/ui/icons";

type Shift = "D" | "N" | "O" | "A";

const SHIFT_STYLE: Record<Shift, string> = {
  D: "bg-teal-500 text-white",
  N: "bg-indigo-500 text-white",
  O: "bg-ink-700 text-fg-faint",
  A: "bg-risk-high text-white",
};

const ROWS: { op: string; role: string; pat: Shift[] }[] = [
  { op: "A. J. Gohil", role: "QC Operator", pat: ["D", "D", "N", "N", "O", "O"] },
  { op: "Abhay Verma", role: "RTG Operator", pat: ["N", "N", "O", "O", "D", "D"] },
  { op: "A. Kumar", role: "Gate Operator", pat: ["O", "D", "D", "N", "N", "O"] },
  { op: "A. Baraiya", role: "QC Operator", pat: ["D", "O", "O", "D", "N", "N"] },
];

const FEED_NAMES = [
  "Ramesh P.",
  "Suresh K.",
  "Imran S.",
  "Dinesh R.",
  "Kiran M.",
  "Jadeja V.",
];
const TERMS = ["CT2", "CT3", "CT4", "T2", "SPRH"];

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);

  // Pointer tilt — a subtle 3D lean toward the cursor.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const [confirmed, setConfirmed] = useState(113);
  const [risk, setRisk] = useState([0, 0]);
  const [feed, setFeed] = useState<{ id: number; name: string; term: string }[]>(
    []
  );
  const [flip, setFlip] = useState<string | null>(null);

  // Reveal risk bars once mounted.
  useEffect(() => {
    const t = setTimeout(() => setRisk([98, 93]), 700);
    return () => clearTimeout(t);
  }, []);

  // Live behaviour — disabled under reduced motion.
  useEffect(() => {
    if (reduced) {
      setFeed([
        { id: 1, name: "Ramesh P.", term: "CT2" },
        { id: 2, name: "Imran S.", term: "CT3" },
      ]);
      return;
    }
    let n = 3;
    const pushFeed = () => {
      setFeed((f) =>
        [
          {
            id: n++,
            name: FEED_NAMES[Math.floor(Math.random() * FEED_NAMES.length)],
            term: TERMS[Math.floor(Math.random() * TERMS.length)],
          },
          ...f,
        ].slice(0, 3)
      );
    };
    pushFeed();
    pushFeed();
    const a = setInterval(pushFeed, 2400);
    const b = setInterval(() => {
      setConfirmed((c) => (c > 128 ? 113 : c + Math.floor(Math.random() * 3)));
    }, 2600);
    const c = setInterval(() => {
      const ri = Math.floor(Math.random() * ROWS.length);
      const ci = Math.floor(Math.random() * 6);
      setFlip(`${ri}-${ci}`);
      setTimeout(() => setFlip(null), 620);
    }, 2000);
    return () => {
      clearInterval(a);
      clearInterval(b);
      clearInterval(c);
    };
  }, [reduced]);

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ y, rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-xl [transform-style:preserve-3d]"
    >
      {/* Main board */}
      <div className="glass overflow-hidden rounded-2xl shadow-float">
        <div className="relative flex items-center gap-2 overflow-hidden bg-gradient-to-r from-teal-500 to-teal-400 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
          </div>
          <span className="ml-2 font-mono text-[11px] tracking-wide text-white/80">
            Scheduler · CT2 · Jul 2026
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white">
            <span className="relative flex h-1.5 w-1.5">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/70" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        </div>

        <div className="bg-white p-4">
          <div className="grid grid-cols-3 gap-2">
            <Kpi label="Planned" value="626" />
            <Kpi label="Confirmed" value={String(confirmed)} tone="ok" />
            <Kpi label="At-risk" value="57" tone="risk" />
          </div>

          <div className="mt-4 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
            <span>Operator</span>
            <span>Wed → Mon</span>
          </div>

          <div className="mt-2 space-y-2">
            {ROWS.map((r, ri) => (
              <div
                key={r.op}
                className="grid grid-cols-[1fr_auto] items-center gap-2"
              >
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-medium text-fg">
                    {r.op}
                  </div>
                  <div className="truncate text-[10px] text-fg-faint">
                    {r.role}
                  </div>
                </div>
                <div className="flex gap-1">
                  {r.pat.map((s, ci) => (
                    <span
                      key={ci}
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-md font-mono text-[10.5px] font-bold transition-transform duration-300",
                        SHIFT_STYLE[s]
                      )}
                      style={
                        flip === `${ri}-${ci}`
                          ? { transform: "rotateY(90deg) scale(1.1)" }
                          : undefined
                      }
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3 font-mono text-[9.5px] text-fg-faint">
            <Legend c="bg-teal-500" t="D · Day" />
            <Legend c="bg-indigo-500" t="N · Night" />
            <Legend c="bg-ink-600" t="O · Off" />
            <Legend c="bg-risk-high" t="A · Absent" />
          </div>
        </div>
      </div>

      {/* Floating AI risk card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "translateZ(40px)" }}
        className={cn(
          "glass absolute -bottom-6 -right-3 w-56 rounded-xl p-3.5 shadow-float sm:-right-8",
          !reduced && "animate-drift"
        )}
      >
        <div className="mb-2.5 flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-teal-400 text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 3-3 3 3 0 0 0 0-6 3 3 0 0 0-3-3V5a3 3 0 0 0-3-3Z" />
            </svg>
          </span>
          <span className="text-[12px] font-semibold text-fg">
            AI absence risk
          </span>
        </div>
        {[
          { n: "Tejas Aravind K.", v: risk[0] },
          { n: "Solanki Tamanna R.", v: risk[1] },
        ].map((row) => (
          <div key={row.n} className="mb-2 last:mb-0">
            <div className="mb-1 flex items-center justify-between text-[10.5px]">
              <span className="text-fg-muted">{row.n}</span>
              <span className="font-mono font-bold text-risk-high">
                {row.v}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-risk-med to-risk-high transition-[width] duration-1000 ease-out"
                style={{ width: `${row.v}%` }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating live punch-in feed */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "translateZ(60px)" }}
        className={cn(
          "glass absolute -left-3 -top-6 w-52 rounded-xl p-3 shadow-float sm:-left-8",
          !reduced && "animate-drift"
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-fg">
            Live punch-in
          </span>
          <span className="font-mono text-[11px] font-bold text-teal-300">
            133
          </span>
        </div>
        <div className="space-y-1.5">
          {feed.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[10.5px]"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-teal-400/15 text-teal-300">
                <Check width={9} height={9} />
              </span>
              <span className="truncate text-fg">
                {f.name}{" "}
                <span className="text-fg-faint">· {f.term}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok" | "risk";
}) {
  return (
    <div className="rounded-lg border border-line bg-ink-800/70 px-3 py-2.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
        {label}
      </div>
      <div
        className={cn(
          "mt-0.5 text-lg font-semibold tracking-tight tabular-nums",
          tone === "ok" && "text-teal-300",
          tone === "risk" && "text-risk-high",
          !tone && "text-fg"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded", c)} />
      {t}
    </span>
  );
}
