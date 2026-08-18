import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { photoBlur } from "@/content/photo-blur";
import { metrics } from "@/content/sections";
import { cn } from "@/lib/utils";

export function Metrics() {
  return (
    <section id="results" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-500 to-teal-600 p-8 shadow-float sm:p-12">
          {/*
            Terminal at scale, sunk deep under the navy panel. Heavily dimmed
            and multiplied so it reads as texture — the white figures on top
            keep their contrast, which a brighter photo would destroy.
          */}
          <Image
            src="/assets/photos/terminal-aerial.webp"
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={photoBlur["terminal-aerial"]}
            className="pointer-events-none absolute inset-0 object-cover opacity-[0.14] mix-blend-luminosity"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/85 via-teal-500/80 to-teal-600/90"
            aria-hidden
          />
          {/* ambient detail on the navy panel */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
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
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #d51f2c, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative">
            <Reveal className="mb-10 text-center">
              <span className="inline-flex items-center justify-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-teal-100">
                <span className="h-px w-6 bg-white/60" aria-hidden />
                Proven on the ground
              </span>
              <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight text-white">
                Deployed across major Indian port &amp; terminal operations.
              </h2>
            </Reveal>

            {/*
              `items-start` + a fixed-height figure row keeps all four labels on
              one line with each other. Hairline dividers between columns give
              the row structure without boxing each stat in.
            */}
            <RevealGroup className="grid grid-cols-2 items-start gap-y-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
              {metrics.map((m, i) => {
                const numeric = "animate" in m ? m.animate : undefined;
                const unit = "unit" in m ? m.unit : undefined;
                return (
                  <RevealItem
                    key={m.label}
                    className={cn(
                      "px-4 text-center sm:px-6",
                      // Two columns: divider on the right-hand one of each row.
                      i % 2 === 1 && "border-l border-white/15",
                      // Four columns: everything except the first.
                      i > 0 && "lg:border-l lg:border-white/15"
                    )}
                  >
                    <div className="flex h-[clamp(2.6rem,5vw,4rem)] items-baseline justify-center whitespace-nowrap text-[clamp(2.1rem,4.2vw,3.2rem)] font-semibold leading-none tracking-tightest text-white">
                      <AnimatedCounter
                        value={numeric ?? m.value}
                        className="tabular-nums"
                      />
                      <span className="text-accent-300">{m.suffix}</span>
                      {unit && (
                        <span className="ml-1.5 text-[0.42em] font-medium uppercase tracking-wide text-teal-100/80">
                          {unit}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 text-[14px] font-medium leading-snug text-white/90">
                      {m.label}
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] uppercase leading-snug tracking-wider text-teal-100/65">
                      {m.note}
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
