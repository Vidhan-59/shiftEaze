import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { FeatureBody } from "@/components/sections/FeatureBody";
import { UseCasesTable } from "@/components/sections/UseCasesTable";
import { EndOfPageCTA } from "@/components/sections/EndOfPageCTA";
import { page } from "@/content/siteMap";
import { MANAGED_ROSTERING_PUBLISHED, isTrueProduction } from "@/content/config";
import { pageMetadata } from "@/lib/pageMetadata";
import * as solutions from "@/content/solutions";

const solutionsPage = page("solutions");
const sections = solutionsPage.sections!;
const useCasesSection = sections[sections.length - 1];

// Brief §5.4: render while off only outside true production, for review.
const showManagedRostering = MANAGED_ROSTERING_PUBLISHED || !isTrueProduction;

export const metadata = pageMetadata({
  title: "Shift-Based Workforce Management Solutions | ShiftEaze",
  description:
    "Shift-based, multi-site, scheduling optimization, overtime and backfill, and attendance and payroll accuracy solutions for large frontline teams.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeroBand pageKey="solutions" tag={solutionsPage.name} h1={solutions.overviewHeading} />

      <FeatureBody
        id={sections[0].id}
        heading={sections[0].name}
        paragraphs={[solutions.shiftBased.grey, solutions.shiftBased.blue]}
      />
      <FeatureBody
        id={sections[1].id}
        heading={sections[1].name}
        paragraphs={[solutions.multiSite.grey, solutions.multiSite.blue]}
      />
      <FeatureBody
        id={sections[2].id}
        heading={sections[2].name}
        paragraphs={[solutions.scheduling.grey, solutions.scheduling.blue]}
      />
      <FeatureBody
        id={sections[3].id}
        heading={sections[3].name}
        paragraphs={[solutions.overtime.grey, solutions.overtime.blue]}
      />
      <FeatureBody
        id={sections[4].id}
        heading={sections[4].name}
        paragraphs={[solutions.payroll.grey, solutions.payroll.blue]}
      />

      {/*
        Hidden while MANAGED_ROSTERING_PUBLISHED is false in production: not
        rendered to the HTML at all (brief §5.4), only shown here in dev/
        preview for review. Deliberately not in `sections` above, so it never
        appears in the jump nav, dropdown or footer until the flag flips.
      */}
      {showManagedRostering && (
        <FeatureBody
          id="managed-rostering-services"
          heading="Managed Rostering Services"
          paragraphs={[solutions.managedRostering]}
        />
      )}

      <UseCasesTable
        id={useCasesSection.id}
        heading={solutions.useCasesHeading}
        rows={solutions.useCases}
      />

      <EndOfPageCTA
        label="Talk to Our Team About Your Operation"
        href="/company?topic=sales-and-demos#contact"
      />
    </>
  );
}
