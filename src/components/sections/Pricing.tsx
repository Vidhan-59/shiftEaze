"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";
import { PricingCard } from "./PricingCards";
import { PricingComparison } from "./PricingComparison";
import { PricingSideRails } from "./PricingSideRails";
import { AIBundleCallout } from "./AIBundleCallout";
import { implementation, pricingTiers, type Billing } from "@/content/pricing";
import { cn } from "@/lib/utils";

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Billing period"
        className="relative isolate inline-flex rounded-full border border-white/70 bg-white/40 p-1.5 shadow-[0_18px_50px_-18px_rgba(47,107,255,0.5),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.25)] ring-1 ring-[#2f6bff]/15 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_22px_60px_-16px_rgba(47,107,255,0.65),inset_0_1px_0_rgba(255,255,255,0.9)]"
      >
        {/* soft glass sheen */}
        <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/70 to-transparent" />
        {(["annual", "monthly"] as const).map((b) => (
          <button
            key={b}
            onClick={() => onChange(b)}
            aria-pressed={billing === b}
            className={cn(
              "group relative z-10 rounded-full px-7 py-2.5 text-[14.5px] font-bold capitalize transition-all duration-300 hover:scale-[1.04] active:scale-95",
              billing === b ? "text-white" : "text-[#302e86] hover:bg-white/60 hover:text-[#2f6bff] hover:shadow-[0_8px_22px_-10px_rgba(47,107,255,0.6)]"
            )}
          >
            {billing === b && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 -z-10 overflow-hidden rounded-full border border-white/50 bg-gradient-to-br from-[#2f6bff]/90 to-[#302e86]/90 shadow-[0_10px_28px_-8px_rgba(47,107,255,0.85),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              >
                <span className="absolute inset-x-3 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/45 to-transparent" />
                <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_3.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </motion.span>
            )}
            {b}
          </button>
        ))}
      </div>
      <p className="text-[12.5px] text-fg-faint">
        {billing === "annual"
          ? "Billed annually in advance: two months free versus monthly."
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
    <section id="pricing" className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#e9f0ff] via-[#f4f7ff] to-white py-12 sm:py-14 lg:py-16">
      {/* The page heading and intro now live in the hero above. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-96 w-96 animate-aurora rounded-full bg-[#2f6bff]/15 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 animate-aurora rounded-full bg-accent-500/10 blur-3xl [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(48,46,134,0.12)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      </div>
      <PricingSideRails />
      <Container className="relative max-w-[1280px]">
        <BillingToggle billing={billing} onChange={setBilling} />

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </RevealGroup>

        <Implementation />

        <PricingComparison />
        <AIBundleCallout />
      </Container>
    </section>
  );
}
