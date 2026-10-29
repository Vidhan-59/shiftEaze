import { CompanyHero } from "@/components/heroes/CompanyHero";
import { AboutSection, ContactSection } from "@/components/sections/CompanyBody";
import { page } from "@/content/siteMap";
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE } from "@/content/config";
import { topicFromSlug } from "@/content/contact-form";
import { pageMetadata } from "@/lib/pageMetadata";
import * as about from "@/content/about";

const companyPage = page("company");
const sections = companyPage.sections!;

export const metadata = pageMetadata({
  title: "About & Contact | ShiftEaze",
  description:
    "ShiftEaze is a workforce operations platform built for large, shift-based frontline teams. Talk to us about rollout, integrations, pricing or support.",
  path: "/company",
});

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const initialTopic = topic ? topicFromSlug(topic) : undefined;

  return (
    <>
      <CompanyHero
        tag={companyPage.name}
        heading="About ShiftEaze"
        mission={about.mission}
        beliefs={about.beliefs}
      />
      <AboutSection id={sections[0].id} intro={about.intro} mission={about.mission} beliefs={about.beliefs} />
      <ContactSection
        id={sections[1].id}
        heading={sections[1].name}
        line="Talk to us about rollout, integrations, pricing or support."
        email={CONTACT_EMAIL || undefined}
        phone={CONTACT_PHONE || undefined}
        location={CONTACT_LOCATION || undefined}
        initialTopic={initialTopic}
      />
    </>
  );
}
