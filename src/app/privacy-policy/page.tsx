import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { PolicyDocument } from "@/components/sections/PolicyDocument";
import { pageMetadata } from "@/lib/pageMetadata";
import { lastUpdated, sections } from "@/content/privacyPolicy";

export const metadata = pageMetadata({
  title: "Privacy Policy | How ShiftEaze Collects and Uses Your Data",
  description:
    "Read the ShiftEaze Privacy Policy to see what personal data we collect, why we use it, how long we keep it and the choices you have over your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeroBand pageKey="privacy-policy" tag="Legal" h1="Privacy Policy" subline={`Last updated: ${lastUpdated}`} />
      <PolicyDocument sections={sections} />
    </>
  );
}
