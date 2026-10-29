import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BoldIntro } from "@/components/ui/BoldIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { GuideVisual } from "@/components/visuals/GuideVisual";
import { ArrowUpRight, Brain, Calendar, Chart, Database, Layers, Ship } from "@/components/ui/icons";
import { GUIDE_URL } from "@/content/config";

const ICONS = [Layers, Calendar, Brain, Database, Chart, Ship];
const ACCENTS = ["#302e86", "#2f6bff", "#d51f2c", "#0ea5a4", "#5b59c9", "#1f2a5a"];

type Topic = { id: string; name: string; description: string; articles: string[] };

/** Intro lead, a grid of topic cards with their article lists, and the featured guide. */
export function ResourceTopics({
  introId,
  intro,
  topics,
  guideId,
  guide,
}: {
  introId: string;
  intro: string;
  topics: Topic[];
  guideId: string;
  guide: string;
}) {
  return (
    <>
      <section id={introId} className="scroll-mt-[76px] bg-white pb-6 pt-14 sm:pt-16">
        <Container className="max-w-5xl">
          <BoldIntro text={intro} />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <Container className="max-w-[1240px]">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {topics.map((t, i) => {
              const Icon = ICONS[i % ICONS.length];
              const color = ACCENTS[i % ACCENTS.length];
              return (
                <RevealItem key={t.id} className="h-full">
                  <article
                    id={t.id}
                    className="group relative flex h-full scroll-mt-[120px] flex-col overflow-hidden rounded-[26px] border border-line-strong bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.25] transition-transform duration-500 group-hover:scale-x-100"
                      style={{ background: color }}
                    />
                    <span
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                      style={{ background: color }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-float" style={{ background: color }}>
                        <Icon width={22} height={22} />
                      </span>
                      <span className="font-mono text-[12px] font-bold text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-5 font-display text-[22px] font-extrabold leading-tight tracking-tight text-fg">{t.name}</h2>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{t.description}</p>
                    <ul className="mt-5 space-y-2 border-t border-line pt-4">
                      {t.articles.map((a) => (
                        <li key={a}>
                          <Link
                            href={`#${t.id}`}
                            className="group/a flex items-start gap-2.5 rounded-lg px-1.5 py-1 text-[14px] font-medium leading-snug text-fg transition-colors hover:bg-[#f4f7ff]"
                          >
                            <ArrowUpRight width={14} height={14} className="mt-1 shrink-0 text-fg-faint transition-all group-hover/a:-translate-y-0.5 group-hover/a:translate-x-0.5 group-hover/a:text-[#2f6bff]" />
                            {a}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section id={guideId} className="scroll-mt-[120px] bg-white py-12 sm:py-14 lg:py-16">
        <Container className="max-w-[1560px] lg:!px-6 xl:!px-10">
          <Reveal>
            <div className="mx-auto max-w-[1440px] rounded-[28px] bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] p-[3px] shadow-float">
              <div className="relative isolate overflow-hidden rounded-[29px] bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white">
                <span className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 animate-aurora rounded-full bg-[#2f6bff]/40 blur-3xl" />
                <span className="pointer-events-none absolute -bottom-28 right-[30%] -z-10 h-72 w-72 animate-aurora rounded-full bg-[#d51f2c]/25 blur-3xl [animation-delay:-8s]" />
                <div className="grid items-center gap-4 p-5 sm:p-6 md:grid-cols-[0.95fr_1.05fr] md:gap-6 lg:px-10 lg:py-3">
                  <div>
                    <h2 className="inline-block rounded-full bg-white px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-teal-500">
                      Featured guide
                    </h2>
                    <p className="mt-6 text-balance font-display text-[clamp(1.35rem,2.3vw,1.9rem)] font-extrabold leading-[1.15] tracking-tight">
                      <strong className="sr-only">Featured guide: </strong>
                      {guide}
                    </p>
                    <span className="mt-6 block h-[6px] w-28 rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent" aria-hidden />
                    {/* Hidden while GUIDE_URL is empty — no asset exists yet (brief §6). */}
                    {GUIDE_URL && (
                      <div className="mt-8">
                        <FillButton href={GUIDE_URL} tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-white/70">
                          Download the Guide
                        </FillButton>
                      </div>
                    )}
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
    </>
  );
}
