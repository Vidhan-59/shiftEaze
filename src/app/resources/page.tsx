import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { page } from "@/content/siteMap";
import { GUIDE_URL } from "@/content/config";
import { pageMetadata } from "@/lib/pageMetadata";
import * as resources from "@/content/resources";

const resourcesPage = page("resources");
const sections = resourcesPage.sections!;
// sections[0] is "Learn from the field" (folded into the H1 block below);
// sections[1..6] map 1:1 to resources.topics; sections[7] is "Featured guide".
const topicSections = sections.slice(1, 1 + resources.topics.length);
const featuredGuideSection = sections[sections.length - 1];

export const metadata = pageMetadata({
  title: "Workforce Management Guides & Checklists | ShiftEaze",
  description:
    "Practical guides, checklists and explainers for planners, HR teams and operations heads on scheduling, attendance, AI workforce management and analytics.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeroBand pageKey="resources" tag={resourcesPage.name} h1={resources.heading} />
      <section id={sections[0].id} className="scroll-mt-[76px] py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-[17px] leading-relaxed text-fg-muted">{resources.intro}</p>
        </Container>
      </section>

      {resources.topics.map((topic, i) => (
        <section
          key={topic.name}
          id={topicSections[i].id}
          className="scroll-mt-[76px] border-t border-line py-14 sm:py-16"
        >
          <Container className="max-w-3xl">
            <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
              {topic.name}
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">{topic.description}</p>
            <BulletList items={[...topic.articles]} className="mt-6" />
          </Container>
        </section>
      ))}

      <section
        id={featuredGuideSection.id}
        className="scroll-mt-[76px] border-t border-line py-14 sm:py-16"
      >
        <Container className="max-w-3xl">
          <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
            Featured guide
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
            <strong className="font-semibold text-fg">Featured guide: </strong>
            {resources.featuredGuide}
          </p>
          {/* Hidden while GUIDE_URL is empty — no asset exists yet (brief §6). */}
          {GUIDE_URL && (
            <div className="mt-5">
              <Button href={GUIDE_URL} size="lg">
                Download the Guide
                <ArrowRight width={16} height={16} />
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
