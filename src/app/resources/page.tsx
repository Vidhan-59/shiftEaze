import { ResourcesHero } from "@/components/heroes/ResourcesHero";
import { ResourceTopics } from "@/components/sections/ResourceTopics";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as resources from "@/content/resources";

const resourcesPage = page("resources");
const sections = resourcesPage.sections!;
// sections[0] is "Learn from the field" (folded into the H1 block);
// sections[1..6] map 1:1 to resources.topics; sections[7] is "Featured guide".
const topicSections = sections.slice(1, 1 + resources.topics.length);
const featuredGuideSection = sections[sections.length - 1];

const topics = resources.topics.map((t, i) => ({
  id: topicSections[i].id,
  name: t.name,
  description: t.description,
  articles: [...t.articles],
}));

export const metadata = pageMetadata({
  title: "Workforce Management Guides & Checklists | ShiftEaze",
  description:
    "Practical guides, checklists and explainers for planners, HR teams and operations heads on scheduling, attendance, AI workforce management and analytics.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHero
        tag={resourcesPage.name}
        heading={resources.heading}
        topics={topics.map((t) => ({ id: t.id, name: t.name, count: t.articles.length, articles: t.articles }))}
      />
      <ResourceTopics
        introId={sections[0].id}
        intro={resources.intro}
        topics={topics}
        guideId={featuredGuideSection.id}
        guide={resources.featuredGuide}
      />
    </>
  );
}
