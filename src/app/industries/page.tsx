import { IndustriesHero } from "@/components/heroes/IndustriesHero";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { CTABand } from "@/components/sections/CTABand";
import { LogisticsCard, ManufacturingCard, PortCard, StaffingCard } from "@/components/visuals/IndustryCards";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as industries from "@/content/industries";

const industriesPage = page("industries");
const sections = industriesPage.sections!;
const copy = [industries.port, industries.manufacturing, industries.logistics, industries.staffing];
const CARDS = [PortCard, ManufacturingCard, LogisticsCard, StaffingCard];
// Facts quoted from the port copy itself.
const CHIPS: ({ value: string; label: string }[] | undefined)[] = [
  [
    { value: "6000+", label: "operators" },
    { value: "12+", label: "terminals and divisions" },
  ],
];
// Short capability tags, each a phrase lifted from that industry's own copy.
const TAGS = [
  ["Gate-pass QR punches", "Geofenced attendance", "Crane moves and GCR", "One combined Kronos picture"],
  ["Configurable shift types", "Live headcount vs requirement", "Shift Extender", "Automated absence calls"],
  ["Absence risk days ahead", "Reminder calls", "Priority Call", "Live on-site view"],
  ["One portable RGID", "Clear employee status", "Performance passbook", "Early pattern flags"],
];

export const metadata = pageMetadata({
  title: "Rostering Software for Ports & Manufacturing | ShiftEaze",
  description:
    "Workforce management for ports, manufacturing, logistics, warehousing and manpower agencies, built for operations that never stop.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero tag={industriesPage.name} heading={industries.overviewHeading} industries={sections} />

      {sections.map((s, i) => (
        <IndustrySection
          key={s.id}
          id={s.id}
          index={i}
          total={sections.length}
          heading={s.name}
          paragraphs={[copy[i].grey, copy[i].blue]}
          chips={CHIPS[i]}
          Card={CARDS[i]}
          tags={TAGS[i]}
        />
      ))}

      <CTABand label="Request a Demo for Your Industry" href="/request-demo" plain />
    </>
  );
}
