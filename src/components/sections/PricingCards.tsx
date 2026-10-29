"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealItem } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { Bolt, Check, Shield, Target } from "@/components/ui/icons";
import { volumeBands, type Billing, type PricingTier } from "@/content/pricing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/** Three looks: a clean white card, a vivid blue featured card, and a deep navy enterprise card. */
const THEMES = {
  light: {
    card: "border-line-strong bg-white text-fg shadow-card hover:-translate-y-1.5 hover:shadow-card-hover",
    title: "text-fg",
    muted: "text-fg-muted",
    faint: "text-fg-faint",
    line: "border-line",
    eyebrow: "text-[#2f6bff]",
    icon: "bg-[#eaf0ff] text-[#2f6bff]",
    check: "bg-[#2f6bff]/12 text-[#2f6bff]",
    addon: "border-accent-500/25 bg-accent-500/[0.06] text-accent-600",
    badge: "border-[#2f6bff]/30 bg-[#2f6bff]/[0.07] text-[#2f6bff]",
    button: "blue" as const,
    glow: "rgba(47,107,255,0.14)",
  },
  featured: {
    card: "border-transparent bg-gradient-to-br from-[#4a48c4] via-[#37358f] to-[#262261] text-white shadow-[0_40px_90px_-30px_rgba(74,72,196,0.85)] lg:-translate-y-5",
    title: "text-white",
    muted: "text-white/90",
    faint: "text-white/70",
    line: "border-white/25",
    eyebrow: "text-[#cfe0ff]",
    icon: "bg-white/20 text-white",
    check: "bg-white/20 text-white",
    addon: "border-white/40 bg-white/10 text-white",
    badge: "border-white/40 bg-white/10 text-white",
    button: "navy" as const,
    glow: "rgba(255,255,255,0.22)",
  },
  dark: {
    card: "border-white/10 bg-gradient-to-br from-[#1f1c52] via-[#17164a] to-[#0d0c2b] text-white shadow-float hover:-translate-y-1.5",
    title: "text-white",
    muted: "text-white/85",
    faint: "text-white/60",
    line: "border-white/15",
    eyebrow: "text-[#ff8a98]",
    icon: "bg-[#d51f2c] text-white",
    check: "bg-white/15 text-[#4db8ff]",
    addon: "border-[#ff5468]/50 bg-[#ff5468]/10 text-[#ff8a98]",
    badge: "border-[#4db8ff]/50 bg-[#4db8ff]/10 text-[#9cd4ff]",
    button: "outline" as const,
    glow: "rgba(213,31,44,0.22)",
  },
};
type Theme = (typeof THEMES)[keyof typeof THEMES];

const ICONS = { starter: Target, professional: Bolt, enterprise: Shield } as const;

/** Enterprise-only: the volume table, collapsed until asked for. */
function VolumeBands({ t }: { t: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="volume-bands"
        className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-left text-[12.5px] font-semibold text-white transition-colors hover:bg-white/15"
      >
        Volume bands
        <span className={cn("text-white/70 transition-transform duration-300", open && "rotate-180")} aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <table id="volume-bands" className="mt-2 w-full text-[12px]">
          <thead>
            <tr className={t.faint}>
              <th scope="col" className="py-1.5 text-left font-mono text-[10px] font-medium uppercase tracking-wider">
                Operators
              </th>
              <th scope="col" className="py-1.5 text-right font-mono text-[10px] font-medium uppercase tracking-wider">
                Per op / mo
              </th>
            </tr>
          </thead>
          <tbody>
            {volumeBands.map((b) => (
              <tr key={b.range} className={cn("border-t", t.line)}>
                <td className={cn("py-1.5", t.muted)}>{b.range}</td>
                <td className="py-1.5 text-right font-semibold text-white">
                  {b.rate}
                  {b.saving && <span className="ml-1.5 font-mono text-[9.5px] text-[#34d399]">{b.saving}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function PricingCard({ tier, billing }: { tier: PricingTier; billing: Billing }) {
  const reduced = usePrefersReducedMotion();
  const rate = tier.rate?.[billing];
  const isCustom = tier.rate === null;
  const t = tier.highlight ? THEMES.featured : tier.id === "enterprise" ? THEMES.dark : THEMES.light;
  const Icon = ICONS[tier.id];

  return (
    <RevealItem className="h-full">
      <div
        className={cn("group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 sm:p-8", t.card)}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        {/* cursor spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(320px circle at var(--mx,50%) var(--my,0%), ${t.glow}, transparent 70%)` }}
          aria-hidden
        />
        {tier.highlight && (
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
        )}

        {tier.highlight && (
          <motion.span
            initial={{ opacity: 0, scale: reduced ? 1 : 0.4, y: reduced ? 0 : -6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.25 }}
            className="absolute right-5 top-5 whitespace-nowrap rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#302e86] shadow-float"
          >
            Most popular
          </motion.span>
        )}

        <span className={cn("relative grid h-12 w-12 place-items-center rounded-2xl", t.icon)}>
          <Icon width={22} height={22} />
        </span>
        <h3 className={cn("relative mt-4 font-display text-[24px] font-extrabold tracking-tight", t.title)}>{tier.name}</h3>
        <p className={cn("relative mt-1.5 text-[14.5px] font-semibold leading-snug", t.muted)}>{tier.tagline}</p>
        <p className={cn("relative mt-1 text-[12.5px] leading-snug", t.faint)}>{tier.bestFor}</p>

        {/* Fixed-height price block so all three cards align regardless of
            whether they show a rate or the word "Custom". */}
        <div className="relative mt-6 flex min-h-[3.5rem] items-baseline gap-1.5 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isCustom ? "custom" : rate}
              initial={reduced ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: -24, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className={cn("font-display text-[clamp(2.3rem,3.6vw,3.1rem)] font-extrabold leading-none tracking-tight", t.title)}
            >
              {isCustom ? "Custom" : rate}
            </motion.span>
          </AnimatePresence>
          {!isCustom && <span className={cn("text-[14px] font-semibold", t.faint)}>{tier.unit}</span>}
        </div>

        <div className="relative mt-2 min-h-[2.75rem] space-y-0.5">
          {tier.subLabels.map((s) => (
            <p key={s} className={cn("text-[12.5px] leading-snug", t.faint)}>
              {s}
            </p>
          ))}
          {tier.highlight && billing === "annual" && (
            <span className="mt-1.5 inline-block rounded-full bg-[#34d399] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d0c2b]">
              2 months free on annual
            </span>
          )}
        </div>

        <div className="relative mt-6">
          <FillButton href={tier.cta.href} tone={t.button} className={cn(t.button === "blue" && "shadow-[0_14px_30px_-12px_rgba(47,107,255,0.8)]")}>
            {tier.cta.label}
          </FillButton>
        </div>
        {tier.cta.note && <p className={cn("relative mt-2 text-[11.5px]", t.faint)}>{tier.cta.note}</p>}

        {isCustom && (
          <div className="relative">
            <VolumeBands t={t} />
          </div>
        )}

        <dl className={cn("relative mt-7 space-y-2.5 border-y py-5", t.line)}>
          {tier.meta.map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-3 text-[13px]">
              <dt className={cn("shrink-0", t.faint)}>{m.label}</dt>
              <dd className={cn("text-right font-bold", t.title)}>{m.value}</dd>
            </div>
          ))}
        </dl>

        {tier.featuresIntro && (
          <p className={cn("relative mt-6 font-mono text-[10.5px] font-bold uppercase tracking-wider", t.eyebrow)}>{tier.featuresIntro}</p>
        )}

        <ul className={cn("relative space-y-2.5", tier.featuresIntro ? "mt-4" : "mt-6")}>
          {tier.features.map((f) => (
            <li key={f.label} className="flex items-start gap-2.5">
              <span
                className={cn("mt-0.5 grid shrink-0 place-items-center rounded-full", f.addon ? "bg-accent-500/15 text-[#ff8a98]" : t.check)}
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
              <span className={cn("text-[13.5px] font-medium leading-snug", t.muted)}>
                {f.label}
                {f.addon && (
                  <span className={cn("ml-1.5 whitespace-nowrap rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider", t.addon)}>Add-on</span>
                )}
                {f.badge && (
                  <span className={cn("ml-1.5 whitespace-nowrap rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider", t.badge)}>{f.badge}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  );
}
