import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROIStats } from "@/components/sections/ROIStats";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Pricing: priced per operator under management",
  description:
    "ShiftEaze pricing by tier: Starter, Professional and Enterprise, priced per operator, with a full feature comparison and implementation fees.",
};

export default function PricingPage() {
  return (
    <>
      {/* Restructure brief: only the shared breadcrumb/header/footer chrome
          may change here. Content, prices, plan names and logic below are
          untouched. */}
      <div className="bg-teal-400 pb-4 pt-28 sm:pt-32">
        <Breadcrumbs pageKey="pricing" tone="dark" />
      </div>
      {/* Answer "what do we get back" before "what does it cost". */}
      <ROIStats />
      <Pricing />
      <FAQ />
    </>
  );
}
