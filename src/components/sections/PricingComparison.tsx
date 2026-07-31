"use client";

import { useState } from "react";
import { Check } from "@/components/ui/icons";
import {
  pricingComparison,
  pricingCompareTiers,
  type CompareValue,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

const GRID = "grid grid-cols-[minmax(11rem,1.6fr)_repeat(3,minmax(8rem,1fr))]";

/**
 * A cell carries one of four states plus free text. The glyph alone is
 * meaningless to a screen reader, so every state also renders visually-hidden
 * wording naming the tier — otherwise a row reads as its feature name followed
 * by three silences.
 */
function Cell({ value, tier }: { value: CompareValue; tier: string }) {
  const { level, text } = value;

  if (level === "none") {
    return (
      <span className="text-fg-faint/50">
        <span aria-hidden>—</span>
        <span className="sr-only">{tier}: not included</span>
      </span>
    );
  }

  if (level === "text") {
    return (
      <span className="text-[12.5px] leading-snug text-fg">
        <span className="sr-only">{tier}: </span>
        {text}
      </span>
    );
  }

  const tone =
    level === "full"
      ? "bg-teal-400/15 text-teal-300"
      : level === "partial"
        ? "bg-ink-600 text-fg-muted"
        : "bg-accent-500/12 text-accent-600";

  const word =
    level === "full" ? "included" : level === "partial" ? "limited" : "paid add-on";

  return (
    <span className="flex flex-col items-center gap-1">
      <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full", tone)}>
        {level === "full" ? (
          <Check width={11} height={11} aria-hidden />
        ) : level === "partial" ? (
          <span className="text-[11px] font-bold leading-none" aria-hidden>
            ◐
          </span>
        ) : (
          <span className="text-[11px] font-bold leading-none" aria-hidden>
            +
          </span>
        )}
        <span className="sr-only">
          {tier}: {word}
        </span>
      </span>
      {text && (
        <span className="text-center text-[11.5px] leading-tight text-fg-muted">
          {text}
        </span>
      )}
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
      className={cn("transition-transform duration-300", open && "rotate-180")}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Desktop: a real table with a header that sticks to the viewport. */
function DesktopTable() {
  const [closed, setClosed] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setClosed((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line bg-white lg:block">
      {/*
        `sticky top-20` genuinely works here because nothing above it creates a
        scroll container. An earlier version wrapped the table in
        `overflow-x-auto`, which makes that wrapper the sticky containing block
        — it never scrolls vertically, so the header sat inert. The narrow
        layout is handled by the accordion below instead of by side-scrolling.
      */}
      <div
        className={cn(
          GRID,
          "sticky top-20 z-20 items-end gap-4 border-b border-line bg-white/95 px-6 py-4 backdrop-blur"
        )}
      >
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
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
              <span className="mt-1 flex justify-center">
                <span className="rounded-full bg-teal-400/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal-300">
                  Most popular
                </span>
              </span>
            )}
          </span>
        ))}
      </div>

      {pricingComparison.map((grp, gi) => {
        const open = !closed.has(gi);
        return (
          <div key={grp.group} className="border-b border-line last:border-b-0">
            <button
              onClick={() => toggle(gi)}
              aria-expanded={open}
              aria-controls={`cmp-${gi}`}
              className="flex w-full items-center justify-between gap-3 bg-ink-850 px-6 py-3 text-left transition-colors hover:bg-ink-800"
            >
              <span className="text-[12.5px] font-semibold uppercase tracking-wide text-fg">
                {grp.group}
              </span>
              <span className="text-fg-faint">
                <Chevron open={open} />
              </span>
            </button>

            {open && (
              <div id={`cmp-${gi}`}>
                {grp.rows.map((row, ri) => (
                  <div
                    key={row.feature}
                    className={cn(
                      GRID,
                      "items-center gap-4 px-6 py-3.5",
                      ri % 2 === 1 && "bg-ink-850/50"
                    )}
                  >
                    <span className="text-[13.5px] font-medium leading-snug text-fg">
                      {row.feature}
                    </span>
                    {row.values.map((v, vi) => (
                      <span
                        key={vi}
                        className={cn(
                          "flex justify-center px-2 text-center",
                          vi === 1 && "rounded-md bg-teal-500/[0.04] py-2"
                        )}
                      >
                        <Cell value={v} tier={pricingCompareTiers[vi]} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Narrow screens: one plan at a time. Three columns of dense comparison text
 * can't be made readable at 390px, and side-scrolling a table is worse than
 * choosing a plan and reading straight down it.
 */
function MobileAccordion() {
  const [tier, setTier] = useState(1);

  return (
    <div className="mt-8 lg:hidden">
      <div className="flex gap-2 rounded-full border border-line bg-white p-1">
        {pricingCompareTiers.map((t, i) => (
          <button
            key={t}
            onClick={() => setTier(i)}
            aria-pressed={tier === i}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
              tier === i ? "bg-teal-400 text-white" : "text-fg-muted hover:text-fg"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
        {pricingComparison.map((grp) => (
          <div key={grp.group} className="border-b border-line last:border-b-0">
            <div className="bg-ink-850 px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-fg">
              {grp.group}
            </div>
            {grp.rows.map((row, ri) => (
              <div
                key={row.feature}
                className={cn(
                  "flex items-start justify-between gap-4 px-4 py-3",
                  ri % 2 === 1 && "bg-ink-850/50"
                )}
              >
                <span className="text-[13px] font-medium leading-snug text-fg">
                  {row.feature}
                </span>
                <span className="shrink-0 basis-[45%] text-right">
                  <Cell
                    value={row.values[tier]}
                    tier={pricingCompareTiers[tier]}
                  />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingComparison() {
  return (
    <div className="mt-24">
      <h3 className="text-center text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-tight text-fg">
        Compare every capability
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-fg-muted">
        One platform end to end. Each tier adds scope and autonomy — not a
        different product.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
        <Legend tone="bg-teal-400/15 text-teal-300" glyph="check" label="Included" />
        <Legend tone="bg-ink-600 text-fg-muted" glyph="◐" label="Limited" />
        <Legend tone="bg-accent-500/12 text-accent-600" glyph="+" label="Paid add-on" />
        <span className="inline-flex items-center gap-1.5">
          <span className="text-fg-faint/50">—</span> Not available
        </span>
      </div>

      <DesktopTable />
      <MobileAccordion />
    </div>
  );
}

function Legend({
  tone,
  glyph,
  label,
}: {
  tone: string;
  glyph: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("grid h-4 w-4 place-items-center rounded-full", tone)}>
        {glyph === "check" ? (
          <Check width={9} height={9} aria-hidden />
        ) : (
          <span className="text-[10px] font-bold leading-none" aria-hidden>
            {glyph}
          </span>
        )}
      </span>
      {label}
    </span>
  );
}
