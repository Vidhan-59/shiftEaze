import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PlatformTeaser } from "@/components/sections/PlatformTeaser";
import { SolutionsTeaser } from "@/components/sections/SolutionsTeaser";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { HowItWorksStrip } from "@/components/sections/HowItWorksStrip";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ResourcesTeaser } from "@/components/sections/ResourcesTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQ } from "@/components/sections/FAQ";
import { homeFaqHeading, homeFaqs, metaHome } from "@/content/home";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: metaHome.title,
  description: metaHome.description,
  keywords: metaHome.keywords,
  path: "/",
});

// FAQPage structured data so search engines can read the home FAQ.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Section order per brief §8 Home: Hero, Problem, Platform/Solutions/
// Industries/Case-study teasers, How It Works, Impact, Resources teaser,
// FAQ, Final CTA (Home only). Security has its own footer-only page.
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ProblemSection />
      <PlatformTeaser />
      <SolutionsTeaser />
      <IndustriesTeaser />
      <HowItWorksStrip />
      <ImpactSection />
      <ResourcesTeaser />
      <FAQ
        faqs={homeFaqs}
        title={homeFaqHeading}
        lead="What teams usually ask about running rostering, attendance, leave and performance on ShiftEaze. Still unsure? Book a demo and we'll walk you through it."
      />
      <FinalCTA />
    </>
  );
}
