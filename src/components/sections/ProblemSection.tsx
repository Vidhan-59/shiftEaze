import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/content/home";

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={problem.heading} lead={problem.intro} />

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-fg-faint">
              For the operations team
            </h3>
            <BulletList items={problem.forOperations} className="mt-5" />
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-fg-faint">
              For the worker
            </h3>
            <BulletList items={problem.forWorker} className="mt-5" />
          </Reveal>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/platform" variant="secondary" size="lg">
            See How ShiftEaze Fixes This
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
