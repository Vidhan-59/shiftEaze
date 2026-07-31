"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { volumeBands, type Billing, type PricingTier } from "@/content/pricing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/** Enterprise-only: the volume table, collapsed until asked for. */
function VolumeBands() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="volume-bands"
        className="flex w-full items-center justify-between rounded-lg border border-line bg-ink-850 px-3.5 py-2.5 text-left text-[12.5px] font-medium text-fg-muted transition-colors hover:border-teal-400/30 hover:text-fg"
      >
        Volume bands
        <span
          className={cn(
            "text-fg-faint transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open && (
        <table id="volume-bands" className="mt-2 w-full text-[12px]">
          <thead>
            <tr className="text-left text-fg-faint">
              <th scope="col" className="py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider">
                Operators
              </th>
              <th scope="col" className="py-1.5 text-right font-mono text-[10px] font-medium uppercase tracking-wider">
                Per op / mo
              </th>
            </tr>
          </thead>
          <tbody>
            {volumeBands.map((b) => (
              <tr key={b.range} className="border-t border-line">
                <td className="py-1.5 text-fg-muted">{b.range}</td>
                <td className="py-1.5 text-right font-medium text-fg">
                  {b.rate}
                  {b.saving && (
                    <span className="ml-1.5 font-mono text-[9.5px] text-teal-300">
                      {b.saving}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function PricingCard({
  tier,
  billing,
}: {
  tier: PricingTier;
  billing: Billing;
}) {
  const reduced = usePrefersReducedMotion();
  const rate = tier.rate?.[billing];
  const isCustom = tier.rate === null;

  return (
    <RevealItem
      className={cn(
        // Flat fills only — the brief rules out gradients here, so the popular
        // tier is separated by a solid tint, a heavier border and elevation.
        "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 sm:p-8",
        tier.highlight
          ? "border-teal-400 bg-teal-400/[0.06] shadow-float lg:-translate-y-3"
          : "border-line bg-white hover:-translate-y-1 hover:shadow-card-hover"
      )}
    >
      {tier.highlight && (
        <motion.span
          initial={{ opacity: 0, scale: reduced ? 1 : 0.4, y: reduced ? 0 : -6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.25 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-400 px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white"
        >
          Most popular
        </motion.span>
      )}

      <h3 className="text-[19px] font-semibold tracking-tight text-fg">
        {tier.name}
      </h3>
      <p className="mt-1.5 text-[14px] font-medium leading-snug text-fg-muted">
        {tier.tagline}
      </p>
      <p className="mt-1 text-[12.5px] leading-snug text-fg-faint">
        {tier.bestFor}
      </p>

      {/* Fixed-height price block so all three cards align regardless of
          whether they show a rate or the word "Custom". */}
      <div className="mt-6 flex min-h-[3.25rem] items-baseline gap-1.5">
        <span className="text-[clamp(1.9rem,3vw,2.5rem)] font-semibold leading-none tracking-tight text-fg">
          {isCustom ? "Custom" : rate}
        </span>
        {!isCustom && (
          <span className="text-[13.5px] font-medium text-fg-faint">
            {tier.unit}
          </span>
        )}
      </div>

      <div className="mt-2 min-h-[2.75rem] space-y-0.5">
        {tier.subLabels.map((s) => (
          <p key={s} className="text-[12.5px] leading-snug text-fg-faint">
            {s}
          </p>
        ))}
        {tier.highlight && billing === "annual" && (
          <span className="mt-1.5 inline-block rounded-full bg-teal-400/12 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-teal-300">
            2 months free on annual
          </span>
        )}
      </div>

      <Button
        href={tier.cta.href}
        variant={tier.cta.variant}
        size="lg"
        className="mt-6 w-full justify-center"
      >
        {tier.cta.label}
      </Button>
      {tier.cta.note && (
        <p className="mt-2 text-center text-[11.5px] text-fg-faint">
          {tier.cta.note}
        </p>
      )}

      {isCustom && <VolumeBands />}

      <dl className="mt-7 space-y-2.5 border-y border-line py-5">
        {tier.meta.map((m) => (
          <div key={m.label} className="flex items-baseline justify-between gap-3 text-[12.5px]">
            <dt className="shrink-0 text-fg-faint">{m.label}</dt>
            <dd className="text-right font-medium text-fg">{m.value}</dd>
          </div>
        ))}
      </dl>

      {tier.featuresIntro && (
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-teal-300">
          {tier.featuresIntro}
        </p>
      )}

      <ul className={cn("space-y-2.5", tier.featuresIntro ? "mt-4" : "mt-6")}>
        {tier.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full",
                f.addon
                  ? "bg-accent-500/12 text-accent-600"
                  : "bg-teal-400/15 text-teal-300"
              )}
              style={{ height: 18, width: 18 }}
            >
              {f.addon ? (
                <span className="text-[11px] font-bold leading-none" aria-hidden>
                  +
                </span>
              ) : (
                <Check width={10} height={10} />
              )}
            </span>
            <span className="text-[13px] leading-snug text-fg-muted">
              {f.label}
              {f.addon && (
                <span className="ml-1.5 whitespace-nowrap rounded-full border border-accent-500/25 bg-accent-500/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-600">
                  Add-on
                </span>
              )}
              {f.badge && (
                <span className="ml-1.5 whitespace-nowrap rounded-full border border-teal-400/30 bg-teal-500/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal-400">
                  {f.badge}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}
