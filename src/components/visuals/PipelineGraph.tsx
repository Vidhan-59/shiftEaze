"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { pipeline } from "@/content/sections";
import { Database, Shield, Brain, Refresh, Bolt } from "@/components/ui/icons";

const ICONS = [Database, Shield, Brain, Refresh, Bolt];

/** Sticky schematic of the 5-stage prediction pipeline; `active` is driven by scroll. */
export function PipelineGraph({ active }: { active: number }) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-fg-faint">
          prediction pipeline
        </span>
        <span className="font-mono text-[10.5px] text-teal-300">
          stage {String(active + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <div className="relative">
        {/* rail */}
        <div className="absolute bottom-3 left-[19px] top-3 w-px bg-line-strong" />
        <motion.div
          className="absolute left-[19px] top-3 w-px bg-gradient-to-b from-teal-300 to-teal-500"
          animate={{ height: `${(active / (pipeline.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxHeight: "calc(100% - 24px)" }}
        />

        <ul className="space-y-3.5">
          {pipeline.map((s, i) => {
            const Icon = ICONS[i];
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={s.step} className="relative flex gap-4">
                <span
                  className={cn(
                    "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                    isActive
                      ? "border-teal-300 bg-teal-400 text-ink-950 shadow-glow"
                      : isPast
                        ? "border-teal-500/40 bg-teal-500/15 text-teal-300"
                        : "border-line bg-ink-800 text-fg-faint"
                  )}
                >
                  <Icon width={18} height={18} />
                  {isActive && (
                    <span className="absolute -inset-1 animate-pulse-ring rounded-full border border-teal-300/50" />
                  )}
                </span>
                <div
                  className={cn(
                    "min-w-0 flex-1 rounded-xl border px-4 py-3 transition-all duration-500",
                    isActive
                      ? "border-teal-500/30 bg-teal-500/[0.06]"
                      : "border-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                      {s.kicker}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "text-[14px] font-medium transition-colors",
                      isActive ? "text-fg" : "text-fg-muted"
                    )}
                  >
                    {s.title}
                  </div>
                  {/*
                    Opacity only — deliberately never height. This graph is
                    also rendered inline in the mobile flow (HowItWorks.tsx),
                    where `active` comes from a scrubbed ScrollTrigger. An
                    animated height there changed the document height on
                    scroll, which fed straight back into Lenis's smooth
                    scrolling. Reserving the row keeps it inert.
                  */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="mt-1.5 inline-block font-mono text-[10.5px] text-teal-300">
                      {s.tag}
                    </span>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
