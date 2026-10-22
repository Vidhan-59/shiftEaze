import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { FeatureBody } from "@/components/sections/FeatureBody";
import { EndOfPageCTA } from "@/components/sections/EndOfPageCTA";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as industries from "@/content/industries";

const industriesPage = page("industries");
const sections = industriesPage.sections!;

export const metadata = pageMetadata({
  title: "Rostering Software for Ports & Manufacturing | ShiftEaze",
  description:
    "Workforce management for ports, manufacturing, logistics, warehousing and manpower agencies, built for operations that never stop.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeroBand pageKey="industries" tag={industriesPage.name} h1={industries.overviewHeading} />

      <FeatureBody
        id={sections[0].id}
        heading={sections[0].name}
        paragraphs={[industries.port.grey, industries.port.blue]}
      />
      <FeatureBody
        id={sections[1].id}
        heading={sections[1].name}
        paragraphs={[industries.manufacturing.grey, industries.manufacturing.blue]}
      />
      <FeatureBody
        id={sections[2].id}
        heading={sections[2].name}
        paragraphs={[industries.logistics.grey, industries.logistics.blue]}
      />
      <FeatureBody
        id={sections[3].id}
        heading={sections[3].name}
        paragraphs={[industries.staffing.grey, industries.staffing.blue]}
      />

      <EndOfPageCTA label="Request a Demo for Your Industry" href="/request-demo" />
    </>
  );
}
