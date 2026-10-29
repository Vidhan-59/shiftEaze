"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { pricingTiers, volumeBands } from "@/content/pricing";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

const rupees = (s: string) => Number(s.replace(/[^\d]/g, ""));

// Milestones along the price path, all taken from the plan data.
const PATH = [
  { k: "Start", v: pricingTiers[0].subLabels[0] },
  { k: pricingTiers[0].name, v: `${pricingTiers[0].rate!.annual}${pricingTiers[0].unit}` },
  { k: pricingTiers[1].name, v: `${pricingTiers[1].rate!.annual}${pricingTiers[1].unit}` },
  { k: pricingTiers[2].name, v: pricingTiers[2].subLabels[0] },
];

/**
 * Gutter decoration for wide screens: on the left a "price path" that lights up
 * milestone by milestone; on the right the Enterprise volume bands as a falling
 * bar chart. Both follow the page as you scroll (sticky) and use only plan data.
 * Hidden below 1650px, where the content already fills the width.
 */
export function PricingSideRails() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [step] = useLoopStep(PATH.length, 2200, inView);
  const [band] = useLoopStep(volumeBands.length, 1800, inView);
  const max = Math.max(...volumeBands.map((b) => rupees(b.rate)));

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden min-[1650px]:block">
      {/* Left: price path */}
      <div className="absolute inset-y-0 left-4 w-[150px]">
        <div className="sticky top-32 flex flex-col">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#2f6bff]">Price path</span>
          <div className="relative mt-5 pl-7">
            <span className="absolute bottom-2 left-[9px] top-2 w-px border-l border-dashed border-[#302e86]/30" />
            <span
              className="absolute left-[8px] top-2 w-[3px] rounded-full bg-gradient-to-b from-[#2f6bff] to-[#d51f2c] transition-[height] duration-700"
              style={{ height: `${(step / (PATH.length - 1)) * 92}%` }}
            />
            <ul className="space-y-7">
              {PATH.map((p, i) => {
                const on = i === step;
                const done = i <= step;
                return (
                  <li key={p.k} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[27px] top-0.5 grid h-[18px] w-[18px] place-items-center rounded-full border-2 transition-all duration-500",
                        done ? "border-[#2f6bff] bg-[#2f6bff]" : "border-[#302e86]/30 bg-white",
                        on && "scale-125 shadow-[0_0_0_6px_rgba(47,107,255,0.2)]",
                      )}
                    >
                      {on && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2f6bff]/50" />}
                    </span>
                    <div className={cn("font-display text-[14px] font-extrabold leading-tight transition-colors duration-500", on ? "text-[#2f6bff]" : "text-[#302e86]/80")}>{p.k}</div>
                    <div className="mt-0.5 text-[11.5px] font-semibold leading-snug text-fg-muted">{p.v}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* floating coin */}
          <span
            className="mt-10 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#fde68a] to-[#f59e0b] font-display text-[20px] font-extrabold text-[#7c4a03] shadow-float ring-2 ring-white"
            style={{ animation: "frame-float 6s ease-in-out infinite" }}
          >
            ₹
          </span>
        </div>
      </div>

      {/* Right: volume bands */}
      <div className="absolute inset-y-0 right-4 w-[150px]">
        <div className="sticky top-32 flex flex-col">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d51f2c]">Volume bands</span>
          <div className="mt-5 flex h-[210px] items-end gap-2">
            {volumeBands.map((b, i) => {
              const h = (rupees(b.rate) / max) * 100;
              const on = i === band;
              return (
                <div key={b.range} className="flex h-full flex-1 flex-col items-center justify-end">
                  <span className={cn("mb-1 font-mono text-[10px] font-bold transition-all duration-500", on ? "text-[#d51f2c] opacity-100" : "text-fg-faint opacity-70")}>{b.rate}</span>
                  <span
                    className={cn(
                      "w-full origin-bottom rounded-t-lg transition-all duration-700",
                      on ? "bg-gradient-to-t from-[#d51f2c] to-[#ff5468] shadow-[0_10px_22px_-8px_rgba(213,31,44,0.8)]" : "bg-gradient-to-t from-[#302e86] to-[#5b59c9] opacity-70",
                    )}
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-2">
            {volumeBands.map((b, i) => (
              <span key={b.range} className={cn("flex-1 text-center font-mono text-[8.5px] font-semibold leading-tight transition-colors duration-500", i === band ? "text-[#d51f2c]" : "text-fg-faint")}>
                {b.range.split(/[–-]/)[0].trim()}
              </span>
            ))}
          </div>
          <div className="mt-4 min-h-[44px]">
            <div className="text-[11.5px] font-semibold leading-snug text-fg-muted">
              {volumeBands[band].range} operators
              {volumeBands[band].saving && <span className="ml-1.5 rounded-full bg-[#34d399] px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-[#0d0c2b]">{volumeBands[band].saving}</span>}
            </div>
          </div>
          <span
            className="mt-6 grid h-12 w-12 place-items-center self-end rounded-full bg-gradient-to-br from-[#fde68a] to-[#f59e0b] font-display text-[20px] font-extrabold text-[#7c4a03] shadow-float ring-2 ring-white"
            style={{ animation: "frame-float 7s ease-in-out -3s infinite" }}
          >
            ₹
          </span>
        </div>
      </div>
    </div>
  );
}
