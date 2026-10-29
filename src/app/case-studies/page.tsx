import Link from "next/link";
import { CaseStudiesHero } from "@/components/heroes/CaseStudiesHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MundraStory } from "@/components/sections/MundraStory";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as caseStudies from "@/content/caseStudies";

const caseStudiesPage = page("case-studies");
const sections = caseStudiesPage.sections!;
const LINK_TEXT = "Mundra Port Workforce Management Case Study";

export const metadata = pageMetadata({
  title: "Mundra Port Workforce Management Case Study | ShiftEaze",
  description:
    "ShiftEaze supports 6000+ operators across 12+ terminals and divisions at Mundra Port, with six terminals rostered live and AI voice calling in production.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const [before, after] = caseStudies.customerStoriesIntro.split(LINK_TEXT);

  return (
    <>
      <CaseStudiesHero tag={caseStudiesPage.name} heading="Customer Stories" />
      <section id={sections[0].id} className="scroll-mt-[120px] bg-white pb-2 pt-12 sm:pt-14">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-balance text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold leading-relaxed text-fg-muted">
              {before}
              <Link
                href={`#${sections[1].id}`}
                className="font-bold text-[#2f6bff] underline decoration-[#2f6bff]/30 underline-offset-4 transition-colors hover:text-teal-400"
              >
                {LINK_TEXT}
              </Link>
              {after}
            </p>
          </Reveal>
        </Container>
      </section>

      <MundraStory
        id={sections[1].id}
        heading={sections[1].name}
        summary={caseStudies.mundra.summary}
        before={caseStudies.mundra.before}
        after={caseStudies.mundra.after}
      />
    </>
  );
}
