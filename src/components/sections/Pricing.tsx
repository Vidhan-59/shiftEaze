"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PricingComparison } from "./PricingComparison";
import { Check, Container as ContainerIcon, Bolt, Layers } from "@/components/ui/icons";
import { pricingTiers, type PricingTier } from "@/content/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Billing = "annual" | "monthly";

const TIER_ICON = {
  starter: ContainerIcon,
  professional: Bolt,
  enterprise: Layers,
} as const;

function PricingCard({ tier, billing }: { tier: PricingTier; billing: Billing }) {
  const reduced = usePrefersReducedMotion();
  const Icon = TIER_ICON[tier.id as keyof typeof TIER_ICON] ?? ContainerIcon;
  const amount = tier.price.amount[billing];
  const isCustom = amount === "Custom";
  const metered = !!tier.price.perUnit;

  return (
    <RevealItem
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 sm:p-8",
        tier.highlight
          ? "border-teal-400/40 bg-gradient-to-b from-teal-400/[0.14] to-teal-400/[0.04] shadow-float lg:-translate-y-3"
          : "glass hover:-translate-y-1.5 hover:shadow-card-hover"
      )}
    >
      {tier.highlight && (
        <motion.span
          initial={{ opacity: 0, scale: reduced ? 1 : 0.4, y: reduced ? 0 : -6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.3 }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-teal-400 px-3.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-widest text-white shadow-glow"
        >
          Most popular
        </motion.span>
      )}

      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-xl",
          tier.highlight ? "bg-teal-400 text-white" : "bg-teal-400/12 text-teal-300"
        )}
      >
        <Icon width={20} height={20} />
      </span>

      <div className="mt-5">
        <h3 className="text-xl font-semibold tracking-tight text-fg">
          {tier.name}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-snug text-fg-muted">
          {tier.tagline}
        </p>
      </div>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tracking-tight text-fg">
          {amount}
        </span>
        {!isCustom && tier.price.period && (
          <span className="text-[15px] font-medium text-fg-faint">
            {tier.price.period}
          </span>
        )}
      </div>

      <div className="mt-1.5 min-h-[2.5rem] text-[12.5px] leading-snug text-fg-faint">
        {tier.price.caption && <p>{tier.price.caption}</p>}
        {tier.price.perUnit && <p>{tier.price.perUnit[billing]}</p>}
        {metered && billing === "annual" && (
          <span className="mt-1 inline-block rounded-full bg-teal-400/12 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-teal-300">
            2 months free
          </span>
        )}
      </div>

      <Button
        href={tier.cta.href}
        variant={tier.highlight ? "primary" : "secondary"}
        size="lg"
        className="mt-6 w-full justify-center"
      >
        {tier.cta.label}
      </Button>

      <dl className="mt-7 space-y-2.5 border-y border-line py-5">
        {tier.meta.map((m) => (
          <div key={m.label} className="flex items-center justify-between text-[13px]">
            <dt className="text-fg-faint">{m.label}</dt>
            <dd className="font-medium text-fg">{m.value}</dd>
          </div>
        ))}
      </dl>

      {tier.featuresIntro && (
        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-wider text-teal-300">
          {tier.featuresIntro}
        </p>
      )}

      <ul className={cn("space-y-3", tier.featuresIntro ? "mt-4" : "mt-6")}>
        {tier.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                f.addon ? "bg-accent-500/12 text-accent-600" : "bg-teal-400/15 text-teal-300"
              )}
            >
              <Check width={11} height={11} />
            </span>
            <span className="text-[13.5px] leading-snug text-fg-muted">
              {f.label}
              {f.addon && (
                <span className="ml-1.5 rounded-full border border-accent-500/25 bg-accent-500/[0.06] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-accent-600">
                  Add-on
                </span>
              )}
              {f.badge && (
                <span className="ml-1.5 rounded-full border border-teal-400/30 bg-teal-500/[0.06] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-teal-400">
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

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <div className="relative inline-flex rounded-full border border-line bg-white p-1 shadow-card">
        {(["annual", "monthly"] as const).map((b) => (
          <button
            key={b}
            onClick={() => onChange(b)}
            aria-pressed={billing === b}
            className={cn(
              "relative z-10 rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition-colors",
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
      <span className="hidden text-[12.5px] text-fg-faint sm:inline">
        Save ~2 months with annual billing
      </span>
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Start free on one site.{" "}
              <span className="text-fg-muted">Scale to every terminal.</span>
            </>
          }
          lead="Every tier runs on the same platform — the jump from Starter to Enterprise is predictive AI, voice automation and the access control large operations need, not a different product."
        />

        <BillingToggle billing={billing} onChange={setBilling} />

        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </RevealGroup>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[13px] leading-relaxed text-fg-faint">
          All prices in <span className="font-medium text-fg-muted">INR (₹)</span>,
          per operator, per month, with volume pricing at 500+ and 1,000+
          operators. Enterprise is scoped to your deployment. Figures shown are
          indicative — replace with final pricing before launch.
        </p>

        <PricingComparison />
      </Container>
    </section>
  );
}
