import { PageHeroBand } from "@/components/layout/PageHeroBand";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/sections/DemoForm";
import { DEMO_CTA_LABEL } from "@/content/config";
import { page } from "@/content/siteMap";
import { pageMetadata } from "@/lib/pageMetadata";

const requestDemoPage = page("request-demo");

export const metadata = pageMetadata({
  title: "Request a Demo | ShiftEaze",
  description:
    "Request a demo of ShiftEaze, the AI workforce operations platform for shift teams. See the platform on your own roster.",
  path: "/request-demo",
});

// Brief: "no copy for this page beyond the button labels... Do not write any
// extra text." Just the H1 and the existing demo form, unchanged.
export default function RequestDemoPage() {
  return (
    <>
      <PageHeroBand pageKey="request-demo" tag={requestDemoPage.name} h1={DEMO_CTA_LABEL} />
      <section className="py-14 sm:py-16">
        <Container className="max-w-2xl">
          <DemoForm />
        </Container>
      </section>
    </>
  );
}
