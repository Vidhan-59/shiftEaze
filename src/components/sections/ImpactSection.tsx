import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { impact } from "@/content/home";
import { DEMO_CTA_LABEL } from "@/content/config";

export function ImpactSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-fg-faint">
              For operations:
            </h3>
            <BulletList items={impact.forOperations} className="mt-5" />
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-fg-faint">
              For workers:
            </h3>
            <BulletList items={impact.forWorkers} className="mt-5" />
          </Reveal>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/request-demo" size="lg">
            {DEMO_CTA_LABEL}
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
