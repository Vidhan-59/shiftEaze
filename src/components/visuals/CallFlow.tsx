"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { callTypes } from "@/content/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { Phone } from "@/components/ui/icons";

export function CallFlow() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % callTypes.length),
      2800
    );
    return () => clearInterval(t);
  }, [reduced]);

  const current = callTypes[active];

  return (
    <div className="glass grid gap-6 rounded-2xl p-5 sm:p-7 md:grid-cols-[1fr_auto_1fr] md:items-center">
      {/* Events */}
      <div className="space-y-2">
        <div className="mb-2 font-mono text-[10.5px] uppercase tracking-widest text-fg-faint">
          Platform event
        </div>
        {callTypes.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-0.5",
              i === active
                ? "border-teal-500/40 bg-teal-500/[0.08] shadow-[0_4px_14px_-6px_rgba(48,46,134,0.35)]"
                : "border-line bg-ink-800/40 hover:border-teal-400/30 hover:bg-teal-500/[0.04]"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full transition-colors",
                i === active ? "bg-teal-300" : "bg-fg-faint/50"
              )}
            />
            <span
              className={cn(
                "text-[13px]",
                i === active ? "text-fg" : "text-fg-muted"
              )}
            >
              {c.trigger}
            </span>
          </button>
        ))}
      </div>

      {/* Connector */}
      <div className="relative hidden h-24 w-16 items-center justify-center md:flex" aria-hidden>
        <svg viewBox="0 0 64 96" className="absolute inset-0 h-full w-full">
          <path
            d="M0 48 H64"
            stroke="rgba(148,163,196,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
        {!reduced && (
          <motion.span
            key={active}
            className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal-300 shadow-glow"
            initial={{ left: 0, opacity: 0 }}
            animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      {/* Phone / call card */}
      <div className="relative overflow-hidden rounded-xl border border-line bg-ink-800/60 p-5">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-teal-400 text-ink-950">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-400/60" />
            )}
            <Phone width={18} height={18} />
          </span>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-teal-300">
              ShiftEaze Voice · auto-call
            </div>
            <div className="text-[11px] text-fg-faint">EN · HI · GU</div>
          </div>
        </div>

        <div className="mt-4 min-h-[68px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-[15px] font-semibold text-fg">
                {current.title}
              </div>
              <div className="mt-1 text-[12.5px] leading-snug text-fg-muted">
                {current.text}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* waveform */}
        <div className="mt-3 flex h-6 items-end gap-1">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1 rounded-full bg-teal-400/70",
                !reduced && "animate-drift"
              )}
              style={{
                height: `${20 + (Math.sin(i * 1.3 + active) + 1) * 40}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${1 + (i % 3) * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
