import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProductVideo } from "@/components/visuals/ProductVideo";

export function MotionShowcase() {
  return (
    <section id="in-motion" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="See it in motion"
          title={
            <>
              A minute inside the platform,{" "}
              <span className="text-fg-muted">start to shift-start.</span>
            </>
          }
          lead="Watch a roster get built, a no-show flagged, and ShiftEaze Voice place the call — the full loop, on real terminal data."
        />

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl">
          <div className="group relative transition-transform duration-500 hover:-translate-y-1">
            <div
              className="pointer-events-none absolute -inset-x-10 -top-10 bottom-10 -z-10 bg-hero-glow opacity-60"
              aria-hidden
            />
            <BrowserFrame url="app.shifteaze.com/tour" live={false}>
              <ProductVideo fallbackKind="roster" />
            </BrowserFrame>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
