import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
import { ContactForm } from "@/components/sections/ContactForm";
import { page } from "@/content/siteMap";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/content/config";
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
  const contactLine = [CONTACT_EMAIL, CONTACT_PHONE].filter(Boolean).join(" / ");

  return (
    <>
      <PageHeroBand pageKey="company" tag={companyPage.name} h1="About ShiftEaze" />
      <section id={sections[0].id} className="scroll-mt-[76px] py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-[17px] leading-relaxed text-fg-muted">{about.intro}</p>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">
            <strong className="font-semibold text-fg">Our mission: </strong>
            {about.mission}
          </p>
          <div className="mt-6">
            <strong className="font-semibold text-fg">What we believe:</strong>
            <BulletList items={about.beliefs} className="mt-3" />
          </div>
        </Container>
      </section>

      <section id={sections[1].id} className="scroll-mt-[76px] border-t border-line py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
            {sections[1].name}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
            Talk to us about rollout, integrations, pricing or support.
          </p>
          {/* Hidden if neither value exists (brief §6) — never a guessed value. */}
          {contactLine && (
            <p className="mt-4 text-[14.5px] text-fg-muted">
              <strong className="font-semibold text-fg">Email / phone: </strong>
              {contactLine}
            </p>
          )}
          <ContactForm initialTopic={initialTopic} />
        </Container>
      </section>
    </>
  );
}
