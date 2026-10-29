import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FillButton } from "@/components/ui/FillButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PortScene } from "@/components/visuals/PortScene";
import { caseStudyTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6000, suffix: "+", label: "operators" },
  { value: 12, suffix: "+", label: "terminals and divisions" },
  { value: 6, suffix: "", label: "terminals rostered live" },
  { value: 3, suffix: "", label: "languages" },
  { value: 5, suffix: "", label: "voice scenarios in production" },
];

export function CaseStudyTeaser() {
  const caseStudies = page("case-studies");
  const mundra = section("case-studies", "mundra-port-workforce-management-case-study");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#302e86] via-[#262261] to-[#14123a] pb-[300px] pt-16 text-white sm:pt-20 sm:pb-[370px] lg:pt-24 lg:pb-[420px]">
      {/* Illustrated container port: cranes, laden ship and moving water along the bottom */}
      <PortScene className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[260px] sm:h-[320px] lg:h-[360px]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(77,184,255,0.22),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,#000,transparent_65%)]"
        aria-hidden
      />
      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        <SectionTitle title={caseStudyTeaser.heading} lead={caseStudyTeaser.summary} tone="dark" />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-3 lg:grid-cols-5" gap={0.08}>
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <div className="group h-full rounded-3xl border border-white/30 bg-white/10 p-6 text-center shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff5468] hover:bg-white/20">
                <div className="font-display text-[44px] font-extrabold leading-none tracking-tight text-white">
                  <AnimatedCounter value={s.value} />
                  {s.suffix}
                </div>
                <div className="mx-auto mt-4 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#ff5468] to-[#4db8ff]" aria-hidden />
                <p className="mt-3 text-[14px] font-medium leading-snug text-white/85">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 flex justify-center">
          <FillButton href={`${caseStudies.href}#${mundra.id}`} className="shadow-lg">
            Read the Full Case Study
          </FillButton>
        </Reveal>
      </Container>
    </section>
  );
}
