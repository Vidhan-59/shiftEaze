import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { MotionShowcase } from "@/components/sections/MotionShowcase";
import { ShiftEaze } from "@/components/sections/ShiftEaze";
import { Metrics } from "@/components/sections/Metrics";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <DashboardShowcase />
      <MotionShowcase />
      <ShiftEaze />
      <Metrics />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
