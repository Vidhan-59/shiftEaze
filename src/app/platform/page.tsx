import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { FeatureBody } from "@/components/sections/FeatureBody";
import { EndOfPageCTA } from "@/components/sections/EndOfPageCTA";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as platform from "@/content/platform";

const platformPage = page("platform");
const sections = platformPage.sections!;

export const metadata = pageMetadata({
  title: "AI Workforce Operations Platform | ShiftEaze",
  description:
    "AI Rostering & Shift Scheduling Software, absence prediction, geofenced attendance, leave management, AI voice calling and live dashboards on one platform.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHeroBand pageKey="platform" tag={platformPage.name} h1="AI Workforce Operations Platform" />

      <FeatureBody
        id={sections[0].id}
        heading={platform.overview.heading}
        paragraphs={[platform.overview.intro, platform.overview.body]}
      />
      <FeatureBody
        id={sections[1].id}
        heading={sections[1].name}
        paragraphs={[platform.rostering.intro]}
        bullets={platform.rostering.bullets}
        closing={platform.rostering.closing}
      />
      <FeatureBody
        id={sections[2].id}
        heading={sections[2].name}
        paragraphs={[platform.absence.intro]}
        bullets={platform.absence.bullets}
      />
      <FeatureBody
        id={sections[3].id}
        heading={sections[3].name}
        paragraphs={[platform.attendance.intro]}
        bullets={platform.attendance.bullets}
      />
      <FeatureBody
        id={sections[4].id}
        heading={sections[4].name}
        paragraphs={[platform.analytics.intro]}
        bullets={platform.analytics.bullets}
      />
      <FeatureBody
        id={sections[5].id}
        heading={sections[5].name}
        paragraphs={[platform.voice.intro]}
        bullets={platform.voice.bullets}
        closing={platform.voice.closing}
      />
      <FeatureBody
        id={sections[6].id}
        heading={sections[6].name}
        paragraphs={[platform.passbook.intro]}
        bullets={platform.passbook.bullets}
      />
      {/* Employee Leave Management Software: blue paragraph first, grey bullets after (brief §8, order reversed). */}
      <FeatureBody
        id={sections[7].id}
        heading={sections[7].name}
        paragraphs={[platform.leave.blueIntro]}
        bullets={platform.leave.bullets}
      />
      {/* Security: blue paragraph first, grey bullets after (brief §8, order reversed). */}
      <FeatureBody
        id={sections[8].id}
        heading={platform.security.heading}
        paragraphs={[platform.security.blueIntro]}
        bullets={platform.security.bullets}
      />

      <EndOfPageCTA
        label="Request a Demo"
        href="/request-demo"
        caption={platform.seeOnYourOwnRoster}
      />
    </>
  );
}
