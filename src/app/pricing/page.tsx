import { pageMetadata } from "@/lib/pageMetadata";
import { PricingHero } from "@/components/heroes/PricingHero";
import { ROIStats } from "@/components/sections/ROIStats";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = pageMetadata({
  title: "ShiftEaze Pricing: Plans for AI Shift Scheduling Software",
  description:
    "See ShiftEaze pricing for AI shift scheduling and rostering. Compare plans by team size and sites, then book a demo to get a quote that fits your workforce.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      {/* Only the hero is new; content, prices, plan names and logic below are untouched. */}
      <PricingHero
        tag="Pricing"
        heading="Priced per operator under management"
        lead="Every tier runs the same platform. What changes as you move up is scope and autonomy: more sites, more governance, and the AI that turns a predicted absence into a filled shift before a planner has to touch it."
      />
      {/* Answer "what do we get back" before "what does it cost". */}
      <ROIStats />
      <div id="pricing-plans" className="scroll-mt-[76px]">
        <Pricing />
      </div>
      <FAQ />
    </>
  );
}
