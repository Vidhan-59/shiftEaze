import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { EndOfPageCTA } from "@/components/sections/EndOfPageCTA";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";
import * as platform from "@/content/platform";
import * as simple from "@/content/platformCards";

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
      <PageHeroBand pageKey="platform" tag={platformPage.name} h1="AI Workforce Operations Platform" showLogo />

      {/* Zig-zag rows: copy and image alternate sides; odd rows get a white band instead of a divider rule. */}
      <FeatureSplit
        id={sections[0].id}
        heading={platform.overview.heading}
        paragraphs={[platform.overview.intro, platform.overview.body]}
        visual={{ kind: "photo", name: "control-room", alt: "ShiftEaze operations control room with live workforce screens" }}
      />
      <FeatureSplit
        id={sections[1].id}
        heading={sections[1].name}
        paragraphs={[platform.rostering.intro]}
        bullets={platform.rostering.bullets}
        cards={simple.rosteringSimple.cards}
        cardTag={simple.rosteringSimple.tag}
        closing={platform.rostering.closing}
        flip
        tinted
        visual={{
          kind: "shot",
          src: "/assets/reference/roster.png",
          alt: "ShiftEaze Scheduler Dashboard showing a month roster grid",
          mock: "roster",
          url: "app.shifteaze.com/rostering",
        }}
      />
      <FeatureSplit
        id={sections[2].id}
        heading={sections[2].name}
        paragraphs={[platform.absence.intro]}
        bullets={platform.absence.bullets}
        visual={{ kind: "panel", panel: "absence" }}
      />
      <FeatureSplit
        id={sections[3].id}
        heading={sections[3].name}
        paragraphs={[platform.attendance.intro]}
        bullets={platform.attendance.bullets}
        cards={simple.attendanceSimple.cards}
        cardTag={simple.attendanceSimple.tag}
        flip
        tinted
        visual={{
          kind: "shot",
          src: "/assets/reference/shift-attendance.png",
          alt: "ShiftEaze Shift Attendance Summary dashboard",
          mock: "attendance",
          url: "app.shifteaze.com/attendance",
        }}
      />
      <FeatureSplit
        id={sections[4].id}
        heading={sections[4].name}
        paragraphs={[platform.analytics.intro]}
        bullets={platform.analytics.bullets}
        visual={{ kind: "panel", panel: "analytics" }}
      />
      <FeatureSplit
        id={sections[5].id}
        heading={sections[5].name}
        paragraphs={[platform.voice.intro]}
        bullets={platform.voice.bullets}
        cards={simple.voiceSimple.cards}
        cardTag={simple.voiceSimple.tag}
        closing={platform.voice.closing}
        flip
        tinted
        visual={{ kind: "photo", name: "yard-operator-call", alt: "Terminal operator receiving an automated shift call on a crane gantry" }}
      />
      <FeatureSplit
        id={sections[6].id}
        heading={sections[6].name}
        paragraphs={[platform.passbook.intro]}
        bullets={platform.passbook.bullets}
        visual={{ kind: "photo", name: "terminal-aerial", alt: "Aerial view of a container terminal where operator moves are tracked" }}
      />
      {/* Employee Leave Management Software: blue paragraph first, grey bullets after (brief §8, order reversed). */}
      <FeatureSplit
        id={sections[7].id}
        heading={sections[7].name}
        paragraphs={[platform.leave.blueIntro]}
        bullets={platform.leave.bullets}
        cards={simple.leaveSimple.cards}
        cardTag={simple.leaveSimple.tag}
        flip
        tinted
        visual={{
          kind: "shot",
          src: "/assets/reference/leave.png",
          alt: "ShiftEaze Leave Summary dashboard",
          mock: "leave",
          url: "app.shifteaze.com/leave",
        }}
      />
      {/* Security: blue paragraph first, grey bullets after (brief §8, order reversed). */}
      <FeatureSplit
        id={sections[8].id}
        heading={platform.security.heading}
        paragraphs={[platform.security.blueIntro]}
        bullets={platform.security.bullets}
        visual={{ kind: "photo", name: "control-room-night", alt: "Night-shift control room monitoring a port terminal" }}
      />

      <EndOfPageCTA
        label="Request a Demo"
        href="/request-demo"
      />
    </>
  );
}
