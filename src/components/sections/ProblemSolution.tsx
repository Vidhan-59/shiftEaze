import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { problems } from "@/content/sections";
import { ArrowRight } from "@/components/ui/icons";

export function ProblemSolution() {
  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              At a port, an empty slot is never{" "}
              <span className="text-fg-muted">just an empty slot.</span>
            </>
          }
          lead="Manual rostering and no-show guesswork don't only slow the back office — they leave expensive machinery and berths idle, and you only find out at the gate."
        />

        {/* The manual way, shown next to what it costs. */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.95fr_1fr]">
          <Reveal className="h-full">
            <figure className="flex h-full flex-col gap-3">
              <Photo
                name="warehouse-fulfillment"
                alt="Large fulfillment warehouse with workers sorting packages on conveyor belts and loading delivery vehicles"
                ratio="fill"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="min-h-[240px] flex-1 rounded-2xl border border-line shadow-card"
              />
              <figcaption className="shrink-0 px-1 text-[13px] leading-relaxed text-fg-faint">
                How most operations still plan: spreadsheets, whiteboards and
                headcount charts that are already out of date.
              </figcaption>
            </figure>
          </Reveal>

          <RevealGroup className="grid content-start gap-4">
            {problems.map((p) => (
              <RevealItem
                key={p.label}
                className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/30 hover:shadow-card-hover"
              >
                <div className="font-mono text-[11px] uppercase tracking-wider text-risk-high">
                  {p.label}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-fg">
                  {p.stat}
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">
                  {p.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Solution band */}
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-500/[0.12] to-transparent p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <span className="eyebrow">
                  <span className="h-px w-6 bg-teal-400/70" aria-hidden />
                  The ShiftEaze answer
                </span>
                <h3 className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight text-fg">
                  Predict the gap. Prevent the scramble.
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-fg-muted">
                  ShiftEaze scores who&apos;s at risk of not showing up days
                  ahead, re-optimizes the roster around it, and lets ShiftEaze
                  Voice place the calls — so the shift is covered before it
                  opens.
                </p>
              </div>
              <a
                href="#platform"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-5 py-3 text-[14px] font-medium text-teal-300 transition-colors hover:bg-teal-500/15"
              >
                See the platform
                <ArrowRight
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
