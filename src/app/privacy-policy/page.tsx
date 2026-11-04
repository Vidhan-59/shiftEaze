import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { PolicyDocument } from "@/components/sections/PolicyDocument";
import { pageMetadata } from "@/lib/pageMetadata";
import { lastUpdated, sections } from "@/content/privacyPolicy";

export const metadata = pageMetadata({
  title: "Privacy Policy | ShiftEaze",
  description:
    "How ShiftEaze collects, uses, shares and protects personal data, and the rights you have under India's Digital Personal Data Protection Act, 2023.",
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
