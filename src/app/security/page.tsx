import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FAQ } from "@/components/sections/FAQ";
import { SecurityClosing, SecurityHighlights } from "@/components/sections/SecurityParts";
import { FillButton } from "@/components/ui/FillButton";
import { page } from "@/content/siteMap";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/pageMetadata";
import * as security from "@/content/security";

// Linked from the footer only: not in the header menu, no teasers elsewhere.
const securityPage = page("security");
const sections = securityPage.sections!;

export const metadata = pageMetadata({
  title: "Security | ShiftEaze",
  description:
    "How ShiftEaze protects workforce data: role-based access, data protection, secure integrations, audit trails and responsible AI, live at Mundra Port.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHeroBand pageKey="security" tag={securityPage.name} h1={security.hero.h1} subline={security.hero.subline}>
        <FillButton href={cta.primary.href} tone="solid">
          {cta.primary.label}
        </FillButton>
        <FillButton href={security.securityOverviewHref} tone="outline">
          Request Security Overview
        </FillButton>
      </PageHeroBand>

      <SecurityHighlights />

      <FeatureSplit
        id={sections[0].id}
        heading={sections[0].name}
        paragraphs={[security.roleBasedAccess.intro]}
        bullets={security.roleBasedAccess.bullets}
        tinted
        visual={{ kind: "photo", name: "control-room", alt: "Operations control room where each role works from its own view" }}
      />
      <FeatureSplit
        id={sections[1].id}
        heading={sections[1].name}
        paragraphs={[security.dataProtection.intro]}
        bullets={security.dataProtection.bullets}
        flip
        visual={{ kind: "photo", name: "control-room-night", alt: "Night-shift control room monitoring a port terminal" }}
      />
      <FeatureSplit
        id={sections[2].id}
        heading={sections[2].name}
        paragraphs={[security.integrations.intro]}
        bullets={security.integrations.bullets}
        tinted
        visual={{ kind: "photo", name: "yard-operator-call", alt: "Terminal operator receiving an automated shift call on a crane gantry" }}
      />
      <FeatureSplit
        id={sections[3].id}
        heading={sections[3].name}
        bullets={security.auditTrail.bullets}
        flip
        visual={{
          kind: "shot",
          src: "/assets/reference/leave.png",
          alt: "ShiftEaze Leave Summary dashboard with recorded approval decisions",
          mock: "leave",
          url: "app.shifteaze.com/leave",
        }}
      />
      <FeatureSplit
        id={sections[4].id}
        heading={sections[4].name}
        paragraphs={[security.responsibleAi.intro]}
        bullets={security.responsibleAi.bullets}
        tinted
        visual={{ kind: "panel", panel: "absence" }}
      />
      <FeatureSplit
        id={sections[5].id}
        heading={sections[5].name}
        paragraphs={[security.roundTheClock.intro]}
        bullets={security.roundTheClock.bullets}
        flip
        visual={{ kind: "photo", name: "terminal-aerial", alt: "Aerial view of a container terminal that runs around the clock" }}
      />

      <FAQ
        faqs={security.faqs}
        lead="What IT and compliance teams usually ask about workforce data. Still unsure? Book a demo and we'll walk you through it."
      />

      <SecurityClosing id={sections[6].id} heading={sections[6].name} />
    </>
  );
}
