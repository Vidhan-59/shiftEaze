import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { GuideVisual } from "@/components/visuals/GuideVisual";
import { resourcesTeaser } from "@/content/home";
import { GUIDE_URL } from "@/content/config";

export function ResourcesTeaser() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          {/* Gradient border frame */}
          <div className="mx-auto max-w-[1440px] rounded-[28px] bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto] p-[3px] shadow-float">
            <div className="group relative isolate overflow-hidden rounded-[29px] bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white">
              <span className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 animate-[blob-b_16s_ease-in-out_infinite] rounded-full bg-[#2f6bff]/40 blur-3xl" aria-hidden />
              <span className="pointer-events-none absolute -bottom-28 right-[30%] -z-10 h-72 w-72 animate-[blob-c_18s_ease-in-out_infinite] rounded-full bg-[#d51f2c]/25 blur-3xl" aria-hidden />
              <span
                className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 animate-[frame-sweep_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                aria-hidden
              />
              <div className="grid items-center gap-4 p-5 sm:p-6 md:grid-cols-[0.95fr_1.05fr] md:gap-6 lg:px-10 lg:py-3">
                <div>
                  <span className="inline-block rounded-full bg-white px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-teal-500">
                    Featured guide
                  </span>
                  <p className="mt-6 text-balance font-display text-[clamp(1.35rem,2.3vw,1.9rem)] font-extrabold leading-[1.15] tracking-tight text-white">
                    {resourcesTeaser.guide}
                  </p>
                  <span className="mt-6 block h-[6px] w-28 rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent" aria-hidden />
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {/* Hidden while GUIDE_URL is empty — no asset exists yet (brief §6). */}
                    {GUIDE_URL && (
                      <FillButton href={GUIDE_URL} tone="outline">
                        Download the Guide
                      </FillButton>
                    )}
                    <FillButton href="/resources" tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-white/70">
                      Browse All Resources
                    </FillButton>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/[0.08] px-3 pb-6 pt-3 ring-1 ring-white/15 backdrop-blur-sm">
                  <GuideVisual />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
