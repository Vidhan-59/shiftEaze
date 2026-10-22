import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PlatformTeaser } from "@/components/sections/PlatformTeaser";
import { SolutionsTeaser } from "@/components/sections/SolutionsTeaser";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { CaseStudyTeaser } from "@/components/sections/CaseStudyTeaser";
import { HowItWorksStrip } from "@/components/sections/HowItWorksStrip";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ResourcesTeaser } from "@/components/sections/ResourcesTeaser";
import { SecurityTeaser } from "@/components/sections/SecurityTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { metaHome } from "@/content/home";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: metaHome.title,
  description: metaHome.description,
  path: "/",
});

// Section order per brief §8 Home: Hero, Problem, Platform/Solutions/
// Industries/Case-study teasers, How It Works, Impact, Resources teaser,
// Security teaser, Final CTA (Home only).
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <PlatformTeaser />
      <SolutionsTeaser />
      <IndustriesTeaser />
      <CaseStudyTeaser />
      <HowItWorksStrip />
      <ImpactSection />
      <ResourcesTeaser />
      <SecurityTeaser />
      <FinalCTA />
    </>
  );
}
