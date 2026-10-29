import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { SecurityOrbit } from "@/components/visuals/SecurityOrbit";
import { securityTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function SecurityTeaser() {
  const platform = page("platform");
  const security = section("platform", "security");

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] border border-teal-100 bg-gradient-to-br from-white via-[#f3f7ff] to-[#eaf0ff] shadow-card">
            <span className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 animate-aurora rounded-full bg-[#2f6bff]/15 blur-3xl" aria-hidden />
            <span className="pointer-events-none absolute -bottom-28 right-1/3 -z-10 h-72 w-72 animate-aurora rounded-full bg-accent-500/10 blur-3xl [animation-delay:-9s]" aria-hidden />
            <span
              className="pointer-events-none absolute inset-0 -z-10 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(48,46,134,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(48,46,134,0.06) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                WebkitMaskImage: "radial-gradient(70% 90% at 80% 50%, #000 30%, transparent 100%)",
                maskImage: "radial-gradient(70% 90% at 80% 50%, #000 30%, transparent 100%)",
              }}
              aria-hidden
            />
            <span className="absolute inset-x-0 top-0 h-[5px] animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto]" aria-hidden />

            <div className="grid items-center gap-6 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:px-14 lg:py-10">
              <div>
                <SectionTitle title={securityTeaser.heading} align="left" />
                <Reveal delay={0.1} className="mt-8">
                  <FillButton href={`${platform.href}#${security.id}`} tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)]">
                    Visit the Security Page
                  </FillButton>
                </Reveal>
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
