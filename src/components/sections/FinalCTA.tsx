import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import { cta } from "@/content/site";

/** Home only (brief §13) — not shown on any other page. */
export function FinalCTA() {
  return (
    <section className="border-t border-line py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tighter text-fg">
            {finalCta.heading}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">{finalCta.text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Button href="/company?topic=sales-and-demos#contact" variant="secondary" size="lg">
              Contact Sales
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
