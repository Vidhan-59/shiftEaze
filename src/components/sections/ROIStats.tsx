"use client";

import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { roi } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Full-width dark band carrying the payback case. Sits above the tier cards so
 * the value question is answered before the price question is asked.
 *
 * Figures are a model, not a client report — the deployment behind them is
 * described by scale only, never named, per the project's confidentiality
 * guardrail.
 */
export function ROIStats() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-teal-500 px-6 py-12 shadow-float sm:px-12 sm:py-14">
          {/* Faint grid, fading out downward — texture, not decoration. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(80% 70% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(80% 70% at 50% 0%, #000 30%, transparent 100%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <Reveal className="text-center">
              <span className="inline-flex items-center justify-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-teal-100">
                <span className="h-px w-6 bg-white/60" aria-hidden />
                Return on spend
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.5rem,3vw,2.15rem)] font-semibold leading-tight tracking-tight text-white">
                {roi.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-teal-100/80">
                {roi.sub}
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid grid-cols-2 items-start gap-y-10 lg:grid-cols-4 lg:gap-y-0">
              {roi.stats.map((s, i) => (
                <RevealItem
                  key={s.label}
                  className={cn(
                    "px-4 text-center sm:px-6",
                    i % 2 === 1 && "border-l border-white/15",
                    i > 0 && "lg:border-l lg:border-white/15"
                  )}
                >
                  <div className="flex h-[clamp(2.4rem,4.5vw,3.2rem)] items-baseline justify-center whitespace-nowrap text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-none tracking-tightest text-white">
                    {s.value}
                    <span className="ml-1 text-[0.45em] font-medium text-accent-300">
                      {s.unit}
                    </span>
                  </div>
                  <div className="mt-3 text-[13.5px] font-medium leading-snug text-white/90">
                    {s.label}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mx-auto mt-12 max-w-3xl border-t border-white/10 pt-6 text-center text-[12px] leading-relaxed text-teal-100/60">
              {roi.finePrint}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
