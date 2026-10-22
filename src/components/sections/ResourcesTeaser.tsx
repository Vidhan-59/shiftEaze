import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { resourcesTeaser } from "@/content/home";
import { GUIDE_URL } from "@/content/config";

export function ResourcesTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-2xl border border-line bg-white/70 p-8 text-center sm:p-10">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            Featured guide
          </span>
          <p className="mt-3 text-[18px] font-medium leading-snug text-fg">
            {resourcesTeaser.guide}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {/* Hidden while GUIDE_URL is empty — no asset exists yet (brief §6). */}
            {GUIDE_URL && (
              <Button href={GUIDE_URL} size="lg">
                Download the Guide
                <ArrowRight width={16} height={16} />
              </Button>
            )}
            <Button href="/resources" variant="secondary" size="lg">
              Browse All Resources
              <ArrowRight width={16} height={16} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
