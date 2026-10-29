import { SolutionsHero } from "@/components/heroes/SolutionsHero";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { UseCasesGrid } from "@/components/sections/UseCasesGrid";
import { CTABand } from "@/components/sections/CTABand";
import {
  ManagedRosteringVisual,
  MultiSiteVisual,
  OvertimeVisual,
  PayrollVisual,
  SchedulingVisual,
  ShiftBasedVisual,
} from "@/components/visuals/SolutionVisuals";
import { page } from "@/content/siteMap";
import { MANAGED_ROSTERING_PUBLISHED, isTrueProduction } from "@/content/config";
import { pageMetadata } from "@/lib/pageMetadata";
import * as solutions from "@/content/solutions";

const solutionsPage = page("solutions");
const sections = solutionsPage.sections!;
const useCasesSection = sections[sections.length - 1];
const coreSections = sections.slice(0, 5);

// Brief §5.4: render while off only outside true production, for review.
const showManagedRostering = MANAGED_ROSTERING_PUBLISHED || !isTrueProduction;

const visuals = [ShiftBasedVisual, MultiSiteVisual, SchedulingVisual, OvertimeVisual, PayrollVisual];
const copy = [solutions.shiftBased, solutions.multiSite, solutions.scheduling, solutions.overtime, solutions.payroll];

export const metadata = pageMetadata({
  title: "Shift-Based Workforce Management Solutions | ShiftEaze",
  description:
    "Shift-based, multi-site, scheduling optimization, overtime and backfill, and attendance and payroll accuracy solutions for large frontline teams.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero heading={solutions.overviewHeading} stages={coreSections} />

      {coreSections.map((s, i) => (
        <SolutionSection
          key={s.id}
          id={s.id}
          index={i}
          heading={s.name}
          paragraphs={[copy[i].grey, copy[i].blue]}
          Visual={visuals[i]}
        />
      ))}

      {/*
        Hidden while MANAGED_ROSTERING_PUBLISHED is false in production: not
        rendered to the HTML at all (brief §5.4), only shown here in dev/
        preview for review. Deliberately not in `sections` above, so it never
        appears in the jump nav, dropdown or footer until the flag flips.
      */}
      {showManagedRostering && (
        <SolutionSection
          id="managed-rostering-services"
          index={5}
          heading="Managed Rostering Services"
          paragraphs={[solutions.managedRostering, solutions.managedRosteringDetail]}
          Visual={ManagedRosteringVisual}
        />
      )}

      <UseCasesGrid id={useCasesSection.id} heading={solutions.useCasesHeading} rows={solutions.useCases} />

      <CTABand label="Talk to Our Team About Your Operation" href="/company?topic=sales-and-demos#contact" plain />
    </>
  );
}
