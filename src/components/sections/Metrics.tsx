import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { metrics } from "@/content/sections";

export function Metrics() {
  return (
    <section id="results" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-500 to-teal-600 p-8 shadow-float sm:p-12">
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
                Running live at Mundra Port.
              </h2>
            </Reveal>

            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-4">
              {metrics.map((m) => {
                const numeric = "animate" in m ? m.animate : undefined;
                return (
                  <RevealItem key={m.label} className="text-center">
                    <div className="flex items-baseline justify-center text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold tracking-tightest text-white">
                      <AnimatedCounter
                        value={numeric ?? m.value}
                        className="tabular-nums"
                      />
                      <span className="text-accent-300">{m.suffix}</span>
                    </div>
                    <div className="mt-2 text-[14px] font-medium text-white/90">
                      {m.label}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-teal-100/70">
                      {m.note}
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-teal-100/55">
              [FILL IN] figures are placeholders — swap in verified numbers
              before launch
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
