import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { ArrowUpRight, Database, Layers, Ship, Shield } from "@/components/ui/icons";
import { SecurityOrbit } from "@/components/visuals/SecurityOrbit";
import { cta } from "@/content/site";
import * as security from "@/content/security";

const HIGHLIGHT_ICONS = [Shield, Database, Layers, Ship];

/** The four highlight tiles under the Security hero; each jumps to its section. */
export function SecurityHighlights() {
  return (
    <section className="bg-white py-12 sm:py-14">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {security.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
            return (
              <RevealItem key={h.target}>
                <Link
                  href={`#${h.target}`}
                  className="group flex h-full flex-col rounded-3xl border border-line-strong bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#2f6bff]/40 hover:shadow-card-hover"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eaf0ff] text-[#2f6bff]">
                      <Icon width={22} height={22} />
                    </span>
                    <ArrowUpRight
                      width={18}
                      height={18}
                      className="text-fg-faint transition-colors group-hover:text-[#2f6bff]"
                    />
                  </span>
                  <span className="mt-5 font-display text-[19px] font-extrabold leading-snug text-fg">{h.lead}</span>
                  <span className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{h.text}</span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

/** "Security documentation" plus the closing call to action, as one card. */
export function SecurityClosing({ id, heading }: { id: string; heading: string }) {
  return (
    <section id={id} className="scroll-mt-[76px] bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] border border-teal-100 bg-gradient-to-br from-white via-[#f3f7ff] to-[#eaf0ff] shadow-card">
            <span className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 animate-aurora rounded-full bg-[#2f6bff]/15 blur-3xl" aria-hidden />
            <span className="pointer-events-none absolute -bottom-28 right-1/3 -z-10 h-72 w-72 animate-aurora rounded-full bg-accent-500/10 blur-3xl [animation-delay:-9s]" aria-hidden />
            <span className="absolute inset-x-0 top-0 h-[5px] animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto]" aria-hidden />

            <div className="grid items-center gap-6 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:px-14 lg:py-10">
              <div>
                <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
                  {heading}
                </h2>
                <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">{security.documentation.text}</p>
                <p className="mt-8 font-display text-[20px] font-extrabold leading-snug text-fg">
                  {security.closing.heading}
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-fg-muted">{security.closing.text}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <FillButton href={cta.primary.href} tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)]">
                    {cta.primary.label}
                  </FillButton>
                  <FillButton href={security.securityOverviewHref} tone="brand">
                    Request Security Overview
                  </FillButton>
                </div>
              </div>
              <div className="flex h-[300px] items-center justify-center sm:h-[380px]">
                <div className="origin-center scale-[0.78] sm:scale-100">
                  <SecurityOrbit />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
