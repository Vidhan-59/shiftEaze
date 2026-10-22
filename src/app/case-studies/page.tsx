import Link from "next/link";
import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
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
      <PageHeroBand pageKey="case-studies" tag={caseStudiesPage.name} h1="Customer Stories" />
      <section id={sections[0].id} className="scroll-mt-[76px] py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-[17px] leading-relaxed text-fg-muted">
            {before}
            <Link
              href={`#${sections[1].id}`}
              className="font-medium text-teal-600 transition-colors hover:text-teal-400"
            >
              {LINK_TEXT}
            </Link>
            {after}
          </p>
        </Container>
      </section>

      <section id={sections[1].id} className="scroll-mt-[76px] border-t border-line py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
            {sections[1].name}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">
            <strong className="font-semibold text-fg">Summary: </strong>
            {caseStudies.mundra.summary}
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
            <strong className="font-semibold text-fg">Before: </strong>
            {caseStudies.mundra.before}
          </p>
          <div className="mt-5">
            <strong className="font-semibold text-fg">After:</strong>
            <BulletList items={caseStudies.mundra.after} className="mt-3" />
          </div>
        </Container>
      </section>
    </>
  );
}
