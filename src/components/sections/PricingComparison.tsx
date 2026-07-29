"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "@/components/ui/icons";
import {
  pricingComparison,
  pricingCompareTiers,
  type CompareValue,
} from "@/content/sections";
import { cn } from "@/lib/utils";

const GRID = "grid grid-cols-[minmax(9rem,1.7fr)_repeat(3,minmax(5rem,1fr))]";

/**
 * A tick and an em-dash carry the entire meaning of this table visually, but
 * neither has any text for a screen reader — a row used to be announced as the
 * feature name followed by three silences. Each cell now states its own value.
 */
function Cell({ value, tier }: { value: CompareValue; tier: string }) {
  if (value === true)
    return (
      <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-teal-400/15 text-teal-300">
        <Check width={12} height={12} aria-hidden />
        <span className="sr-only">{tier}: included</span>
      </span>
    );
  // Explicitly `=== false`: a bare falsy check would also swallow "".
  if (value === false || value === undefined)
    return (
      <span className="text-fg-faint/60">
        <span aria-hidden>—</span>
        <span className="sr-only">{tier}: not included</span>
      </span>
    );
  return (
    <span className="text-[12.5px] font-medium leading-tight text-fg">
      <span className="sr-only">{tier}: </span>
      {value}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform duration-300", open ? "rotate-180" : "")}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PricingComparison() {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(pricingComparison.map((_, i) => i))
  );

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="mt-20">
      <h3 className="text-center text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight text-fg">
        Compare every feature
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-fg-muted">
        The same platform end to end — each tier adds capability, not a different
        product.
      </p>

      <div className="mt-10 overflow-x-auto">
        <div className="min-w-[640px] overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {/*
            Tier header. Deliberately not `sticky` — it used to be, but it
            could never engage: the horizontal scroller above sets
            `overflow-x: auto`, and CSS resolves the other axis to `auto` too,
            making that div the sticky containing block. It never scrolls
            vertically, so the header simply sat in place while reading like a
            working feature.
          */}
          <div
            className={cn(
              GRID,
              "items-end border-b border-line bg-white/95 px-5 py-4 backdrop-blur"
            )}
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              Features
            </span>
            {pricingCompareTiers.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "text-center text-[13.5px] font-semibold",
                  i === 1 ? "text-teal-300" : "text-fg"
                )}
              >
                {t}
                {i === 1 && (
                  <span className="mt-1 hidden justify-center sm:flex">
                    <span className="rounded-full bg-teal-400/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal-300">
                      Popular
                    </span>
                  </span>
                )}
              </span>
            ))}
          </div>

          {pricingComparison.map((grp, gi) => {
            const isOpen = open.has(gi);
            return (
              <div key={grp.group} className="border-b border-line last:border-b-0">
                <button
                  onClick={() => toggle(gi)}
                  aria-expanded={isOpen}
                  aria-controls={`compare-group-${gi}`}
                  className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-ink-800/40"
                >
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-fg">
                    {grp.group}
                  </span>
                  <span className="text-fg-faint">
                    <Chevron open={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`compare-group-${gi}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {grp.rows.map((row, ri) => (
                        <div
                          key={row.feature}
                          className={cn(
                            GRID,
                            "items-center px-5 py-3 text-[13.5px]",
                            ri % 2 === 1 && "bg-ink-800/25"
                          )}
                        >
                          <span className="pr-3 text-fg-muted">
                            {row.feature}
                            {row.note && (
                              <span className="mt-0.5 block text-[11px] leading-tight text-fg-faint">
                                {row.note}
                              </span>
                            )}
                          </span>
                          {row.values.map((v, vi) => (
                            <span
                              key={vi}
                              className={cn(
                                "flex justify-center px-1 text-center",
                                vi === 1 && "rounded-md bg-teal-500/[0.04] py-2"
                              )}
                            >
                              <Cell value={v} tier={pricingCompareTiers[vi]} />
                            </span>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
