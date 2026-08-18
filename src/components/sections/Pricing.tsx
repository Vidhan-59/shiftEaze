"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { PricingCard } from "./PricingCards";
import { PricingComparison } from "./PricingComparison";
import { AIBundleCallout } from "./AIBundleCallout";
import {
  implementation,
  pricingDisclaimer,
  pricingTiers,
  type Billing,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Billing period"
        className="relative inline-flex rounded-full border border-line bg-white p-1 shadow-card"
      >
        {(["annual", "monthly"] as const).map((b) => (
          <button
            key={b}
            onClick={() => onChange(b)}
            aria-pressed={billing === b}
            className={cn(
              "relative z-10 rounded-full px-5 py-2 text-[13.5px] font-medium capitalize transition-colors",
              billing === b ? "text-white" : "text-fg-muted hover:text-fg"
            )}
          >
            {billing === b && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 -z-10 rounded-full bg-teal-400"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {b}
          </button>
        ))}
      </div>
      <p className="text-[12.5px] text-fg-faint">
        {billing === "annual"
          ? "Billed annually in advance — two months free versus monthly."
          : "Billed monthly, no commitment. Around 20% above the annual rate."}
      </p>
    </div>
  );
}

/** Implementation fees — real, but not the headline. Kept collapsed. */
function Implementation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="implementation-fees"
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-3.5 text-left transition-colors hover:border-teal-400/30"
      >
        <span className="text-[14px] font-medium text-fg">
          Implementation &amp; go-live fees
        </span>
        <span
          className={cn(
            "text-[12px] text-fg-faint transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          id="implementation-fees"
          className="mt-2 overflow-hidden rounded-xl border border-line bg-white"
        >
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-line bg-ink-850 text-left">
                <th
                  scope="col"
                  className="px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-wider text-fg-faint"
                >
                  Tier
                </th>
                <th
                  scope="col"
                  className="px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-wider text-fg-faint"
                >
                  Fee
                </th>
                <th
                  scope="col"
                  className="px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-wider text-fg-faint"
                >
                  Scope
                </th>
              </tr>
            </thead>
            <tbody>
              {implementation.rows.map((r) => (
                <tr key={r.tier} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-3 font-medium text-fg">{r.tier}</td>
                  <td className="px-5 py-3 tabular-nums text-fg">{r.fee}</td>
                  <td className="px-5 py-3 text-fg-muted">{r.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-line bg-ink-850 px-5 py-3 text-[12.5px] text-fg-muted">
            {implementation.note}
          </p>
        </div>
      )}
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-40"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Priced per operator{" "}
              <span className="text-fg-muted">under management.</span>
            </>
          }
          lead="Every tier runs the same platform. What changes as you move up is scope and autonomy — more sites, more governance, and the AI that turns a predicted absence into a filled shift before a planner has to touch it."
        />

        <BillingToggle billing={billing} onChange={setBilling} />

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </RevealGroup>

        <Implementation />

        <PricingComparison />
        <AIBundleCallout />

        <Reveal>
          <p className="mx-auto mt-1 max-w-3xl border-t border-line pt-3 text-center text-[12.5px] leading-relaxed text-fg-faint">
            {/* {pricingDisclaimer} */}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
